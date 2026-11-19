from django.contrib.auth import get_user_model
from rest_framework import permissions, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView

from bookings.models import Booking
from enquiries.models import Enquiry
from hotels.models import HotelBooking
from packages.models import Package
from reviews.models import Review

from .serializers import EmailLoginSerializer, RegisterSerializer, UserSerializer, auth_payload

User = get_user_model()


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = []

    def post(self, request):
        serializer = EmailLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data)


class RegisterView(APIView):
    """Customer signup. Saves the user (and mobile) in the database and logs them in."""
    permission_classes = [permissions.AllowAny]
    authentication_classes = []

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(auth_payload(user), status=201)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """Admin-only list of users (no passwords are ever returned)."""
    queryset = User.objects.all().order_by("id")
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]


@api_view(["GET"])
@permission_classes([permissions.IsAdminUser])
def stats(request):
    """Counts for the admin Welcome dashboard."""
    return Response({
        "packages": Package.objects.count(),
        "users": User.objects.count(),
        "enquires": Enquiry.objects.count(),
        "reviews": Review.objects.count(),
        "bookings": Booking.objects.exclude(status="cart").count(),
        "hotel_bookings": HotelBooking.objects.exclude(status="cart").count(),
    })
