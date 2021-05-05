'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const astronomy_engine_1 = require('astronomy-engine');
require('../../lib/date');
const DAYS_RANGE = 36;
Date.prototype.substractYears = function (years) {
  const date = new Date(this.valueOf());
  date.setFullYear(date.getFullYear() - years);
  return date;
};
const isInWaterRange = (date) => {
  const currentYearSeasons = astronomy_engine_1.Seasons(date);
  const {
    dec_solstice: { date: currentYearDecemberSolstice },
  } = currentYearSeasons;
  const lastYearSeasons = astronomy_engine_1.Seasons(date.substractYears(1));
  const {
    dec_solstice: { date: lastYearDecemberSolstice },
  } = lastYearSeasons;
  lastYearDecemberSolstice.setUTCHours(0, 0, 0, 0);
  currentYearDecemberSolstice.setUTCHours(0, 0, 0, 0);
  // From 1st of January until the end of water range on the current hear
  // From the beginning of water range of the end of the year
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
const getSolarElement = ({ date, hemisphere = 'NORTHERN', exact }) => {
  const notExactDay = new Date(date);
  notExactDay.setUTCHours(0, 0, 0, 0); // Set beginning of the day
  const exactDay = new Date(date);
  const isInElementRange = (seasonDate) => {
    seasonDate.setUTCHours(0, 0, 0, 0);
    return (
      newDate >= seasonDate.substractDays(DAYS_RANGE) &&
      newDate <= seasonDate.addDays(DAYS_RANGE)
    );
  };
  const newDate = exact ? exactDay : notExactDay;
  const seasons = astronomy_engine_1.Seasons(newDate);
  const {
    mar_equinox: { date: marchEquinox },
    jun_solstice: { date: juneEquinox },
    sep_equinox: { date: septemberEquinox },
  } = seasons;
  switch (true) {
    case isInElementRange(marchEquinox):
      return hemisphere === 'NORTHERN' ? 'WOOD' : 'METAL';
    case isInElementRange(juneEquinox):
      return hemisphere === 'NORTHERN' ? 'FIRE' : 'WATER';
    case isInElementRange(septemberEquinox):
      return hemisphere === 'NORTHERN' ? 'METAL' : 'WOOD';
    case isInWaterRange(newDate):
      return hemisphere === 'NORTHERN' ? 'WATER' : 'FIRE';
    default:
      return 'EARTH';
  }
};
exports.default = getSolarElement;
