from flask import Blueprint, request, jsonify
from sklearn.preprocessing import LabelEncoder
import joblib
import os
import pandas as pd

model_path = os.path.join(os.path.dirname(__file__), '..', 'models', 'AI_Recommender.joblib')
model = joblib.load(model_path)
recommend_bp = Blueprint('recommend', __name__)
training_data_path = os.path.join(os.path.dirname(__file__), '..', 'models', 'bridge_dataset.csv')

training_data = pd.read_csv(training_data_path)

# Rebuild encoders once
deck_encoder = LabelEncoder()
deck_encoder.fit(training_data['Deck Material'])

girders_encoder = LabelEncoder()
girders_encoder.fit(training_data['Girders Material'])

piers_encoder = LabelEncoder()
piers_encoder.fit(training_data['Piers Material'])

cables_encoder = LabelEncoder()
cables_encoder.fit(training_data['Cables Material'])

bearings_encoder = LabelEncoder()
bearings_encoder.fit(training_data['Bearings Material'])

# Helper to decode predictions
def decode_predictions(predictions):
    predicted_row = predictions[0][0]  # because it's [[[0 4 0 2 3]]]

    decoded_result = {
        "Deck Material": deck_encoder.inverse_transform([predicted_row[0]])[0],
        "Girders Material": girders_encoder.inverse_transform([predicted_row[1]])[0],
        "Piers Material": piers_encoder.inverse_transform([predicted_row[2]])[0],
        "Cables Material": cables_encoder.inverse_transform([predicted_row[3]])[0],
        "Bearings Material": bearings_encoder.inverse_transform([predicted_row[4]])[0],
    }
    
    return decoded_result

def map_load_to_strength(load_value):
    if load_value <= 500:
        return "Light"
    elif load_value <= 1000:
        return "Medium"
    else:
        return "Heavy"
    
def get_material_info(material_name):
    
    material_row = training_data[
        (training_data['Deck Material'] == material_name) |
        (training_data['Girders Material'] == material_name) |
        (training_data['Piers Material'] == material_name) |
        (training_data['Cables Material'] == material_name) |
        (training_data['Bearings Material'] == material_name)
    ]
    if material_row.empty:
        return None
    load_requirement = material_row["Load Requirement (kN)"].values[0]
    strength_category = map_load_to_strength(load_requirement)
    return {
        "name": material_name,
        "bridge Type": material_row["Bridge Type"].values[0],
        "strength": strength_category,
        "cost": material_row["Budget (?/kg)"].values[0],  
        "sustainability": material_row["Sustainability Priority (1-10)"].values[0],
    }

def map_level_to_float(level):
    mapping = {"Low": 1.0, "Medium": 2.0, "High": 3.0}
    return mapping.get(level, 0.0)


def get_environment_encoded(data):
    if data.get("indoor"):
        return 0
    elif data.get("outdoor"):
        return 1
    elif data.get("marine"):
        return 2
    else:
        return -1 

@recommend_bp.route('/recommend', methods=['POST'])
def recommend_materials():
    try:
        # Get the JSON data sent from the frontend
        data = request.get_json()

        # Build the input DataFrame
        input_df = pd.DataFrame([{
            "Bridge Type_encoded": data.get("bridgeType", ""),
            "Environment_encoded": get_environment_encoded(data),
            "Load Requirement (kN)": map_level_to_float(data.get("loadBearing", "Low")),
            "Budget (₦/kg)": map_level_to_float(data.get("budgetRange")),
            "Sustainability Priority (1-10)": int(data.get("sustainabilityPriority", 0)),
        }])

        expected_order = [
            "Load Requirement (kN)",
            "Budget (₦/kg)",
            "Sustainability Priority (1-10)",
            "Bridge Type_encoded",
            "Environment_encoded",
        ]
        input_df = input_df[expected_order]

        # Predict using the model
        predictions = model.predict(input_df)

        #return jsonify({"recommendations": predictions.tolist()})
        decoded_materials = decode_predictions(predictions)

       
        recommendations = []
        for material_key in decoded_materials:
            material_name = decoded_materials[material_key]
            material_info = get_material_info(material_name)
            if material_info:
                recommendations.append(material_info)

        if not recommendations:
            return jsonify({"error": "No materials found"}), 404

        
        recommendations = sorted(recommendations, key=lambda x: (-x["sustainability"], x["cost"]))

        
        # recommendations = sorted(recommendations, key=lambda x: (x["cost"], -x["sustainability"]))

        # Take top 3 only
        top_3 = recommendations[:3]

        #return jsonify({"recommendations": top_3}), 200
        print("Top 3 recommendations:", top_3)
        # Send back the predictions in the response
        # Convert everything to normal Python dict
        top_3 = [
    {
        'name': str(item['name']),
        'bridge Type': str(item['bridge Type']),
        'strength': str(item['strength']),
        'cost': int(item['cost']),  # Convert np.int64 to int
        'sustainability': int(item['sustainability'])  # Convert np.int64 to int
    }
        for item in top_3
    ]
        print("Predictions:", predictions)  
        return jsonify({"recommendations": top_3})
        

    except Exception as e:
        # In case of error, return a 500 error with the message
        print("Error occurred:", e)
        return jsonify({"error": str(e)}), 500