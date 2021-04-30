import { Seasons, MoonPhase } from 'astronomy-engine';

const seasons = Seasons(new Date());
const moonPhase = MoonPhase(new Date());

const { mar_equinox, jun_solstice, sep_equinox, dec_solstice } = seasons;

console.log({ mar_equinox, jun_solstice, sep_equinox, dec_solstice });

console.log({ moonPhase });
