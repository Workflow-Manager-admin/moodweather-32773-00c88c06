import React, { useState } from 'react';
import './App.css';

// SVG icon maps for "cool" modern UI
const moodIcons = {
  Happy: (
    <svg className="cool-svg-icon" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="13" fill="#43e8d8" opacity="0.14"/><circle cx="16" cy="16" r="12" stroke="#43e8d8" strokeWidth="2"/><ellipse cx="11.5" cy="14.2" rx="1.7" ry="2" fill="#43e8d8" /><ellipse cx="20.5" cy="14.2" rx="1.7" ry="2" fill="#43e8d8"/><path d="M12.2 18.2c1.25 2 6.35 2 7.6 0" stroke="#43e8d8" strokeWidth="1.6" strokeLinecap="round" /></svg>
  ),
  Sad: (
    <svg className="cool-svg-icon" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="13" fill="#b24bf3" opacity="0.13"/><circle cx="16" cy="16" r="12" stroke="#b24bf3" strokeWidth="2"/><ellipse cx="11.5" cy="14.2" rx="1.7" ry="2" fill="#b24bf3"/><ellipse cx="20.5" cy="14.2" rx="1.7" ry="2" fill="#b24bf3"/><path d="M12.4 21c1.4-2 5.8-2 7.2 0" stroke="#b24bf3" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  Tired: (
    <svg className="cool-svg-icon" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="13" fill="#6068c6" opacity="0.12"/><circle cx="16" cy="16" r="12" stroke="#6068c6" strokeWidth="2"/><path d="M10.5 14c1 .7 2.3.7 3.2 0" stroke="#6068c6" strokeLinecap="round"/><path d="M17.5 14c1 .7 2.3.7 3.2 0" stroke="#6068c6" strokeLinecap="round"/><path d="M12 19.7c1.41 1.14 6.59 1.14 8 0" stroke="#6068c6" strokeWidth="1.4" strokeLinecap="round"/></svg>
  ),
  Anxious: (
    <svg className="cool-svg-icon" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="13" fill="#43e8d8" opacity="0.12"/><circle cx="16" cy="16" r="12" stroke="#43e8d8" strokeWidth="2"/><ellipse cx="11.5" cy="14.2" rx="1.7" ry="2" fill="#43e8d8"/><ellipse cx="20.5" cy="14.2" rx="1.7" ry="2" fill="#43e8d8"/><path d="M13.5 21c2.3-1.9 5.8-1.9 7.1 0" stroke="#43e8d8" strokeWidth="1.3" strokeLinecap="round"/></svg>
  ),
  Excited: (
    <svg className="cool-svg-icon" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="13" fill="#f6aa3a" opacity="0.22"/><circle cx="16" cy="16" r="12" stroke="#f6aa3a" strokeWidth="2"/><ellipse cx="11.5" cy="14.2" rx="1.5" ry="2" fill="#f6aa3a"/><ellipse cx="20.5" cy="14.2" rx="1.5" ry="2" fill="#f6aa3a"/><path d="M12 18c1.6 2.5 6.4 2.5 8 0" stroke="#f6aa3a" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
};

const weatherIcons = {
  Clear: (
    <svg className="cool-svg-icon cool-svg-icon--rotate" viewBox="0 0 38 38"><circle cx="19" cy="19" r="9" fill="#ffe59e" stroke="#ffd200" strokeWidth="2"/><g><line x1="19" y1="4" x2="19" y2="0" stroke="#ffd200" strokeWidth="2"/><line x1="19" y1="34" x2="19" y2="38" stroke="#ffd200" strokeWidth="2"/><line x1="4" y1="19" x2="0" y2="19" stroke="#ffd200" strokeWidth="2"/><line x1="34" y1="19" x2="38" y2="19" stroke="#ffd200" strokeWidth="2"/><line x1="29.1" y1="29.1" x2="31.6" y2="31.6" stroke="#ffd200" strokeWidth="2"/><line x1="8.9" y1="29.1" x2="6.4" y2="31.6" stroke="#ffd200" strokeWidth="2"/><line x1="8.9" y1="8.9" x2="6.4" y2="6.4" stroke="#ffd200" strokeWidth="2"/><line x1="29.1" y1="8.9" x2="31.6" y2="6.4" stroke="#ffd200" strokeWidth="2"/></g></svg>
  ),
  Clouds: (
    <svg className="cool-svg-icon" viewBox="0 0 38 38"><ellipse cx="19" cy="26" rx="12" ry="8" fill="#8cd3fe" /><ellipse cx="26" cy="22" rx="7" ry="5" fill="#b1c7ef" /><ellipse cx="13" cy="23" rx="8" ry="6" fill="#d0d8fc" /></svg>
  ),
  Rain: (
    <svg className="cool-svg-icon" viewBox="0 0 38 38"><ellipse cx="20" cy="27" rx="11" ry="8" fill="#355282"/><ellipse cx="27" cy="21" rx="7" ry="5" fill="#63b1f4"/><ellipse cx="14" cy="22" rx="7" ry="5" fill="#7ec4f8"/><g stroke="#43e8d8" strokeWidth="2" strokeLinecap="round"><line x1="14" y1="29" x2="14" y2="34"/><line x1="20" y1="29" x2="20" y2="37"/><line x1="26" y1="30" x2="26" y2="36"/></g></svg>
  ),
  Snow: (
    <svg className="cool-svg-icon" viewBox="0 0 38 38"><ellipse cx="19" cy="26" rx="12" ry="8" fill="#dbeafe"/><ellipse cx="26" cy="22" rx="7" ry="5" fill="#b3cbe6"/><ellipse cx="13" cy="23" rx="8" ry="6" fill="#e0e9fa"/><g stroke="#b24bf3" strokeWidth="2"><line x1="16" y1="33" x2="22" y2="37"/><line x1="17" y1="37" x2="21" y2="33"/><circle cx="19" cy="36" r="1" fill="#fff"/></g></svg>
  ),
  Thunderstorm: (
    <svg className="cool-svg-icon" viewBox="0 0 38 38"><ellipse cx="20" cy="24" rx="12" ry="7" fill="#3d4457"/><polygon points="18,30 22,30 19,36" fill="#f6aa3a"/><polyline points="23,26 20,30 24,30 21,34" fill="none" stroke="#f6aa3a" strokeWidth="2" /></svg>
  ),
  Drizzle: (
    <svg className="cool-svg-icon" viewBox="0 0 38 38"><ellipse cx="20" cy="25" rx="11" ry="6" fill="#7ec4f8"/><ellipse cx="28" cy="20" rx="5" ry="3.5" fill="#a5c9fa"/><ellipse cx="12" cy="21" rx="6" ry="3.2" fill="#b1d8f5"/><g stroke="#43e8d8" strokeWidth="1.3" strokeLinecap="round"><line x1="14" y1="28" x2="14" y2="32"/><line x1="20" y1="28" x2="20" y2="34"/><line x1="26" y1="29" x2="26" y2="33"/></g></svg>
  )
};

// SVG icons for city and temp
const cityIcon = (
  <svg className="cool-svg-icon" viewBox="0 0 32 32"><rect x="2" y="14" width="8" height="13" fill="#43e8d8" opacity="0.14"/><rect x="2" y="14" width="8" height="13" stroke="#43e8d8" strokeWidth="2" /><rect x="13" y="10" width="7" height="17" fill="#6068c6" opacity="0.12"/><rect x="13" y="10" width="7" height="17" stroke="#6068c6" strokeWidth="2" /><rect x="22" y="7" width="8" height="20" fill="#b24bf3" opacity="0.14"/><rect x="22" y="7" width="8" height="20" stroke="#b24bf3" strokeWidth="2" /></svg>
);

const tempIcon = (
  <svg className="cool-svg-icon" viewBox="0 0 26 26"><rect x="8" y="2" width="7" height="16" rx="3.5" fill="#f1fdff" stroke="#43e8d8" strokeWidth="1.8"/><circle cx="12" cy="21" r="4" fill="#43e8d8" opacity="0.12"/><circle cx="12" cy="21" r="3" stroke="#43e8d8" strokeWidth="1.5" fill="none"/><rect x="11.3" y="4" width="1.3" height="9" fill="#43e8d8"/></svg>
);


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
