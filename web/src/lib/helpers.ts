import { MoonPhase } from 'astronomy-engine';

export const capitalize = (string: string): string =>
  string.charAt(0) + string.slice(1).toLowerCase();

export const getMoonPhase = (date: Date): string => {
  /*
🌑  New moon = 0
🌒  Waxing crescent moon
🌓  First quater moon = 90
🌔  Waxing gibbous moon
🌕  Full moon = 180
🌖  Waning gibbous moon
🌗  Last quarter moon = 270
🌘  Waning crescent moon
*/
  const moonPhase = MoonPhase(date);
  switch (true) {
    case moonPhase >= 0 && moonPhase < 45:
      return '🌑';
    case moonPhase >= 45 && moonPhase < 90:
      return '🌒';
    case moonPhase >= 90 && moonPhase < 135:
      return '🌓';
    case moonPhase >= 135 && moonPhase < 180:
      return '🌔';
    case moonPhase >= 180 && moonPhase < 225:
      return '🌕';
    case moonPhase >= 225 && moonPhase < 270:
      return '🌖';
    case moonPhase >= 270 && moonPhase < 315:
      return '🌗';
    case moonPhase >= 315 && moonPhase < 359:
      return '🌘';
    default:
      return '🌝';
  }
};
