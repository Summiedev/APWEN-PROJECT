from flask import Blueprint, request, jsonify
from app.services.ai_interface import get_material_recommendations

recommend_bp = Blueprint("recommend", __name__)

@recommend_bp.route("/recommend", methods=["POST"])
def recommend():
    data = request.json
    try:
        recommendations = get_material_recommendations(data)
        return jsonify({"recommended_materials": recommendations}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500