import {
  capitalize,
  formatDate,
  formatTime,
  getMoonDisplay,
} from '../lib/helpers.js';
import { get_moon_angle, get_phases } from '../lib/wasm.js';

let intervalId = null;

export function renderHome(container, state) {
  container.innerHTML = '';

  const main = document.createElement('main');

  // ── Solar section ──────────────────────────────────
  const solarSection = document.createElement('section');
  solarSection.className = 'solar';

  const solarLabel = document.createElement('p');
  solarLabel.className = 'phase-label';
  solarLabel.id = 'solar-label';

  const solarDate = document.createElement('h2');
  solarDate.id = 'solar-date';

  solarSection.append(solarLabel, solarDate);

  // ── Hour section ───────────────────────────────────
  const hourSection = document.createElement('section');
  hourSection.className = 'hour';

  const hourLabel = document.createElement('p');
  hourLabel.className = 'phase-label';
  hourLabel.id = 'hour-label';

  const hourTime = document.createElement('h1');
  hourTime.id = 'hour-time';

  hourSection.append(hourLabel, hourTime);

  // ── Lunar section ──────────────────────────────────
  const lunarSection = document.createElement('section');
  lunarSection.className = 'lunar';

  const lunarLabel = document.createElement('p');
  lunarLabel.className = 'phase-label';
  lunarLabel.id = 'lunar-label';

  const lunarInfo = document.createElement('div');
  lunarInfo.className = 'lunar-info';

  const moonEmoji = document.createElement('p');
  moonEmoji.className = 'moon-emoji';
  moonEmoji.id = 'moon-emoji';

  const moonText = document.createElement('p');
  moonText.className = 'moon-text';
  moonText.id = 'moon-text';

  lunarInfo.append(moonEmoji, moonText);
  lunarSection.append(lunarLabel, lunarInfo);

  main.append(solarSection, hourSection, lunarSection);
  container.appendChild(main);

  // Start ticking
  update(state);
  intervalId = setInterval(() => update(state), 1000);
}

function update(state) {
  const now = new Date();
  const ms = now.getTime();
  const phases = get_phases(ms, state.hemisphere, true);
  const angle = get_moon_angle(ms);
  const moon = getMoonDisplay(angle);

  // Update page title
  document.title = `\u2600\uFE0F ${phases.solar} | \uD83C\uDF19 ${phases.lunar} | \u231B\uFE0F ${phases.hour}`;

  // Solar
  const solarLabel = document.getElementById('solar-label');
  solarLabel.textContent = capitalize(phases.solar);
  solarLabel.className = `phase-label ${phases.solar.toLowerCase()}`;
  document.getElementById('solar-date').textContent = formatDate(now);

  // Hour
  const hourLabel = document.getElementById('hour-label');
  hourLabel.textContent = capitalize(phases.hour);
  hourLabel.className = `phase-label ${phases.hour.toLowerCase()}`;
  document.getElementById('hour-time').textContent = formatTime(now);

  // Lunar
  const lunarLabel = document.getElementById('lunar-label');
  lunarLabel.textContent = capitalize(phases.lunar);
  lunarLabel.className = `phase-label ${phases.lunar.toLowerCase()}`;
  document.getElementById('moon-emoji').textContent = moon.emoji;
  document.getElementById('moon-text').textContent = moon.text;
}

export function destroyHome() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}
