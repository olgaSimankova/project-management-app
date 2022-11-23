import { store } from './state/store';
import { setUser, setUserInfo } from '../features/authSlice';
import { setTheme } from 'theme/themeSlice';

export const init = () => {
  const theme = localStorage.getItem('theme');
  const { token, login } = JSON.parse(localStorage.getItem('credentials') || '{}');
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  theme && store.dispatch(setTheme(theme));
  store.dispatch(setUserInfo({ token, login }));
  store.dispatch(setUser(user));
};
