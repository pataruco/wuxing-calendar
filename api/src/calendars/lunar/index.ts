import {
  MoonQuarter,
  NextMoonQuarter,
  SearchMoonQuarter,
  MoonPhase,
} from 'astronomy-engine';

import '../../lib/date';
import { GetElements } from '../../../@types';

const DAYS_RANGE = 2;
// the difference in ecliptic longitude between the center of the Sun and the center of the Moon /
// The lunar phases gradually change over a synodic month(about 29.53 days) as the Moon's orbital positions around Earth and Earth around the Sun shift.

const DEGREES_PER_DAY = Number((359 / 29.53).toPrecision(6)); // 12.1571

interface GetMoonPhaseRange {
  currentMoonQuarter: MoonQuarter;
  nextMoonQuarter: MoonQuarter;
}

// const isInMoonRange = (
//   currentMoonPhaseDegrees: number,
//   moonPhaseDegrees: number,
// ): boolean => {
//   return (
//   );
// };

const getLunarElement = (date: Date): GetElements['lunar'] => {
  date.setUTCHours(0, 0, 0, 0); // Set beginning of the day

  const moonPhaseDegrees = MoonPhase(date);

  // TODO: calculate if current moon phase is between the range of days

  // switch (true) {
  //   case value:
  //     break;

  //   default:
  //     break;
  // }

  console.log({
    moonPhaseDegrees: moonPhaseDegrees.toFixed(6),
    DEGREES_PER_DAY,
  });

  return 'EARTH';
};

export default getLunarElement;
