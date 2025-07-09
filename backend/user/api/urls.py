# user/api/urls.py

from django.urls import path
from .views import (
    RegisterCustomerView,
    RegisterVendorView,
    CustomerTokenObtainPairView,
    VendorTokenObtainPairView,
    LogoutView,
    CustomerProfileView,
    VendorProfileView,
    UpdateCustomerProfileView,
    UpdateVendorProfileView,
    ChangePasswordView,
)

urlpatterns = [
    path('register/customer/', RegisterCustomerView.as_view(), name='register_customer'),
    path('register/vendor/', RegisterVendorView.as_view(), name='register_vendor'),
    path('login/customer/', CustomerTokenObtainPairView.as_view(), name='token_customer'),
    path('login/vendor/', VendorTokenObtainPairView.as_view(), name='token_vendor'),
    path('logout/', LogoutView.as_view(), name='logout'),

    path('profile/customer/', CustomerProfileView.as_view(), name='customer_profile'),
    path('profile/vendor/', VendorProfileView.as_view(), name='vendor_profile'),

    path('profile/customer/update/', UpdateCustomerProfileView.as_view(), name='update_customer_profile'),
    path('profile/vendor/update/', UpdateVendorProfileView.as_view(), name='update_vendor'),

    path('change-password/', ChangePasswordView.as_view(), name='change_password_customer'),
]