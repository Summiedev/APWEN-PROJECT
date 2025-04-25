from flask import Blueprint, send_from_directory
import os

visuals_bp = Blueprint("visuals", __name__)

@visuals_bp.route("/materials/<name>/visual", methods=["GET"])
def get_visual(name):
    visuals_dir = os.path.join("app", "static", "visuals")
    return send_from_directory(visuals_dir, f"{name}.png")
