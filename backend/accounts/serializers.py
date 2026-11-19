from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Profile

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="first_name")
    type = serializers.SerializerMethodField()
    mobile = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ("id", "name", "email", "mobile", "type")

    def get_type(self, obj):
        return "admin" if obj.is_staff else "user"

    def get_mobile(self, obj):
        try:
            return obj.profile.mobile
        except Profile.DoesNotExist:
            return ""


def auth_payload(user):
    """Same response shape for login and register: tokens + user."""
    refresh = RefreshToken.for_user(user)
    return {"access": str(refresh.access_token), "refresh": str(refresh), "user": UserSerializer(user).data}


class RegisterSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=150)
    email = serializers.EmailField(max_length=150)
    mobile = serializers.CharField(max_length=20, required=False, allow_blank=True)
    password = serializers.CharField(write_only=True, validators=[validate_password])

    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists() or User.objects.filter(username__iexact=value).exists():
            raise serializers.ValidationError("An account with this email already exists.")
        return value

    def create(self, data):
        user = User.objects.create_user(
            username=data["email"], email=data["email"],
            password=data["password"], first_name=data["name"],
        )
        Profile.objects.create(user=user, mobile=data.get("mobile", ""))
        return user


class EmailLoginSerializer(serializers.Serializer):
    """Login with {email, password}. Returns JWT tokens plus the user."""
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        found = User.objects.filter(email__iexact=attrs["email"]).first()
        user = authenticate(username=found.username if found else "", password=attrs["password"])
        if user is None or not user.is_active:
            raise serializers.ValidationError("Invalid email or password.")
        return auth_payload(user)
