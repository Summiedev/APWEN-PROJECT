from flask import Blueprint, request, jsonify
import json, os

comparison_bp = Blueprint("comparison", __name__)

@comparison_bp.route("/materials/comparison", methods=["POST"])
def compare():
    data = request.json.get("materials", [])
    with open(os.path.join("app", "data", "materials.json")) as f:
        all_materials = json.load(f)
    result = [mat for mat in all_materials if mat["name"] in data]
    return jsonify(result), 200