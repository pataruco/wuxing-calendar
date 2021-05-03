import getSolarElement from './index';

describe(getSolarElement, () => {
  const juneSolstice = new Date('2021-06-21');
  const decemberSolstice = new Date('2021-12-21');
  const marchEquinox = new Date('2021-03-21');
  const septemberEquinox = new Date('2021-09-21');
  const firstOfMay = new Date('2021-05-01');

  test.each`
    date                | expected
    ${juneSolstice}     | ${'FIRE'}
    ${decemberSolstice} | ${'WATER'}
    ${marchEquinox}     | ${'WOOD'}
    ${septemberEquinox} | ${'METAL'}
    ${firstOfMay}       | ${'EARTH'}
  `('returns $expected when date is $date', ({ date, expected }) => {
    expect(getSolarElement(date)).toBe(expected);
  });
});
