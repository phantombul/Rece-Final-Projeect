import { Search } from '../screens/Search';
import { Allergies } from '../screens/Allergies';
import { Results } from '../screens/Results';
import { ResultsSorting } from '../screens/ResultsSorting';
import { Recipe } from '../screens/Recipe';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainStackParams } from './types';
import { IconButton } from 'react-native-paper';
import { Favourites } from '../screens/Favourites';
import { Cuisines } from '../screens/Cuisines';
import { useUser } from '../hooks/useUser';

const Main = createStackNavigator<MainStackParams>();

export const MainStack = () => {
  const { user } = useUser();

  return (
    <Main.Navigator
      // screenOptions will pass this JSON object to all pages in this Stack Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'orange' },
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Main.Screen
        //Stack.Screen is a wrapper around the component passed to component prop. In this case, Search component
        name="Search"
        component={Search}
        initialParams={{ allergies: user?.allergies }}
        options={({ navigation }) => ({
          headerLeft: ({ tintColor }) => (
            <IconButton
              icon={'collapse-all'}
              color={tintColor}
              onPress={() => navigation.navigate('Cuisines')}
            />
          ),
          headerRight: ({ tintColor }) => (
            <IconButton
              icon={'heart'}
              color={tintColor}
              onPress={() => navigation.navigate('Favourites')}
            />
          ),
        })}
      />
      <Main.Screen name="Allergies" component={Allergies} />
      <Main.Screen
        name="Results"
        component={Results}
        initialParams={{ sortOption: 'popularity' }} // initial param for the results page to sort by popularity
      />
      <Main.Screen name="ResultsSorting" component={ResultsSorting} />
      <Main.Screen
        name="Recipe"
        component={Recipe}
        // for this screen we are overriding the screenOptions by using different options.
        options={{
          headerTransparent: true, // remove the orange header
          title: '', // no need to display the page title here
          headerBackTitleVisible: false, // back button should only be a < icon in this page, no need for title
        }}
      />
      <Main.Screen name="Favourites" component={Favourites} />
      <Main.Screen name="Cuisines" component={Cuisines} />
    </Main.Navigator>
  );
};
