import GetPhases from 'five-phases';
import {
  EventInput,
  EventSourceFunc,
  EventSourceInput,
} from '@fullcalendar/react';

import { capitalize, getMoonPhase } from '../../lib/helpers';
import { store } from '../../redux/store';

const {
  timer: { hemisphere },
} = store.getState();

interface GetCalendarPhases {
  start: Date;
  end: Date;
}
const getDates = ({ start, end }: GetCalendarPhases): Date[] => {
  let dates: Date[] = [];
  //to avoid modifying the original date
  const theDate = new Date(start);
  while (theDate < end) {
    dates = [...dates, new Date(theDate)];
    theDate.setDate(theDate.getDate() + 1);
  }
  return dates;
};

const getSolarPhases = (date: Date): EventInput => {
  const { solar } = GetPhases({
    date,
    exact: false,
    hemisphere,
  });

  return {
    title: `☀️ ${capitalize(solar)}`,
    start: date,
    classNames: ['solar', solar.toLowerCase()],
    allDay: true,
  };
};

const geLunarPhases = (date: Date): EventInput => {
  const { lunar } = GetPhases({
    date,
    exact: false,
    hemisphere,
  });

  return {
    title: `${getMoonPhase(date)} ${capitalize(lunar)}`,
    start: date,
    classNames: ['lunar', lunar.toLowerCase()],
    allDay: true,
  };
};

export const getCalendarPhases = ({
  start,
  end,
}: GetCalendarPhases): EventInput[] => {
  const dates = getDates({ start, end });

  const solarEventphases: EventInput[] = dates.map(getSolarPhases);
  const lunarEventphases: EventInput[] = dates.map(geLunarPhases);

  return [...solarEventphases, ...lunarEventphases];
};

export const getEvents: EventSourceFunc = (fetchInfo, successCallback) => {
  const { start, end } = fetchInfo;
  const events = getCalendarPhases({ start, end });
  successCallback(events);
};

export const eventSources: EventSourceInput[] = [
  {
    events: getEvents,
  },
];
