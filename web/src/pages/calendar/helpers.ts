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

export const getCalendarPhases = ({
  start,
  end,
}: GetCalendarPhases): EventInput[] => {
  const dates = getDates({ start, end });
  const eventPhases: EventInput[] = dates.map((date) => {
    const { solar, lunar, hour } = GetPhases({
      date,
      exact: false,
      hemisphere: 'NORTHERN',
    });

    return {
      title: `Solar ${solar}`,
      start: date.toISOString(),
      classNames: ['solar', solar],
    };
  });
  return eventPhases;
};

export const getEvents: EventSourceFunc = (fetchInfo, successCallback) => {
  const { start, end } = fetchInfo;
  const events = getCalendarPhases({ start, end });
  successCallback(events);
};
