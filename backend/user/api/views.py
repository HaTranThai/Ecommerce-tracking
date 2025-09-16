from .serializers import *
from django.shortcuts import render
from django.conf import settings
from rest_framework.generics import (
    ListAPIView, RetrieveAPIView,
    CreateAPIView, UpdateAPIView, DestroyAPIView
)

from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework.response import Response
import jwt

# Create your views here.
class RegisterCustomerView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [AllowAny]
    
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        customer_id = response.data['id']
        customer = Customer.objects.select_related('user').get(id=customer_id)
        
        user = customer.user
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'customer_id': customer.id,
            'customer_name': customer.full_name,
        }, status=status.HTTP_201_CREATED)

class RegisterVendorView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = VendorSerializer
    permission_classes = [AllowAny]
    
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        vendor_id = response.data['id']
        vendor = Vendor.objects.select_related('user').get(id=vendor_id)
        
        user = vendor.user
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'vendor_id': vendor.id,
            'vendor_name': vendor.full_name,
        }, status=status.HTTP_201_CREATED)

class CustomerTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomerTokenObtainPairSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except serializers.ValidationError:
            return Response({'detail': 'Invalid credentials or no customer account associated.'}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.validated_data, status=status.HTTP_200_OK)

class VendorTokenObtainPairView(TokenObtainPairView):
    serializer_class = VendorTokenObtainPairSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except serializers.ValidationError:
            return Response({'detail': 'Invalid credentials or no vendor account associated.'}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.validated_data, status=status.HTTP_200_OK)
    
class LogoutView(CreateAPIView):
    permission_classes = [IsAuthenticated]

    def create(self, request):
        refesh_token = request.data.get('refresh_token')
        if not refesh_token:
            return Response({'detail': 'Refresh token is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        token = RefreshToken(refesh_token)
        token.blacklist()

        return Response({'detail': 'Successfully logged out.'}, status=status.HTTP_205_RESET_CONTENT)

class CustomerProfileView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CustomerSerializer

    def get_object(self):
        return self.request.user.customer

    def get(self, request, *args, **kwargs):
        try:
            user = self.get_object()
            serializer = self.get_serializer(user)
        except Customer.DoesNotExist:
            return Response({'detail': 'Customer profile does not exist.'}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class VendorProfileView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = VendorSerializer

    def get_object(self):
        return self.request.user.vendor

    def get(self, request, *args, **kwargs):
        try:
            user = self.get_object()
            serializer = self.get_serializer(user)
        except Vendor.DoesNotExist:
            return Response({'detail': 'Vendor profile does not exist.'}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class UpdateCustomerProfileView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CustomerProfileSerializer

    def get_object(self):
        return self.request.user.customer
    
class UpdateVendorProfileView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = VendorProfileUpdateSerializer

    def get_object(self):
        return self.request.user.vendor

class ChangePasswordView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ChangePasswordSerializer

    def get_object(self):
        return self.request.user
    
    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(instance=user, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({'detail': 'Password changed successfully.'}, status=status.HTTP_200_OK)
    