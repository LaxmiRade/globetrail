from datetime import date

from rest_framework import serializers

from .models import Hotel, HotelBooking


class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = ("id", "name", "location", "rating", "price_per_night", "image", "description", "is_active")


class HotelBookingSerializer(serializers.ModelSerializer):
    hotel_name = serializers.CharField(source="hotel.name", read_only=True)
    hotel_location = serializers.CharField(source="hotel.location", read_only=True)
    hotel_image = serializers.CharField(source="hotel.image", read_only=True)
    price_per_night = serializers.IntegerField(source="hotel.price_per_night", read_only=True)

    class Meta:
        model = HotelBooking
        fields = (
            "id", "hotel", "hotel_name", "hotel_location", "hotel_image", "price_per_night",
            "name", "email", "mobile", "check_in", "check_out", "guests", "rooms",
            "nights", "total_price", "status", "created_at",
        )
        read_only_fields = ("nights", "total_price", "created_at")

    def validate_check_in(self, v):
        if v <= date.today():
            raise serializers.ValidationError("Check-in date must be in the future.")
        return v

    def validate_guests(self, v):
        if v < 1:
            raise serializers.ValidationError("At least one guest is required.")
        return v

    def validate_rooms(self, v):
        if v < 1:
            raise serializers.ValidationError("At least one room is required.")
        return v

    def validate(self, attrs):
        if "check_in" in attrs and "check_out" in attrs and attrs["check_out"] <= attrs["check_in"]:
            raise serializers.ValidationError({"check_out": "Check-out must be after check-in."})
        hotel = attrs.get("hotel")
        if hotel is not None and not hotel.is_active:
            raise serializers.ValidationError("This hotel is not available.")
        return attrs

    def create(self, validated_data):
        validated_data["status"] = HotelBooking.Status.CART   # starts in the cart; customer confirms it later
        return super().create(validated_data)
