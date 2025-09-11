import { removeWindowClass } from '@app/utils/helpers';
import { useCryptoLocalStorage } from '../utils/hooks/useCryptoLocalStorage';

export const loginByAuth = async (email, password) => {
  const token = 'I_AM_THE_TOKEN';
  // localStorage.setItem('token', token);
   useCryptoLocalStorage("user_Data", "set", "token", token);
  removeWindowClass('login-page');
  removeWindowClass('hold-transition');
  return token;
};

export const registerByAuth = async (email, password) => {
  const token = 'I_AM_THE_TOKEN';
  // localStorage.setItem('token', token);
  useCryptoLocalStorage("user_Data", "set", "token", token);
  removeWindowClass('register-page');
  removeWindowClass('hold-transition');
  return token;
};
