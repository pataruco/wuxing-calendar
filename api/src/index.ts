import { Calendars, GetElement } from '../@types';
import getHourElement from './calendars/hour';
import getLunarElement from './calendars/lunar';
import getSolarElement from './calendars/solar';

const getElements = ({
  date,
  hemisphere = 'NORTHERN',
  exact = false,
}: GetElement): Calendars => {
  const solar = getSolarElement({ date, hemisphere, exact });
  const lunar = getLunarElement({ date, exact });
  const hour = getHourElement(date);

  return {
    solar,
    lunar,
    hour,
  };
};

export default getElements;
