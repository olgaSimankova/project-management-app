import React from 'react';
import { useGetUserInfo } from '../hooks/useUserInfo';

export const Search = () => {
  const user = useGetUserInfo('dima00');
  console.log(user);
  return <div>search</div>;
};
