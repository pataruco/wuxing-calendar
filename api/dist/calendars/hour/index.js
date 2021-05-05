'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const getHourAsFloat = (date) => date.getHours() + date.getMinutes() / 60;
const isInElementRange = ({
  date,
  startHour,
  startMinutes,
  endHour,
  endMinutes,
}) => {
  const start = new Date();
  start.setHours(startHour, startMinutes, 0);
  const startAsFloat = getHourAsFloat(start);
  const end = new Date();
  end.setHours(endHour, endMinutes, 0);
  const endAsFloat = getHourAsFloat(end);
  const dateAsFloat = getHourAsFloat(date);
  return dateAsFloat >= startAsFloat && dateAsFloat <= endAsFloat;
};
const isInWaterRange = (date) => {
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
const getHourElement = (date) => {
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
      return 'METAL';
    case isInWaterRange(newDate):
      return 'WATER';
    default:
      return 'EARTH';
  }
};
exports.default = getHourElement;
