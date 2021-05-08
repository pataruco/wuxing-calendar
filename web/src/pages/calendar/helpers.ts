import { EventInput, EventSourceFunc } from '@fullcalendar/react';
import GetPhases from 'five-phases';
import { MoonPhase } from 'astronomy-engine';

/*
🌑  New moon = 0
🌒  Waxing crescent moon
🌓  First quater moon = 90
🌔  Waxing gibbous moon
🌕  Full moon = 180
🌖  Waning gibbous moon
🌗  Last quarter moon = 270
🌘  Waning crescent moon
*/

const getMoonPhase = (date: Date): string => {
  const moonPhase = MoonPhase(date);
  switch (true) {
    case moonPhase >= 0 && moonPhase < 45:
      return '🌑';
    case moonPhase >= 45 && moonPhase < 90:
      return '🌒';
    case moonPhase >= 90 && moonPhase < 135:
      return '🌓';
    case moonPhase >= 135 && moonPhase < 180:
      return '🌔';
    case moonPhase >= 180 && moonPhase < 225:
      return '🌕';
    case moonPhase >= 225 && moonPhase < 270:
      return '🌖';
    case moonPhase >= 270 && moonPhase < 315:
      return '🌗';
    case moonPhase >= 315 && moonPhase < 359:
      return '🌘';
    default:
      return '🌝';
  }
};

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
    hemisphere: 'NORTHERN',
  });

  return {
    title: `☀️ ${solar}`,
    start: date,
    classNames: ['solar', solar.toLowerCase()],
    allDay: true,
  };
};

const geLunarPhases = (date: Date): EventInput => {
  const { lunar } = GetPhases({
    date,
    exact: false,
    hemisphere: 'NORTHERN',
  });

  return {
    title: `${getMoonPhase(date)} ${lunar}`,
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
