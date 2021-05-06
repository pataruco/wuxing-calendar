import { createAsyncThunk } from '@reduxjs/toolkit';
import { Calendars, Hemisphere } from 'five-phases/@types';
import GetPhases from 'five-phases';

interface CalendarDate extends Calendars {
  date: Date;
}

interface GetTimeAndCalendarsParams {
  hemisphere: Hemisphere;
}

export const getTimeAndCalendars = ({
  hemisphere,
}: GetTimeAndCalendarsParams): CalendarDate => {
  const date = new Date();
  const { solar, lunar, hour } = GetPhases({
    date,
    exact: true,
    hemisphere,
  });
  return { solar, lunar, hour, date };
};

const getCoordinates = (): Promise<
  Pick<GeolocationCoordinates, 'latitude' | 'longitude'>
> =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {
          coords: { latitude, longitude },
        } = position;
        resolve({ latitude, longitude });
      },
      (error) => reject(error),
    );
  });

export const getCoordinatesThunk = createAsyncThunk(
  'timer/getCoordinates',
  async () => {
    const { latitude, longitude } = await getCoordinates();
    return { latitude, longitude };
  },
);
