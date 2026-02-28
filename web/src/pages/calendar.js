import {
  capitalize,
  getMoonDisplay,
  getSeasonLabel,
  getUserLocales,
} from '../lib/helpers.js';
import {
  get_lunar,
  get_moon_angle,
  get_season_timestamp,
  get_solar,
} from '../lib/wasm.js';

const locale = getUserLocales()[0];

let currentYear;
let currentMonth;

export function renderCalendar(container, state) {
  const now = new Date();
  currentYear = now.getFullYear();
  currentMonth = now.getMonth();

  container.innerHTML = '';

  const main = document.createElement('main');
  main.innerHTML = `
    <div class="calendar-nav">
      <button id="cal-prev">&larr; Prev</button>
      <h2 id="cal-title"></h2>
      <button id="cal-next">Next &rarr;</button>
    </div>
    <div class="calendar-grid" id="cal-grid"></div>
  `;
  container.appendChild(main);

  document.getElementById('cal-prev').addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    drawMonth(state);
  });

  document.getElementById('cal-next').addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    drawMonth(state);
  });

  drawMonth(state);
}

function drawMonth(state) {
  const grid = document.getElementById('cal-grid');
  grid.innerHTML = '';

  const title = document.getElementById('cal-title');
  const monthDate = new Date(currentYear, currentMonth, 1);
  title.textContent = new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
  }).format(monthDate);

  // Day headers
  const isNarrow = window.innerWidth < 750;
  const dayFormat = isNarrow ? 'short' : 'long';
  for (let d = 0; d < 7; d++) {
    const ref = new Date(2024, 0, d + 1); // Mon Jan 1 2024 = Monday
    const header = document.createElement('div');
    header.className = 'day-header';
    header.textContent = new Intl.DateTimeFormat(locale, {
      weekday: dayFormat,
    }).format(ref);
    grid.appendChild(header);
  }

  // Build season markers for the year
  const seasonMarkers = buildSeasonMarkers(currentYear);

  // Calendar cells
  const firstDay = new Date(currentYear, currentMonth, 1);
  const startOffset = (firstDay.getDay() + 6) % 7; // Monday = 0

  const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
  const totalCells = Math.ceil((startOffset + lastDay) / 7) * 7;

  const today = new Date();

  for (let i = 0; i < totalCells; i++) {
    const dayNum = i - startOffset + 1;
    const cellDate = new Date(currentYear, currentMonth, dayNum);
    const cell = document.createElement('div');
    cell.className = 'day-cell';

    const isCurrentMonth = dayNum >= 1 && dayNum <= lastDay;
    if (!isCurrentMonth) {
      cell.classList.add('outside');
    }

    if (
      isCurrentMonth &&
      cellDate.getFullYear() === today.getFullYear() &&
      cellDate.getMonth() === today.getMonth() &&
      cellDate.getDate() === today.getDate()
    ) {
      cell.classList.add('today');
    }

    // Day number
    const numEl = document.createElement('div');
    numEl.className = 'day-number';
    numEl.textContent = cellDate.getDate();
    cell.appendChild(numEl);

    if (isCurrentMonth) {
      const ms = cellDate.getTime();

      // Solar phase (exact: true)
      const solar = get_solar(ms, state.hemisphere, true);
      const solarEvent = document.createElement('div');
      solarEvent.className = `event ${solar.toLowerCase()}`;
      solarEvent.textContent = `\u2600\uFE0F ${capitalize(solar)}`;
      cell.appendChild(solarEvent);

      // Lunar phase (exact: false)
      const lunar = get_lunar(ms, false);
      const angle = get_moon_angle(ms);
      const moon = getMoonDisplay(angle);
      const lunarEvent = document.createElement('div');
      lunarEvent.className = `event ${lunar.toLowerCase()}`;
      lunarEvent.textContent = `${moon.emoji} ${capitalize(lunar)}`;
      cell.appendChild(lunarEvent);

      // Season markers
      const dateKey = `${cellDate.getFullYear()}-${String(cellDate.getMonth() + 1).padStart(2, '0')}-${String(cellDate.getDate()).padStart(2, '0')}`;
      if (seasonMarkers[dateKey]) {
        const markerEvent = document.createElement('div');
        markerEvent.className = `event ${seasonMarkers[dateKey].type}`;
        markerEvent.textContent = seasonMarkers[dateKey].label;
        cell.appendChild(markerEvent);
      }
    }

    grid.appendChild(cell);
  }
}

function buildSeasonMarkers(year) {
  const markers = {};
  const types = ['equinox', 'solstice', 'equinox', 'solstice'];

  for (let s = 0; s < 4; s++) {
    const ms = get_season_timestamp(year, s);
    const d = new Date(ms);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    markers[key] = {
      label: getSeasonLabel(s),
      type: types[s],
    };
  }
  return markers;
}

export function destroyCalendar() {
  // No timers to clean up
}
