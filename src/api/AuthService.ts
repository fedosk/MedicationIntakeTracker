import { AxiosResponse } from 'axios';

import { IAuthResponse } from '../store/user/types/UserSchema';

import api from '.';

export default class AuthService {
  static async login(
    email: string,
    password: string,
  ): Promise<AxiosResponse<IAuthResponse>> {
    try {
      const response = await api.post<IAuthResponse>('/login', {
        email,
        password,
      });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async registration(
    email: string,
    password: string,
  ): Promise<AxiosResponse<IAuthResponse>> {
    try {
      const response = await api.post<IAuthResponse>('/registration', {
        email,
        password,
      });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async logout(): Promise<void> {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
