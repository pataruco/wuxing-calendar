import getHourPhase from './index';

describe(getHourPhase, () => {
  const date = new Date();
  const sixAm = date.setHours(6, 0, 0);
  const twelveM = date.setHours(12, 0, 0);
  const sixPm = date.setHours(18, 0, 0);
  const twelveAM = date.setHours(0, 1, 0);
  const threePM = date.setHours(15, 0, 0);

  test.each`
    date        | expected
    ${sixAm}    | ${'WOOD'}
    ${twelveM}  | ${'FIRE'}
    ${sixPm}    | ${'METAL'}
    ${twelveAM} | ${'WATER'}
    ${threePM}  | ${'EARTH'}
  `('returns $expected when date is $date', ({ date, expected }) => {
    expect(getHourPhase(date)).toBe(expected);
  });
});

/* 
    ${fourPM}   | ${'EARTH'}
*/
