from django.urls import path
from .views import purchase_single_product, purchase_cart_items, OrderHistoryView

urlpatterns = [
    path('purchase/single/', purchase_single_product),
    path('purchase/cart/', purchase_cart_items),
    path('history/', OrderHistoryView.as_view(), name='order-history'),
]