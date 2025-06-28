# user/api/urls.py
from django.urls import path
from django.urls import include
from .views import LoginAPIView, LogoutAPIView, RegisterAPIView, UserProfileAPIView, CartViewSet, CartItemViewSet, AddressListCreateView, AddressDetailView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'cart', CartViewSet, basename='cart')
router.register(r'cart/items', CartItemViewSet, basename='cart-items')

urlpatterns = [
    path('login/', LoginAPIView.as_view(), name='api-login'),
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
    path('profile/', UserProfileAPIView.as_view(), name='user-profile'),
    path('addresses/', AddressListCreateView.as_view(), name='address-list-create'),
    path('addresses/<int:pk>/', AddressDetailView.as_view(), name='address-detail'),
    path('', include(router.urls)),
]
