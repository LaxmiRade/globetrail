from django.db import models


class Package(models.Model):
    # Field names mirror your database.json / AddPackage form exactly
    name = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    duration = models.CharField(max_length=100)          # e.g. "3 Nights / 4 Days"
    price = models.PositiveIntegerField()                # whole rupees
    image = models.URLField(max_length=500, blank=True)  # image link, same as now
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return self.name
