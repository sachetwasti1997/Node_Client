import {
  PayloadAction,
  createSlice,
  createAsyncThunk,
  SerializedError,
} from '@reduxjs/toolkit';
import { CurrentUser, SignRequest, ResponseError, SignUpRequest } from '../type';
import axios, { AxiosError } from 'axios';

interface CurrentUserState {
  currentUser: CurrentUser | undefined;
  isLoading: boolean;
}

let initialState: CurrentUserState = {
  currentUser: undefined,
  isLoading: false,
};

export const fetchCurrentUser = createAsyncThunk(
  'fetchCurrentUser',
  async () => {
    const resp = await axios.get('/api/users/currentuser');
    return resp.data;
  }
);

export const signUp = createAsyncThunk(
  'signUp',
  async (req: SignUpRequest, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/users/signup', req);
      return res.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        return rejectWithValue(err.response?.data);
      }
    }
  }
);

export const signIn = createAsyncThunk(
  'signIn',
  async (req: SignRequest, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/users/signin', req);
      return res.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        return rejectWithValue(err.response?.data);
      }
    }
  }
);

export const signOut = createAsyncThunk('signOut', async () => {
  await axios.post('/api/users/signout');
});

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.fulfilled, (state, payload) => {
      state.isLoading = false;
      state.currentUser = payload.payload;
    });
    builder.addCase(fetchCurrentUser.pending, (state, payload) => {
      state.isLoading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state.currentUser = undefined;
    });
  },
});

export default currentUserSlice.reducer;
