from django.db import transaction
from django.db.models import Sum
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response

from hotels.models import HotelBooking
from hotels.serializers import HotelBookingSerializer

from .models import Booking
from .serializers import BookingSerializer


class BookingViewSet(viewsets.ModelViewSet):
    """Logged-in customers create/see/cancel their own bookings; admin manages confirmed-by-customer ones."""
    serializer_class = BookingSerializer
    filterset_fields = ["status", "package"]
    http_method_names = ["get", "post", "patch", "delete", "head", "options"]

    def get_permissions(self):
        if self.action in ("create", "list", "retrieve", "cancel"):
            return [permissions.IsAuthenticated()]
        return [permissions.IsAdminUser()]

    def get_queryset(self):
        qs = Booking.objects.select_related("package")
        if self.request.user.is_staff:
            return qs.exclude(status=Booking.Status.CART)   # admin sees only bookings the customer confirmed
        return qs.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=["post"])
    def cancel(self, request, pk=None):
        booking = self.get_object()
        if booking.status == Booking.Status.CONFIRMED and not request.user.is_staff:
            return Response({"detail": "This booking is already confirmed. Please contact us to cancel it."},
                            status=status.HTTP_400_BAD_REQUEST)
        booking.status = Booking.Status.CANCELLED
        booking.save(update_fields=["status"])
        return Response(self.get_serializer(booking).data)


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def cart(request):
    """
    The logged-in user's cart (items waiting for 'Confirm Booking') with prices,
    plus their already confirmed-by-them bookings (pending / confirmed by admin).
    """
    mine = Booking.objects.filter(user=request.user).select_related("package")
    my_hotels = HotelBooking.objects.filter(user=request.user).select_related("hotel")

    in_cart = mine.filter(status=Booking.Status.CART)
    in_cart_hotels = my_hotels.filter(status=HotelBooking.Status.CART)
    placed_statuses = [Booking.Status.PENDING, Booking.Status.CONFIRMED]

    package_total = in_cart.aggregate(t=Sum("total_price"))["t"] or 0
    hotel_total = in_cart_hotels.aggregate(t=Sum("total_price"))["t"] or 0

    return Response({
        "package_bookings": BookingSerializer(in_cart, many=True).data,
        "hotel_bookings": HotelBookingSerializer(in_cart_hotels, many=True).data,
        "package_total": package_total,
        "hotel_total": hotel_total,
        "grand_total": package_total + hotel_total,
        "placed_package_bookings": BookingSerializer(mine.filter(status__in=placed_statuses), many=True).data,
        "placed_hotel_bookings": HotelBookingSerializer(my_hotels.filter(status__in=placed_statuses), many=True).data,
    })


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def confirm_cart(request):
    """'Confirm Booking': everything in the cart becomes a booking the admin can see (status pending)."""
    packages = Booking.objects.filter(user=request.user, status=Booking.Status.CART)
    hotels = HotelBooking.objects.filter(user=request.user, status=HotelBooking.Status.CART)
    if not packages.exists() and not hotels.exists():
        return Response({"detail": "Your cart is empty."}, status=status.HTTP_400_BAD_REQUEST)
    with transaction.atomic():
        n_packages = packages.update(status=Booking.Status.PENDING)
        n_hotels = hotels.update(status=HotelBooking.Status.PENDING)
    return Response({"confirmed_packages": n_packages, "confirmed_hotels": n_hotels})
