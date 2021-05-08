import React from 'react';
import FullCalendar, { EventSourceInput } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { getEvents } from './helpers';

const Calendar: React.FC = () => {
  const eventSources: EventSourceInput[] = [
    {
      events: getEvents,
    },
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
