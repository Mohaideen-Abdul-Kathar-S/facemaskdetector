import numpy as np
from tensorflow.keras.models import load_model as keras_load_model
from tensorflow.keras.preprocessing import image

_model = None  # cache for model


def load_face_mask_model(model_path):
    """Load the Keras model only once."""
    global _model
    if _model is None:
        _model = keras_load_model(model_path)
    return _model


def prepare_image(img_path, target_size=(224, 224)):
    """Load and preprocess image for model prediction."""
    img = image.load_img(img_path, target_size=target_size)
    x = image.img_to_array(img)
    x = x / 255.0
    x = np.expand_dims(x, axis=0)
    return x


def predict_from_image(model, img_array):
    """Predict mask presence from image array."""
    pred = model.predict(img_array)[0]

    # Case: single output sigmoid
    if pred.shape == () or len(pred) == 1:
        prob = float(pred[0]) if hasattr(pred, '__len__') else float(pred)
        label = 'With Mask' if prob < 0.5 else 'Without Mask'
        return label, prob

    # Case: 2-class softmax
    if len(pred) == 2:
        prob_with_mask = float(pred[1])
        label = 'With Mask' if prob_with_mask < 0.5 else 'Without Mask'
        return label, prob_with_mask

    # Fallback
    prob = float(pred[0])
    label = 'With Mask' if prob < 0.5 else 'Without Mask'
    return label, prob
