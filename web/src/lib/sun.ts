export interface SunTimes {
  sunrise: Date | null;
  sunset: Date | null;
}

const RAD = Math.PI / 180;

/** Days in the given date's year (UTC). */
function dayOfYear(date: Date): number {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  return Math.floor((date.getTime() - start) / 86_400_000);
}

/**
 * NOAA sunrise/sunset approximation (zenith 90.833° — official).
 * Returns null for polar day/night. Accurate to ~1 minute at
 * mid-latitudes, which is plenty for deciding when to practise.
 */
function sunEventUtc(
  date: Date,
  lat: number,
  lng: number,
  isRise: boolean,
): Date | null {
  const n = dayOfYear(date);
  const lngHour = lng / 15;
  const t = n + ((isRise ? 6 : 18) - lngHour) / 24;

  // Sun's mean anomaly → true longitude
  const meanAnomaly = 0.9856 * t - 3.289;
  let trueLong =
    meanAnomaly +
    1.916 * Math.sin(meanAnomaly * RAD) +
    0.02 * Math.sin(2 * meanAnomaly * RAD) +
    282.634;
  trueLong = ((trueLong % 360) + 360) % 360;

  // Right ascension, adjusted into the same quadrant as trueLong
  let rightAscension = Math.atan(0.91764 * Math.tan(trueLong * RAD)) / RAD;
  rightAscension = ((rightAscension % 360) + 360) % 360;
  rightAscension +=
    Math.floor(trueLong / 90) * 90 - Math.floor(rightAscension / 90) * 90;
  rightAscension /= 15;

  // Declination
  const sinDec = 0.39782 * Math.sin(trueLong * RAD);
  const cosDec = Math.cos(Math.asin(sinDec));

  // Local hour angle
  const cosH =
    (Math.cos(90.833 * RAD) - sinDec * Math.sin(lat * RAD)) /
    (cosDec * Math.cos(lat * RAD));
  if (cosH > 1 || cosH < -1) return null; // polar night / midnight sun

  let hourAngle = isRise ? 360 - Math.acos(cosH) / RAD : Math.acos(cosH) / RAD;
  hourAngle /= 15;

  const localMeanTime = hourAngle + rightAscension - 0.06571 * t - 6.622;
  const utc = (((localMeanTime - lngHour) % 24) + 24) % 24;

  const midnight = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
  );
  return new Date(midnight + utc * 3_600_000);
}

/** Sunrise and sunset for a date at the given coordinates. */
export function getSunTimes(date: Date, lat: number, lng: number): SunTimes {
  return {
    sunrise: sunEventUtc(date, lat, lng, true),
    sunset: sunEventUtc(date, lat, lng, false),
  };
}
