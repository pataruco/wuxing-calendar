import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice';
import timerReducer from './timer';
import calendarReducer from './calendar';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    timer: timerReducer,
    calendar: calendarReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
