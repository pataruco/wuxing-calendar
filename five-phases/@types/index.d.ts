declare global {
  interface Date {
    addDays(days: number): Date;
    substractDays(days: number): Date;
    substractYears(years: number): Date;
  }
}

export { Calendars, Phase, GetPhase, Hemisphere } from './phase';
