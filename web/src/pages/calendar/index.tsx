import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { eventSources } from './helpers';

const Calendar: React.FC = () => {
  // TODO: Call phases by hemisphere

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      eventSources={eventSources}
    />
  );
};

export default Calendar;
