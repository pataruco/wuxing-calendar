import getLunarElement from './index';

describe(getLunarElement, () => {
  const juneSolstice = new Date('2021-06-21');
  const decemberSolstice = new Date('2021-12-21');
  const marchEquinox = new Date('2021-03-21');
  const septemberEquinox = new Date('2021-09-21');
  const firstOfMay = new Date('2021-05-01');
  const fourthOfDecember = new Date('2021-12-04');

  describe('NOT accurate', () => {
    test.each`
      date                | expected
      ${juneSolstice}     | ${'EARTH'}
      ${decemberSolstice} | ${'FIRE'}
      ${marchEquinox}     | ${'WOOD'}
      ${septemberEquinox} | ${'FIRE'}
      ${firstOfMay}       | ${'METAL'}
      ${fourthOfDecember} | ${'WATER'}
    `('returns $expected when date is $date', ({ date, expected }) => {
      expect(getLunarElement({ date, exact: false })).toBe(expected);
    });
  });

  describe('accurate', () => {
    test.each`
      date                | expected
      ${juneSolstice}     | ${'EARTH'}
      ${decemberSolstice} | ${'FIRE'}
      ${marchEquinox}     | ${'WOOD'}
      ${septemberEquinox} | ${'FIRE'}
      ${firstOfMay}       | ${'EARTH'}
      ${fourthOfDecember} | ${'WATER'}
    `('returns $expected when date is $date', ({ date, expected }) => {
      expect(getLunarElement({ date, exact: true })).toBe(expected);
    });
  });
});
