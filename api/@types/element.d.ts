export type Element = 'WOOD' | 'FIRE' | 'EARTH' | 'METAL' | 'WATER';
export type Hemisphere = 'NORTHERN' | 'SOUTHERN';

export interface Calendars {
  solar: Element;
  lunar: Element;
  hour: Element;
}

export interface GetElement {
  date: Date;
  hemisphere: Hemisphere;
  exact: boolean;
}
