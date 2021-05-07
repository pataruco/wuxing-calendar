import { AppThunk } from '../store';
import { selectTimer } from '../timer';
import GetPhases from 'five-phases';
import { EventInput } from '@fullcalendar/react';

import { addEvents } from './index';

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
}: GetCalendarPhases): AppThunk => (dispatch, getState) => {
  const { hemisphere } = selectTimer(getState());

  const dates = getDates({ start, end });
  const eventPhases: EventInput[] = dates.map((date) => {
    const { solar, lunar, hour } = GetPhases({
      date,
      exact: false,
      hemisphere,
    });

    return {
      title: `Solar ${solar}`,
      start: date.toISOString(),
      classNames: ['solar', solar],
    };
  });

  dispatch(addEvents(eventPhases));
};
