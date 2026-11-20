# Put GlobeTrail online (free) on PythonAnywhere: one link for website + backend

Django serves the React website (`frontend_dist/`) AND the API (`/api/...`) from one address:
`https://YOURNAME.pythonanywhere.com`. Free PythonAnywhere accounts have no MySQL, so the live site uses SQLite
(`USE_SQLITE=1`); your computer keeps using MySQL. Replace YOURNAME (PythonAnywhere) and YOUR_USERNAME (GitHub).

## 1. Create a free "Beginner" account at pythonanywhere.com (the username becomes your link)

## 2. Consoles tab -> Bash
```
git clone https://github.com/YOUR_USERNAME/globetrail.git
cd globetrail/backend
mkvirtualenv globetrail-env --python=python3.12
pip install -r requirements-deploy.txt
python -c "from django.core.management.utils import get_random_secret_key as g; print(g())"
nano .env
```
(If python3.12 is not offered, use the newest python3.x it lists.)
Paste into `.env` using the printed key, then Ctrl+O, Enter, Ctrl+X:
```
SECRET_KEY=PASTE_THE_PRINTED_KEY
DEBUG=False
ALLOWED_HOSTS=YOURNAME.pythonanywhere.com
USE_SQLITE=1
CSRF_TRUSTED_ORIGINS=https://YOURNAME.pythonanywhere.com
```
Create the database and your admin login:
```
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py create_admin --name Admin --email you@example.com --password YourStrongPassword
python manage.py import_packages seed/packages.json
python manage.py seed_hotels
```

## 3. Web tab -> Add a new web app -> Manual configuration (same Python version as above)
- Source code:       /home/YOURNAME/globetrail/backend
- Working directory: /home/YOURNAME/globetrail/backend
- Virtualenv:        /home/YOURNAME/.virtualenvs/globetrail-env
- Click the WSGI configuration file link, delete everything, paste, save:
```python
import os, sys
path = '/home/YOURNAME/globetrail/backend'
if path not in sys.path:
    sys.path.insert(0, path)
os.environ['DJANGO_SETTINGS_MODULE'] = 'config.settings'
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
```
- Press the green Reload button and open https://YOURNAME.pythonanywhere.com

## Keep it running
Free web apps expire if not renewed: log in now and then and press the extend button on the Web tab.

## Updating later
- Backend change: `git pull`, `python manage.py migrate` if models changed, then Reload.
- Frontend change: in `frontend` run `npm run build`, replace `backend/frontend_dist` with the new `dist` contents,
  `git add .`, `git commit`, `git push`; then `git pull` on PythonAnywhere and Reload.
