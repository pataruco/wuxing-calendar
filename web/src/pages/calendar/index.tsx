import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import React from 'react';

import { eventSources } from './helpers';
import { getUserLocales } from '../../lib/get-locale';

const Calendar: React.FC = () => {
  const locales = getUserLocales();

  console.log({ locales });

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      eventSources={eventSources}
    />
  );
};

export default Calendar;
