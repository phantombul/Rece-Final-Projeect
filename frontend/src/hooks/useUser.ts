import { useContext } from 'react';
import { UserContext } from '../providers/User';

export const useUser = () => {
  return useContext(UserContext);
};
