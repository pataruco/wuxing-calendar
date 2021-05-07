import { EventSourceInput } from '@fullcalendar/react';
import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';

interface CalendarState {
  events: EventSourceInput[];
}

const initialState: CalendarState = {
  events: [],
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    addEvents: (state, { payload }) => {
      state.events = [...state.events, payload];
    },
  },
});

export const { addEvents } = calendarSlice.actions;

export const selectCalendar = (state: RootState) => state.calendar;

export default calendarSlice.reducer;
