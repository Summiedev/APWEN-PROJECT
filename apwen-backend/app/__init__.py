from flask import Flask
from flask_cors import CORS
from app.routes.recommend import recommend_bp
from app.routes.comparison import comparison_bp
from app.routes.feedback import feedback_bp
from app.routes.visuals import visuals_bp

import os # import login manager setup from auth.py

def create_app():
    app = Flask(__name__)
   
    CORS(app, supports_credentials=True, origins="https://apwen-frontend-1.onrender.com")
   

    # Register all blueprints
   
    app.register_blueprint(recommend_bp, url_prefix="/api")
    app.register_blueprint(comparison_bp, url_prefix="/api")
    app.register_blueprint(feedback_bp, url_prefix="/api")
    app.register_blueprint(visuals_bp, url_prefix="/api")

    return app