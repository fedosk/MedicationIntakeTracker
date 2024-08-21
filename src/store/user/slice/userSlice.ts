import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

import { API_URL } from '../../../api';
import AuthService from '../../../api/AuthService';
import { IAuthResponse } from '../types/UserSchema';

const initialState: IAuthResponse = {
  accessToken: null,
  user: {
    id: null,
    email: null,
    isActivated: false,
  },
};

export const loginUser = createAsyncThunk<
  IAuthResponse,
  { email: string; password: string }
>('users/loginUser', async ({ email, password }) => {
  const response = await AuthService.login(email, password);

  return response.data;
});

export const registerUser = createAsyncThunk<
  IAuthResponse,
  { email: string; password: string }
>('users/registerUser', async ({ email, password }) => {
  const response: AxiosResponse<IAuthResponse> = await AuthService.registration(
    email,
    password,
  );

  return response.data;
});

export const checkAuth = createAsyncThunk<IAuthResponse>(
  'users/checkAuth',
  async () => {
    const response = await axios.get<IAuthResponse>(`${API_URL}/refresh`, {
      withCredentials: true,
    });

    return response.data;
  },
);

export const logoutUser = createAsyncThunk('users/logoutUser', async () => {
  await AuthService.logout();
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    setAuth: (state, action: PayloadAction<IAuthResponse>) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    clearAuth: state => {
      state.accessToken = null;
      state.user = initialState.user;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    });
    builder.addCase(logoutUser.fulfilled, state => {
      state.accessToken = null;
      state.user = initialState.user;
    });
    builder.addCase(logoutUser.rejected, state => {
      state.accessToken = null;
      state.user = initialState.user;
    });
  },
});

export const { setAuth, clearAuth, setAccessToken } = userSlice.actions;
export default userSlice.reducer;
