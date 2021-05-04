import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';
import { AuthStackParams } from './types';

const Auth = createStackNavigator<AuthStackParams>();

export const AuthStack = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: 'white' },
        headerTitle: '',
        headerStyle: {
          shadowColor: 'transparent',
        },
      }}>
      <Auth.Screen name="SignIn" component={SignIn} />
      <Auth.Screen name="SignUp" component={SignUp} />
    </Auth.Navigator>
  );
};
