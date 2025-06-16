from rest_framework import serializers
from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model

User = get_user_model()

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        if email and password:
            user = authenticate(request=self.context.get("request"), email=email, password=password)
            if not user:
                raise serializers.ValidationError(_("Invalid email or password."), code="authorization")
        else:
            raise serializers.ValidationError(_("Must include 'email' and 'password'."), code="authorization")

        data["user"] = user
        return data


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ['email', 'password', 'full_name', 'phone', 'address', 'gender', 'birth_date']
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['full_name', 'phone', 'address', 'gender', 'birth_date', 'avatar']
