# AI Model for Space Education

This project is an AI-driven application designed to enhance space education by leveraging machine learning models for analysis and prediction. The backend is built using Python with Flask, and the frontend is implemented with basic HTML, CSS, and JavaScript.

## Features

- ✅ AI model for space-related predictions
- ✅ Video and image carousel for interactive learning
- ✅ Flask backend for API integration
- ✅ Local deployment for testing and development

## Project Structure

/astronuts
│── /backend 
│ ├── app.py # Main Flask application 
│ ├── requirements.txt # Dependencies  
│── /frontend
│ ├── index.html # Main HTML file 
│ ├── script.js # JavaScript functions 
│ ├── styles.css # Styling for UI 
│ ├── /assets # Static assets (videos/images)
│── README.md # Documentation

markdown
Copy
Edit

## Installation

### Prerequisites

- 🐍 Python 3.10 or 3.11 (Recommended)
- 🔥 Flask
- 🔗 Git
- 🌐 A web browser (Chrome, Firefox, Edge, etc.)

### Setup Instructions

🔹 Setup Instructions
1️⃣ Clone the Repository:
sh
Copy
Edit
git clone https://github.com/maknoonisar/AI-model-for-space-education.git
cd AI-model-for-space-education/backend
2️⃣ Create a Virtual Environment:
sh
Copy
Edit
python -m venv venv
source venv/bin/activate  # On macOS/Linux
venv\Scripts\activate     # On Windows
3️⃣ Install Dependencies:
sh
Copy
Edit
pip install -r requirements.txt
🚀 Running the Project Locally
🔹 Start the Backend
sh
Copy
Edit
python app.py
This will start the Flask server on http://127.0.0.1:5000/ by default.

🔹 Open the Frontend
Navigate to the frontend/ folder and open index.html in a browser.
Ensure video and image assets are correctly referenced in /assets/.
🌍 Deployment
For deployment, consider using:

Flask with Gunicorn on a cloud platform
Docker for containerization
Heroku or AWS for production hosting
🔧 Troubleshooting
✅ If Flask does not run:
sh
Copy
Edit
pip freeze  # Check installed dependencies
✅ If assets do not load:
Ensure the paths are correctly configured in index.html.
✅ If encountering CORS issues, install Flask-CORS:
sh
Copy
Edit
pip install flask-cors
Then, add this in app.py:

python
Copy
Edit
from flask_cors import CORS
CORS(app)
👥 Contributing
Pull requests are welcome! Please open an issue first to discuss any major changes.

📜 License
This project is licensed under the MIT License.


