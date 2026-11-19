from rest_framework import mixins, viewsets

from accounts.permissions import CreateAnyoneElseAdmin

from .models import Enquiry
from .serializers import EnquirySerializer


class EnquiryViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, mixins.RetrieveModelMixin,
                     mixins.DestroyModelMixin, viewsets.GenericViewSet):
    """Contact form submits (public POST); admin reads/deletes."""
    queryset = Enquiry.objects.all()
    serializer_class = EnquirySerializer
    permission_classes = [CreateAnyoneElseAdmin]
