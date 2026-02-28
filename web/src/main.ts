import './styles.css';
import type { AppState } from './lib/helpers';
import { convertToDMS } from './lib/helpers';
import { loadWasm } from './lib/wasm';
import { destroyCalendar, renderCalendar } from './pages/calendar';
import { destroyHome, renderHome } from './pages/home';

// ── App state ────────────────────────────────────────

const state: AppState = {
  hemisphere: 'NORTHERN',
  latitude: null,
  longitude: null,
};

// ── Geolocation ──────────────────────────────────────

function requestGeolocation(): void {
  if (!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      state.latitude = pos.coords.latitude;
      state.longitude = pos.coords.longitude;
      state.hemisphere = pos.coords.latitude >= 0 ? 'NORTHERN' : 'SOUTHERN';
      updateCoordinates();
    },
    () => {
      // Denied or unavailable — keep NORTHERN default
    },
  );
}

function updateCoordinates(): void {
  const el = document.getElementById('coordinates');
  if (el && state.latitude != null && state.longitude != null) {
    el.textContent = convertToDMS(state.latitude, state.longitude);
  }
}

// ── Router ───────────────────────────────────────────

let currentDestroy: (() => void) | null = null;

function navigate(): void {
  if (currentDestroy) {
    currentDestroy();
    currentDestroy = null;
  }

  const hash = window.location.hash || '#/';
  const app = document.getElementById('app');
  if (!app) return;

  // Build shell
  app.innerHTML = '';
  app.className = hash === '#/calendar' ? 'calendar' : 'home';

  // Header
  const header = document.createElement('header');
  const nav = document.createElement('nav');
  const ul = document.createElement('ul');
  const li = document.createElement('li');
  const link = document.createElement('a');

  if (hash === '#/calendar') {
    link.href = '#/';
    link.textContent = 'Now';
  } else {
    link.href = '#/calendar';
    link.textContent = 'Calendar';
  }

  li.appendChild(link);
  ul.appendChild(li);
  nav.appendChild(ul);
  header.appendChild(nav);

  // Content container
  const content = document.createElement('div');
  content.id = 'content';

  // Footer
  const footer = document.createElement('footer');
  const year = new Date().getFullYear();
  footer.innerHTML = `
    <p>Made with <span style="color:red">&hearts;</span> by
      <a href="https://github.com/pataruco" target="_blank" rel="noopener">@pataruco</a>
      ${year}
    </p>
    <p id="coordinates"></p>
  `;

  app.append(header, content, footer);
  updateCoordinates();

  // Render page
  if (hash === '#/calendar') {
    renderCalendar(content, state);
    currentDestroy = destroyCalendar;
  } else {
    renderHome(content, state);
    currentDestroy = destroyHome;
  }
}

// ── Bootstrap ────────────────────────────────────────

loadWasm().then(() => {
  window.addEventListener('hashchange', navigate);
  navigate();
  requestGeolocation();
});
