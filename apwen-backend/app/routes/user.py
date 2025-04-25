from flask import Blueprint, jsonify, session
from flask_login import login_required
from app.models import users

user_bp = Blueprint("user", __name__)

@user_bp.route("/user")
@login_required
def get_user():
    user = users.get(session["_user_id"])
    return jsonify({
        "name": user.name,
        "email": user.email
    })
