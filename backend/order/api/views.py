from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from ..models import Order, OrderItem
from product.models import Product
from .serializers import OrderSerializer, OrderItemSerializer
from rest_framework import status
from user.models import CartItem

# Create your views here.
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def purchase_single_product(request):
    product_id = request.data.get("product_id")
    quantity = request.data.get("quantity", 1)

    if not product_id:
        return Response({"error": "product_id is required"}, status=400)

    try:
        product = Product.objects.get(pk=product_id)
        total = product.price * int(quantity)

        order = Order.objects.create(user=request.user, total_price=total)
        OrderItem.objects.create(order=order, product=product, quantity=quantity, price=product.price)

        return Response({"message": "Đã mua thành công", "order_id": order.id}, status=201)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def purchase_cart_items(request):
    user = request.user
    cart_item_ids = request.data.get("cart_item_ids", [])

    if not cart_item_ids:
        return Response({"detail": "Bạn chưa chọn sản phẩm nào để mua."}, status=status.HTTP_400_BAD_REQUEST)

    cart_items = CartItem.objects.filter(id__in=cart_item_ids, cart__user=user)

    if not cart_items.exists():
        existing_ids = list(CartItem.objects.filter(cart__user=user).values_list("id", flat=True))
        return Response({
            "detail": "Không tìm thấy các sản phẩm đã chọn.",
            "ids_đang_có": existing_ids,
            "ids_đã_gửi": cart_item_ids
        }, status=status.HTTP_404_NOT_FOUND)

    # Tạo đơn hàng
    order = Order.objects.create(user=user)

    total_price = 0
    for item in cart_items:
        OrderItem.objects.create(
            order=order,
            product=item.product,
            quantity=item.quantity,
            price=item.product.price
        )
        total_price += item.quantity * item.product.price

    order.total_price = total_price
    order.save()

    # Xóa các cart_item đã được mua
    cart_items.delete()

    return Response({"detail": "Đặt hàng thành công.", "order_id": order.id}, status=status.HTTP_201_CREATED)

class OrderHistoryView(ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-created_at')