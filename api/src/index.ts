import { GetElements } from '../@types';
import getHourElement from './calendars/hour';
import getLunarElement from './calendars/lunar';
import getSolarElement from './calendars/solar';

const getElements = (date: Date): GetElements => {
  const solar = getSolarElement(date);
  const lunar = getLunarElement(date);
  const hour = getHourElement(date);

  return {
    solar,
    lunar,
    hour,
  };
};

export default getElements;
