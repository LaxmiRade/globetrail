# GlobeTrail Backend (Django + DRF + MySQL)

## Setup
```bash
python -m venv venv
venv\Scripts\activate             # Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
copy .env.example .env            # then put your MySQL password in DB_PASSWORD
```
Create the database in MySQL: `CREATE DATABASE travel_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
```bash
python manage.py migrate
python manage.py create_admin --name Admin --email you@example.com --password YourPassword
python manage.py import_packages seed/packages.json
python manage.py seed_hotels
python manage.py runserver        # http://127.0.0.1:8000
```
(For a quick test without MySQL set `USE_SQLITE=1` in `.env`.)

## Who can do what (base URL `/api/`)
| Endpoint | Public | Logged-in customer | Admin |
|---|---|---|---|
| /packages/, /hotels/ | read | read | add, edit, delete |
| /auth/register/, /auth/login/ | sign up, log in | | |
| /bookings/, /hotel-bookings/ | | create (goes into cart), list own, /cancel/ | list customer-confirmed, confirm, delete |
| /cart/ | | cart items + prices + grand total, own confirmed bookings | |
| /cart/confirm/ | | "Confirm Booking": sends the cart to the admin | |
| /enquires/ (contact form) | send message | | read, delete |
| /reviews/ | read, add | | delete |
| /users/, /auth/stats/ | | | read |

Lists return plain arrays. Protected calls need `Authorization: Bearer <access token>` (tokens last 1 day).
Hotels and packages can also be managed in the Django admin at `/admin/`.
