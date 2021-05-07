import React from 'react';
import FullCalendar, {
  EventInput,
  EventSourceFunc,
  EventSourceInput,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { getEvents } from './helpers';

const Calendar: React.FC = () => {
  const eventSources: EventSourceInput[] = [
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
      eventSources={eventSources}
    />
  );
};

export default Calendar;
