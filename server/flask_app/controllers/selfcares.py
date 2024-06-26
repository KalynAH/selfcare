from flask import Blueprint, jsonify, make_response, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt
from flask_app.models.user import User
from flask_app.extensions import jwt
from flask_app import bcrypt


auth = Blueprint("auth", __name__)
