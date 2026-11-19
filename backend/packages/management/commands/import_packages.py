import json

from django.core.management.base import BaseCommand

from packages.models import Package


class Command(BaseCommand):
    help = "Import packages from your json-server database.json"

    def add_arguments(self, parser):
        parser.add_argument("json_file")

    def handle(self, *args, **o):
        with open(o["json_file"], encoding="utf-8") as f:
            items = json.load(f).get("packages", [])
        n = 0
        for p in items:
            _, created = Package.objects.get_or_create(
                name=p["name"].strip(),
                defaults=dict(
                    location=p.get("location", ""), duration=p.get("duration", ""),
                    price=int(p.get("price") or 0), image=p.get("image", ""),
                    description=p.get("description", ""),
                ),
            )
            n += created
        self.stdout.write(self.style.SUCCESS(f"Imported {n} new packages ({len(items)} in file)"))
