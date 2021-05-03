import { GetElements } from '../@types';
import getLunarElement from './calendars/lunar';
import getSolarElement from './calendars/solar';

const getElements = (date: Date): GetElements => {
  const solar = getSolarElement(date);
  const lunar = getLunarElement(date);

  return {
    solar,
    lunar,
  };
};

const moment = new Date('2021-07-18');

const elements = getElements(moment);

console.log({ elements, moment });
