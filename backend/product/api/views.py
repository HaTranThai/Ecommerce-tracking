from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework import viewsets
from product.models import Product
from rest_framework.decorators import api_view, permission_classes
from product.api.serializers import ProductSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.http import Http404

# Create your views here.
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]  

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        if not serializer.data:
            return Response({
                "success": False,
                "message": "Không có sản phẩm nào."
            }, status=status.HTTP_404_NOT_FOUND)

        return Response({
            "success": True,
            "message": "Lấy danh sách sản phẩm thành công.",
            "products": serializer.data
        }, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            product = serializer.save(created_by=request.user)
            return Response({
                "success": True,
                "message": "Thêm sản phẩm thành công.",
                "product": ProductSerializer(product).data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "success": False,
            "message": "Thêm sản phẩm thất bại.",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
            
    
    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=True)
            if serializer.is_valid():
                product = serializer.save()
                return Response({
                    "success": True,
                    "message": "Cập nhật sản phẩm thành công.",
                    "product": ProductSerializer(product).data
                }, status=status.HTTP_200_OK)

            return Response({
                "success": False,
                "message": "Cập nhật sản phẩm thất bại.",
                "errors": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        except Http404:
            return Response({
                "success": False,
                "message": "Sản phẩm không tồn tại."
            }, status=status.HTTP_404_NOT_FOUND)
    
    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            instance.delete()
            return Response({
                "success": True,
                "message": "Xóa sản phẩm thành công."
            }, status=status.HTTP_204_NO_CONTENT)
        except Http404:
            return Response({
                "success": False,
                "message": "Sản phẩm không tồn tại."
            }, status=status.HTTP_404_NOT_FOUND)
    
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_my_products(request):
    user = request.user
    products = Product.objects.filter(created_by=user)
    serializer = ProductSerializer(products, many=True, context={'request': request})
    return Response({"products": serializer.data})
        
