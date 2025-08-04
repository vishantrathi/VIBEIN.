# 🎧 VIBIN — Mood-Based Music Recommender

VIBIN is a sleek, aesthetic web app that lets users express how they feel — and instantly discover music that matches their emotional vibe. Powered by a custom-built React frontend and a Flask backend that integrates with the Spotify API, VIBIN is all about turning mood into music.

---

## 🔥 Features

* 🎨 Typing-animated UI with blinking red cursor
* 🌈 Aesthetic dark blue gradient interface
* 🧠 Mood detection using NLP (TextBlob)
* 🎵 Real-time music suggestions from Spotify based on mood
* 🎧 Animated song cards with links to Spotify/YouTube
* 🔁 Fully working API backend (Flask)
* 💡 Loading states and error handling

---

## 🚀 Tech Stack

| Layer     | Tech                                |
| --------- | ----------------------------------- |
| Frontend  | React + Framer Motion + TailwindCSS |
| Backend   | Flask + Flask-CORS                  |
| NLP       | TextBlob (sentiment analysis)       |
| Music API | Spotify Recommendations API         |

---

## 🖥️ Local Setup Instructions

### 🔹 1. Clone the Repository

```bash
git clone https://github.com/vishantrathi/vibein.
cd vibein
```

### 🔹 2. Set Up the Frontend

```bash
cd frontend
npm install
npm install framer-motion
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Update your `tailwind.config.js` and `index.css` as needed (see Tailwind docs).

```bash
npm run dev
```

### 🔹 3. Set Up the Backend

```bash
cd ../backend
pip install flask flask-cors textblob
python -m textblob.download_corpora
python app.py
```

Backend will run at `http://localhost:5000`

---

## ⚙️ How It Works

1. User enters a mood (e.g., "I miss my friend")
2. React sends this input to Flask backend
3. Flask analyzes sentiment using NLP (TextBlob)
4. Maps sentiment to a genre (e.g., sad → sad)
5. Calls Spotify API with that genre
6. Sends back list of song cards to frontend

---

## 📡 Spotify API Credentials

Register your app at: [https://developer.spotify.com](https://developer.spotify.com)

Create a `.env` file in backend:

```env
SPOTIFY_CLIENT_ID=your_id
SPOTIFY_CLIENT_SECRET=your_secret
```

The backend uses these credentials to authenticate via Client Credentials Flow.

---

## 📸 UI Preview

<img width="1916" height="909" alt="image" src="https://github.com/user-attachments/assets/ce3afb87-03bf-4b03-807c-919f2673ac1c" />


* Bold heading: "Hey Lightblue"
* Subtext: "Let’s turn your mood into music."
* Typing effect in input placeholder
* Blinking red cursor
* Fade-in animated cards for music suggestions

---

## ✨ Upcoming Features


* ☁️ Deploy to Vercel (Frontend) & Render (Backend)

---

## 📄 License

MIT License — Free to use and modify.

---

## 👋 Author

Built with ❤️. Feel free to contribute or fork!
