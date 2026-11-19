from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Create (or update) an admin user for the dashboard login."

    def add_arguments(self, parser):
        parser.add_argument("--name", required=True)
        parser.add_argument("--email", required=True)
        parser.add_argument("--password", required=True)

    def handle(self, *args, **o):
        User = get_user_model()
        user, _ = User.objects.get_or_create(username=o["email"], defaults={"email": o["email"]})
        user.email, user.first_name = o["email"], o["name"]
        user.is_staff = user.is_superuser = True
        user.set_password(o["password"])
        user.save()
        self.stdout.write(self.style.SUCCESS(f"Admin ready: {o['email']}"))
