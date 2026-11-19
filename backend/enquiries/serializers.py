from rest_framework import serializers

from .models import Enquiry


class EnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Enquiry
        fields = ("id", "name", "email", "destination", "mobile", "message", "created_at")
        read_only_fields = ("created_at",)
