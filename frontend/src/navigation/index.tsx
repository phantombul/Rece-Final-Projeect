import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useUser } from '../hooks/useUser';
import { AuthStack } from './Auth';
import { MainStack } from './Main';

export const Navigator = () => {
  const { user } = useUser();
  return (
    <NavigationContainer>
      {user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
