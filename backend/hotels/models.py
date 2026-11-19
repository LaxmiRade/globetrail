from django.conf import settings
from django.db import models


class Hotel(models.Model):
    name = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    rating = models.DecimalField(max_digits=2, decimal_places=1, default=4.5)
    price_per_night = models.PositiveIntegerField()
    image = models.URLField(max_length=500, blank=True)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return f"{self.name} ({self.location})"


class HotelBooking(models.Model):
    class Status(models.TextChoices):
        CART = "cart", "In Cart"
        PENDING = "pending", "Pending"
        CONFIRMED = "confirmed", "Confirmed"
        CANCELLED = "cancelled", "Cancelled"

    user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True,
                             on_delete=models.SET_NULL, related_name="hotel_bookings")
    hotel = models.ForeignKey(Hotel, on_delete=models.PROTECT, related_name="bookings")
    name = models.CharField(max_length=120)
    email = models.EmailField()
    mobile = models.CharField(max_length=20)
    check_in = models.DateField()
    check_out = models.DateField()
    guests = models.PositiveIntegerField(default=1)
    rooms = models.PositiveIntegerField(default=1)
    nights = models.PositiveIntegerField(editable=False)
    total_price = models.PositiveIntegerField(editable=False)
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.CART)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-id"]

    def save(self, *args, **kwargs):
        if not self.pk:  # price is locked in when the booking is created
            self.nights = (self.check_out - self.check_in).days
            self.total_price = self.hotel.price_per_night * self.nights * self.rooms
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Hotel booking #{self.pk} - {self.name} - {self.hotel}"
