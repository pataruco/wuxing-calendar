import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';
import { Calendars, Element } from 'api/@types';
import getElements from 'api/src';

interface TimerState {
  date?: Date;
  lunar?: Element;
  solar?: Element;
  hour?: Element;
}

interface CalendarDate extends Calendars {
  date: Date;
}

const getTimeAndCalendars = (): CalendarDate => {
  const date = new Date();
  const { solar, lunar, hour } = getElements({
    date,
    exact: true,
    hemisphere: 'NORTHERN',
  });
  return { solar, lunar, hour, date };
};

const initialState: TimerState = {
  date: undefined,
  lunar: undefined,
  solar: undefined,
  hour: undefined,
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
});

export const { setCalendars, setDate } = timerSlice.actions;

export const selectTimer = (state: RootState) => state.timer;

export const setTimeAndCalendars = (): AppThunk => (dispatch, _getState) => {
  const { solar, lunar, hour, date } = getTimeAndCalendars();
  dispatch(setCalendars({ solar, lunar, hour }));
  dispatch(setDate({ date }));
};

export default timerSlice.reducer;
