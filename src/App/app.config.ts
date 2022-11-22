import { store } from './state/store';
import { setUser, setUserInfo } from '../features/authSlice';
import { setTheme } from 'features/mainSlice';

export const init = () => {
  const { token, login } = JSON.parse(localStorage.getItem('credentials') || '{}');
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  store.dispatch(setUserInfo({ token, login }));
  store.dispatch(setUser(user));
  const theme = localStorage.getItem('theme');
  theme && store.dispatch(setTheme(theme));
};
