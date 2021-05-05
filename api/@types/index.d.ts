declare global {
  interface Date {
    addDays(days: number): Date;
    substractDays(days: number): Date;
    substractYears(years: number): Date;
  }
}

export { Calendars, Element, GetElement, Hemisphere } from './element';
