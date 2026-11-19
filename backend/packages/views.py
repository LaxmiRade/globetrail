from django.db.models import ProtectedError
from rest_framework import status, viewsets
from rest_framework.response import Response

from accounts.permissions import IsAdminOrReadOnly

from .models import Package
from .serializers import PackageSerializer


class PackageViewSet(viewsets.ModelViewSet):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer
    permission_classes = [IsAdminOrReadOnly]
    search_fields = ["name", "location"]
    ordering_fields = ["price", "name"]
    filterset_fields = {"price": ["gte", "lte"]}   # used by the home-page budget search

    def destroy(self, request, *args, **kwargs):
        try:
            return super().destroy(request, *args, **kwargs)
        except ProtectedError:
            return Response(
                {"detail": "This package has bookings and cannot be deleted. Cancel or delete its bookings first."},
                status=status.HTTP_409_CONFLICT,
            )
