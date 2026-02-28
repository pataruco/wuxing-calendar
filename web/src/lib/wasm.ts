import type { InitOutput } from 'wuxing-wasm';
import init, {
  get_phases as _get_phases,
  get_hour,
  get_lunar,
  get_moon_angle,
  get_season_timestamp,
  get_solar,
} from 'wuxing-wasm';

export interface Phases {
  solar: string;
  lunar: string;
  hour: string;
}

let ready: Promise<InitOutput> | null = null;

export function loadWasm(): Promise<InitOutput> {
  if (!ready) {
    ready = init();
  }
  return ready;
}

export function get_phases(
  timestamp_ms: number,
  hemisphere: string,
  exact: boolean,
): Phases {
  return _get_phases(timestamp_ms, hemisphere, exact) as Phases;
}

export { get_solar, get_lunar, get_hour, get_moon_angle, get_season_timestamp };
