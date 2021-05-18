import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CustomLists } from '../screens/CustomLists';
import { sharedStackOptions } from './stackOptions';
import { List } from '../screens/List';
import { Recipe } from '../screens/Recipe';
import { ListsStackParams } from './types';

const Lists = createStackNavigator<ListsStackParams>();

export const ListsStack = () => {
  return (
    <Lists.Navigator screenOptions={sharedStackOptions}>
      <Lists.Screen name="CustomLists" component={CustomLists} />
      <Lists.Screen
        name="List"
        component={List}
        options={({ route }) => ({
          headerTitle: route.params.name,
          headerBackTitleVisible: false,
        })}
      />
      <Lists.Screen
        name="Recipe"
        component={Recipe}
        options={{
          headerTransparent: true, // remove the orange header
          title: '', // no need to display the page title here
          headerBackTitleVisible: false, // back button should only be a < icon in this page, no need for title
        }}
      />
    </Lists.Navigator>
  );
};
