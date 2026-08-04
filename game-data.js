window.PERSONAS = [
  { id: 'remote', name: 'Remote Worker', blurb: 'Home office all day. Computer can\u2019t go dark during work hours.', mono: 'RW' },
  { id: 'family', name: 'Busy Family', blurb: 'Evening cooking, showers, and shared spaces in constant use.', mono: 'BF' },
  { id: 'retired', name: 'Retired Resident', blurb: 'Home most of the day. Prefers a warm, comfortable apartment.', mono: 'RR' },
  { id: 'indifferent', name: 'Energy Indifferent', blurb: 'Defaults to convenience. Needs a nudge to think about usage.', mono: 'EI' }
];

// bead color per category
window.CATEGORY_COLOR = { heat: 'heat', water: 'water', power: 'power' };

// time blocks with 4 actions each. Each action: id, label, room, category, options[{label, beads, comfort, note}]
window.TIME_BLOCKS = [
  {
    id: 'morning', label: 'Morning', range: '06:00\u201310:00',
    actions: [
      { id: 'shower', label: 'Shower', room: 'bathroom', category: 'water',
        options: [
          { label: 'Short (5 min)', beads: 0, comfort: 0 },
          { label: 'Normal (10 min)', beads: 1, comfort: 1 },
          { label: 'Long (15 min)', beads: 2, comfort: 1 },
          { label: 'Bath', beads: 3, comfort: 1 }
        ] },
      { id: 'kitchen-light-am', label: 'Kitchen lighting', room: 'kitchen', category: 'power',
        options: [
          { label: 'Use daylight', beads: 0, comfort: 0 },
          { label: 'Turn on lights', beads: 1, comfort: 0 }
        ] },
      { id: 'window-am', label: 'Window after shower', room: 'bathroom', category: 'heat',
        options: [
          { label: 'Keep closed', beads: 0, comfort: 0 },
          { label: 'Open 15 min', beads: 1, comfort: 1 }
        ] },
      { id: 'breakfast', label: 'Breakfast', room: 'kitchen', category: 'power',
        options: [
          { label: 'Cold meal', beads: 0, comfort: 0 },
          { label: 'Microwave', beads: 0, comfort: 0 },
          { label: 'Stovetop', beads: 1, comfort: 0 }
        ] }
    ]
  },
  {
    id: 'day', label: 'Day', range: '10:00\u201316:00',
    actions: [
      { id: 'thermostat-day', label: 'Thermostat while out', room: 'living', category: 'heat',
        options: [
          { label: 'Lower \u22122\u00b0C', beads: 0, comfort: -1 },
          { label: 'Leave as-is', beads: 1, comfort: 0 },
          { label: 'Raise +1\u00b0C', beads: 2, comfort: 1 }
        ] },
      { id: 'it-day', label: 'Computer', room: 'living', category: 'power',
        options: [
          { label: 'Standby when idle', beads: 0, comfort: 0 },
          { label: 'Leave running', beads: 1, comfort: 0, lockFor: 'remote', lockNote: 'Locked \u2014 can\u2019t power down during work hours' }
        ] },
      { id: 'light-day', label: 'Daytime lighting', room: 'living', category: 'power',
        options: [
          { label: 'Natural daylight', beads: 0, comfort: 0 },
          { label: 'Lights on', beads: 1, comfort: 0 }
        ] },
      { id: 'vent-day', label: 'Ventilation', room: 'kitchen', category: 'heat',
        options: [
          { label: 'Mechanical vent', beads: 0, comfort: 0 },
          { label: 'Open window', beads: 1, comfort: 1 }
        ] }
    ]
  },
  {
    id: 'evening', label: 'Evening', range: '16:00\u201322:00',
    actions: [
      { id: 'dinner', label: 'Dinner', room: 'kitchen', category: 'power',
        options: [
          { label: 'Cold meal', beads: 0, comfort: 0 },
          { label: 'Microwave', beads: 0, comfort: 0 },
          { label: 'Stovetop', beads: 1, comfort: 0 },
          { label: 'Oven', beads: 2, comfort: 1 }
        ] },
      { id: 'shower-pm', label: 'Evening shower', room: 'bathroom', category: 'water',
        options: [
          { label: 'Short (5 min)', beads: 0, comfort: 0 },
          { label: 'Normal (10 min)', beads: 1, comfort: 1 },
          { label: 'Long (15 min)', beads: 2, comfort: 1 },
          { label: 'Bath', beads: 3, comfort: 1 }
        ] },
      { id: 'light-pm', label: 'Living room lighting', room: 'living', category: 'power',
        options: [
          { label: 'Dim / task light', beads: 0, comfort: 0 },
          { label: 'Bright lights', beads: 1, comfort: 0 }
        ] },
      { id: 'balcony', label: 'Balcony door', room: 'living', category: 'heat',
        options: [
          { label: 'Keep closed', beads: 0, comfort: 0 },
          { label: 'Open 30 min', beads: 2, comfort: 1 }
        ] }
    ]
  },
  {
    id: 'night', label: 'Night', range: '22:00\u201306:00',
    actions: [
      { id: 'thermostat-night', label: 'Night thermostat', room: 'bedroom', category: 'heat',
        options: [
          { label: 'Lower \u22122\u00b0C', beads: 0, comfort: -1 },
          { label: 'Leave as-is', beads: 1, comfort: 0 },
          { label: 'Raise +1\u00b0C', beads: 2, comfort: 1 }
        ] },
      { id: 'standby', label: 'Chargers & standby', room: 'bedroom', category: 'power',
        options: [
          { label: 'Unplug', beads: 0, comfort: 0 },
          { label: 'Leave plugged in', beads: 1, comfort: 0 }
        ] },
      { id: 'blinds', label: 'Blinds', room: 'bedroom', category: 'heat',
        options: [
          { label: 'Close (insulate)', beads: 0, comfort: 0 },
          { label: 'Leave open', beads: 1, comfort: 0 }
        ] },
      { id: 'window-night', label: 'Bedroom window', room: 'bedroom', category: 'heat',
        options: [
          { label: 'Keep closed', beads: 0, comfort: 0 },
          { label: 'Crack open', beads: 1, comfort: 1 }
        ] }
    ]
  }
];

// badge thresholds, mirrors Badges.html
window.BADGES = [
  { id: 'zero-waste', name: 'Zero Waste Master', tier: 'Master', test: t => t.total <= 3 },
  { id: 'ultra-efficient', name: 'Ultra Efficient', tier: 'Mastery', test: t => t.total <= 6 },
  { id: 'climate-guardian', name: 'Climate Guardian', tier: 'Steward', test: t => t.total <= 9 },
  { id: 'efficiency-expert', name: 'Efficiency Expert', tier: 'Expert', test: t => t.power <= 3 },
  { id: 'smart-housekeeper', name: 'Smart Housekeeper', tier: 'Steward', test: t => t.heat <= 3 },
  { id: 'balanced-living', name: 'Balanced Living', tier: 'Harmony', test: t => t.total <= 12 && (Math.max(t.heat, t.water, t.power) - Math.min(t.heat, t.water, t.power)) <= 2 },
  { id: 'comfortable-choices', name: 'Comfortable Choices', tier: 'Pragmatist', test: t => t.total <= 12 },
  { id: 'planet-hero', name: 'Planet Hero', tier: 'Champion', test: (t, rank) => rank === 1 }
];

window.shareResults = function (label, earnedIds, total) {
  const badgeNames = earnedIds.map(id => (window.BADGES.find(b => b.id === id) || {}).name).filter(Boolean);
  const text = badgeNames.length
    ? label + ' finished with ' + total + ' beads and earned: ' + badgeNames.join(', ') + '. Can you beat that on the Energy Literacy Game?'
    : label + ' finished with ' + total + ' beads on the Energy Literacy Game. Can you do better?';
  const fallbackCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => alert('Copied to clipboard:\n\n' + text)).catch(() => alert(text));
    } else {
      alert(text);
    }
  };
  if (navigator.share) {
    navigator.share({ title: 'Energy Literacy Game', text }).catch(fallbackCopy);
  } else {
    fallbackCopy();
  }
};

window.MOCK_HOUSEHOLDS = [
  { name: 'Apt 2B \u00b7 Family', total: 14 },
  { name: 'Apt 3A \u00b7 Retiree', total: 11 },
  { name: 'Apt 4C \u00b7 Remote worker', total: 8 },
  { name: 'Apt 1D \u00b7 Indifferent', total: 19 }
];

// simulated per-block increments for mock opponents, used to animate "live" progress
window.MOCK_LIVE_INCREMENTS = [
  [3, 2, 2, 1], // Apt 2B
  [2, 2, 1, 1], // Apt 3A
  [1, 1, 1, 1], // Apt 4C
  [4, 3, 3, 2]  // Apt 1D
];

