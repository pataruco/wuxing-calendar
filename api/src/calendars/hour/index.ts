import { Element } from '../../../@types';

const getHourAsFloat = (date: Date): number => {
  console.log({ date });
  return date.getHours() + date.getMinutes() / 60;
};

interface IsInElementRange {
  date: Date;
  startHour: number;
  startMinutes: number;
  endHour: number;
  endMinutes: number;
}

const isInElementRange = ({
  date,
  startHour,
  startMinutes,
  endHour,
  endMinutes,
}: IsInElementRange): boolean => {
  const start = new Date();
  start.setHours(startHour, startMinutes, 0);
  const startAsFloat = getHourAsFloat(start);

  const end = new Date();
  end.setHours(endHour, endMinutes, 0);
  const endAsFloat = getHourAsFloat(end);

  const dateAsFloat = getHourAsFloat(date);

  console.log({
    startAsFloat,
    dateAsFloat,
    endAsFloat,
  });

  return dateAsFloat >= startAsFloat && dateAsFloat <= endAsFloat;
};

const getHourElement = (date: Date): Element => {
  const newDate = new Date(date); // Date Mutate when is called from getLunar and get Solar

  switch (true) {
    case isInElementRange({
      date: newDate,
      startHour: 3,
      startMinutes: 36,
      endHour: 8,
      endMinutes: 24,
    }):
      return 'WOOD';
    case isInElementRange({
      date: newDate,
      startHour: 9,
      startMinutes: 36,
      endHour: 14,
      endMinutes: 24,
    }):
      return 'FIRE';
    case isInElementRange({
      date: newDate,
      startHour: 15,
      startMinutes: 36,
      endHour: 20,
      endMinutes: 24,
    }):
      return 'FIRE';
    case isInElementRange({
      date: newDate,
      startHour: 21,
      startMinutes: 36,
      endHour: 2,
      endMinutes: 24,
    }):
      return 'WATER';

    default:
      return 'EARTH';
  }
};

export default getHourElement;
