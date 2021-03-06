import { Phase } from '../../../@types';

const getHourAsFloat = (date: Date): number =>
  date.getHours() + date.getMinutes() / 60;

interface isInPhaseRange {
  date: Date;
  startHour: number;
  startMinutes: number;
  endHour: number;
  endMinutes: number;
}

const isInPhaseRange = ({
  date,
  startHour,
  startMinutes,
  endHour,
  endMinutes,
}: isInPhaseRange): boolean => {
  const start = new Date();
  start.setHours(startHour, startMinutes, 0);
  const startAsFloat = getHourAsFloat(start);

  const end = new Date();
  end.setHours(endHour, endMinutes, 0);
  const endAsFloat = getHourAsFloat(end);

  const dateAsFloat = getHourAsFloat(date);

  return dateAsFloat >= startAsFloat && dateAsFloat <= endAsFloat;
};

const isInWaterRange = (date: Date) => {
  const start = new Date();
  start.setHours(21, 36, 0);
  const startAsFloat = getHourAsFloat(start);

  const end = new Date();
  end.setHours(2, 24, 0);
  const endAsFloat = getHourAsFloat(end);
  const dateAsFloat = getHourAsFloat(date);

  return (
    (dateAsFloat >= startAsFloat && dateAsFloat < 24) ||
    dateAsFloat <= endAsFloat
  );
};

const getHourPhase = (date: Date): Phase => {
  const newDate = new Date(date); // Date Mutate when is called from getLunar and get Solar

  switch (true) {
    case isInPhaseRange({
      date: newDate,
      startHour: 3,
      startMinutes: 36,
      endHour: 8,
      endMinutes: 24,
    }):
      return 'WOOD';
    case isInPhaseRange({
      date: newDate,
      startHour: 9,
      startMinutes: 36,
      endHour: 14,
      endMinutes: 24,
    }):
      return 'FIRE';
    case isInPhaseRange({
      date: newDate,
      startHour: 15,
      startMinutes: 36,
      endHour: 20,
      endMinutes: 24,
    }):
      return 'METAL';
    case isInWaterRange(newDate):
      return 'WATER';
    default:
      return 'EARTH';
  }
};

export default getHourPhase;
