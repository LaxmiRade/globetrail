from django.db.models import ProtectedError
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from accounts.permissions import IsAdminOrReadOnly

from .models import Hotel, HotelBooking
from .serializers import HotelBookingSerializer, HotelSerializer


class HotelViewSet(viewsets.ModelViewSet):
    serializer_class = HotelSerializer
    permission_classes = [IsAdminOrReadOnly]
    search_fields = ["name", "location"]

    def get_queryset(self):
        qs = Hotel.objects.all()
        user = self.request.user
        return qs if (user and user.is_staff) else qs.filter(is_active=True)

    def destroy(self, request, *args, **kwargs):
        try:
            return super().destroy(request, *args, **kwargs)
        except ProtectedError:
            return Response({"detail": "This hotel has bookings and cannot be deleted. Mark it inactive instead."},
                            status=status.HTTP_409_CONFLICT)


class HotelBookingViewSet(viewsets.ModelViewSet):
    """Logged-in customers create/see/cancel their own hotel bookings; admin manages all."""
    serializer_class = HotelBookingSerializer
    filterset_fields = ["status", "hotel"]
    http_method_names = ["get", "post", "patch", "delete", "head", "options"]

    def get_permissions(self):
        if self.action in ("create", "list", "retrieve", "cancel"):
            return [permissions.IsAuthenticated()]
        return [permissions.IsAdminUser()]

    def get_queryset(self):
        qs = HotelBooking.objects.select_related("hotel")
        if self.request.user.is_staff:
            return qs.exclude(status=HotelBooking.Status.CART)   # admin sees only bookings the customer confirmed
        return qs.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=["post"])
    def cancel(self, request, pk=None):
        booking = self.get_object()
        if booking.status == HotelBooking.Status.CONFIRMED and not request.user.is_staff:
            return Response({"detail": "This booking is already confirmed. Please contact us to cancel it."},
                            status=status.HTTP_400_BAD_REQUEST)
        booking.status = HotelBooking.Status.CANCELLED
        booking.save(update_fields=["status"])
        return Response(self.get_serializer(booking).data)
