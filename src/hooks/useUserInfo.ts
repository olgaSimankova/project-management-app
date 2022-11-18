import { useGetUsersQuery } from '../api/user.api';
import { IUser } from '../types/types';

export const useGetUserInfo = (userLogin: string) => {
  const { data } = useGetUsersQuery();
  let searchUser;

  if (data) {
    searchUser = data.find((user: IUser) => user.login === userLogin);
  }

  return searchUser ? searchUser : null;
};
