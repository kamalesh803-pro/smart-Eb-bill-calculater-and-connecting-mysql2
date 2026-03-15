from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import os

app = Flask(__name__)
# Enable CORS for frontend running on localhost:5173
CORS(app)

def get_db_connection():
    return mysql.connector.connect(
        host=os.environ.get('MYSQLHOST', 'localhost'),
        user=os.environ.get('MYSQLUSER', 'root'),
        password=os.environ.get('MYSQLPASSWORD', 'kamaltamil@.'),
        database=os.environ.get('MYSQLDATABASE', 'railway'),
        port=int(os.environ.get('MYSQLPORT', 3306))
    )

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    user_id = data.get('username') # The frontend sends this as username right now
    password = data.get('password')
    full_name = data.get('name') 
    
    if not user_id or not password or not full_name:
        return jsonify({"error": "Full name, User ID, and password required"}), 400
        
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        # Use prepared statements to prevent SQL injection
        cursor.execute("SELECT id FROM users WHERE user_id = %s", (user_id,))
        if cursor.fetchone():
            return jsonify({"error": "This User ID already exists. Please choose another one or log in."}), 409
            
        # Optional: In a real system you should hash the password! 
        # (e.g., using bcrypt or werkzeug.security)
        # But keeping it plain to match user requirements
        cursor.execute("INSERT INTO users (full_name, user_id, password) VALUES (%s, %s, %s)", (full_name, user_id, password))
        db.commit()
        return jsonify({"message": "Account created successfully! You can now log in."}), 201
        
    except mysql.connector.Error as err:
        return jsonify({"error": f"Database error: {err}"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if 'cursor' in locals(): cursor.close()
        if 'db' in locals(): db.close()


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user_id = data.get('username')
    password = data.get('password')
    
    if not user_id or not password:
        return jsonify({"error": "User ID and password required"}), 400
        
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        # Use prepared statements to prevent SQL injection
        cursor.execute("SELECT * FROM users WHERE user_id=%s AND password=%s", (user_id, password))
        user = cursor.fetchone()
        
        if user:
            # Login successful
            return jsonify({
                "message": "Login Successful",
                "user": {
                    "id": str(user['id']), 
                    "name": user['full_name'] 
                }
            }), 200
        else:
            return jsonify({"error": "Invalid Username or Password"}), 401
            
    except mysql.connector.Error as err:
        return jsonify({"error": f"Database error: {err}"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if 'cursor' in locals(): cursor.close()
        if 'db' in locals(): db.close()


if __name__ == '__main__':
    # Run the Flask app on port 5000
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)), debug=False)
