import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthCredentials, User } from '../types';
import { login, register, updateFavourites, updateUserAllergies } from '../api';

type UserContextType = {
  user: User | undefined | null;
  signIn: (credentials: AuthCredentials) => void;
  signUp: (credentials: AuthCredentials) => void;
  addFavourite: (id: number) => void;
  removeFavourite: (id: number) => void;
  updateAllergies: (allergies: string[]) => void;
  logout: () => void;
  addList: (name: string) => void;
  addRecipeToList: (recipeId: number, listName: string) => void;
  removeRecipeFromList: (recipeId: number, listName: string) => void;
};

export const UserContext = React.createContext<UserContextType>(
  {} as UserContextType,
);

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    AsyncStorage.getItem('user').then((value) => {
      setUser(value ? JSON.parse(value) : value);
    });
  }, []);

  useEffect(() => {
    if (typeof user !== 'undefined') {
      if (user) {
        AsyncStorage.setItem('user', JSON.stringify(user));
      } else {
        AsyncStorage.removeItem('user');
      }
    }
  }, [user]);

  const signIn = useCallback<UserContextType['signIn']>((credentials) => {
    login(credentials).then(setUser);
  }, []);

  const signUp = useCallback<UserContextType['signUp']>((credentials) => {
    register(credentials).then(setUser);
  }, []);

  const logout = useCallback<() => void>(() => {
    setUser(null);
  }, []);

  const addFavourite = (id: number) => {
    if (!user) return;

    const favourites = user.favourites.concat([`${id}`]);

    updateFavourites({ email: user.email, favourites }).then(setUser);
  };

  const removeFavourite = (id: number) => {
    if (!user) return;

    const favourites = user.favourites.filter(
      (favouriteId) => favouriteId !== `${id}`,
    );

    updateFavourites({ email: user.email, favourites }).then(setUser);
  };

  const updateAllergies = (allergies: string[]) => {
    if (!user) return;

    updateUserAllergies({ email: user.email, allergies }).then(setUser);
  };

  const addList = (name: string) => {
    if (!user) return;

    setUser({
      ...user,
      lists: (user.lists || []).concat({ name, recipes: [] }),
    });
  };

  const addRecipeToList = (recipeId: number, listName: string) => {
    if (!user) return;

    setUser({
      ...user,
      lists: user.lists.map((list) =>
        list.name === listName
          ? { ...list, recipes: list.recipes.concat(`${recipeId}`) }
          : list,
      ),
    });
  };

  const removeRecipeFromList = (recipeId: number, listName: string) => {
    if (!user) return;

    setUser({
      ...user,
      lists: user.lists.map((list) =>
        list.name === listName
          ? {
              ...list,
              recipes: list.recipes.filter((id) => id !== `${recipeId}`),
            }
          : list,
      ),
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        signIn,
        signUp,
        addFavourite,
        removeFavourite,
        updateAllergies,
        logout,
        addList,
        addRecipeToList,
        removeRecipeFromList,
      }}>
      {typeof user !== 'undefined' && children}
    </UserContext.Provider>
  );
};
