from flask_app.models.selfcare import Selfcare
from flask_app.utils.responses import make_json_response
from flask_jwt_extended import jwt_required
from flask import Blueprint, jsonify, make_response, request, session
from flask_app.models.user import User


selfcares = Blueprint("selfcares", __name__)


@selfcares.get("/api/selfcares")
@jwt_required()
def all_selfcares():
    """This route returns all selfcares."""

    selfcares = Selfcare.find_all()

    return make_json_response(selfcares, 200)


@selfcares.post("/api/selfcares/create")
@jwt_required()
def create_selfcare():
    """This route creates a new selfcare."""

    data = request.get_json()
    errors = Selfcare.validate_selfcare(data)

    if errors:
        return make_json_response(errors, 400)

    Selfcare.create(data)
    return make_json_response({"msg": "selfcare created"}, 201)


@selfcares.get("/api/selfcares/<int:selfcare_id>")
@jwt_required()
def selfcare_details(selfcare_id):
    """This route returns one selfcare."""
    # user = User.find_by_user_id(session["user_id"])
    selfcare = Selfcare.find_by_id(selfcare_id)

    if selfcare is None:
        return make_json_response({"msg": "selfcare not found"}, 404)

    return make_json_response(selfcare, 200)


@selfcares.get("/api/selfcares/user/<int:users_id>")
@jwt_required()
def user_details(users_id):
    """This route returns one users."""
    # user = User.find_by_user_id(session["user_id"])
    selfcare = Selfcare.find_by_id_with_user(users_id)

    if selfcare is None:
        return make_json_response({"msg": "selfcare not found"}, 404)

    return make_json_response(selfcare, 200)


@selfcares.patch("/api/selfcares/<int:selfcare_id>/update")
@jwt_required()
def update_selfcare(selfcare_id):
    """This route updates a selfcare."""

    selfcare = Selfcare.find_by_id(selfcare_id)

    if selfcare is None:
        return make_json_response({"msg": "selfcare not found"}, 404)
    data = request.get_json()
    errors = Selfcare.validate_selfcare(data)

    if errors:
        return make_json_response(errors, 400)

    Selfcare.update(selfcare_id, data)
    return make_json_response({"msg": "selfcare updated"}, 200)


@selfcares.post("/api/selfcares/<int:selfcare_id>/delete")
@jwt_required()
def delete_selfcare(selfcare_id):
    """This route deletes a selfcare."""

    selfcare = Selfcare.find_by_id(selfcare_id)
    if selfcare is None:
        return make_json_response({"msg": "selfcare not found"}, 404)

    Selfcare.delete_by_id(selfcare_id)
    return make_json_response({"msg": "selfcare deleted"}, 200)
