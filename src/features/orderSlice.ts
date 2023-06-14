import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Order } from "../type";
import axios, { AxiosError } from "axios";

export interface OrderState {
  order: Order | undefined;
  myOrders: Array<Order>;
  isLoading: boolean;
}

interface createOrderReq {
  ticketId: string;
}

const initialState: OrderState = {
  order: undefined,
  isLoading: false,
  myOrders: [],
};

export const createOrder = createAsyncThunk(
  "createOrder",
  async (req: createOrderReq, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/orders", req);
      return res.data;
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        return rejectWithValue(err.response?.data);
      }
    }
  }
);

export const fetchOrders = createAsyncThunk(
  "fetchOrders",
  async () => {
    const res = await axios.get(`/api/orders`);
    return res.data.orders;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state, payload) => {
      state.isLoading = false;
      state.order = payload.payload;
    });
    builder.addCase(createOrder.pending, (state, payload) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.myOrders = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchOrders.pending, (state, action) => {
      state.isLoading = true;
    });
  },
});

export default orderSlice.reducer;
