import getSolarPhase from './index';

describe(getSolarPhase, () => {
  const juneSolstice = new Date('2021-06-21');
  const decemberSolstice = new Date('2021-12-21');
  const marchEquinox = new Date('2021-03-21');
  const septemberEquinox = new Date('2021-09-21');
  const firstOfMay = new Date('2021-05-01');

  describe('NORTHERN hemisphere', () => {
    describe('NOT accurate', () => {
      test.each`
        date                | expected
        ${juneSolstice}     | ${'FIRE'}
        ${decemberSolstice} | ${'WATER'}
        ${marchEquinox}     | ${'WOOD'}
        ${septemberEquinox} | ${'METAL'}
        ${firstOfMay}       | ${'EARTH'}
      `('returns $expected when date is $date', ({ date, expected }) => {
        expect(
          getSolarPhase({ date, hemisphere: 'NORTHERN', exact: false }),
        ).toBe(expected);
      });
    });
    describe('accurate', () => {
      test.each`
        date                | expected
        ${juneSolstice}     | ${'FIRE'}
        ${decemberSolstice} | ${'WATER'}
        ${marchEquinox}     | ${'WOOD'}
        ${septemberEquinox} | ${'METAL'}
        ${firstOfMay}       | ${'EARTH'}
      `('returns $expected when date is $date', ({ date, expected }) => {
        expect(
          getSolarPhase({ date, hemisphere: 'NORTHERN', exact: true }),
        ).toBe(expected);
      });
    });
  });

  describe('SOUTHERN hemisphere', () => {
    describe('NOT accurate', () => {
      test.each`
        date                | expected
        ${juneSolstice}     | ${'WATER'}
        ${decemberSolstice} | ${'FIRE'}
        ${marchEquinox}     | ${'METAL'}
        ${septemberEquinox} | ${'WOOD'}
        ${firstOfMay}       | ${'EARTH'}
      `('returns $expected when date is $date', ({ date, expected }) => {
        expect(
          getSolarPhase({ date, hemisphere: 'SOUTHERN', exact: false }),
        ).toBe(expected);
      });
    });
    describe('accurate', () => {
      test.each`
        date                | expected
        ${juneSolstice}     | ${'WATER'}
        ${decemberSolstice} | ${'FIRE'}
        ${marchEquinox}     | ${'METAL'}
        ${septemberEquinox} | ${'WOOD'}
        ${firstOfMay}       | ${'EARTH'}
      `('returns $expected when date is $date', ({ date, expected }) => {
        expect(
          getSolarPhase({ date, hemisphere: 'SOUTHERN', exact: true }),
        ).toBe(expected);
      });
    });
  });
});
