import { store } from './state/store';
import { setUser, setUserInfo } from '../features/authSlice';

export const init = () => {
  const { token, login } = JSON.parse(localStorage.getItem('credentials') || '{}');
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  store.dispatch(setUserInfo({ token, login }));
  store.dispatch(setUser(user));
};
