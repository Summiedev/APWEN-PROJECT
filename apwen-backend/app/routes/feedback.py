from flask import Blueprint, request, jsonify
import json, os

feedback_bp = Blueprint("feedback", __name__)
FEEDBACK_FILE = os.path.join("app", "data", "feedback.json")

@feedback_bp.route("/feedback", methods=["POST"])
def collect_feedback():
    feedback = request.json
    try:
        with open(FEEDBACK_FILE, "r+") as f:
            existing = json.load(f)
            existing.append(feedback)
            f.seek(0)
            json.dump(existing, f, indent=2)
        return jsonify({"message": "Thanks for your feedback!"}), 200
    except:
        return jsonify({"error": "Could not save feedback"}), 500
