# user/api/urls.py
from django.urls import path
from .views import LoginAPIView, LogoutAPIView, RegisterAPIView

urlpatterns = [
    path('login/', LoginAPIView.as_view(), name='api-login'),
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
]
