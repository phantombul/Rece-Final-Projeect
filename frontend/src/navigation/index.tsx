import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useUser } from '../hooks/useUser';
import { MainStack } from './Main';
import { AuthStack } from './Auth';

export const Navigator = () => {
  const { user } = useUser();
  return (
    <NavigationContainer>
      {user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
