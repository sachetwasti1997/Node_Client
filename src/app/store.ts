import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "../features/currentUserSlice";
import ticketCreatedReducer from "../features/ticketSlice";
import orderReducer from "../features/orderSlice";

export const store = configureStore({
  reducer: {
    currentUserState: currentUserReducer,
    ticketCreatedState: ticketCreatedReducer,
    order: orderReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
