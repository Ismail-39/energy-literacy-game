function isoP(ox,oy,i,j){ return [ox+i*24-j*24, oy+i*12+j*12]; }
function isoUp(p,h){ return [p[0], p[1]-h]; }
function isoPoly(pts){ return pts.map(p=>p[0]+','+p[1]).join(' '); }

function IsoRoom({ ox, oy, label, floor, wallL, wallR, children }) {
  const N=isoP(ox,oy,0,0), E=isoP(ox,oy,4,0), S=isoP(ox,oy,4,4), W=isoP(ox,oy,0,4);
  const H=64;
  return (
    <g>
      <polygon points={isoPoly([N,W,isoUp(W,H),isoUp(N,H)])} fill={wallL} stroke="var(--ink)" strokeWidth="1.2"/>
      <polygon points={isoPoly([N,E,isoUp(E,H),isoUp(N,H)])} fill={wallR} stroke="var(--ink)" strokeWidth="1.2"/>
      <polygon points={isoPoly([N,E,S,W])} fill={floor} stroke="var(--ink)" strokeWidth="1.2"/>
      {children}
      <text x={W[0]} y={S[1]+16} fontSize="10" fontFamily="'JetBrains Mono',monospace" fill="var(--ink-2)" letterSpacing="1">{label.toUpperCase()}</text>
    </g>
  );
}

function IsoBox({ ox, oy, i, j, w, d, h, top, right, left }) {
  const p0=isoP(ox,oy,i,j), p1=isoP(ox,oy,i+w,j), p2=isoP(ox,oy,i+w,j+d), p3=isoP(ox,oy,i,j+d);
  return (
    <g>
      <polygon points={isoPoly([p0,p3,isoUp(p3,h),isoUp(p0,h)])} fill={left} stroke="var(--ink)" strokeWidth="1"/>
      <polygon points={isoPoly([p0,p1,isoUp(p1,h),isoUp(p0,h)])} fill={right} stroke="var(--ink)" strokeWidth="1"/>
      <polygon points={isoPoly([isoUp(p0,h),isoUp(p1,h),isoUp(p2,h),isoUp(p3,h)])} fill={top} stroke="var(--ink)" strokeWidth="1"/>
    </g>
  );
}

function IsoWindow({ ox, oy, axis, t, w, baseH, h, open }) {
  const a = axis === 'left' ? isoP(ox,oy,0,t) : isoP(ox,oy,t,0);
  const b = axis === 'left' ? isoP(ox,oy,0,t+w) : isoP(ox,oy,t+w,0);
  const p1=isoUp(a,baseH), p2=isoUp(b,baseH), p3=isoUp(b,baseH+h), p4=isoUp(a,baseH+h);
  return (
    <g>
      <polygon points={isoPoly([p1,p2,p3,p4])} fill={open ? '#dbe9f7' : '#ccd3da'} stroke="var(--ink)" strokeWidth="1.2"/>
      <line x1={(p1[0]+p2[0])/2} y1={p1[1]} x2={(p1[0]+p2[0])/2} y2={p4[1]} stroke="var(--ink)" strokeWidth="1"/>
      {open && <line x1={p1[0]} y1={(p1[1]+p2[1])/2} x2={p3[0]} y2={(p3[1]+p4[1])/2} stroke="var(--water)" strokeWidth="1.4" opacity="0.7"/>}
    </g>
  );
}

function IsoLamp({ x, y, on }) {
  return (
    <g>
      {on && <circle cx={x} cy={y} r="16" fill="var(--power)" opacity="0.28"/>}
      <circle cx={x} cy={y} r="5" fill={on ? 'var(--power)' : '#cfc6ae'} stroke="var(--ink)" strokeWidth="1"/>
    </g>
  );
}

function IsoRadiator({ x, y, temp }) {
  const c = temp === 'high' ? 'var(--heat)' : temp === 'low' ? 'var(--water)' : '#d8cfba';
  return <rect x={x} y={y} width="20" height="7" rx="2" fill={c} stroke="var(--ink)" strokeWidth="1"/>;
}

function IsoSteam({ x, y, active }) {
  if (!active) return null;
  return (
    <g stroke="var(--water)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6">
      <path d={`M${x-5},${y} C${x-9},${y-12} ${x-1},${y-12} ${x-5},${y-24}`}/>
      <path d={`M${x+5},${y} C${x+1},${y-12} ${x+9},${y-12} ${x+5},${y-24}`}/>
    </g>
  );
}

function IsoFlame({ x, y, active }) {
  return <circle cx={x} cy={y} r={active ? 7 : 5} fill={active ? 'var(--heat)' : '#cbb98f'} stroke="var(--ink)" strokeWidth="1"/>;
}

function IsoScreenGlow({ x, y, w, h, on }) {
  return <rect x={x} y={y} width={w} height={h} rx="1.5" fill={on ? '#bcd8f5' : '#3a3a38'} stroke="var(--ink)" strokeWidth="1"/>;
}

function ApartmentScene({ rooms }) {
  return (
    <div className="apartment-scene">
      <svg viewBox="0 0 500 440" className="iso-apartment">
        <IsoRoom ox={140} oy={100} label="Kitchen" floor="#f2e8d3" wallL="#e2d5ba" wallR="#ecdfc4">
          <IsoBox ox={140} oy={100} i={0.15} j={0.2} w={0.9} d={0.9} h={62} top="#f8f4e9" right="#e9e2cf" left="#d7cfb8"/>
          <IsoBox ox={140} oy={100} i={1.6} j={2.1} w={1.7} d={1.0} h={34} top="#eae3d0" right="#dad3be" left="#c7c0a8"/>
          <IsoFlame x={isoUp(isoP(140,100,2.3,2.6),34)[0]} y={isoUp(isoP(140,100,2.3,2.6),34)[1]} active={rooms.kitchen.activity === 'cooking'}/>
          <IsoWindow ox={140} oy={100} axis="right" t={1.1} w={1.4} baseH={28} h={38} open={rooms.kitchen.window}/>
          <IsoLamp x={isoUp(isoP(140,100,2,2),66)[0]} y={isoUp(isoP(140,100,2,2),66)[1]} on={rooms.kitchen.light}/>
        </IsoRoom>

        <IsoRoom ox={360} oy={100} label="Bathroom" floor="#e7eff5" wallL="#d7e3ec" wallR="#e0eaf2">
          <IsoBox ox={360} oy={100} i={2.3} j={0.2} w={1.3} d={1.3} h={58} top="#eef6fb" right="#d9e8f0" left="#c5dbe6"/>
          <IsoSteam x={isoUp(isoP(360,100,2.95,0.85),64)[0]} y={isoUp(isoP(360,100,2.95,0.85),64)[1]} active={rooms.bathroom.activity === 'shower'}/>
          <IsoWindow ox={360} oy={100} axis="left" t={1.0} w={1.3} baseH={30} h={36} open={rooms.bathroom.window}/>
        </IsoRoom>

        <IsoRoom ox={140} oy={290} label="Living room" floor="#e9efe4" wallL="#d9e2d1" wallR="#e2e9da">
          <IsoBox ox={140} oy={290} i={0.2} j={1.9} w={1.9} d={1.0} h={28} top="#eef2e8" right="#dbe3d2" left="#c6cfba"/>
          <IsoBox ox={140} oy={290} i={2.6} j={0.3} w={1.0} d={0.6} h={40} top="#3a3a38" right="#2c2c2a" left="#232321"/>
          <IsoScreenGlow x={isoUp(isoP(140,290,2.75,0.35),56)[0]} y={isoUp(isoP(140,290,2.75,0.35),56)[1]} w={26} h={16} on={rooms.living.activity === 'it'}/>
          <IsoWindow ox={140} oy={290} axis="right" t={2.4} w={1.5} baseH={16} h={46} open={rooms.living.window}/>
          <IsoRadiator x={isoP(140,290,0.4,0.2)[0]} y={isoUp(isoP(140,290,0.4,0.2),34)[1]} temp={rooms.living.temp}/>
          <IsoLamp x={isoUp(isoP(140,290,2,2),66)[0]} y={isoUp(isoP(140,290,2,2),66)[1]} on={rooms.living.light}/>
        </IsoRoom>

        <IsoRoom ox={360} oy={290} label="Bedroom" floor="#eae6f0" wallL="#dad3e4" wallR="#e2dcec">
          <IsoBox ox={360} oy={290} i={0.2} j={1.6} w={1.8} d={1.6} h={24} top="#f2eef8" right="#e0d9ea" left="#cdc4de"/>
          <IsoBox ox={360} oy={290} i={2.3} j={1.1} w={0.6} d={0.6} h={30} top="#efe9f5" right="#ddd5e8" left="#c8bfd8"/>
          <IsoLamp x={isoUp(isoP(360,290,2.6,1.4),30)[0]} y={isoUp(isoP(360,290,2.6,1.4),30)[1]} on={rooms.bedroom.activity === 'standby'}/>
          <IsoWindow ox={360} oy={290} axis="left" t={2.3} w={1.3} baseH={30} h={36} open={rooms.bedroom.window}/>
          <IsoRadiator x={isoP(360,290,3.3,3.0)[0]} y={isoUp(isoP(360,290,3.3,3.0),30)[1]} temp={rooms.bedroom.temp}/>
        </IsoRoom>
      </svg>
    </div>
  );
}

function GameplayScreen({ persona, block, blockIndex, totalBlocks, rooms, beads, choices, comfortAvg, buildingEfficiency, weather, mode, onChoose, onNext, onBack, onExit }) {
  const allChosen = block.actions.every(a => choices[a.id] !== undefined);
  const comfortWord = comfortAvg > 0.4 ? 'Warm' : comfortAvg < -0.4 ? 'Cool' : 'Comfortable';
  return (
    <section className="screen gameplay-screen">
      <div className="hud">
        <div className="hud-blocks">
          <span className="hud-logo"><CelineLogo size={22} /></span>
          <button className="hud-exit" onClick={onExit} title="Exit to start">← Exit</button>
          {Array.from({ length: totalBlocks }).map((_, i) => (
            <span key={i} className={"hud-block" + (i === blockIndex ? ' active' : i < blockIndex ? ' done' : '')}>{['Morning','Day','Evening','Night'][i]}</span>
          ))}
        </div>
        <div className="hud-meters">
          <span className="hud-meter"><Bead color="heat" /><b>{beads.heat}</b></span>
          <span className="hud-meter"><Bead color="water" /><b>{beads.water}</b></span>
          <span className="hud-meter"><Bead color="power" /><b>{beads.power}</b></span>
          <span className="hud-comfort">{comfortWord}</span>
          <span className="hud-efficiency">{mode === 'competitive' ? 'Your rank' : 'Building'} {mode === 'competitive' ? '#' + (window.MOCK_HOUSEHOLDS.filter(h => h.total < (beads.heat + beads.water + beads.power)).length + 1) : buildingEfficiency + '%'}</span>
          {weather && <span className="hud-weather"><WeatherIcon kind={weather.kind} />{weather.temp + '°C outside'}</span>}
        </div>
      </div>

      <div className="gameplay-body">
        <div className="scene-col">
          <p className="section-label">{block.label} · {block.range}</p>
          <ApartmentScene rooms={rooms} />
          {mode !== 'competitive' && <div className="mission-bar">
            <span className="mission-label">Building goal · reduce heating 20%</span>
            <div className="mission-track"><div className="mission-fill" style={{ width: buildingEfficiency + '%' }}></div></div>
          </div>}
          {mode === 'competitive' && <div className="live-standings">
            <span className="mission-label">Live standings · lowest beads wins</span>
            {[...window.MOCK_HOUSEHOLDS, { name: 'You', total: beads.heat + beads.water + beads.power, mine: true }]
              .sort((a, b) => a.total - b.total).map((h, i) => (
                <div key={h.name} className={"standing-row" + (h.mine ? ' mine' : '')}>
                  <span className="standing-rank">{i + 1}</span>
                  <span className="standing-name">{h.name}</span>
                  <span className="standing-total">{h.total}</span>
                </div>
            ))}
          </div>}
        </div>

        <div className="actions-col">
          {block.actions.map(a => (
            <div key={a.id} className="action-card">
              <div className="action-head">
                <span className="action-label">{a.label}</span>
                <Bead color={a.category === 'heat' ? 'heat' : a.category === 'water' ? 'water' : 'power'} />
              </div>
              <div className="option-row">
                {(() => {
                  const forcedOpt = a.options.find(o => o.lockFor);
                  const isForced = forcedOpt && forcedOpt.lockFor === persona.id;
                  return a.options.map((opt, oi) => {
                    const notApplicable = opt.lockFor && opt.lockFor !== persona.id;
                    const disabled = notApplicable || (isForced && !opt.lockFor);
                    const selected = isForced ? opt.lockFor === persona.id : choices[a.id] === oi;
                    if (notApplicable) return null;
                    return (
                      <button key={oi} disabled={disabled}
                        className={"option-btn" + (selected ? ' selected' : '') + (disabled ? ' locked' : '')}
                        onClick={() => !disabled && onChoose(a, oi)}>
                        <span>{opt.label}</span>
                        {selected && <span className="option-delta">{opt.beads > 0 ? '+' + opt.beads + ' ' + a.category : 'no beads'}</span>}
                        {opt.lockFor === persona.id && <span className="option-note">{opt.lockNote}</span>}
                      </button>
                    );
                  });
                })()}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="gameplay-nav">
        <button className="btn-secondary" disabled={blockIndex === 0} onClick={onBack}>← Back to {blockIndex > 0 ? ['Morning','Day','Evening','Night'][blockIndex - 1] : ''}</button>
        <button className="btn-primary" disabled={!allChosen} onClick={onNext}>
          {blockIndex === totalBlocks - 1 ? 'Finish the day' : 'Continue to ' + ['Morning','Day','Evening','Night'][blockIndex + 1]}
        </button>
      </div>
    </section>
  );
}

Object.assign(window, { GameplayScreen, ApartmentScene });
