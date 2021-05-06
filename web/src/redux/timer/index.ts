import { Phase, Hemisphere } from 'five-phases/@types';
import { createSlice } from '@reduxjs/toolkit';

import { getCoordinatesThunk, getTimeAndCalendars } from './actions';
import { RootState, AppThunk } from '../store';

interface TimerState {
  date: string;
  lunar?: Phase;
  solar?: Phase;
  hour?: Phase;
  latitude?: number;
  longitude?: number;
  hemisphere: Hemisphere;
}

const initialState: TimerState = {
  date: new Date().toString(),
  lunar: undefined,
  solar: undefined,
  hour: undefined,
  latitude: undefined,
  longitude: undefined,
  hemisphere: 'NORTHERN',
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setCalendars: (state, { payload: { solar, lunar, hour } }) => {
      state.hour = hour;
      state.lunar = lunar;
      state.solar = solar;
    },
    setDate: (state, { payload: { date } }) => {
      state.date = date;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getCoordinatesThunk.fulfilled,
        (state, { payload: { latitude, longitude } }) => {
          state.latitude = latitude;
          state.longitude = longitude;
          state.hemisphere = latitude > 0 ? 'NORTHERN' : 'SOUTHERN';
        },
      )
      .addCase(getCoordinatesThunk.rejected, (state) => {
        state.latitude = undefined;
        state.longitude = undefined;
        state.hemisphere = 'NORTHERN';
      });
  },
});

export const { setCalendars, setDate } = timerSlice.actions;

export const selectTimer = (state: RootState) => state.timer;

export default timerSlice.reducer;

export const setTimeAndCalendars = (): AppThunk => (dispatch, getState) => {
  const { hemisphere } = selectTimer(getState());

  const { solar, lunar, hour, date } = getTimeAndCalendars({ hemisphere });
  dispatch(setCalendars({ solar, lunar, hour }));
  dispatch(setDate({ date: date.toString() }));
};
