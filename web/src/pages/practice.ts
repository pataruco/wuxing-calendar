import type { AppState } from '../lib/helpers';
import { capitalize, formatDate, formatTime } from '../lib/helpers';
import type { Session } from '../lib/practice';
import { CONSTANTS, DIET_CAVEAT, PRACTICE } from '../lib/practice';
import { getSunTimes } from '../lib/sun';
import { get_solar } from '../lib/wasm';

// Fallback when geolocation is denied or unavailable
const LONDON = { lat: 51.5074, lng: -0.1278 };

let intervalId: ReturnType<typeof setInterval> | null = null;
let lastPhase = '';

export function renderPractice(container: HTMLElement, state: AppState): void {
  container.innerHTML = '';

  const main = document.createElement('main');
  main.innerHTML = `
    <section class="practice-hero">
      <p class="phase-label" id="practice-phase"></p>
      <div class="practice-hero-text">
        <h2 id="practice-heading"></h2>
        <p id="practice-date"></p>
        <p class="practice-sun" id="practice-sun"></p>
      </div>
    </section>
    <div id="practice-sessions"></div>
    <p class="practice-constants">${CONSTANTS}</p>
    <section class="practice-foods">
      <h3>Eating with the phase</h3>
      <p class="practice-flavours" id="practice-flavours"></p>
      <ul id="practice-eat"></ul>
      <p class="practice-why" id="practice-why"></p>
    </section>
    <p class="practice-caveat">${DIET_CAVEAT}</p>
  `;
  container.appendChild(main);

  lastPhase = '';
  update(state);
  // The solar phase changes at most twice a day; a minute tick is generous.
  intervalId = setInterval(() => update(state), 60_000);
}

export function destroyPractice(): void {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

function update(state: AppState): void {
  const now = new Date();
  const phase = get_solar(now.getTime(), state.hemisphere, true);

  const lat = state.latitude ?? LONDON.lat;
  const lng = state.longitude ?? LONDON.lng;
  const { sunrise, sunset } = getSunTimes(now, lat, lng);

  const sunEl = document.getElementById('practice-sun');
  if (sunEl) {
    const rise = sunrise ? formatTime(sunrise) : '—';
    const set = sunset ? formatTime(sunset) : '—';
    const where = state.latitude == null ? ' (London)' : '';
    sunEl.textContent = `Sunrise ${rise} · Sunset ${set}${where}`;
  }

  const dateEl = document.getElementById('practice-date');
  if (dateEl) dateEl.textContent = formatDate(now);

  if (phase === lastPhase) return; // static content only re-renders on change
  lastPhase = phase;

  const practice = PRACTICE[phase];
  if (!practice) return;

  document.title = `\u{1F9D8} ${phase} practice`;

  const label = document.getElementById('practice-phase');
  if (label) {
    label.textContent = capitalize(phase);
    label.className = `phase-label ${phase.toLowerCase()}`;
  }

  const heading = document.getElementById('practice-heading');
  if (heading)
    heading.textContent = `${practice.organ} \u00B7 ${practice.motto}`;

  const sessions = document.getElementById('practice-sessions');
  if (sessions) {
    sessions.innerHTML = '';
    sessions.append(
      renderSession('Morning', practice.morning, phase),
      renderSession('Evening', practice.evening, phase),
    );
  }

  const flavours = document.getElementById('practice-flavours');
  if (flavours)
    flavours.textContent = `Flavour: ${practice.foods.flavour} \u00B7 Colour: ${practice.foods.colour}`;

  const eat = document.getElementById('practice-eat');
  if (eat) {
    eat.innerHTML = '';
    for (const food of practice.foods.eat) {
      const li = document.createElement('li');
      li.textContent = food;
      eat.appendChild(li);
    }
  }

  const why = document.getElementById('practice-why');
  if (why) why.textContent = practice.foods.why;
}

function renderSession(
  label: string,
  session: Session,
  phase: string,
): HTMLElement {
  const section = document.createElement('section');
  section.className = `practice-session ${phase.toLowerCase()}`;

  const header = document.createElement('header');
  const tag = document.createElement('span');
  tag.className = 'practice-tag';
  tag.textContent = label;
  const duration = document.createElement('span');
  duration.className = 'practice-duration';
  duration.textContent = session.duration;
  header.append(tag, duration);

  const title = document.createElement('h3');
  title.textContent = session.title;

  const list = document.createElement('ol');
  for (const exercise of session.exercises) {
    const li = document.createElement('li');
    const name = document.createElement('strong');
    name.textContent = exercise.name;
    const detail = document.createElement('span');
    detail.textContent = exercise.detail;
    li.append(name, detail);
    list.appendChild(li);
  }

  section.append(header, title, list);

  if (session.close) {
    const close = document.createElement('p');
    close.className = 'practice-close';
    close.textContent = session.close;
    section.appendChild(close);
  }

  return section;
}
