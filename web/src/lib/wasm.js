import init, {
  get_hour,
  get_lunar,
  get_moon_angle,
  get_phases,
  get_season_timestamp,
  get_solar,
} from 'wuxing-wasm';

let ready = null;

export function loadWasm() {
  if (!ready) {
    ready = init();
  }
  return ready;
}

export {
  get_phases,
  get_solar,
  get_lunar,
  get_hour,
  get_moon_angle,
  get_season_timestamp,
};
