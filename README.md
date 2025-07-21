# 🎵 VIBEIN – Mood-Based Music Recommendation Web App

**VIBEIN** is a web app that uses **Natural Language Processing (NLP)** to detect emotions from user input and recommends **personalized music** using the **Spotify Web API**. Whether you're feeling _happy_, _sad_, or just _missing someone_, VIBEIN helps you find the right music to match your mood.

<img src="https://github.com/user-attachments/assets/95297044-32ac-471d-84bb-a234f0e7d5a5" alt="VIBEIN Preview Banner" width="200" height="200" />


---

## ✨ Features

- 🎭 **Mood Detection**: Enter a phrase or sentence, and VIBEIN analyzes the emotion (e.g., happy, sad, angry, relaxed).
- 🎧 **Spotify Integration**: Curated song/playlist recommendations based on your mood using Spotify Web API.
- ▶️ **Song Preview**: Listen to previews directly via embedded Spotify players.
- 💻 **User-Friendly UI**: Clean, dark-themed, modern UI powered by React.js and TailwindCSS.
- ⚙️ **Easy Deployment**: Vercel + Render/Heroku combo ensures fast and reliable hosting.

---

## 🛠️ Tech Stack

<div align="center">

<img src="https://img.shields.io/badge/Frontend-React.js-61DAFB?logo=react&logoColor=white&style=for-the-badge"/>
<img src="https://img.shields.io/badge/UI-TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white&style=for-the-badge"/><br><br/>
<img src="https://img.shields.io/badge/Backend-Node.js-green?logo=node.js&logoColor=white&style=for-the-badge" /><br><br/>
<img src="https://img.shields.io/badge/NLP-HuggingFace-yellow?logo=huggingface&logoColor=white&style=for-the-badge"/><br><br/>
<img src="https://img.shields.io/badge/API-Spotify-1DB954?logo=spotify&logoColor=white&style=for-the-badge"/><br><br/>
<img src="https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel&logoColor=white&style=for-the-badge"/><br><br/>
<img src="https://img.shields.io/badge/Backend_Render-Heroku-purple?logo=heroku&logoColor=white&style=for-the-badge"/><br><br/>

</div>

---

## 🧠 NLP Details

- Uses [HuggingFace Transformers](https://huggingface.co/models) (like `bhadresh-savani/distilbert-base-uncased-emotion`) to extract emotion from free-form text.
- Detected emotions are mapped to appropriate song categories (e.g., **sad → acoustic**, **happy → pop**, **angry → rock**).

---

## 🚀 How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/vishantrathi/VIBEIN.git
cd VIBEIN
