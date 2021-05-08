import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import React from 'react';

import { eventSources } from './helpers';

const Calendar: React.FC = () => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      eventSources={eventSources}
    />
  );
};

export default Calendar;
