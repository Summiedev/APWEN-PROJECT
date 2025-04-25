from flask import Flask
from flask_cors import CORS
#from app.routes.recommend import recommend_bp
from app.routes.comparison import comparison_bp
from app.routes.feedback import feedback_bp
from app.routes.visuals import visuals_bp
from app.routes.auth import auth_bp, login_manager, oauth  # bring in blueprint, login manager, and oauth
from dotenv import load_dotenv
import os # import login manager setup from auth.py

def create_app():
    app = Flask(__name__)
    load_dotenv()
    app.secret_key = os.getenv("SECRET_KEY")
    CORS(app, supports_credentials=True, origins="http://localhost:5173")
    # Initialize secret key (make sure to load dotenv before this if needed)
    login_manager.init_app(app)
    oauth.init_app(app)

    # Register all blueprints
    app.register_blueprint(auth_bp, url_prefix="/api")
   # app.register_blueprint(recommend_bp, url_prefix="/api")
    app.register_blueprint(comparison_bp, url_prefix="/api")
    app.register_blueprint(feedback_bp, url_prefix="/api")
    app.register_blueprint(visuals_bp, url_prefix="/api")

    return app