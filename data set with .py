import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np
import cv2

# Load Pre-trained Plant Disease Detection Model
model = tf.keras.models.load_model('plant_disease_model.h5')

# Load & Process Image
def predict_disease(img_path):
    img = image.load_img(img_path, target_size=(224, 224)) # Resize
    img_array = image.img_to_array(img) / 255.0 # Normalize
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)
    disease_classes = ['Healthy', 'Leaf Blight', 'Bacterial Wilt', 'Cassava Mosaic']
    
    return disease_classes[np.argmax(prediction)]  # Return the highest probability disease

# Test Prediction
img_path = 'infected_leaf.jpg'
predicted_disease = predict_disease(img_path)
print("Detected Disease:", predicted_disease)
