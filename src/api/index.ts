import axios from 'axios';

import store from '../store';
import { setAccessToken } from '../store/user/slice/userSlice';
import { IAuthResponse } from '../store/user/types/UserSchema';

export const API_URL = 'http://localhost:8090/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  config => {
    const state = store.getState();
    const accessToken = state.user.accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => {
    throw error;
  },
);

api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      error.config &&
      !error.config_isRetry
    ) {
      originalRequest._isRetry = true;

      const response = await axios.get<IAuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });

      store.dispatch(setAccessToken(response.data.accessToken));

      return api.request(originalRequest);
    }

    throw error;
  },
);

export default api;
