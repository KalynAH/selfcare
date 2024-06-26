from flask_app.models.selfcare import Selfcare
from flask_jwt_extended import jwt_required
from flask import Blueprint, jsonify, make_response, request


selfcares = Blueprint("selfcares", __name__)


@selfcares.route("/api/selfcares")
@jwt_required()
def all_selfcares():
    """This route returns all selfcares."""

    selfcares = Selfcare.find_all()
    response = make_response(jsonify(selfcares))
    response.headers["Content-Type"] = "application/json"
    response.status_code = 200
    return response


@selfcares.post("/api/selfcares/create")
@jwt_required()
def create_selfcare():
    """This route creates a new selfcare routine."""

    data = request.get_json()
    errors = Selfcare.validate_selfcare(data)

    if len(errors) != 0:
        response = make_response(jsonify(errors))
        response.headers["Content-Type"] = "application/json"
        response.status_code = 400
        return response

    Selfcare.create(data)
    response = make_response(jsonify({"msg": "selfcare created"}))
    response.headers["Content-Type"] = "application/json"
    response.status_code = 201
    return response


@selfcares.get("/api/selfcares/<int:selfcare_id>")
@jwt_required()
def selfcare_details(selfcare_id):
    """This route returns one selfcare routine."""

    selfcare = Selfcare.find_by_id(selfcare_id)
    if selfcare == None:
        response = make_response(jsonify({"msg": "selfcare not found"}))
        response.headers["Content-Type"] = "application/json"
        response.status_code = 404
        return response

    response = make_response(jsonify(selfcare))
    response.headers["Content-Type"] = "application/json"
    response.status_code = 200
    return response


@selfcares.post("/api/selfcares/<int:selfcare_id>/update")
@jwt_required()
def update_selfcare(selfcare_id):
    """This route updates a selfcare."""

    data = request.get_json()
    errors = Selfcare.validate_selfcare(data)
    if len(errors) != 0:
        response = make_response(jsonify(errors))
        response.headers["Content-Type"] = "application/json"
        response.status_code = 400
        return response

    Selfcare.update(selfcare_id, data)
    response = make_response(jsonify({"msg": "selfcare updated"}))
    response.headers["Content-Type"] = "application/json"
    response.status_code = 200
    return response


@selfcares.post("/api/selfcares/<int:selfcare_id>/delete")
@jwt_required()
def delete_selfcare(selfcare_id):
    """This route deletes a selfcare."""

    selfcare = Selfcare.find_by_id(selfcare_id)
    if selfcare == None:
        response = make_response(jsonify({"msg": "selfcare not found"}))
        response.headers["Content-Type"] = "application/json"
        response.status_code = 404
        return response

    Selfcare.delete_by_id(selfcare_id)
    response = make_response(jsonify({"msg": "selfcare deleted"}))
    response.headers["Content-Type"] = "application/json"
    response.status_code = 200
    return response
