import { jd_data } from './lib/astro.js';

export const eqsol = (year) => {
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) ottobre 2010.
  // calcola la data degli equinozi e dei solstizi per l'year indicato nel parametro.

  const y1 = year / 1000;

  return {
    springEquinox:
      1721139.2855 +
      365.2421376 * year +
      0.067919 * y1 * y1 -
      0.0027879 * y1 * y1 * y1, //  EQUINOZIO DI MARZO
    summerSolstice:
      1721233.2486 +
      365.2417284 * year -
      0.053018 * y1 * y1 +
      0.009332 * y1 * y1 * y1,
    autummEquinox:
      1721325.6978 +
      365.2425055 * year -
      0.126689 * y1 * y1 +
      0.0019401 * y1 * y1 * y1,
    winterSolstice:
      1721414.392 +
      365.2428898 * year -
      0.010965 * y1 * y1 -
      0.0084885 * y1 * y1 * y1,
  };
};

const yy = 2021; // Insert year without decimals.

const { springEquinox, summerSolstice, autummEquinox, winterSolstice } = eqsol(
  yy,
);

console.log({ springEquinox, summerSolstice, autummEquinox, winterSolstice });

console.log(jd_data(winterSolstice));
