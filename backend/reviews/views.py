from rest_framework import viewsets

from accounts.permissions import IsAdminOrReadOnly
from rest_framework import permissions

from .models import Review
from .serializers import ReviewSerializer


class ReviewViewSet(viewsets.ModelViewSet):
    """Anyone can read and add reviews (?package=<id> to filter); only admin can edit/delete."""
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    filterset_fields = ["package"]

    def get_permissions(self):
        if self.action in ("list", "retrieve", "create"):
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]
