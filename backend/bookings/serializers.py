from datetime import date

from rest_framework import serializers

from .models import Booking


class BookingSerializer(serializers.ModelSerializer):
    package_name = serializers.CharField(source="package.name", read_only=True)
    package_location = serializers.CharField(source="package.location", read_only=True)
    package_duration = serializers.CharField(source="package.duration", read_only=True)
    package_image = serializers.CharField(source="package.image", read_only=True)
    package_price = serializers.IntegerField(source="package.price", read_only=True)

    class Meta:
        model = Booking
        fields = ("id", "package", "package_name", "package_location", "package_duration",
                  "package_image", "package_price", "name", "email", "mobile",
                  "travel_date", "travelers", "total_price", "status", "created_at")
        read_only_fields = ("total_price", "created_at")

    def validate_travel_date(self, v):
        if v <= date.today():
            raise serializers.ValidationError("Travel date must be in the future.")
        return v

    def validate_travelers(self, v):
        if v < 1:
            raise serializers.ValidationError("At least one traveler is required.")
        return v

    def create(self, validated_data):
        validated_data["status"] = Booking.Status.CART   # starts in the cart; customer confirms it later
        return super().create(validated_data)
