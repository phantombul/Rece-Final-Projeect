import { Recipe, SearchMode, SortOption } from '../types';
import { StackScreenProps } from '@react-navigation/stack';

export type MainStackParams = {
  // page names must match the keys in this object
  // if page does not need params, better to set the value to undefined rather than an empty object
  // if set to {}, then need to pass an empty object every time you navigate to the screen
  Search: {
    allergies: string[];
  };
  Allergies: {
    initialAllergies: string[];
  };
  Results: {
    ingredients: string[];
    dislikes: string[];
    allergies: string[];
    searchMode: SearchMode;
    sortOption: SortOption;
  };
  ResultsSorting: {
    initialSortOption: SortOption;
  };
  Recipe: {
    recipe: Recipe;
  };
  Favourites: undefined;
  Cuisines: undefined;
  SelectList: {
    recipeId: number;
  };
};

export type MainStackProps<routeName extends keyof MainStackParams> =
  StackScreenProps<MainStackParams, routeName>;
// used to send props from one page to another

export type AuthStackParams = {
  SignIn: undefined;
  SignUp: undefined;
};

export type AuthStackProps<routeName extends keyof AuthStackParams> =
  StackScreenProps<AuthStackParams, routeName>;

export type ListsStackParams = {
  CustomLists: undefined;
  List: { name: string; recipes: string[] };
  Recipe: {
    recipe: Recipe;
  };
};

export type ListsStackProps<routeName extends keyof ListsStackParams> =
  StackScreenProps<ListsStackParams, routeName>;
