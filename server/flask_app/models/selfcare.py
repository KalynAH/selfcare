from flask_app.config.mysqlconnection import connectToMySQL
from datetime import datetime


class Selfcare:
    """Represents a selfcare routine"""

    _db = "selfcares_db"

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
        query = "SELECT *FROM selfcares;"
        return connectToMySQL(Selfcare._db).query_db(query)

    @classmethod
    def create(cls, form_data):
        """Inserts a new self care in the database"""

        query = """
        INSERT INTO selfcares
        (title, description, location)
        VALUES
        (%(title)s, %(description)s, %(location)s);
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
    def update(cls, selfcare_id, form_data):
        """Updates a selfcare routine from a form."""

        query = """
        UPDATE selfcares
        SET
        title=%(title)s,
        description=%(description)s,
        location=%(location)s,
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
