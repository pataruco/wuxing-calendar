import { Seasons, MoonPhase, AstroTime } from 'astronomy-engine';

const now = (new Date() as unknown) as AstroTime;

const seasons = Seasons(now);

const moonPhase = MoonPhase(now);

const { mar_equinox, jun_solstice, sep_equinox, dec_solstice } = seasons;

console.log({ mar_equinox, jun_solstice, sep_equinox, dec_solstice });

console.log({ moonPhase });
