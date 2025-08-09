import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './App.css';

function App() {
  const fullText = "";
  const [typedText, setTypedText] = useState('');
  const [mood, setMood] = useState('');
  const [emotion, setEmotion] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPreview, setCurrentPreview] = useState(null);
  const audioRef = useRef(null);

  // Typing animation effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText((prev) => {
        if (index < fullText.length) {
          const next = prev + fullText[index];
          index++;
          return next;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Cursor blink effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(blinkInterval);
  }, []);

  // Fetch emotion + songs from backend
  const handleSubmit = async () => {
    setLoading(true);
    setSongs([]);
    setEmotion('');

    try {
      const res = await fetch('http://localhost:5000/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: mood })
      });

      if (!res.ok) throw new Error('Backend error');

      const data = await res.json();
      setEmotion(data.emotion);
      setSongs(data.songs);

    } catch (err) {
      console.error('Error:', err);
    }

    setLoading(false);
  };

  // Play/Pause preview
  const togglePlay = (url) => {
    if (currentPreview === url) {
      audioRef.current.pause();
      setCurrentPreview(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(url);
      audioRef.current.play();
      setCurrentPreview(url);
    }
  };

  return (
    <div className="App" style={{ overflowY: 'auto', maxHeight: '100vh' }}>
      <nav className="nav">
        <div className="logo">VIBIN.</div>
        <div className="links">
          <a href="#">Home</a>
          <a href="#">About</a>
        </div>
      </nav>

      <div className="main">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Hey <span className="highlight">Lightblue</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          Let's turn your mood into music
        </motion.p>

        <motion.div
          className="input-wrapper"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
        >
          <input
            type="text"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            className="styled-input"
            placeholder="Type how you feel..."
          />
          {!mood && (
            <div className="placeholder-fake">
              {typedText}
              {cursorVisible && <span className="blinking-cursor">|</span>}
            </div>
          )}
        </motion.div>

        {/* Emotion Display */}
        {emotion && (
          <p className="emotion-detected">
            Detected Emotion: <strong>{emotion.toUpperCase()}</strong>
          </p>
        )}

        {/* Loading Indicator */}
        {loading && <p className="loading-text">Finding your vibe...</p>}

        {/* Songs */}
        <motion.div
          className="song-list"
          initial={{ opacity: 0 }}
          animate={{ opacity: songs.length ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {songs.map((song, index) => (
            <motion.div
              key={index}
              className="song-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <img src={song.album_image} alt="album" className="album-art" />
              <h4>{song.title}</h4>
              <p>{song.artist}</p>

              {song.preview_url ? (
  <button onClick={() => togglePlay(song.preview_url)}>
    {currentPreview === song.preview_url ? "⏸ Pause" : "▶️ Play"}
  </button>
) : (
  <button disabled>Preview Unavailable</button>
)}
*

              <a href={song.external_url} target="_blank" rel="noreferrer">
                🎵 Listen on Spotify
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default App;
