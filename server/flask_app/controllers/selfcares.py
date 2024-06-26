from flask_app.models.selfcare import Selfcare
from flask_jwt_extended import jwt_required
from flask import Blueprint, jsonify, make_response, request


selfcares = Blueprint("selfcares", __name__)
