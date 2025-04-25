from flask_login import UserMixin

# In-memory user store (for demo)
users = {}

class User(UserMixin):
    def __init__(self, id_, name, email):
        self.id = id_
        self.name = name
        self.email = email

def load_user(user_id):
    return users.get(user_id)
