import GetPhases from 'five-phases';
import { Seasons, AstroTime } from 'astronomy-engine';
import {
  EventInput,
  EventSourceFunc,
  EventSourceInput,
} from '@fullcalendar/react';

import { capitalize, getMoonPhase } from '../../lib/helpers';
import { store } from '../../redux/store';

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
  const {
    timer: { hemisphere },
  } = store.getState();

  const { solar } = GetPhases({
    date,
    exact: true,
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
  const {
    timer: { hemisphere },
  } = store.getState();

  const { lunar } = GetPhases({
    date,
    exact: false,
    hemisphere,
  });

  const { emoji } = getMoonPhase(date);

  return {
    title: `${emoji} ${capitalize(lunar)}`,
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

const getSolsticesAndEquinoxEvents = (date: Date): EventInput[] => {
  const seasons = Seasons((date as unknown) as AstroTime);
  const {
    mar_equinox: { date: marchEquinox },
    jun_solstice: { date: juneSolstice },
    sep_equinox: { date: septemberEquinox },
    dec_solstice: { date: decemberSolstice },
  } = seasons;

  return [
    {
      title: `🌄  March equinox`,
      start: marchEquinox,
      classNames: ['equinox'],
    },
    {
      title: `🌅 June solstice`,
      start: juneSolstice,
      classNames: ['solstice'],
    },
    {
      title: `🌄  September equinox`,
      start: septemberEquinox,
      classNames: ['equinox'],
    },
    {
      title: `🌅  December solstice`,
      start: decemberSolstice,
      classNames: ['solstice'],
    },
  ];
};

export const getEvents: EventSourceFunc = (fetchInfo, successCallback) => {
  const { start, end } = fetchInfo;
  const solticeEquinoxEvents = getSolsticesAndEquinoxEvents(start);
  const events = getCalendarPhases({ start, end });
  successCallback([...events, ...solticeEquinoxEvents]);
};

export const eventSources: EventSourceInput[] = [
  {
    events: getEvents,
  },
];
