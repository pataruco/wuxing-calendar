export type Phase = 'WOOD' | 'FIRE' | 'EARTH' | 'METAL' | 'WATER';
export type Hemisphere = 'NORTHERN' | 'SOUTHERN';

export interface Calendars {
  solar: Phase;
  lunar: Phase;
  hour: Phase;
}

export interface GetPhase {
  date: Date;
  hemisphere: Hemisphere;
  exact: boolean;
}
