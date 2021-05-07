import React from 'react';
import FullCalendar, {
  CustomContentGenerator,
  EventContentArg,
  EventSourceFunc,
  EventSourceInput,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const getEvents: EventSourceFunc = (
  fetchInfo,
  successCallback,
  failureCallback,
) => {
  const { start, end } = fetchInfo;
  console.log({ start, end });
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

const Calendar: React.FC = () => {
  //Identity<CustomContentGenerator<EventContentArg>>;
  const handleEventContent: CustomContentGenerator<EventContentArg> = (
    event,
  ) => {
    console.log({ event });
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      eventContent={handleEventContent}
      // events={[
      //   { title: 'event 1', date: '2021-05-07' },
      //   { title: 'event 2', date: '2021-05-08' },
      // ]}
      eventSources={eventSources}
    />
  );
};
export default Calendar;
