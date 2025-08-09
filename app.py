from flask import Flask, request, jsonify
from flask_cors import CORS
from nrclex import NRCLex
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import random
import nltk
nltk.download('punkt')


app = Flask(__name__)
CORS(app)

# 🔑 Replace these with your real Spotify API credentials
SPOTIFY_CLIENT_ID = "Put your id here"
SPOTIFY_CLIENT_SECRET = "Put your client secret here"

# Spotify Authentication
sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(
    client_id=SPOTIFY_CLIENT_ID,
    client_secret=SPOTIFY_CLIENT_SECRET
))

# Emotion to keyword mapping for Spotify search
emotion_keywords = {
    'joy': ['happy', 'celebration', 'party'],
    'sadness': ['sad', 'alone', 'melancholy'],
    'anger': ['angry', 'rage', 'revenge'],
    'fear': ['fear', 'dark', 'nervous'],
    'trust': ['loyalty', 'love', 'faith'],
    'anticipation': ['hopeful', 'waiting', 'upbeat'],
    'disgust': ['breakup', 'betrayal'],
    'surprise': ['unexpected', 'magic', 'mystery']
}

def detect_emotion(text):
    emo = NRCLex(text)
    top = emo.top_emotions
    return top[0][0] if top else 'joy'  # default to joy if no dominant emotion

def get_spotify_tracks(keyword):
    results = sp.search(q=keyword, type='track', limit=8)
    songs = []
    for item in results['tracks']['items']:
        songs.append({
            "title": item['name'],
            "artist": item['artists'][0]['name'],
            "album_image": item['album']['images'][0]['url'] if item['album']['images'] else None,
            "preview_url": item['preview_url'],
            "external_url": item['external_urls']['spotify']
        })
    return songs

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    user_text = data.get("text", "")
    
    if not user_text:
        return jsonify({"error": "Text is required"}), 400

    emotion = detect_emotion(user_text)
    keywords = emotion_keywords.get(emotion, ['music'])
    keyword = random.choice(keywords)

    songs = get_spotify_tracks(keyword)
    return jsonify({"emotion": emotion, "songs": songs})

if __name__ == "__main__":
    app.run(debug=True)
