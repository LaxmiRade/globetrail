from django.conf import settings
from django.db import models

from packages.models import Package


class Booking(models.Model):
    class Status(models.TextChoices):
        CART = "cart", "In Cart"
        PENDING = "pending", "Pending"
        CONFIRMED = "confirmed", "Confirmed"
        CANCELLED = "cancelled", "Cancelled"

    user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True,
                             on_delete=models.SET_NULL, related_name="bookings")
    package = models.ForeignKey(Package, on_delete=models.PROTECT, related_name="bookings")
    name = models.CharField(max_length=120)
    email = models.EmailField()
    mobile = models.CharField(max_length=20)
    travel_date = models.DateField()
    travelers = models.PositiveIntegerField(default=1)
    total_price = models.PositiveIntegerField(editable=False)
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.CART)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-id"]

    def save(self, *args, **kwargs):
        if not self.pk:
            self.total_price = self.package.price * self.travelers
        super().save(*args, **kwargs)

    def __str__(self):
        return f"#{self.pk} {self.name} - {self.package}"
