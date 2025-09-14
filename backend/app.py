import os
from flask import Flask, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from pymongo import MongoClient
from datetime import datetime
from flask_cors import CORS
from backend.model_utils import load_face_mask_model, prepare_image, predict_from_image




# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all origins (development only)

# Upload folder
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Create uploads folder if it doesn't exist
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Allowed file extensions
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}


# Load the face mask detection model once
model = load_face_mask_model("backend/models/face_mask_detector.h5")



# MongoDB setup (optional) - set MONGO_URI in .env for logging predictions
MONGO_URI = os.getenv('MONGO_URI')
if MONGO_URI:
    client = MongoClient(MONGO_URI)
    db = client.get_default_database()
    predictions_col = db.get_collection('predictions')
else:
    predictions_col = None

# Helper function to check allowed file types
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# API endpoint for prediction
@app.route('/api/predict', methods=['POST'])
def api_predict():
    print("sarted")
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        # Prepare image and predict
        img_array = prepare_image(filepath, target_size=(224, 224))
        label, prob = predict_from_image(model, img_array)

        # Log to DB if enabled
        if predictions_col:
            predictions_col.insert_one({
                'filename': filename,
                'label': label,
                'probability': float(prob),
                'timestamp': datetime.utcnow()
            })

        return jsonify({'label': label, 'probability': float(prob)})

    return jsonify({'error': 'File type not allowed'}), 400

# Serve frontend
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != '' and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
