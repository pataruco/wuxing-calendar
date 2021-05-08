import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import React from 'react';

import { eventSources } from './helpers';
import { getUserLocales } from '../../lib/get-locale';
import Page from '../../components/page';

const Calendar: React.FC = () => {
  const [locale] = getUserLocales();

  return (
    <Page>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        eventSources={eventSources}
        locale={locale}
        firstDay={1}
        aspectRatio={2.5}
        dayHeaderFormat={{
          weekday: 'long',
        }}
      />
    </Page>
  );
};

export default Calendar;
