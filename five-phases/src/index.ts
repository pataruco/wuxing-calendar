import { Calendars, GetPhase } from '../@types';
import getHourPhase from './calendars/hour';
import getLunarPhase from './calendars/lunar';
import getSolarPhase from './calendars/solar';

const getPhases = ({
  date,
  hemisphere = 'NORTHERN',
  exact = false,
}: GetPhase): Calendars => {
  const solar = getSolarPhase({ date, hemisphere, exact });
  const lunar = getLunarPhase({ date, exact });
  const hour = getHourPhase(date);

  return {
    solar,
    lunar,
    hour,
  };
};

export default getPhases;
