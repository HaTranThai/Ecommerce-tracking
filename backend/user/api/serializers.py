from rest_framework import serializers
from django.contrib.auth import get_user_model
from user.models import  User, Customer, Vendor
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from address.api.serializers import AddressSerializer
from address.models import Address

class TokenObtainPairSerializer(TokenObtainPairSerializer):
    token = serializers.CharField(read_only=True)

class UserSerializer(serializers.ModelSerializer):
    address = AddressSerializer(read_only=True, many=True, source='addresses')  

    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'address', 'is_customer', 'is_vendor')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        validated_data.pop('address', None) 

        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data.get('password'),
            is_customer=validated_data.get('is_customer', False),
            is_vendor=validated_data.get('is_vendor', False)
        )
        return user
    
class CustomerSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Customer
        fields = ('id', 'full_name', 'phone', 'date_of_birth', 'age', 'user')

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_data['is_customer'] = True
        user = UserSerializer().create(user_data)

        customer = Customer.objects.create(user=user, **validated_data)
        return customer

class VendorSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Vendor
        fields = ('id', 'full_name', 'phone', 'description', 'user')

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_data['is_vendor'] = True
        user = User.objects.create_user(**user_data)

        vendor = Vendor.objects.create(user=user, **validated_data)
        return vendor
    
class CustomerTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        try:
            customer = Customer.objects.get(user=self.user)
            data.update({
                'roles': ['customer'],
                'customer_id': customer.id,
                'full_name': customer.full_name,
            })
        except Customer.DoesNotExist:
            raise serializers.ValidationError("Customer does not exist for this user.")
        return data
    
class VendorTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        try:
            vendor = Vendor.objects.get(user=self.user)
            data.update({
                'roles': ['vendor'],
                'vendor_id': vendor.id,
                'full_name': vendor.full_name,
            })
        except Vendor.DoesNotExist:
            raise serializers.ValidationError("Vendor does not exist for this user.")
        return data


class CustomerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('id', 'full_name', 'phone', 'address', 'date_of_birth', 'age')
        
class VendorProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = ('full_name', 'phone', 'description')

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(required=True, write_only=True)

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Mật khẩu cũ không chính xác.")
        return value

    def validate(self, data):
        if data['new_password'] == data['old_password']:
            raise serializers.ValidationError("Mật khẩu mới phải khác mật khẩu cũ.")
        return data

    def update(self, instance, validated_data):
        instance.set_password(validated_data['new_password'])
        instance.save()
        return instance