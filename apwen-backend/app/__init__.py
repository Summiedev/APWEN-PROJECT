from flask import Flask
from flask_cors import CORS
from app.routes.recommend import recommend_bp
from app.routes.comparison import comparison_bp
from app.routes.feedback import feedback_bp
from app.routes.visuals import visuals_bp

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}})

    

    app.register_blueprint(recommend_bp, url_prefix="/api")
    app.register_blueprint(comparison_bp, url_prefix="/api")
    app.register_blueprint(feedback_bp, url_prefix="/api")
    app.register_blueprint(visuals_bp, url_prefix="/api")

    return app