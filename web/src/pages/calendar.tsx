import React from 'react';
import FullCalendar, {
  CustomContentGenerator,
  EventContentArg,
  EventSourceFunc,
  EventSourceInput,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getCalendarPhases } from '../redux/calendar/actions';
import { selectCalendar } from '../redux/calendar';

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
    dispatch(getCalendarPhases({ start, end }));
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
      events={[
        { title: 'event 1', date: '2021-05-07' },
        { title: 'event 2', date: '2021-05-08' },
      ]}
      eventSources={eventSources}
    />
  );
};
export default Calendar;
