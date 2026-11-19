# GlobeTrail: Travel Agency Web App

A full-stack travel agency website: customers browse tour packages and hotels, search, sign up,
add bookings to a cart and confirm them; the admin manages everything from a dashboard.

<!-- Add screenshots: put images in a docs/ folder and link them, e.g.
![Home](docs/home.png)  ![Cart](docs/cart.png)  ![Admin](docs/admin.png) -->

## Features
**Customers**
- Browse destinations (tour packages) and hotels; search the home page by destination and budget
- Sign up / log in (JWT authentication)
- Book a package or a hotel: items go into a **cart** with prices; **Confirm Booking** sends them to the admin
- Package reviews and a contact / enquiry form

**Admin dashboard**
- Add, edit, delete packages and hotels
- View and confirm / cancel customer bookings (destinations and hotels)
- Read contact enquiries and manage reviews

## Tech stack
- **Frontend:** React 19, Vite, React Router, Bootstrap 5, Axios
- **Backend:** Python, Django 5, Django REST Framework, SimpleJWT, django-filter, django-cors-headers
- **Database:** MySQL

## Run the project locally
**1. Database:** in MySQL run `CREATE DATABASE travel_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`

**2. Backend** (terminal 1):
```bash
cd backend
python -m venv venv
venv\Scripts\activate            # Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
copy .env.example .env           # Mac/Linux: cp .env.example .env ; then set DB_PASSWORD
python manage.py migrate
python manage.py create_admin --name Admin --email you@example.com --password YourPassword
python manage.py import_packages seed/packages.json
python manage.py seed_hotels
python manage.py runserver
```
**3. Frontend** (terminal 2):
```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:5173. See `backend/README.md` for the API endpoints.

## Project structure
```
backend/    Django REST API (accounts, packages, hotels, bookings, enquiries, reviews)
frontend/   React app (src/GlobeTrails = pages, src/GlobeTrails/Admin = dashboard)
```
