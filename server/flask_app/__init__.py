from os import environ
from flask import Flask
from flask_app.extensions import bcrypt, jwt
from flask_app.controllers.selfcares import selfcares
from flask_app.controllers.auth import auth

app = Flask(__name__)
app.secret_key = environ.get("SECRET_KEY")
app.register_blueprint(selfcares)
app.register_blueprint(auth)

bcrypt.init_app(app)
jwt.init_app(app)

from secrets import token_hex

print(token_hex())
