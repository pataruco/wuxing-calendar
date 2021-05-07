import React from 'react';
import FullCalendar, {
  CustomContentGenerator,
  EventContentArg,
  EventInput,
  EventSourceFunc,
  EventSourceInput,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
// import { getCalendarPhases } from '../redux/calendar/actions';
import { selectCalendar } from '../redux/calendar';
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

const Calendar: React.FC = () => {
  const dispatch = useAppDispatch();

  const { events } = useAppSelector(selectCalendar);

  console.log({ events });

  const getEvents: EventSourceFunc = (
    fetchInfo,
    successCallback,
    failureCallback,
  ) => {
    const { start, end } = fetchInfo;
    const events = getCalendarPhases({ start, end });
    successCallback(events);
  };

  const eventSources: EventSourceInput[] = [
    // your event source
    {
      events: getEvents,
      color: 'yellow', // an option!
      textColor: 'black', // an option!
    },
    // any other sources...
  ];

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      // events={[
      //   { title: 'event 1', date: '2021-05-07' },
      //   { title: 'event 2', date: '2021-05-08' },
      // ]}
      eventSources={eventSources}
    />
  );
};

export default Calendar;
