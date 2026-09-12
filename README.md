<div align="center">

# 🧠 NLP Emotion Classification using BiGRU

### Deep Learning • NLP • FastAPI • REST API • Render

<p>
  <a href="https://nlp-emotion-classification-bigru-fastapi.onrender.com">
    <img src="https://img.shields.io/badge/Live%20Demo-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Live Demo">
  </a>
  <a href="https://github.com/PavanIllal/NLP-Emotion-Classification-BiGRU-FastAPI">
    <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github" alt="GitHub Repository">
  </a>
  <a href="https://huggingface.co/datasets/dair-ai/emotion">
    <img src="https://img.shields.io/badge/Dataset-Hugging%20Face-FFD21F?style=for-the-badge&logo=huggingface&logoColor=black" alt="Dataset">
  </a>
</p>

<p>
A deep learning NLP application that classifies text into one of six emotions using a Bidirectional GRU model and exposes the trained model through a FastAPI REST API.
</p>

</div>

---

## 🚀 Live Application

### 🌐 Web Application

**Live URL:**
https://nlp-emotion-classification-bigru-fastapi.onrender.com

### 📚 FastAPI Swagger Documentation

**API Documentation:**
https://nlp-emotion-classification-bigru-fastapi.onrender.com/docs

### 💻 GitHub Repository

https://github.com/PavanIllal/NLP-Emotion-Classification-BiGRU-FastAPI

---

## 📌 Project Overview

This project is an end-to-end **Natural Language Processing (NLP) emotion classification system**.

The application accepts a text sentence from the user and predicts one of six emotions:

* 😢 Sadness
* 😄 Joy
* ❤️ Love
* 😠 Anger
* 😨 Fear
* 😲 Surprise

The project uses a **Bidirectional Gated Recurrent Unit (BiGRU)** neural network for text classification.

The trained model is integrated with **FastAPI** and deployed as a live web application using **Render**.

---

## 🎯 Project Objectives

The main objectives of this project are:

* Build an NLP text classification model.
* Convert text into numerical sequences using a tokenizer.
* Train a Bidirectional GRU deep learning model.
* Classify text into six different emotions.
* Save the trained model and tokenizer as reusable artifacts.
* Build a REST API using FastAPI.
* Create a simple web interface for predictions.
* Deploy the application to Render.
* Provide prediction probabilities for all emotion classes.

---

## 📊 Dataset

The project uses the **DAIR.AI Emotion Dataset** available on Hugging Face.

🔗 **Dataset:**
https://huggingface.co/datasets/dair-ai/emotion

The dataset contains English text messages labeled with six basic emotions:

| Label | Emotion  |
| ----: | -------- |
|     0 | Sadness  |
|     1 | Joy      |
|     2 | Love     |
|     3 | Anger    |
|     4 | Fear     |
|     5 | Surprise |

The standard dataset configuration contains **20,000 examples**:

| Split      | Samples |
| ---------- | ------: |
| Training   |  16,000 |
| Validation |   2,000 |
| Test       |   2,000 |

The dataset card describes it as an English emotion-classification dataset with six classes.

---

## 🧠 Model Architecture

The project uses a **Bidirectional GRU (BiGRU)** architecture.

### Processing Pipeline

```text
Raw Text
   ↓
Tokenizer
   ↓
Integer Sequences
   ↓
Padding
   ↓
Embedding
   ↓
Bidirectional GRU
   ↓
Dense / Output Layer
   ↓
Softmax Probabilities
   ↓
Predicted Emotion
```

### Why BiGRU?

A Bidirectional GRU processes the sequence in both directions.

```text
Forward GRU
     ↓
Text Sequence
     ↓
Backward GRU
     ↓
Combined Representation
```

This allows the model to capture contextual information from both earlier and later words in a sentence.

---

## 🔄 Text Processing

The trained tokenizer converts the input text into numerical sequences.

For example:

```text
Input:
"I feel so happy today"

        ↓

Tokenizer

        ↓

[12, 45, 7, 89, 23]
```

The sequence is then padded to a fixed length before being passed to the BiGRU model.

### Maximum Sequence Length

```text
50
```

Padding is performed using:

```python
padding="post"
truncating="post"
```

---

## 🔮 Prediction Output

The API returns:

* Original input text
* Predicted emotion
* Prediction confidence
* Probability for every emotion class

### Example

```json
{
  "text": "I feel in love with you",
  "predicted_emotion": "love",
  "confidence": 0.5303,
  "all_probabilities": {
    "sadness": 0.0175,
    "joy": 0.1457,
    "love": 0.5303,
    "anger": 0.0067,
    "fear": 0.2772,
    "surprise": 0.0226
  }
}
```

---

## 🖥️ Application Interface

The project includes a simple web interface built using:

* HTML
* CSS
* JavaScript

The frontend communicates with the FastAPI backend and displays the predicted emotion and confidence.

### Screenshots

Project screenshots are available in the:

```text
screenshot/
```

folder.

---

## 🔌 API Endpoints

### `GET /`

Returns the web application interface.

```text
GET /
```

---

### `GET /health`

Checks whether the API server and model are running.

```text
GET /health
```

Example response:

```json
{
  "status": "Server is running",
  "model_loaded": true
}
```

---

### `POST /predict`

Predicts the emotion of the supplied text.

```text
POST /predict
```

### Request

```json
{
  "text": "I feel extremely happy today"
}
```

### Response

```json
{
  "text": "I feel extremely happy today",
  "predicted_emotion": "joy",
  "confidence": 0.95,
  "all_probabilities": {
    "sadness": 0.01,
    "joy": 0.95,
    "love": 0.01,
    "anger": 0.01,
    "fear": 0.01,
    "surprise": 0.01
  }
}
```

---

## 📁 Project Structure

```text
NLP-Emotion-Classification-BiGRU-FastAPI/
│
├── Artifacts/
│   ├── BiGRU_Model.keras
│   └── tokenizer.pkl
│
├── static/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── screenshot/
│   └── project screenshots
│
├── Emotion_Prediction.ipynb
├── main.py
├── requirements.txt
├── runtime.txt
├── train.txt
├── .gitignore
└── README.md
```

---

## 🛠️ Technologies Used

| Technology   | Purpose                         |
| ------------ | ------------------------------- |
| Python       | Programming language            |
| TensorFlow   | Deep learning framework         |
| Keras        | Neural network development      |
| BiGRU        | NLP classification model        |
| NumPy        | Numerical operations            |
| Pandas       | Data processing                 |
| FastAPI      | REST API                        |
| Uvicorn      | ASGI server                     |
| Pydantic     | API request/response validation |
| HTML         | Frontend structure              |
| CSS          | Frontend styling                |
| JavaScript   | Frontend interaction            |
| Render       | Cloud deployment                |
| Hugging Face | Dataset                         |

---

## 📦 Model Artifacts

The trained model and tokenizer are stored inside the `Artifacts` directory.

```text
Artifacts/
├── BiGRU_Model.keras
└── tokenizer.pkl
```

### `BiGRU_Model.keras`

Contains the trained Bidirectional GRU deep learning model.

### `tokenizer.pkl`

Contains the tokenizer used during model training to convert text into numerical sequences.

Using the same tokenizer during inference is important because the model expects the same vocabulary-to-index mapping used during training.

---

## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/PavanIllal/NLP-Emotion-Classification-BiGRU-FastAPI.git
```

### 2. Navigate to the project

```bash
cd NLP-Emotion-Classification-BiGRU-FastAPI
```

### 3. Create a virtual environment

```bash
python -m venv venv
```

### 4. Activate the environment

Windows:

```powershell
venv\Scripts\activate
```

### 5. Install dependencies

```bash
pip install -r requirements.txt
```

### 6. Start the FastAPI server

```bash
uvicorn main:app --reload
```

### 7. Open the application

```text
http://127.0.0.1:8000
```

### Swagger API Documentation

```text
http://127.0.0.1:8000/docs
```

---

## ☁️ Deployment

The application is deployed on **Render**.

### Python Version

```text
3.13.11
```

### Build Command

```bash
pip install -r requirements.txt
```

### Start Command

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

### Production URL

https://nlp-emotion-classification-bigru-fastapi.onrender.com

---

## 🧪 Testing

The API was tested using the FastAPI Swagger interface.

Example test sentences include:

```text
I feel so alone and hopeless today.
```

```text
I am furious that they cancelled the trip at the last minute.
```

```text
I feel terrified when walking down dark alleyways alone.
```

```text
I was shocked and completely surprised by the unexpected gift!
```

The API returns the predicted emotion together with the confidence score and complete probability distribution.

---

## ⚠️ Limitations

This project is intended as an **NLP learning and portfolio project**.

The model's prediction depends on the language patterns learned from the training data. Different ways of expressing the same emotion may sometimes produce different predictions.

For example, semantically similar sentences can receive different probability distributions depending on the words and context used.

Therefore, the model should not be considered a perfect emotion detector or a system for making high-stakes psychological decisions.

---
## 🖥️ Application Screenshots

<div align="center">

<img src="screenshot/home.png" width="800">

<br><br>

<img src="screenshot/prediction.png" width="800">

<br><br>

<img src="screenshot/swagger.png" width="800">

</div>

---
## 📚 Dataset Reference

This project uses the **DAIR.AI Emotion Dataset**.

**Dataset:**
https://huggingface.co/datasets/dair-ai/emotion

The dataset card states that it contains six basic emotions: anger, fear, joy, love, sadness, and surprise, and provides the associated label mapping.

---

## 👨‍💻 Author

**Pavan Illal**

B.E. Computer Science & Engineering

### 🔗 Links

* **GitHub:** https://github.com/PavanIllal
* **Project Repository:** https://github.com/PavanIllal/NLP-Emotion-Classification-BiGRU-FastAPI
* **Live Application:** https://nlp-emotion-classification-bigru-fastapi.onrender.com

---

<div align="center">

### ⭐ If you find this project useful, consider giving the repository a star!

**Built with Python • TensorFlow • Keras • FastAPI • NLP • BiGRU**

</div>
