// Lappeenranta coordinates (demo site)
const LAT = 61.06, LON = 28.19;

window.WEATHER_LABELS = {
  0: 'Clear sky', 1: 'Mostly clear', 2: 'Partly cloudy', 3: 'Overcast',
  45: 'Fog', 48: 'Fog', 51: 'Light drizzle', 53: 'Drizzle', 55: 'Heavy drizzle',
  61: 'Light rain', 63: 'Rain', 65: 'Heavy rain', 71: 'Light snow', 73: 'Snow', 75: 'Heavy snow',
  77: 'Snow grains', 80: 'Rain showers', 81: 'Rain showers', 82: 'Violent showers',
  85: 'Snow showers', 86: 'Snow showers', 95: 'Thunderstorm', 96: 'Thunderstorm', 99: 'Thunderstorm'
};

function iconKind(code) {
  if (code === 0 || code === 1) return 'sun';
  if (code === 2 || code === 3) return 'cloud';
  if ([45, 48].includes(code)) return 'fog';
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return 'rain';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'snow';
  if ([95, 96, 99].includes(code)) return 'storm';
  return 'cloud';
}

window.weatherKind = iconKind;

window.fetchWeather = async function () {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code&hourly=visibility&timezone=auto&_=${Date.now()}`;
    const res = await fetch(url, { signal: controller.signal, cache: 'no-store' });
    clearTimeout(timeout);
    if (!res.ok) throw new Error('bad response');
    const data = await res.json();
    const cur = data.current;
    let visibilityKm = null;
    if (data.hourly && data.hourly.time && data.hourly.visibility) {
      const idx = data.hourly.time.indexOf(cur.time.slice(0, 13) + ':00');
      if (idx !== -1) visibilityKm = Math.round((data.hourly.visibility[idx] / 1000) * 10) / 10;
    }
    return {
      ok: true,
      temp: Math.round(cur.temperature_2m * 10) / 10,
      feelsLike: Math.round(cur.apparent_temperature * 10) / 10,
      humidity: Math.round(cur.relative_humidity_2m),
      visibility: visibilityKm,
      windSpeed: Math.round(cur.wind_speed_10m * 10) / 10,
      code: cur.weather_code,
      label: window.WEATHER_LABELS[cur.weather_code] || 'Unsettled',
      kind: iconKind(cur.weather_code),
      updated: new Date()
    };
  } catch (e) {
    return { ok: false, temp: null, feelsLike: null, humidity: null, visibility: null, windSpeed: null, code: null, label: 'Weather unavailable \u2014 tap to retry', kind: 'cloud', updated: new Date() };
  }
};
