# CELINE Energy Literacy Game

A gamified web prototype for the CELINE project, helping residents understand how everyday choices — heating, water, and electricity use — affect apartment comfort, cost, and building-wide energy efficiency.

Players choose a household persona, make discrete decisions across four daily time blocks (Morning, Day, Evening, Night), and earn "beads" (red = heat, blue = water, yellow = power) for each choice. Lower bead counts reflect more efficient behavior and unlock recognition badges. Includes cooperative (shared building goal) and competitive (leaderboard) modes, a live weather integration for Lappeenranta, and a shareable results/podium screen.

## Contents

- `Energy Literacy Game.html` — main app shell, styles, and game state logic
- `game-data.js` — personas, time-block actions/options, badge rules, mock household data
- `screens.jsx` — start, details, summary, podium, and results screens
- `gameplay.jsx` — core gameplay screen and isometric apartment visualization
- `weather.js` — live weather fetch (Open-Meteo API) for Lappeenranta

## Running

Open `Energy Literacy Game.html` directly in a browser — no build step required (React, ReactDOM, and Babel are loaded via CDN, JSX is transpiled in-browser).

## Funding

Funded by the Horizon Europe Programme of the European Union. Grant Agreement No. 101160667.
