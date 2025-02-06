🚀 AI Model for Space Education

This project is an AI-driven application designed to enhance space education by leveraging machine learning models for analysis and prediction. The backend is built using Python with Flask, and the frontend is implemented with basic HTML, CSS, and JavaScript.

🌟 Features

✅ AI model for space-related predictions✅ Video and image carousel for interactive learning✅ Flask backend for API integration✅ Local deployment for testing and development

📁 Project Structure

/astronuts
│── /backend
│   ├── app.py  # Main Flask application
│   ├── requirements.txt  # Dependencies
│   ├── /assets  # Static assets (videos/images)
│── /frontend
│   ├── index.html  # Main HTML file
│   ├── script.js  # JavaScript functions
│   ├── styles.css  # Styling for UI
│── README.md  # Documentation

🛠 Installation

Prerequisites

🐍 Python 3.10 or 3.11 (Recommended)

🔥 Flask

🔗 Git

🌐 A web browser (Chrome, Firefox, Edge, etc.)

Setup Instructions

1️⃣ Clone the Repository:

git clone https://github.com/maknoonisar/AI-model-for-space-education.git
cd AI-model-for-space-education/backend

2️⃣ Create a Virtual Environment:

python -m venv venv
source venv/bin/activate  # On macOS/Linux
venv\Scripts\activate  # On Windows

3️⃣ Install Dependencies:

pip install -r requirements.txt

🚀 Running the Project Locally

Start the Backend

python app.py

This will start the Flask server, which runs on http://127.0.0.1:5000/ by default.

Open the Frontend

Navigate to the frontend folder and open index.html in a browser.

Ensure the video and image assets are correctly referenced in assets/.

🌍 Deployment

For deployment, consider using Flask with Gunicorn on a cloud platform or Docker for containerization. If deploying on Streamlit Community Cloud, ensure the app is structured accordingly.

🛠 Troubleshooting

🔹 Flask does not run? Verify dependencies using:

pip freeze

🔹 Assets do not load? Ensure the paths are correctly configured.

🔹 CORS issues? Install Flask-CORS:

pip install flask-cors

Then, add this to app.py:

from flask_cors import CORS
CORS(app)

🤝 Contributing

Pull requests are welcome! Please open an issue first to discuss any major changes.

📜 License

This project is licensed under the MIT License.

🔥 Happy Coding! 🚀



