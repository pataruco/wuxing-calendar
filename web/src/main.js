import './styles.css';
import { convertToDMS } from './lib/helpers.js';
import { loadWasm } from './lib/wasm.js';
import { destroyCalendar, renderCalendar } from './pages/calendar.js';
import { destroyHome, renderHome } from './pages/home.js';

// ── App state ────────────────────────────────────────

const state = {
  hemisphere: 'NORTHERN',
  latitude: null,
  longitude: null,
};

// ── Geolocation ──────────────────────────────────────

function requestGeolocation() {
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

function updateCoordinates() {
  const el = document.getElementById('coordinates');
  if (el && state.latitude != null) {
    el.textContent = convertToDMS(state.latitude, state.longitude);
  }
}

// ── Router ───────────────────────────────────────────

let currentDestroy = null;

function navigate() {
  if (currentDestroy) {
    currentDestroy();
    currentDestroy = null;
  }

  const hash = window.location.hash || '#/';
  const app = document.getElementById('app');

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
