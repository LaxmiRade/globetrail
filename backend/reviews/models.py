from django.db import models

from packages.models import Package


class Review(models.Model):
    package = models.ForeignKey(Package, on_delete=models.CASCADE, related_name="reviews")
    name = models.CharField(max_length=120, blank=True, default="Guest")
    rating = models.PositiveSmallIntegerField(default=5)
    giveReview = models.TextField()          # same name as your AddReview state
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-id"]

    def __str__(self):
        return f"{self.name} on {self.package}"
