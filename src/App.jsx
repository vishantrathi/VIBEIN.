import React, { useState, useEffect } from 'react';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { motion } from 'framer-motion';
import './App.css'

function App() {
  const fullText = "i miss my friend";
  const [typedText, setTypedText] = useState('');
  const [mood, setMood] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(blinkInterval);
  }, []);


  //////////////////////////////////////
  const handleSubmit = async () => {
  setLoading(true);
  setSongs([]);

  try {
    const res = await fetch('http://localhost:5000/api/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mood })  // sending the mood state
    });

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await res.json();
    setSongs(data.songs);  // assuming backend returns { songs: [...] }
  } catch (error) {
    console.error('Error fetching from backend:', error);
  }

  setLoading(false);
};
////////////////////////////////////////////////

  return (
    <div className="App">
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
          />
          {/* {!mood && (
            <div className="placeholder-fake">
              {typedText}
              {cursorVisible && <span className="">|</span>}
            </div>
          )} */}
        </motion.div>

        {loading && <p className="loading-text">Finding your vibe...</p>}

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
              <h4>{song.title}</h4>
              <p>{song.artist}</p>
              <a href={song.url} target="_blank" rel="noreferrer">🎵 Listen</a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default App;
