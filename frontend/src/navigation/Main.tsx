import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { SearchStack } from './Search';
import { Drawer } from '../components/Drawer';
import { ListsStack } from './Lists';

const Main = createDrawerNavigator();

export const MainStack = () => (
  <Main.Navigator drawerContent={(props) => <Drawer {...props} />}>
    <Main.Screen name="Search" component={SearchStack} />
    <Main.Screen name="Lists" component={ListsStack} />
  </Main.Navigator>
);
