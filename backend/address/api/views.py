from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..models import Address
from .serializers import AddressSerializer

class AddressViewSet(viewsets.ModelViewSet):
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)

    def get_object(self):
        obj = super().get_object()
        if obj.user != self.request.user:
            raise PermissionDenied("You do not have permission to access this address.")
        return obj
    
    def perform_create(self, serializer):
        is_default = serializer.validated_data.get('is_default', False)

        if is_default:
            Address.objects.filter(user=self.request.user, is_default=True).update(is_default=False)

        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        try:
            response = super().create(request, *args, **kwargs)
            return Response({
                "message": "Address created successfully",
                "address": response.data
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(f"Error creating address: {e}")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)

        serializer.is_valid(raise_exception=True)

        is_default = serializer.validated_data.get('is_default', instance.is_default)

        if is_default and not instance.is_default:
            Address.objects.filter(user=self.request.user, is_default=True).exclude(pk=instance.pk).update(is_default=False)

        serializer.save()

        return Response({
            "message": "Address updated successfully",
            "address": serializer.data
        }, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        try:
            super().destroy(request, *args, **kwargs)
            return Response({"message": "Address deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            print(f"Error deleting address: {e}")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
