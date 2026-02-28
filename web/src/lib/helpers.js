/** Capitalize first letter, lowercase the rest. */
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/** Get the user's preferred locales (falls back to en-GB). */
export function getUserLocales() {
  const raw = [
    ...(navigator.languages || []),
    navigator.language,
    navigator.userLanguage,
    navigator.browserLanguage,
    navigator.systemLanguage,
  ].filter(Boolean);

  const seen = new Set();
  const result = [];
  for (const locale of raw) {
    const normalized = locale.replace('_', '-');
    if (!seen.has(normalized)) {
      seen.add(normalized);
      result.push(normalized);
    }
  }
  return result.length ? result : ['en-GB'];
}

const locale = getUserLocales()[0];

/** Format a date with Intl, using the user's locale. */
export function formatDate(date) {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(date);
}

/** Format time (12h with AM/PM). */
export function formatTime(date) {
  return new Intl.DateTimeFormat(locale, {
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);
}

/**
 * Map moon phase angle (0–360°) to an emoji and description.
 * 8 sectors of 45° each.
 */
export function getMoonDisplay(angleDeg) {
  if (angleDeg < 45) return { emoji: '\u{1F311}', text: 'New Moon' };
  if (angleDeg < 90) return { emoji: '\u{1F312}', text: 'Waxing Crescent' };
  if (angleDeg < 135) return { emoji: '\u{1F313}', text: 'First Quarter' };
  if (angleDeg < 180) return { emoji: '\u{1F314}', text: 'Waxing Gibbous' };
  if (angleDeg < 225) return { emoji: '\u{1F315}', text: 'Full Moon' };
  if (angleDeg < 270) return { emoji: '\u{1F316}', text: 'Waning Gibbous' };
  if (angleDeg < 315) return { emoji: '\u{1F317}', text: 'Last Quarter' };
  return { emoji: '\u{1F318}', text: 'Waning Crescent' };
}

/** Convert decimal lat/lng to DMS string. */
export function convertToDMS(lat, lng) {
  function toDMS(dd, isLat) {
    const dir = dd >= 0 ? (isLat ? 'N' : 'E') : isLat ? 'S' : 'W';
    const abs = Math.abs(dd);
    const deg = Math.floor(abs);
    const minFloat = (abs - deg) * 60;
    const min = Math.floor(minFloat);
    const sec = Math.round((minFloat - min) * 60);
    return `${deg}\u00B0 ${min}\u2032 ${sec}\u2033 ${dir}`;
  }
  return `${toDMS(lat, true)}, ${toDMS(lng, false)}`;
}

/** Get season label for marker events. */
export function getSeasonLabel(season) {
  switch (season) {
    case 0:
      return 'March Equinox';
    case 1:
      return 'June Solstice';
    case 2:
      return 'September Equinox';
    case 3:
      return 'December Solstice';
    default:
      return '';
  }
}
