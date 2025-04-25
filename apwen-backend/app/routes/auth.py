from flask import Blueprint, redirect, url_for, session, request, jsonify
from authlib.integrations.flask_client import OAuth
from flask_login import LoginManager, login_user, logout_user, login_required, UserMixin
from dotenv import load_dotenv
import os
import uuid

# Load environment variables
load_dotenv()

auth_bp = Blueprint("auth", __name__)
login_manager = LoginManager()

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

# OAuth setup
oauth = OAuth()
google = oauth.register(
    name='google',
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid email profile'},
)

# Routes
@auth_bp.route("/")
def home():
    return "Welcome to SmartMaterial"

@auth_bp.route("/login")
def login():
    nonce = str(uuid.uuid4())
    session["nonce"] = nonce
    redirect_uri = url_for("auth.authorize", _external=True)
    return google.authorize_redirect(redirect_uri, nonce=nonce)

@auth_bp.route("/authorize")
def authorize():
    token = google.authorize_access_token()
    nonce = session.pop("nonce", None)
    user_info = google.parse_id_token(token, nonce=nonce)

    user_id = user_info["sub"]
    user = User(id_=user_id, name=user_info["name"], email=user_info["email"])
    users[user_id] = user
    login_user(user)

    return redirect("http://localhost:5173")  # Adjust as needed

@auth_bp.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect("/")

@auth_bp.route("/user")
@login_required
def get_user():
    user = users.get(session["_user_id"])
    return jsonify({
        "name": user.name,
        "email": user.email
    })
