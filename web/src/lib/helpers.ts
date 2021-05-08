import { MoonPhase } from 'astronomy-engine';
import { getUserLocales } from './get-locale';

export const capitalize = (string: string): string =>
  string.charAt(0) + string.slice(1).toLowerCase();

interface MoonPhaseInfo {
  emoji: string;
  text: string;
}

export const getMoonPhase = (date: Date): MoonPhaseInfo => {
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
      return {
        emoji: '🌑',
        text: 'New Moon',
      };
    case moonPhase >= 45 && moonPhase < 90:
      return {
        emoji: '🌒',
        text: 'Waxing crescent moon',
      };
    case moonPhase >= 90 && moonPhase < 135:
      return {
        emoji: '🌓',
        text: 'First quater moon',
      };
    case moonPhase >= 135 && moonPhase < 180:
      return {
        emoji: '🌔',
        text: 'Waxing gibbous moon',
      };
    case moonPhase >= 180 && moonPhase < 225:
      return {
        emoji: '🌕',
        text: 'Full moon',
      };
    case moonPhase >= 225 && moonPhase < 270:
      return {
        emoji: '🌖',
        text: 'Waning gibbous moon',
      };
    case moonPhase >= 270 && moonPhase < 315:
      return {
        emoji: '🌗',
        text: 'Last quarter moon',
      };
    case moonPhase >= 315 && moonPhase < 359:
      return {
        emoji: '🌘',
        text: 'Waning crescent moon',
      };
    default:
      return {
        emoji: '🌝',
        text: '',
      };
  }
};

export const dateStringAsIsoString = (date: string) =>
  new Date(date).toISOString();

interface DateText {
  dateString: string;
  options: Intl.DateTimeFormatOptions;
}

export const dateText = ({ dateString, options }: DateText) => {
  const [locale] = getUserLocales();
  return new Intl.DateTimeFormat(locale, options).format(new Date(dateString));
};

export const dayOptions: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  weekday: 'long',
};

export const timeOptions: Intl.DateTimeFormatOptions = {
  hour12: true,
  hour: 'numeric',
  minute: 'numeric',
};

const toDegreesMinutesAndSeconds = (coordinate: number) => {
  const absolute = Math.abs(coordinate);
  const degrees = Math.floor(absolute);
  const minutesNotTruncated = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesNotTruncated);
  const seconds = Math.floor((minutesNotTruncated - minutes) * 60);

  return `${degrees}° ${minutes}′ ${seconds}″`;
};

interface ConvertDMSProps {
  lat: number;
  lng: number;
}

export const convertToDMS = ({ lat, lng }: ConvertDMSProps) => {
  const latitude = toDegreesMinutesAndSeconds(lat);
  const latitudeCardinal = lat >= 0 ? 'N' : 'S';

  const longitude = toDegreesMinutesAndSeconds(lng);
  const longitudeCardinal = lng >= 0 ? 'E' : 'W';

  return `${latitude} ${latitudeCardinal}, ${longitude} ${longitudeCardinal}`;
};
