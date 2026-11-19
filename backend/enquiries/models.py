from django.db import models


class Enquiry(models.Model):
    # Mirrors the SendEnquiry form: name, email, destination, mobile, message
    name = models.CharField(max_length=120)
    email = models.EmailField()
    destination = models.CharField(max_length=200)
    mobile = models.CharField(max_length=20)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-id"]
        verbose_name_plural = "enquiries"

    def __str__(self):
        return f"{self.name} - {self.destination}"
