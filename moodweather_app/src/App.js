import React, { useState } from 'react';
import './App.css';

// Emoji/icon maps for cute UI
const moodEmojis = {
  Happy: '😊',
  Sad: '😢',
  Tired: '😴',
  Anxious: '😰',
  Excited: '🤩'
};

const weatherEmojis = {
  Clear: '☀️',
  Clouds: '☁️',
  Rain: '🌧️',
  Snow: '❄️',
  Thunderstorm: '⛈️',
  Drizzle: '🌦️'
};

/**
 * MoodWeather Main Container - EXTENDED
 * - Fetches city weather from OpenWeatherMap API.
 * - Asks user for mood. On fetch, matches mood+weather to a motivational quote, outfit suggestion, and background.
 * - Displays city, temperature, mood, weather, quote, outfit, and sets a suitable background.
 */

// PUBLIC_INTERFACE
function App() {
  const [city, setCity] = useState('');
  const [mood, setMood] = useState('Happy');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Utility: mapping for (mood, weather) => {quote, outfit, bgImage}
  // Adding a few sample combinations for brevity; you can expand as needed
  const moodWeatherMap = {
    'Happy_Clear': {
      quote: "Shine bright! It’s a perfect day to celebrate your joy.",
      outfit: "Sunglasses, light tee, and your favorite sneakers.",
      bg: "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80')"
    },
    'Sad_Rain': {
      quote: "It’s okay to have rainy days. Better weather, and moods, are ahead.",
      outfit: "Cozy hoodie, waterproof boots, bring an umbrella.",
      bg: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80')"
    },
    'Tired_Clouds': {
      quote: "Take it slow and let the clouds be your cover. Rest is progress.",
      outfit: "Comfy joggers and a soft sweater.",
      bg: "url('https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=900&q=80')"
    },
    'Anxious_Clear': {
      quote: "Breathe deep—the sky is clear and so can be your mind.",
      outfit: "Loose shirt and relaxed pants for easy comfort.",
      bg: "url('https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80')"
    },
    'Excited_Snow': {
      quote: "Let your excitement sparkle like fresh snow!",
      outfit: "Warm beanie, gloves, and a fun scarf.",
      bg: "url('https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80')"
    },
    'Happy_Clouds': {
      quote: "Clouds can’t block your happiness. Spread smiles everywhere.",
      outfit: "Colorful clothes and a light jacket.",
      bg: "url('https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=900&q=80')"
    },
    'Sad_Clear': {
      quote: "Even the clearest sky feels heavy sometimes. Be gentle with yourself.",
      outfit: "Soft cardigan and your coziest jeans.",
      bg: "url('https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80')"
    },
    // Catch-all fallback
    'default': {
      quote: "Whatever the weather and mood, you are doing your best!",
      outfit: "Pick whatever makes you feel good today.",
      bg: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80')"
    }
  };

  // Map OpenWeatherMap's 'weather[0].main' to our simple keys.
  const normalizeWeather = (main) => {
    // Typical values: "Clear", "Clouds", "Rain", "Snow", "Drizzle", "Thunderstorm", etc.
    if (main === "Clear") return "Clear";
    if (main === "Clouds") return "Clouds";
    if (main === "Rain" || main === "Drizzle" || main === "Thunderstorm") return "Rain";
    if (main === "Snow") return "Snow";
    return "Clouds";
  };

  // Fetches real OpenWeatherMap API.
  const handleFetchWeather = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setWeatherData(null);

    // For demo: You must insert your API key below from https://openweathermap.org/api
    const apiKey = '7b7c85836bda41485369c43acbf566cf';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('City not found or weather service unavailable.');
      }
      const data = await response.json();
      const extractedWeather = {
        city: data.name,
        temp: Math.round(data.main.temp) + "°C",
        main: data.weather[0].main,
        description: data.weather[0].description
      };
      setWeatherData(extractedWeather);
    } catch (err) {
      setError(err.message || "An error occurred while fetching the weather.");
    }
    setLoading(false);
  };

  // Get mapping for mood+weather
  let mwConfig = null, bgStyle = {};
  if (weatherData) {
    const normalizedWeather = normalizeWeather(weatherData.main);
    const mapKey = `${mood}_${normalizedWeather}`;
    mwConfig = moodWeatherMap[mapKey] || moodWeatherMap['default'];
    bgStyle = {
      backgroundImage: mwConfig.bg,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderRadius: '18px',
      boxShadow: '0 2px 8px 0 rgba(52,152,219,0.18)'
    };
  }

  return (
    <div className="app" style={weatherData && bgStyle ? { backgroundImage: mwConfig.bg, transition: 'background-image 0.8s' } : {}}>
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
                  letterSpacing: '0.03em'
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
              autoFocus
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
            {weatherData && (
              <div className="mw-weather-card" style={bgStyle}>
                <div className="mw-weather-main">{weatherData.city}</div>
                <div className="mw-weather-temp">{weatherData.temp}</div>
                <div className="mw-weather-desc">{weatherData.description} <span style={{fontWeight:'600'}}>({weatherData.main})</span></div>
                <div className="mw-weather-mood">
                  <span className="mw-mood-title">Your mood:</span> <span className="mw-mood-value">{mood}</span>
                </div>
                <div style={{ marginTop: 12, color: "#fffbe8" }}>
                  <strong>Motivation:</strong><br />
                  <span style={{ fontSize: '1.07rem' }}>{mwConfig.quote}</span>
                </div>
                <div style={{ marginTop: 6, color: "#f1c40f" }}>
                  <strong>Outfit Suggestion:</strong> {mwConfig.outfit}
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
