import { MoonPhase } from 'astronomy-engine';

import '../../lib/date';
import { GetElement, Calendars } from '../../../@types';

const DAYS_RANGE = 2;
const EXACT_DAY_RANGE = 2.5;

// the difference in ecliptic longitude between the center of the Sun and the center of the Moon
// divided by
// a synodic month(about 29.53 days) as the Moon's orbital positions around Earth and Earth around the Sun shift.
const DEGREES_PER_DAY = Number((360 / 29.53).toPrecision(6)); // 12.1571

interface IsInElementRange {
  moonPhaseDegrees: number;
  rangeStart: 0 | 90 | 180 | 270 | 360;
  exact: GetElement['exact'];
}

const isInWaterRange = ({
  moonPhaseDegrees,
  exact,
}: Omit<IsInElementRange, 'rangeStart'>): boolean => {
  if (exact) {
    return (
      (moonPhaseDegrees >= 360 - EXACT_DAY_RANGE * DEGREES_PER_DAY &&
        moonPhaseDegrees < 360) ||
      (moonPhaseDegrees >= 0 &&
        moonPhaseDegrees <= 0 + EXACT_DAY_RANGE * DEGREES_PER_DAY)
    );
  }

  return (
    (moonPhaseDegrees >= 360 - (DAYS_RANGE + 1) * DEGREES_PER_DAY &&
      moonPhaseDegrees < 360) ||
    (moonPhaseDegrees >= 0 &&
      moonPhaseDegrees <= 0 + DAYS_RANGE * DEGREES_PER_DAY)
  );
};

const isInElementRange = ({
  moonPhaseDegrees,
  rangeStart,
  exact,
}: IsInElementRange): boolean => {
  if (exact) {
    return (
      moonPhaseDegrees >= rangeStart - EXACT_DAY_RANGE * DEGREES_PER_DAY &&
      moonPhaseDegrees <= rangeStart + EXACT_DAY_RANGE * DEGREES_PER_DAY
    );
  }

  return (
    moonPhaseDegrees >= rangeStart - (DAYS_RANGE + 1) * DEGREES_PER_DAY &&
    moonPhaseDegrees <= rangeStart + DAYS_RANGE * DEGREES_PER_DAY
  );
};

const getLunarElement = ({
  date,
  exact,
}: Omit<GetElement, 'hemisphere'>): Calendars['lunar'] => {
  const notExactDay = new Date(date);
  notExactDay.setUTCHours(0, 0, 0, 0); // Set beginning of the day

  const exactDay = new Date(date);

  const newDate = exact ? exactDay : notExactDay;

  const moonPhaseDegrees = MoonPhase(newDate);

  switch (true) {
    case isInWaterRange({ moonPhaseDegrees, exact }):
      return 'WATER';
    // 90 = first quarter
    case isInElementRange({ moonPhaseDegrees, rangeStart: 90, exact }):
      return 'WOOD';
    // 180 = full moon
    case isInElementRange({ moonPhaseDegrees, rangeStart: 180, exact }):
      return 'FIRE';
    // 270 = third quarter
    case isInElementRange({ moonPhaseDegrees, rangeStart: 270, exact }):
      return 'METAL';
    default:
      return 'EARTH';
  }
};

export default getLunarElement;
