import { RootState } from '../../../index';

export const getAccessToken = (state: RootState) => state.user.accessToken;
