from django.conf import settings
from django.db import models


class Profile(models.Model):
    """Extra signup data for a customer (Django's User has no mobile field)."""
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="profile")
    mobile = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return f"Profile of {self.user}"
