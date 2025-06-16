# user/api/urls.py
from django.urls import path
from .views import LoginAPIView, LogoutAPIView, RegisterAPIView, UserProfileAPIView

urlpatterns = [
    path('login/', LoginAPIView.as_view(), name='api-login'),
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
    path('profile/', UserProfileAPIView.as_view(), name='user-profile'),
]
