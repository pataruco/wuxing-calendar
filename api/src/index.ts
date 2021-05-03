import { GetElements } from '../@types';
import getSolarElement from './calendars/solar';

const getElements = (date: Date): GetElements => {
  const solar = getSolarElement(date);

  return {
    solar,
  };
};

const moment = new Date('2021-07-18');

const elements = getElements(moment);

console.log({ elements, moment });
