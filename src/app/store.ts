import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "../features/currentUserSlice";
import ticketCreatedReducer from "../features/ticketSlice";

export const store = configureStore({
  reducer: {
    currentUserState: currentUserReducer,
    ticketCreatedState: ticketCreatedReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
