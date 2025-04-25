from flask import Flask, redirect, url_for, session, request, jsonify
from authlib.integrations.flask_client import OAuth
from flask_login import LoginManager, login_user, logout_user, login_required, UserMixin
from dotenv import load_dotenv
import os

# Load .env variables
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY")

# Flask-Login setup
login_manager = LoginManager()
login_manager.init_app(app)

# In-memory user store
users = {}

class User(UserMixin):
    def __init__(self, id_, name, email):
        self.id = id_
        self.name = name
        self.email = email

@login_manager.user_loader
def load_user(user_id):
    return users.get(user_id)

# Authlib Google OAuth
oauth = OAuth(app)
google = oauth.register(
    name='google',
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    access_token_url='https://oauth2.googleapis.com/token',
    authorize_url='https://accounts.google.com/o/oauth2/v2/auth',
    userinfo_endpoint='https://openidconnect.googleapis.com/v1/userinfo',
    client_kwargs={'scope': 'openid email profile'},
)

# Routes
@app.route("/")
def home():
    return "Welcome to SmartMaterial"

@app.route("/login")
def login():
    redirect_uri = url_for("authorize", _external=True)
    return google.authorize_redirect(redirect_uri)

@app.route("/authorize")
def authorize():
    token = google.authorize_access_token()
    resp = google.get("userinfo")
    user_info = resp.json()
    user_id = user_info["sub"]

    user = User(id_=user_id, name=user_info["name"], email=user_info["email"])
    users[user_id] = user
    login_user(user)

    
    return redirect("http://localhost:5173/dashboard")  # adjust to your route

@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect("/")

@app.route("/api/user")
@login_required
def get_user():
    user = users.get(session["_user_id"])
    return jsonify({
        "name": user.name,
        "email": user.email
    })

if __name__ == "__main__":
    app.run(debug=True)
