from flask_app.config.mysqlconnection import connectToMySQL
from datetime import datetime
from flask_app.models.user import User
from pprint import pprint


class Selfcare:
    """Represents a selfcare routine"""

    _db = "selfcares_db"

    def __init__(self, data):
        self.id = data["id"]
        self.title = data["title"]
        self.description = data["description"]
        self.location = data["location"]
        self.created_at = data["created_at"]
        self.updated_at = data["updated_at"]
        self.user_id = data["user_id"]
        self.user = None

    @staticmethod
    def validate_selfcare(data):
        """Validate a selfcare routine"""

        errors = {}

        if len(data["title"].strip()) == 0:
            errors["title"] = "Please enter selfcare title."
        elif len(data["title"].strip()) < 3:
            errors["title"] = "Selfcare title must be at least three characters."

        if len(data["description"].strip()) == 0:
            errors["description"] = "Please enter selfcare description."
        elif len(data["description"].strip()) < 10:
            errors["description"] = (
                "Selfcare description must be at least ten characters."
            )

        if len(data["location"].strip()) == 0:
            errors["location"] = "Please enter selfcare location."
        elif len(data["location"].strip()) < 1:
            errors["location"] = "Selfcare must be at least one characters."
        return errors

    @classmethod
    def find_all(cls):
        """Finds all the selfcares in the database"""
        query = "SELECT * FROM selfcares;"
        return connectToMySQL(Selfcare._db).query_db(query)

    @classmethod
    def create(cls, form_data):
        """Inserts a new self care in the database"""

        query = """
        INSERT INTO selfcares
        (title, description, location, user_id)
        VALUES
        (%(title)s, %(description)s, %(location)s, %(user_id)s);
        """
        connectToMySQL(Selfcare._db).query_db(query, form_data)
        return

    @classmethod
    def find_by_id(cls, selfcare_id):
        """Find one selfcare routine by id in the database"""

        query = "SELECT * FROM selfcares WHERE id= %(selfcare_id)s;"
        data = {"selfcare_id": selfcare_id}
        list_of_dicts = connectToMySQL(Selfcare._db).query_db(query, data)
        if len(list_of_dicts) == 0:
            return None
        return list_of_dicts[0]

    @classmethod
    def find_by_id_with_user(cls, users_id):
        """This methods finds a user and a selfcare by selfcare id"""
        query = """
        SELECT * FROM users
        LEFT JOIN selfcares
        ON selfcares.user_id = users.id
        WHERE users.id = %(users_id)s;
        """
        data = {"id": users_id}
        list_of_dicts = connectToMySQL(Selfcare._db).query_db(query, data)
        pprint(list_of_dicts)
        user = User(list_of_dicts[0])

        for one_dict in list_of_dicts:

            selfcare_data = {
                "id": one_dict["selfcares.id"],
                "title": one_dict["title"],
                "description": one_dict["description"],
                "location": one_dict["location"],
                "created_at": one_dict["selfcares.created_at"],
                "updated_at": one_dict["selfcares.updated_at"],
            }
            user.selfcares.append(Selfcare(selfcare_data))

        return user

    @classmethod
    def update(cls, selfcare_id, form_data):
        """Updates a selfcare routine from a form."""

        query = """
        UPDATE selfcares
        SET
        title=%(title)s,
        description=%(description)s,
        location=%(location)s
        WHERE id = %(selfcare_id)s;
        """
        form_data["selfcare_id"] = selfcare_id
        connectToMySQL(Selfcare._db).query_db(query, form_data)
        return

    @classmethod
    def delete_by_id(cls, selfcare_id):
        """Deletes a selfcare by id."""

        query = "DELETE FROM selfcares WHERE id = %(selfcare_id)s;"
        data = {"selfcare_id": selfcare_id}
        connectToMySQL(Selfcare._db).query_db(query, data)
        return
