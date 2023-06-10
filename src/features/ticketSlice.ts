import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios, { AxiosError } from "axios";
import { TicketResp, TicketRequest } from "../type";

interface TicketState {
  ticketCreatedState: TicketResp | undefined;
  isLoading: boolean;
  allTickets: Array<TicketResp>;
  userTickets: Array<TicketResp>;
}

const initialState: TicketState = {
  ticketCreatedState: undefined,
  isLoading: false,
  allTickets: Array<TicketResp>(),
  userTickets: Array<TicketResp>()
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

export const fetchTickets = createAsyncThunk("fetchTickets", async () => {
  const res = await axios.get("/api/tickets");
  return res.data;
});

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
    builder.addCase(fetchTickets.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allTickets = action.payload;
    });
    builder.addCase(fetchTickets.pending, (state, payload) => {
      state.isLoading = true;
    });
  },
});

export default ticketSlice.reducer;
