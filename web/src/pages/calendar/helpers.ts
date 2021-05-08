import { EventInput, EventSourceFunc } from '@fullcalendar/react';
import GetPhases from 'five-phases';

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
    classNames: ['solar', solar],
  };
};

const geLunarPhases = (date: Date): EventInput => {
  const { lunar } = GetPhases({
    date,
    exact: false,
    hemisphere: 'NORTHERN',
  });

  return {
    title: `🌕 ${lunar}`,
    start: date,
    classNames: ['lunar', lunar],
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
