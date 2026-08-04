function Bead({ color }) {
  return <span className={"bead-chip bead-" + color}></span>;
}

function WeatherIcon({ kind }) {
  const parts = {
    sun: <><circle cx="32" cy="32" r="12" fill="var(--power)" stroke="var(--ink)" strokeWidth="1.4"/><g stroke="var(--power)" strokeWidth="2.4" strokeLinecap="round"><line x1="32" y1="8" x2="32" y2="16"/><line x1="32" y1="48" x2="32" y2="56"/><line x1="8" y1="32" x2="16" y2="32"/><line x1="48" y1="32" x2="56" y2="32"/><line x1="14" y1="14" x2="20" y2="20"/><line x1="44" y1="44" x2="50" y2="50"/><line x1="50" y1="14" x2="44" y2="20"/><line x1="20" y1="44" x2="14" y2="50"/></g></>,
    cloud: <path d="M16,40 C10,40 6,35 6,30 C6,24 11,20 16,21 C18,14 26,10 33,13 C39,15 43,21 42,27 C48,27 52,32 51,38 C50,43 45,46 40,46 L16,46 Z" fill="#e9e2cf" stroke="var(--ink)" strokeWidth="1.6" transform="translate(3,4)"/>,
    fog: <><path d="M16,32 C10,32 6,28 6,24 C6,19 11,15 16,16 C18,10 26,7 33,10 C39,12 43,17 42,22 C48,22 52,26 51,31 C50,35 45,38 40,38 L16,38 Z" fill="#e9e2cf" stroke="var(--ink)" strokeWidth="1.4"/><g stroke="var(--ink-2)" strokeWidth="1.6" strokeLinecap="round"><line x1="12" y1="46" x2="52" y2="46"/><line x1="18" y1="52" x2="46" y2="52"/></g></>,
    rain: <><path d="M16,30 C10,30 6,26 6,21 C6,16 11,12 16,13 C18,7 26,4 33,7 C39,9 43,14 42,20 C48,20 52,24 51,29 C50,33 45,36 40,36 L16,36 Z" fill="#dbe6ee" stroke="var(--ink)" strokeWidth="1.4"/><g stroke="var(--water)" strokeWidth="2.2" strokeLinecap="round"><line x1="18" y1="44" x2="14" y2="54"/><line x1="30" y1="44" x2="26" y2="54"/><line x1="42" y1="44" x2="38" y2="54"/></g></>,
    snow: <><path d="M16,30 C10,30 6,26 6,21 C6,16 11,12 16,13 C18,7 26,4 33,7 C39,9 43,14 42,20 C48,20 52,24 51,29 C50,33 45,36 40,36 L16,36 Z" fill="#eef2f6" stroke="var(--ink)" strokeWidth="1.4"/><g fill="var(--water)"><circle cx="16" cy="48" r="2.4"/><circle cx="30" cy="52" r="2.4"/><circle cx="44" cy="48" r="2.4"/></g></>,
    storm: <><path d="M16,28 C10,28 6,24 6,19 C6,14 11,10 16,11 C18,5 26,2 33,5 C39,7 43,12 42,18 C48,18 52,22 51,27 C50,31 45,34 40,34 L16,34 Z" fill="#d9d2c0" stroke="var(--ink)" strokeWidth="1.4"/><path d="M30,36 L22,50 L28,50 L24,60 L38,44 L31,44 Z" fill="var(--power)" stroke="var(--ink)" strokeWidth="1"/></>
  };
  return <svg viewBox="0 0 64 64" className="weather-icon">{parts[kind] || parts.cloud}</svg>;
}

function StatIcon({ kind }) {
  const parts = {
    temp: <><rect x="27" y="8" width="10" height="32" rx="5" fill="none" stroke="var(--ink)" strokeWidth="2"/><circle cx="32" cy="44" r="9" fill="var(--heat)" stroke="var(--ink)" strokeWidth="2"/><rect x="29" y="16" width="6" height="22" rx="3" fill="var(--heat)"/></>,
    feels: <><circle cx="32" cy="32" r="20" fill="none" stroke="var(--ink)" strokeWidth="2"/><circle cx="32" cy="25" r="3" fill="var(--ink)"/><path d="M32,25 L32,38" stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round"/><path d="M32,38 L40,42" stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round"/></>,
    humidity: <path d="M32,10 C32,10 16,32 16,44 C16,53 23,58 32,58 C41,58 48,53 48,44 C48,32 32,10 32,10 Z" fill="var(--water)" opacity="0.85" stroke="var(--ink)" strokeWidth="2"/>,
    visibility: <><ellipse cx="32" cy="32" rx="24" ry="14" fill="none" stroke="var(--ink)" strokeWidth="2"/><circle cx="32" cy="32" r="7" fill="var(--power)" stroke="var(--ink)" strokeWidth="2"/></>,
    wind: <g fill="none" stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round"><path d="M8,24 L40,24 C46,24 46,14 40,14 C36,14 34,17 34,20"/><path d="M8,32 L48,32 C55,32 55,44 48,44 C43,44 40,40 40,36"/><path d="M8,42 L30,42"/></g>
  };
  return <svg viewBox="0 0 64 64" className="stat-icon">{parts[kind]}</svg>;
}

function HeroGraphic({ weather }) {
  const kind = weather ? weather.kind : 'cloud';
  const litPattern = [1,0,1,1,0,1,0,1,1,0,1,0];
  return (
    <svg viewBox="0 0 260 220" className="hero-graphic">
      <circle cx="210" cy="48" r="30" fill={kind === 'sun' ? '#fbead0' : '#eee7d6'}/>
      <rect x="30" y="60" width="140" height="140" fill="var(--card)" stroke="var(--ink)" strokeWidth="2"/>
      <polygon points="22,60 100,24 178,60" fill="var(--leaf)" stroke="var(--ink)" strokeWidth="2"/>
      {[0,1,2,3].map(row => [0,1,2].map(col => (
        <rect key={row+'-'+col} x={48 + col*38} y={78 + row*28} width="22" height="18" fill={litPattern[row*3+col] ? 'var(--power)' : '#dcd4bd'} stroke="var(--ink)" strokeWidth="1.2"/>
      )))}
      <rect x="92" y="170" width="26" height="30" fill="var(--ink)"/>
      <circle cx="60" cy="180" r="5" fill="var(--heat)"/>
      <circle cx="150" cy="195" r="5" fill="var(--water)"/>
      <circle cx="185" cy="165" r="5" fill="var(--power)"/>
      <circle cx="20" cy="140" r="4" fill="var(--water)"/>
    </svg>
  );
}

function PersonaIcon({ id }) {
  const marks = {
    remote: <><rect x="14" y="34" width="36" height="22" rx="2" fill="var(--card)" stroke="var(--ink)" strokeWidth="1.6"/><rect x="18" y="38" width="28" height="14" fill="var(--power)" opacity="0.35"/><rect x="18" y="38" width="28" height="14" fill="none" stroke="var(--ink)" strokeWidth="1"/><rect x="8" y="56" width="48" height="4" rx="1" fill="var(--ink)"/></>,
    family: <><path d="M14,44 L32,28 L50,44 L50,58 L14,58 Z" fill="var(--card)" stroke="var(--ink)" strokeWidth="1.6"/><circle cx="25" cy="50" r="5" fill="var(--heat)"/><circle cx="39" cy="50" r="5" fill="var(--water)"/><rect x="29" y="38" width="6" height="8" fill="var(--power)"/></>,
    retired: <><path d="M16,30 L16,52 L20,52 L20,58 L26,58 L26,52 L40,52 L40,58 L46,58 L46,52 L48,52 L48,30 C48,26 44,24 40,24 L24,24 C20,24 16,26 16,30 Z" fill="var(--card)" stroke="var(--ink)" strokeWidth="1.6"/><rect x="16" y="38" width="32" height="6" fill="#e3dac3" stroke="var(--ink)" strokeWidth="1"/><rect x="12" y="34" width="6" height="18" rx="2" fill="var(--card)" stroke="var(--ink)" strokeWidth="1.4"/><rect x="46" y="34" width="6" height="18" rx="2" fill="var(--card)" stroke="var(--ink)" strokeWidth="1.4"/></>,
    indifferent: <><rect x="14" y="24" width="36" height="26" rx="3" fill="var(--card)" stroke="var(--ink)" strokeWidth="1.6"/><line x1="14" y1="32" x2="50" y2="32" stroke="var(--ink)" strokeWidth="1.2"/><circle cx="21" cy="28" r="1.6" fill="var(--ink)"/><circle cx="26" cy="28" r="1.6" fill="var(--ink)"/><circle cx="32" cy="40" r="7" fill="var(--power)" opacity="0.5" stroke="var(--ink)" strokeWidth="1.2"/><path d="M28,40 L36,40 M32,36 L32,44" stroke="var(--ink)" strokeWidth="1.6" strokeLinecap="round"/><rect x="20" y="54" width="24" height="4" fill="var(--ink)"/></>
  };
  return <svg viewBox="0 0 64 64" className="persona-icon">{marks[id]}</svg>;
}

function CelineLogo({ size }) {
  const s = size || 40;
  return (
    <svg viewBox="0 0 64 64" width={s} height={s} className="celine-logo">
      <circle cx="32" cy="32" r="29" fill="var(--card)" stroke="var(--ink)" strokeWidth="2"/>
      <path d="M32,15 C22.5,15 15,22.5 15,32 C15,41.5 22.5,49 32,49" fill="none" stroke="var(--leaf)" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="32" cy="15" r="5.5" fill="var(--heat)" stroke="var(--ink)" strokeWidth="1.4"/>
      <circle cx="15" cy="32" r="5.5" fill="var(--water)" stroke="var(--ink)" strokeWidth="1.4"/>
      <circle cx="32" cy="49" r="5.5" fill="var(--power)" stroke="var(--ink)" strokeWidth="1.4"/>
    </svg>
  );
}

function CelineWordmark({ size }) {
  return (
    <div className="celine-wordmark" style={{ gap: size === 'lg' ? 12 : 8 }}>
      <CelineLogo size={size === 'lg' ? 44 : 32} />
      <span className={"celine-wordmark-text" + (size === 'lg' ? ' lg' : '')}>CELINE<em>Energy Literacy Game</em></span>
    </div>
  );
}

function StartScreen({ onStart, weather, onWeatherRefresh }) {
  const [persona, setPersona] = React.useState(null);
  const [mode, setMode] = React.useState('coop');
  return (
    <section className="screen start-screen">
      <div className="start-top">
        <div className="start-text">
          <CelineWordmark size="lg" />
          <p className="eyebrow"><span className="dot"></span>CELINE Energy Literacy Game</p>
          <h1>Play a day in your apartment. <em>Fewer beads, better badge.</em></h1>
          <p className="lede">Every choice you make about heating, water and electricity earns a bead — red for heat, blue for water, yellow for power. Keep your bead count low to earn recognition and help the building hit its shared efficiency goal.</p>
          <div className="weather-card" onClick={() => window.fetchWeather().then(onWeatherRefresh)} role="button" title="Tap to refresh weather">
            <div className="weather-card-head">
              <WeatherIcon kind={weather ? weather.kind : 'cloud'} />
              <div>
                <span className="weather-loc">📍 Lappeenranta</span>
                <span className="weather-label">{weather ? weather.label : 'Loading\u2026'}</span>
              </div>
            </div>
            {weather && weather.ok && <div className="weather-stats">
              <span><StatIcon kind="temp" />Temperature: {weather.temp}°C</span>
              <span><StatIcon kind="feels" />Feels Like: {weather.feelsLike}°C</span>
              <span><StatIcon kind="humidity" />Humidity: {weather.humidity}%</span>
              <span><StatIcon kind="visibility" />Visibility: {weather.visibility !== null ? weather.visibility + ' km' : '\u2014'}</span>
              <span><StatIcon kind="wind" />Wind Speed: {weather.windSpeed} km/h</span>
            </div>}
          </div>
        </div>
        <HeroGraphic weather={weather} />
      </div>

      <h2 className="section-label">Choose your household</h2>
      <div className="persona-grid">
        {window.PERSONAS.map(p => (
          <button key={p.id} className={"persona-card" + (persona && persona.id === p.id ? ' selected' : '')} onClick={() => setPersona(p)}>
            <PersonaIcon id={p.id} />
            <span className="persona-name">{p.name}</span>
            <span className="persona-blurb">{p.blurb}</span>
          </button>
        ))}
      </div>

      <h2 className="section-label">Session mode</h2>
      <div className="mode-toggle">
        <button className={"chip" + (mode === 'coop' ? ' active' : '')} onClick={() => setMode('coop')}>Cooperative — shared building goal</button>
        <button className={"chip" + (mode === 'competitive' ? ' active' : '')} onClick={() => setMode('competitive')}>Competitive — leaderboard</button>
      </div>

      <button className="btn-primary btn-start" disabled={!persona} onClick={() => onStart(persona, mode)}>
        Continue
      </button>
    </section>
  );
}

function DetailsScreen({ persona, onSubmit, onBack }) {
  const [name, setName] = React.useState('');
  const [apt, setApt] = React.useState('');
  const [building, setBuilding] = React.useState('');
  const canSubmit = name.trim() && apt.trim() && building.trim();
  return (
    <section className="screen details-screen">
      <p className="eyebrow"><span className="dot"></span>Household details</p>
      <h1>Who's playing today?</h1>
      <p className="lede">Your name and unit will appear on the building leaderboard at the end of the game.</p>
      <div className="details-form">
        <label className="field">
          <span>Name or nickname</span>
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Aino K." maxLength={24} />
        </label>
        <div className="field-row">
          <label className="field">
            <span>Building number</span>
            <input type="text" value={building} onChange={e => setBuilding(e.target.value)} placeholder="e.g. 2" maxLength={8} />
          </label>
          <label className="field">
            <span>Apartment number</span>
            <input type="text" value={apt} onChange={e => setApt(e.target.value)} placeholder="e.g. 14" maxLength={8} />
          </label>
        </div>
      </div>
      <div className="gameplay-nav">
        <button className="btn-secondary" onClick={onBack}>← Back</button>
        <button className="btn-primary" disabled={!canSubmit} onClick={() => onSubmit({ name: name.trim(), apt: apt.trim(), building: building.trim() })}>
          Start the day
        </button>
      </div>
    </section>
  );
}

function PodiumScreen({ player, beads, rank, sorted, onContinue }) {
  const top3 = sorted.slice(0, 3);
  const heights = [170, 130, 100];
  const order = [1, 0, 2];
  return (
    <section className="screen podium-screen">
      <p className="eyebrow"><span className="dot"></span>Building podium</p>
      <h1>{rank <= 3 ? 'You made the podium!' : 'Building results'}</h1>
      <div className="podium-row">
        {order.map(i => {
          const h = top3[i];
          if (!h) return <div key={i} className="podium-slot empty"></div>;
          return (
            <div key={i} className="podium-slot">
              <span className="podium-name">{h.name}</span>
              <span className="podium-total">{h.total} beads</span>
              <div className="podium-block" style={{ height: heights[i] }}>
                <span className="podium-rank">{i + 1}</span>
              </div>
            </div>
          );
        })}
      </div>
      <button className="btn-primary" onClick={onContinue}>See my badges</button>
    </section>
  );
}

function SummaryScreen({ persona, beads, comfortAvg, buildingEfficiency, onContinue }) {
  const total = beads.heat + beads.water + beads.power;
  const comfortWord = comfortAvg > 0.4 ? 'a touch warm' : comfortAvg < -0.4 ? 'a touch cold' : 'comfortable';
  return (
    <section className="screen summary-screen">
      <p className="eyebrow"><span className="dot"></span>Round summary</p>
      <h1>Your day, in numbers.</h1>

      <div className="narrative-card">
        <p><b>Individual impact.</b> Your choices today added up to {total} beads — {beads.heat} heat, {beads.water} water, {beads.power} power — and kept your apartment {comfortWord}.</p>
        {buildingEfficiency !== null ? (
          <p><b>Collective impact.</b> Combined with your {window.MOCK_HOUSEHOLDS.length} neighboring households, the building is running at {buildingEfficiency}% of its efficiency target this round.</p>
        ) : (
          <p><b>Your standing.</b> Your bead count places you against {window.MOCK_HOUSEHOLDS.length} other households this round — see how you rank on the podium next.</p>
        )}
        <p><b>Long-term effect.</b> Keeping this pattern up over a year would shift your household toward the lower end of the building's heating bill.</p>
      </div>

      <div className="bead-tally">
        <div className="tally-row"><span className="tally-label">Heat</span><span className="tally-beads">{Array.from({length: beads.heat}).map((_, i) => <Bead key={i} color="heat" />)}{beads.heat === 0 && <span className="tally-zero">0</span>}</span></div>
        <div className="tally-row"><span className="tally-label">Water</span><span className="tally-beads">{Array.from({length: beads.water}).map((_, i) => <Bead key={i} color="water" />)}{beads.water === 0 && <span className="tally-zero">0</span>}</span></div>
        <div className="tally-row"><span className="tally-label">Power</span><span className="tally-beads">{Array.from({length: beads.power}).map((_, i) => <Bead key={i} color="power" />)}{beads.power === 0 && <span className="tally-zero">0</span>}</span></div>
      </div>

      <button className="btn-primary" onClick={onContinue}>See my badges</button>
    </section>
  );
}

function BadgeMark({ id }) {
  const marks = {
    'zero-waste': <><circle cx="32" cy="32" r="26" fill="#f6f1e3" stroke="var(--ink)" strokeWidth="2"/><circle cx="32" cy="32" r="18" fill="#fff" stroke="var(--ink)" strokeWidth="1.2"/><text x="32" y="39" textAnchor="middle" fontSize="16" fontWeight="600" fill="var(--ink)">0</text></>,
    'ultra-efficient': <><path d="M32,16 C20,16 12,26 12,38 C12,46 17,52 22,57 L22,62 L42,62 L42,57 C47,52 52,46 52,38 C52,26 44,16 32,16 Z" fill="#fff6d6" stroke="var(--ink)" strokeWidth="2"/><circle cx="26" cy="38" r="3" fill="var(--heat)"/><circle cx="32" cy="33" r="3" fill="var(--water)"/><circle cx="38" cy="38" r="3" fill="var(--power)"/></>,
    'climate-guardian': <><path d="M32,14 L48,22 L48,38 C48,50 41,58 32,62 C23,58 16,50 16,38 L16,22 Z" fill="#eaf3ea" stroke="var(--leaf)" strokeWidth="2"/><path d="M32,28 C24,36 22,48 28,58 C38,50 42,40 40,30 Z" fill="var(--leaf)"/></>,
    'efficiency-expert': <><circle cx="32" cy="32" r="24" fill="#fff6d6" stroke="var(--power)" strokeWidth="2"/><path d="M36,18 L22,36 L32,36 L28,48 L44,28 L34,28 Z" fill="var(--power)" stroke="var(--ink)" strokeWidth="1"/></>,
    'smart-housekeeper': <><circle cx="32" cy="32" r="24" fill="#fbe6df" stroke="var(--heat)" strokeWidth="2"/><path d="M18,38 L32,26 L46,38 L46,50 L18,50 Z" fill="#fff7f3" stroke="var(--ink)" strokeWidth="1.5"/><path d="M32,38 C27,42 27,47 32,49 C37,47 37,42 32,38 Z" fill="var(--heat)"/></>,
    'balanced-living': <><circle cx="32" cy="32" r="24" fill="#f6f1e3" stroke="var(--ink)" strokeWidth="1.2"/><circle cx="32" cy="22" r="7" fill="var(--heat)" stroke="var(--ink)" strokeWidth="1"/><circle cx="22" cy="40" r="7" fill="var(--water)" stroke="var(--ink)" strokeWidth="1"/><circle cx="42" cy="40" r="7" fill="var(--power)" stroke="var(--ink)" strokeWidth="1"/></>,
    'comfortable-choices': <><rect x="14" y="22" width="36" height="24" rx="8" fill="#f0e7d0" stroke="var(--ink)" strokeWidth="2"/><circle cx="24" cy="46" r="3" fill="var(--heat)"/><circle cx="32" cy="46" r="3" fill="var(--water)"/><circle cx="40" cy="46" r="3" fill="var(--power)"/></>,
    'planet-hero': <><circle cx="32" cy="32" r="18" fill="var(--water)" stroke="var(--ink)" strokeWidth="2"/><path d="M22,26 Q28,22 34,26 Q38,30 30,32 Q24,34 22,26 Z" fill="var(--leaf)"/><ellipse cx="32" cy="32" rx="26" ry="7" fill="none" stroke="var(--ink)" strokeWidth="1" transform="rotate(-18 32 32)"/></>
  };
  return <svg viewBox="0 0 64 64" className="badge-mark">{marks[id]}</svg>;
}

function ResultsScreen({ persona, player, beads, earnedIds, rank, onRestart }) {
  const total = beads.heat + beads.water + beads.power;
  const myLabel = (player && player.name ? player.name : 'You') + ' · Bldg ' + (player ? player.building : '?') + ' Apt ' + (player ? player.apt : '?');
  const sorted = [...window.MOCK_HOUSEHOLDS, { name: myLabel, total, mine: true }].sort((a, b) => a.total - b.total);
  return (
    <section className="screen results-screen">
      <p className="eyebrow"><span className="dot"></span>Results</p>
      <h1>{earnedIds.length ? 'Nice work — you earned ' + earnedIds.length + ' badge' + (earnedIds.length > 1 ? 's' : '') + '.' : 'Keep going — no badge yet.'}</h1>

      <div className="badge-grid">
        {window.BADGES.map(b => (
          <div key={b.id} className={"badge-card" + (earnedIds.includes(b.id) ? ' earned' : ' locked')}>
            <BadgeMark id={b.id} />
            <span className="badge-card-name">{b.name}</span>
            <span className="badge-card-tier">{b.tier}</span>
          </div>
        ))}
      </div>

      <h2 className="section-label">Building leaderboard</h2>
      <div className="leaderboard">
        {sorted.map((h, i) => (
          <div key={h.name} className={"leader-row" + (h.mine ? ' mine' : '')}>
            <span className="leader-rank">{i + 1}</span>
            <span className="leader-name">{h.name}</span>
            <span className="leader-total">{h.total} beads</span>
          </div>
        ))}
      </div>

      <button className="btn-primary" onClick={onRestart}>Play again</button>
      <button className="btn-secondary btn-share" onClick={() => window.shareResults(myLabel, earnedIds, total)}>Share my results</button>
    </section>
  );
}

function EUFlag({ size }) {
  const w = size || 28, h = w * 2 / 3;
  const stars = Array.from({ length: 12 }).map((_, i) => {
    const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
    const cx = 50 + Math.cos(a) * 28, cy = 33.5 + Math.sin(a) * 28;
    return <text key={i} x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fontSize="11" fill="#FFCC00">★</text>;
  });
  return (
    <svg viewBox="0 0 100 67" width={w} height={h} className="eu-flag">
      <rect x="0" y="0" width="100" height="67" fill="#003399"/>
      {stars}
    </svg>
  );
}

Object.assign(window, { StartScreen, SummaryScreen, ResultsScreen, PodiumScreen, BadgeMark, Bead, CelineLogo, CelineWordmark, EUFlag });
