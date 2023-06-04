import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios, { AxiosError } from "axios";
import { TicketCreatedResp, TicketRequest } from "../type";

interface TicketState {
  ticketCreatedState: TicketCreatedResp | undefined;
  isLoading: boolean;
}

const initialState: TicketState = {
  ticketCreatedState: undefined,
  isLoading: false,
};

export const createTicket = createAsyncThunk(
  "createTicket",
  async (req: TicketRequest, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/tickets", req);
      return res.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        return rejectWithValue(err.response?.data);
      }
    }
  }
);

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTicket.fulfilled, (state, action) => {
      state.isLoading = false;
      state.ticketCreatedState = action.payload;
    });
    builder.addCase(createTicket.pending, (state, payload) => {
      state.isLoading = true;
    });
  },
});

export default ticketSlice.reducer;
