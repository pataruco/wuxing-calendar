// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Seasons, AstroTime } from 'astronomy-engine';
const DAYS_RANGE = 36;

Date.prototype.addDays = function (days: number) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

Date.prototype.substractDays = function (days: number) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() - days);
  return date;
};

Date.prototype.substractYears = function (years: number) {
  const date = new Date(this.valueOf());
  date.setFullYear(date.getFullYear() - years);
  return date;
};

const isInWaterRange = (date: Date): boolean => {
  const currentYearSeasons = Seasons((date as unknown) as AstroTime);
  const {
    dec_solstice: { date: currentYearDecemberSolstice },
  } = currentYearSeasons;
  const lastYearSeasons = Seasons(
    (date.substractYears(1) as unknown) as AstroTime,
  );
  const {
    dec_solstice: { date: lastYearDecemberSolstice },
  } = lastYearSeasons;

  lastYearDecemberSolstice.setUTCHours(0, 0, 0, 0);
  currentYearDecemberSolstice.setUTCHours(0, 0, 0, 0);

  // 1 de enero hasta el final de agua en el año
  // o
  // principio de agua el año hasta el 31

  const currentYear = date.getFullYear();
  const yearStart = new Date(`${currentYear}-01-01`);
  const yearEnd = new Date(`${currentYear}-12-31`);

  return (
    (date >= yearStart &&
      date <= lastYearDecemberSolstice.addDays(DAYS_RANGE)) ||
    (date >= currentYearDecemberSolstice.substractDays(DAYS_RANGE) &&
      date <= yearEnd)
  );
};

const getSolarElement = (date: Date): GetElements['solar'] => {
  date.setUTCHours(0, 0, 0, 0); // Set beginning of the day

  const isInElementRange = (seasonDate: Date): boolean => {
    seasonDate.setUTCHours(0, 0, 0, 0);
    return (
      date >= seasonDate.substractDays(DAYS_RANGE) &&
      date <= seasonDate.addDays(DAYS_RANGE)
    );
  };

  const seasons = Seasons((date as unknown) as AstroTime);
  const {
    mar_equinox: { date: marchEquinox },
    jun_solstice: { date: juneEquinox },
    sep_equinox: { date: septemberEquinox },
  } = seasons;

  switch (true) {
    case isInElementRange(marchEquinox):
      return 'WOOD';
    case isInElementRange(juneEquinox):
      return 'FIRE';
    case isInElementRange(septemberEquinox):
      return 'METAL';
    case isInWaterRange(date):
      return 'WATER';
    default:
      return 'EARTH';
  }
};

export default getSolarElement;
