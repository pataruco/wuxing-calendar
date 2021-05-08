import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import React from 'react';

import { eventSources } from './helpers';
import { getUserLocales } from '../../lib/get-locale';
import Page from '../../components/page';
import styled from 'styled-components';

const StyledPage = styled(Page)`
  --fc-border-color: black;
  --fc-button-bg-color: black;
  --fc-button-border-color: white;

  .fc-daygrid-event {
    padding: 0.5rem;
    font-size: 1.15rem;

    &.wood {
      background-color: var(--wood);
      border-color: var(--wood);
    }
    &.fire {
      background-color: var(--fire);
      border-color: var(--fire);
    }
    &.earth {
      background-color: var(--earth);
      border-color: var(--earth);
    }
    &.metal {
      background-color: var(--metal);
      border-color: var(--metal);
    }
    &.water {
      background-color: var(--water);
      border-color: var(--water);
    }
  }

  .fc-day-today {
    box-shadow: 1px 1px 1px 1px black, -1px -1px 1px 1px black;
  }
`;

const Calendar: React.FC = () => {
  const [locale] = getUserLocales();

  return (
    <StyledPage>
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
    </StyledPage>
  );
};

export default Calendar;
