from django.contrib import admin

from .models import Hotel, HotelBooking

admin.site.register(Hotel)
admin.site.register(HotelBooking)
