import mysql.connector

def create_database_and_table():
    try:
        # Connect to MySQL engine to create DB
        print("Connecting to MySQL...")
        db_setup = mysql.connector.connect(
            host="caboose.proxy.rlwy.net",
            user="root",
            port=32866,
            password="FLegbFcAmdBXlDppUzjbvfAIUwarwPkV"
        )
        cursor_setup = db_setup.cursor()
        
        # Create database
        print("Creating database 'login_system' if not exists...")
        cursor_setup.execute("CREATE DATABASE IF NOT EXISTS login_system")
        db_setup.commit()
        cursor_setup.close()
        db_setup.close()

        # Connect to the created database to create the table
        print("Connecting to 'login_system' database...")
        db = mysql.connector.connect(
            host="localhost",
            user="root",
            password="kamaltamil@.",
            database="login_system"
        )
        cursor = db.cursor()

        # Create table
        print("Creating table 'users'...")
        create_table_query = """
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        )
        """
        cursor.execute(create_table_query)
        db.commit()
        
        print("Database 'login_system' and table 'users' initialized correctly!")
        
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        print("\nMake sure your MySQL server is running (e.g. XAMPP, WAMP, or standalone MySQL).")
        print("Edit setup_db.py and app.py if your MySQL root user has a password.")
    finally:
        if 'cursor' in locals() and cursor: cursor.close()
        if 'db' in locals() and db: db.close()

if __name__ == "__main__":
    create_database_and_table()
