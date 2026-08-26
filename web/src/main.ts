import './styles.css';
import type { AppState } from './lib/helpers';
import { convertToDMS } from './lib/helpers';
import { loadWasm } from './lib/wasm';
import { destroyCalendar, renderCalendar } from './pages/calendar';
import { destroyHome, renderHome } from './pages/home';
import { destroyPractice, renderPractice } from './pages/practice';

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

interface Route {
  hash: string;
  label: string;
  className: string;
  render: (container: HTMLElement, state: AppState) => void;
  destroy: () => void;
}

const routes: Route[] = [
  {
    hash: '#/',
    label: 'Now',
    className: 'home',
    render: renderHome,
    destroy: destroyHome,
  },
  {
    hash: '#/calendar',
    label: 'Calendar',
    className: 'calendar',
    render: renderCalendar,
    destroy: destroyCalendar,
  },
  {
    hash: '#/practice',
    label: 'Practice',
    className: 'practice',
    render: renderPractice,
    destroy: destroyPractice,
  },
];

let currentDestroy: (() => void) | null = null;

function navigate(): void {
  if (currentDestroy) {
    currentDestroy();
    currentDestroy = null;
  }

  const hash = window.location.hash || '#/';
  const app = document.getElementById('app');
  if (!app) return;

  const route = routes.find((r) => r.hash === hash) ?? routes[0];

  // Build shell
  app.innerHTML = '';
  app.className = route.className;

  // Header — link to every page except the current one
  const header = document.createElement('header');
  const nav = document.createElement('nav');
  const ul = document.createElement('ul');

  for (const other of routes) {
    if (other.hash === route.hash) continue;
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = other.hash;
    link.textContent = other.label;
    li.appendChild(link);
    ul.appendChild(li);
  }

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
  route.render(content, state);
  currentDestroy = route.destroy;
}

// ── Bootstrap ────────────────────────────────────────

loadWasm().then(() => {
  window.addEventListener('hashchange', navigate);
  navigate();
  requestGeolocation();
});
