from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.http import FileResponse, HttpResponse
from django.urls import include, path, re_path
from rest_framework.routers import DefaultRouter

from accounts.views import UserViewSet
from bookings.views import BookingViewSet, cart, confirm_cart
from enquiries.views import EnquiryViewSet
from hotels.views import HotelBookingViewSet, HotelViewSet
from packages.views import PackageViewSet
from reviews.views import ReviewViewSet

router = DefaultRouter()
router.register("packages", PackageViewSet, basename="package")
router.register("enquires", EnquiryViewSet, basename="enquiry")   # same spelling as your frontend
router.register("reviews", ReviewViewSet, basename="review")
router.register("bookings", BookingViewSet, basename="booking")
router.register("hotels", HotelViewSet, basename="hotel")
router.register("hotel-bookings", HotelBookingViewSet, basename="hotel-booking")
router.register("users", UserViewSet, basename="user")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/", include("accounts.urls")),
    path("api/cart/", cart, name="cart"),
    path("api/cart/confirm/", confirm_cart, name="cart-confirm"),
    path("api/", include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


def react_app(request, *args, **kwargs):
    """Any non-API URL (e.g. /destinations, /cart) returns the React app; React Router takes over."""
    index = settings.BASE_DIR / "frontend_dist" / "index.html"
    if index.exists():
        return FileResponse(open(index, "rb"), content_type="text/html")
    return HttpResponse("Frontend build not found. Run `npm run build` and copy dist to frontend_dist.", status=404)


urlpatterns += [re_path(r"^(?!api/|admin/|static/|media/|assets/).*$", react_app)]
