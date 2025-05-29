from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Simulated user database
users = {
    "admin@bookstore.com": "admin123"
}

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if email in users and users[email] == password:
        return jsonify({"success": True})
    else:
        return jsonify({"success": False, "message": "Invalid credentials."})

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    if email in users:
        return jsonify({"success": False, "message": "User already exists."})
    users[email] = password
    return jsonify({"success": True, "message": "User registered successfully!"})

if __name__ == "__main__":
    app.run(debug=True)
from flask import Flask, request, jsonify, render_template
import sqlite3

app = Flask(__name__)

# Krijimi i databazës nëse nuk ekziston
def init_db():
    with sqlite3.connect("bookstore.db") as conn:
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            )
        ''')
    print("Database initialized")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    with sqlite3.connect("bookstore.db") as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE email=?", (email,))
        if cursor.fetchone():
            return jsonify({"success": False, "message": "Email already registered."})
        
        cursor.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", (name, email, password))
        conn.commit()

    return jsonify({"success": True, "message": "Registration successful!"})

if __name__ == '__main__':
    init_db()
    app.run(debug=True)