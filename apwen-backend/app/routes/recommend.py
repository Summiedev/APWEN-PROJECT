# from flask import Blueprint, request, jsonify

# import joblib
# import os
# import pandas as pd

# model_path = os.path.join(os.path.dirname(__file__), '..', 'model', 'AI_Recommender.joblib')
# model = joblib.load(model_path)


# @recommend_bp.route('/recommend', methods=['POST'])
# def recommend_materials():
#     try:
#         data = request.get_json()

#         # Extract environment as combined string (if model needs it that way)
#         environment = ",".join([
#             env for env in ["indoor", "marine", "outdoor"]
#             if data.get(env)
#         ])

#         # Build input DataFrame for prediction
#         input_df = pd.DataFrame([{
#             "bridge_type": data.get("bridgeType", ""),
#             "environment": environment,
#             "load": float(data.get("loadBearing", 0)),
#             "budget": float(data.get("budgetRange", 0)),
#             "sustainability": int(data.get("sustainabilityPriority", 0)),
#         }])

#         # Predict using model
#         predictions = model.predict(input_df)

#         # Return response assuming model.predict returns dicts
#         return jsonify({"recommendations": predictions.tolist()})

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500