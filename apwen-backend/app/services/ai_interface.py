# from flask import Blueprint, request, jsonify
# import joblib
# import os
# import pandas as pd

# recommend_bp = Blueprint('recommend', __name__)



# def get_material_recommendations(input_data):
#     response = requests.post("http://localhost:5000/predict", json=input_data)
#     if response.status_code == 200:
#         return response.json().get("recommendations", [])
#     else:
#         raise Exception("Failed to get recommendation from AI model")
