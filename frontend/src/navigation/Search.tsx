import { Search as SearchScreen } from '../screens/Search';
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
import { sharedStackOptions } from './stackOptions';
import { SelectList } from '../screens/SelectList';

const Search = createStackNavigator<MainStackParams>();

export const SearchStack = () => {
  const { user } = useUser();

  return (
    <Search.Navigator
      // screenOptions will pass this JSON object to all pages in this Stack Navigator
      screenOptions={sharedStackOptions}>
      <Search.Screen
        //Stack.Screen is a wrapper around the component passed to component prop. In this case, Search component
        name="Search"
        component={SearchScreen}
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
      <Search.Screen name="Allergies" component={Allergies} />
      <Search.Screen
        name="Results"
        component={Results}
        initialParams={{ sortOption: 'popularity' }} // initial param for the results page to sort by popularity
      />
      <Search.Screen name="ResultsSorting" component={ResultsSorting} />
      <Search.Screen
        name="Recipe"
        component={Recipe}
        // for this screen we are overriding the screenOptions by using different options.
        options={{
          headerTransparent: true, // remove the orange header
          title: '', // no need to display the page title here
          headerBackTitleVisible: false, // back button should only be a < icon in this page, no need for title
        }}
      />
      <Search.Screen name="Favourites" component={Favourites} />
      <Search.Screen name="Cuisines" component={Cuisines} />
      <Search.Screen name="SelectList" component={SelectList} />
    </Search.Navigator>
  );
};
