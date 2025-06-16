from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import LoginSerializer, RegisterSerializer, UserProfileSerializer

class LoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = serializer.validated_data["user"]
            refresh = RefreshToken.for_user(user)
            user_data = UserProfileSerializer(user).data
            return Response({
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": user_data
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Đăng ký thành công!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"detail": "Logout successful."}, status=status.HTTP_205_RESET_CONTENT)
        except Exception:
            return Response({"error": "Invalid token or already blacklisted."}, status=status.HTTP_400_BAD_REQUEST)


class UserProfileAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserProfileSerializer(user)
        return Response({
            "success": True,
            "message": "Lấy thông tin người dùng thành công.",
            "user": serializer.data
        }, status=status.HTTP_200_OK)

    def put(self, request):
        user = request.user

        allowed_fields = {'full_name', 'phone', 'address', 'gender', 'birth_date', 'avatar'}
        update_data = {field: value for field, value in request.data.items() if field in allowed_fields}

        serializer = UserProfileSerializer(user, data=update_data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "success": True,
                "message": "Cập nhật thông tin người dùng thành công.",
                "user": serializer.data
            }, status=status.HTTP_200_OK)

        return Response({
            "success": False,
            "message": "Cập nhật thông tin người dùng thất bại.",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    
    def delete(self, request):
        user = request.user
        user.delete()       
        return Response({
            "success": True,
            "message": "Xóa tài khoản thành công."
        }, status=status.HTTP_204_NO_CONTENT)
        