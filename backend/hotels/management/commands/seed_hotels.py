from django.core.management.base import BaseCommand

from hotels.models import Hotel

HOTELS = [
    ("Ocean Paradise Resort", "Maldives", "4.9", 18000, "https://images.unsplash.com/photo-1566073771259-6a8506099945"),
    ("Royal Palm Luxury Hotel", "Dubai, UAE", "4.8", 22000, "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"),
    ("Mountain View Retreat", "Switzerland", "4.7", 16500, "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa"),
    ("Grand Palace Suites", "Paris, France", "4.9", 24000, "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8"),
    ("Skyline Luxury Stay", "Singapore", "4.8", 19500, "https://images.unsplash.com/photo-1445019980597-93fa8acb246c"),
    ("Tropical Beach Resort", "Bali, Indonesia", "4.9", 14999, "https://images.unsplash.com/photo-1578683010236-d716f9a3f461"),
]


class Command(BaseCommand):
    help = "Load the 6 hotels that were hard-coded in Hotels.jsx into the database."

    def handle(self, *args, **o):
        n = 0
        for name, location, rating, price, image in HOTELS:
            _, created = Hotel.objects.get_or_create(
                name=name,
                defaults=dict(location=location, rating=rating, price_per_night=price, image=image),
            )
            n += created
        self.stdout.write(self.style.SUCCESS(f"Added {n} new hotels ({len(HOTELS)} in list)"))
