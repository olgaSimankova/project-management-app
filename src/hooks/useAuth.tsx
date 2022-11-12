import { useAppSelector } from '../App/state/store';

export const useAuth = () => {
  return useAppSelector((state) => state.userState);
};
