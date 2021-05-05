import { MoonPhase } from 'astronomy-engine';

import '../../lib/date';
import { GetElement, Calendars } from '../../../@types';

const DAYS_RANGE = 2;

// the difference in ecliptic longitude between the center of the Sun and the center of the Moon
// divided by
// a synodic month(about 29.53 days) as the Moon's orbital positions around Earth and Earth around the Sun shift.
const DEGREES_PER_DAY = Number((360 / 29.53).toPrecision(6)); // 12.1571

const isInWaterRange = (moonPhaseDegrees: number): boolean =>
  (moonPhaseDegrees >= 360 - (DAYS_RANGE + 1) * DEGREES_PER_DAY &&
    moonPhaseDegrees < 360) ||
  (moonPhaseDegrees >= 0 &&
    moonPhaseDegrees <= 0 + DAYS_RANGE * DEGREES_PER_DAY);

interface IsInElementRange {
  moonPhaseDegrees: number;
  rangeStart: 0 | 90 | 180 | 270 | 360;
}

const isInElementRange = ({
  moonPhaseDegrees,
  rangeStart,
}: IsInElementRange): boolean =>
  moonPhaseDegrees >= rangeStart - (DAYS_RANGE + 1) * DEGREES_PER_DAY &&
  moonPhaseDegrees <= rangeStart + DAYS_RANGE * DEGREES_PER_DAY;

const getLunarElement = ({
  date,
  hemisphere,
  exact,
}: GetElement): Calendars['lunar'] => {
  const newDate = new Date(date);
  newDate.setUTCHours(0, 0, 0, 0); // Set beginning of the day

  const moonPhaseDegrees = MoonPhase(newDate);

  switch (true) {
    case isInWaterRange(moonPhaseDegrees):
      return 'WATER';
    // 90 = first quarter
    case isInElementRange({ moonPhaseDegrees, rangeStart: 90 }):
      return 'WOOD';
    // 180 = full moon
    case isInElementRange({ moonPhaseDegrees, rangeStart: 180 }):
      return 'FIRE';
    // 270 = third quarter
    case isInElementRange({ moonPhaseDegrees, rangeStart: 270 }):
      return 'METAL';
    default:
      return 'EARTH';
  }
};

export default getLunarElement;
