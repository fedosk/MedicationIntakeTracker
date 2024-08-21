import React, { useEffect } from 'react';

import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { getAccessToken } from '../../../store/user/selectors/getAccessToken/getAccessToken';
import { checkAuth } from '../../../store/user/slice/userSlice';

const RootStack = () => {
  const accessToken = useAppSelector(getAccessToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!accessToken) {
      dispatch(checkAuth());
    }
  }, []);

  return <>{accessToken ? <MainStack /> : <AuthStack />}</>;
};

export default RootStack;
