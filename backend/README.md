# Backend Setup Instructions

The backend of the application now connects to a MySQL database instead of Local Storage. 

## Requirements
- Python 3.8+
- MySQL Server (XAMPP, WAMP, or standalone MySQL)

## Steps to run the backend

1. Ensure your MySQL server service is running.
2. In your terminal, navigate to the `backend` folder.
3. (Optional) Create a virtual environment:
   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```
4. Install the required python packages:
   ```bash
   pip install -r requirements.txt
   ```
5. Set up your database by either importing `login_system` into MySQL through phpMyAdmin or running the setup script provided:
   ```bash
   python setup_db.py
   ```
   *Note: If your MySQL root user has a password, make sure to update `app.py` and `setup_db.py` where `password=""` is written.*
   
6. Start the Flask Backend API server:
   ```bash
   python app.py
   ```

## Frontend Connection
Make sure the frontend is also running (`npm run dev`) simultaneously on `localhost:5173`.
The frontend makes API calls via HTTP pointing to the backend which runs by default on `http://localhost:5000`.
