import React, { useState } from 'react';
import './App.css';

/**
 * MoodWeather Main Container
 * Vertical stack: city input, mood dropdown, fetch button, results area.
 * Brand colors: primary (#3498db), secondary (#2ecc71), accent (#f1c40f).
 */
// PUBLIC_INTERFACE
function App() {
  const [city, setCity] = useState('');
  const [mood, setMood] = useState('Happy');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // No fetch implemented yet, just placeholder for fetch.
  const handleFetchWeather = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setWeather(null);
    // Placeholder for future API integration
    setTimeout(() => {
      setWeather({
        main: "Cloudy",
        temp: "21°C",
        description: "Overcast clouds"
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="container" style={{ paddingLeft: 0, paddingRight: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> MoodWeather
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span
                style={{
                  color: 'var(--brand-primary)',
                  fontWeight: 500,
                  fontSize: '1rem',
                  letterSpacing: '0.03em',
                }}
              >
                Powered by KAVIA AI
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="container mw-vertical">
          <form className="mw-form" onSubmit={handleFetchWeather} autoComplete="off">
            <label className="mw-label" htmlFor="city-input">Your City</label>
            <input
              className="mw-input"
              id="city-input"
              type="text"
              placeholder="Enter city (e.g. London)"
              value={city}
              onChange={e => setCity(e.target.value)}
              required
            />

            <label className="mw-label" htmlFor="mood-select">Your Mood</label>
            <select
              className="mw-dropdown"
              id="mood-select"
              value={mood}
              onChange={e => setMood(e.target.value)}
              required
            >
              <option>Happy</option>
              <option>Sad</option>
              <option>Tired</option>
              <option>Anxious</option>
              <option>Excited</option>
            </select>

            <button
              className="btn btn-large mw-btn"
              type="submit"
              disabled={loading}
              style={{ marginTop: 8 }}
            >
              {loading ? "Fetching..." : "Get Weather"}
            </button>
          </form>

          <div className="mw-results">
            {error && <div className="mw-error">{error}</div>}
            {weather && (
              <div className="mw-weather-card">
                <div className="mw-weather-main">{weather.main}</div>
                <div className="mw-weather-temp">{weather.temp}</div>
                <div className="mw-weather-desc">{weather.description}</div>
                <div className="mw-weather-mood">
                  <span className="mw-mood-title">Your mood:</span> <span className="mw-mood-value">{mood}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;