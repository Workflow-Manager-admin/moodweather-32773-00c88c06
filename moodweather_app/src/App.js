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

function App() {
  const [city, setCity] = useState('');
  const [mood, setMood] = useState('Happy');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Utility: mapping for (mood, weather) => {quote, outfit, bgImage}
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
    'default': {
      quote: "Whatever the weather and mood, you are doing your best!",
      outfit: "Pick whatever makes you feel good today.",
      bg: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80')"
    }
  };

  // Map OpenWeatherMap's 'weather[0].main' to our keys.
  const normalizeWeather = (main) => {
    if (main === "Clear") return "Clear";
    if (main === "Clouds") return "Clouds";
    if (main === "Rain" || main === "Drizzle" || main === "Thunderstorm") return "Rain";
    if (main === "Snow") return "Snow";
    return "Clouds";
  };

  // Fetch OpenWeatherMap API.
  const handleFetchWeather = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setWeatherData(null);

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

  // UI background overlay and result card config
  let mwConfig = null, bgStyle = {};
  if (weatherData) {
    const normalizedWeather = normalizeWeather(weatherData.main);
    const mapKey = `${mood}_${normalizedWeather}`;
    mwConfig = moodWeatherMap[mapKey] || moodWeatherMap['default'];
    bgStyle = {
      backgroundImage: 'linear-gradient(rgba(255,255,255,.40), rgba(252,249,245,.32)), ' + mwConfig.bg,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderRadius: '28px',
      boxShadow: '0 4px 32px 0 rgba(236, 181, 254, 0.18)'
    };
  }

  // Playful heading font for branding
  const logoFontStyle = {
    fontFamily: "'Fredoka', 'Comic Sans MS', 'Quicksand', 'Inter', cursive, sans-serif",
    fontSize: "1.45rem",
    fontWeight: 700,
    letterSpacing: "0.02em",
    color: "#df67fc",
    textShadow: "0 2px 12px #e0cbe680, 0 1px 0 #fff"
  };

  // General font family override for fun/script
  const playfulFont = { fontFamily: "'Fredoka', 'Quicksand', 'Comic Sans MS', 'Inter', cursive, sans-serif" };

  return (
    <div className="app cute-app-bg" style={weatherData && bgStyle ? { backgroundImage: mwConfig.bg, transition: 'background-image 0.8s' } : {}}>
      {/* App Bar */}
      <nav className="navbar cute-navbar" style={playfulFont}>
        <div className="container" style={{ paddingLeft: 0, paddingRight: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo" style={logoFontStyle}>
              <span className="logo-symbol" style={{fontSize: "1.7em", marginRight: 6, color: "#df67fc"}}>🌈</span> MoodWeather
              <span style={{fontSize: "1.1em", marginLeft: "3px"}} role="img" aria-label="Smile">✨</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span
                className="cute-powered"
                style={{
                  color: '#ff9a76',
                  fontWeight: 600,
                  fontSize: '1.02rem',
                  background: 'rgba(241,196,15,.07)',
                  borderRadius: 10,
                  padding: '4px 11px',
                  ...playfulFont
                }}
              >
                Powered by <span style={{ color: '#e87a41', fontWeight: 700 }}>KAVIA AI</span>
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content form */}
      <main>
        <div className="container mw-vertical">
          <form className="mw-form cute-form" onSubmit={handleFetchWeather} autoComplete="off" style={playfulFont}>
            <label className="mw-label cute-label" htmlFor="city-input">
              <span role="img" aria-label="city" className="emoji-label">🏙️</span> &nbsp;Your City
            </label>
            <input
              className="mw-input cute-input"
              id="city-input"
              type="text"
              placeholder="Enter city (e.g. London)"
              value={city}
              onChange={e => setCity(e.target.value)}
              required
              autoFocus
              style={playfulFont}
            />

            <label className="mw-label cute-label" htmlFor="mood-select">
              <span role="img" aria-label="mood" className="emoji-label">💖</span> &nbsp;Your Mood
            </label>
            <select
              className="mw-dropdown cute-dropdown"
              id="mood-select"
              value={mood}
              onChange={e => setMood(e.target.value)}
              required
              style={playfulFont}
            >
              <option>Happy</option>
              <option>Sad</option>
              <option>Tired</option>
              <option>Anxious</option>
              <option>Excited</option>
            </select>

            <button
              className="btn btn-large mw-btn cute-btn"
              type="submit"
              disabled={loading}
              style={{ marginTop: 8, ...playfulFont }}
            >
              {loading ? <span>🌧️ Fetching...</span> : <span>🌦️ Get Weather</span>}
            </button>
          </form>

          {/* Result Card */}
          <div className="mw-results">
            {error && <div className="mw-error cute-error">{error}</div>}
            {weatherData && (
              <div className="mw-weather-card cute-weather-card stylish-weather-card" style={bgStyle}>
                <div className="weather-card-header">
                  <div className="mw-weather-main cute-city">
                    <span style={{ fontSize: "2.1rem", marginRight: "7px" }}>
                      {weatherEmojis[normalizeWeather(weatherData.main)] || '🌈'}
                    </span>
                    {weatherData.city}
                  </div>
                  <div className="mw-weather-temp cute-temp">
                    <span role="img" aria-label="temperature" style={{marginRight: 8, fontSize: "1.5rem"}}>🌡️</span>
                    {weatherData.temp}
                  </div>
                </div>
                <div className="mw-weather-desc cute-weather-desc">
                  <span>{weatherData.description}</span>
                  {" "}
                  <span style={{fontWeight:'700', fontSize: "1.08em"}}>
                    ({weatherEmojis[normalizeWeather(weatherData.main)] || weatherData.main})
                  </span>
                </div>
                <div className="mw-weather-mood cute-weather-mood">
                  <span className="mw-mood-title">
                    <span role="img" aria-label={mood}>{moodEmojis[mood]}</span>
                    &nbsp;Your mood:
                  </span>
                  <span className="mw-mood-value" style={{marginLeft: 7}}>
                    {mood}
                  </span>
                </div>
                <div className="cute-motivation weather-card-quote">
                  <span role="img" aria-label="inspiration" style={{fontSize:"1.25em", marginRight: 6}}>✨</span>
                  <span style={{ fontSize: '1.07rem' }}>{mwConfig.quote}</span>
                </div>
                <div className="cute-outfit weather-card-outfit">
                  <span role="img" aria-label="outfit" style={{marginRight: "2px"}}>🧃👗</span>
                  Outfit Suggestion: <span>{mwConfig.outfit}</span>
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
