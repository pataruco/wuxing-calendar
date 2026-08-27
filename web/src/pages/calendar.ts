import type { AppState } from '../lib/helpers';
import {
  capitalize,
  getMoonDisplay,
  getSeasonLabel,
  getUserLocales,
} from '../lib/helpers';
import {
  get_lunar,
  get_moon_angle,
  get_season_timestamp,
  get_solar,
} from '../lib/wasm';

interface SeasonMarker {
  label: string;
  type: string;
}

const locale = getUserLocales()[0];

let currentYear: number;
let currentMonth: number;

export function renderCalendar(container: HTMLElement, state: AppState): void {
  const now = new Date();
  currentYear = now.getFullYear();
  currentMonth = now.getMonth();

  container.innerHTML = '';

  const main = document.createElement('main');
  main.innerHTML = `
    <div class="calendar-nav">
      <button id="cal-prev" aria-label="Previous month">&larr; Prev</button>
      <h2 id="cal-title"></h2>
      <button id="cal-next" aria-label="Next month">Next &rarr;</button>
    </div>
    <div class="calendar-grid" id="cal-grid"></div>
    <div class="calendar-legend">
      <p>☀️ top bar: solar phase &middot; \u{1F319} bottom bar: lunar phase</p>
      <ul>
        <li><span class="legend-swatch wood"></span>Wood</li>
        <li><span class="legend-swatch fire"></span>Fire</li>
        <li><span class="legend-swatch earth"></span>Earth</li>
        <li><span class="legend-swatch metal"></span>Metal</li>
        <li><span class="legend-swatch water"></span>Water</li>
      </ul>
    </div>
  `;
  container.appendChild(main);

  document.getElementById('cal-prev')?.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    drawMonth(state);
  });

  document.getElementById('cal-next')?.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    drawMonth(state);
  });

  drawMonth(state);
}

function drawMonth(state: AppState): void {
  const grid = document.getElementById('cal-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const title = document.getElementById('cal-title');
  const monthDate = new Date(currentYear, currentMonth, 1);
  if (title)
    title.textContent = new Intl.DateTimeFormat(locale, {
      month: 'long',
      year: 'numeric',
    }).format(monthDate);

  // Day headers — both label lengths in the DOM, CSS picks one
  for (let d = 0; d < 7; d++) {
    const ref = new Date(2024, 0, d + 1); // Mon Jan 1 2024 = Monday
    const header = document.createElement('div');
    header.className = 'day-header';
    const long = document.createElement('span');
    long.className = 'cal-long';
    long.textContent = new Intl.DateTimeFormat(locale, {
      weekday: 'long',
    }).format(ref);
    const short = document.createElement('span');
    short.className = 'cal-short';
    short.textContent = new Intl.DateTimeFormat(locale, {
      weekday: 'short',
    }).format(ref);
    header.append(long, short);
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
    numEl.textContent = String(cellDate.getDate());
    cell.appendChild(numEl);

    if (isCurrentMonth) {
      const ms = cellDate.getTime();

      // Solar phase (exact: true)
      const solar = get_solar(ms, state.hemisphere, true);
      cell.appendChild(
        buildEvent(
          solar.toLowerCase(),
          '\u2600\uFE0F',
          capitalize(solar),
          'Solar',
        ),
      );

      // Lunar phase (exact: false)
      const lunar = get_lunar(ms, false);
      const angle = get_moon_angle(ms);
      const moon = getMoonDisplay(angle);
      cell.appendChild(
        buildEvent(lunar.toLowerCase(), moon.emoji, capitalize(lunar), 'Lunar'),
      );

      // Season markers
      const dateKey = `${cellDate.getFullYear()}-${String(cellDate.getMonth() + 1).padStart(2, '0')}-${String(cellDate.getDate()).padStart(2, '0')}`;
      if (seasonMarkers[dateKey]) {
        const marker = seasonMarkers[dateKey];
        const markerEvent = document.createElement('div');
        markerEvent.className = `event marker ${marker.type}`;
        const long = document.createElement('span');
        long.className = 'cal-long';
        long.textContent = marker.label;
        const short = document.createElement('span');
        short.className = 'cal-short';
        short.textContent = capitalize(marker.type);
        markerEvent.append(long, short);
        cell.appendChild(markerEvent);
      }
    }

    grid.appendChild(cell);
  }
}

/**
 * Build a phase event pill: emoji + text on wide screens,
 * collapsed by CSS to a colour bar on narrow ones. The full
 * reading stays available to touch (title) and screen readers.
 */
function buildEvent(
  phaseClass: string,
  emoji: string,
  text: string,
  kind: string,
): HTMLElement {
  const event = document.createElement('div');
  event.className = `event ${phaseClass}`;
  const reading = `${kind}: ${text}`;
  event.title = reading;
  event.setAttribute('role', 'img');
  event.setAttribute('aria-label', reading);

  const icon = document.createElement('span');
  icon.className = 'event-icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = emoji;

  const label = document.createElement('span');
  label.className = 'event-text';
  label.setAttribute('aria-hidden', 'true');
  label.textContent = text;

  event.append(icon, label);
  return event;
}

function buildSeasonMarkers(year: number): Record<string, SeasonMarker> {
  const markers: Record<string, SeasonMarker> = {};
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

export function destroyCalendar(): void {
  // No timers to clean up
}
