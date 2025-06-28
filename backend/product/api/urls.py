from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, get_my_products

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')

urlpatterns = [
    path('', include(router.urls)),
    path("my-products/", get_my_products, name="get_my_products"),
]
