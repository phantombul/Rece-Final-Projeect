import React, { useEffect, useState } from 'react';
import { RecipesList } from '../components/RecipesList';
import { useUser } from '../hooks/useUser';
import { getRecipesByIds } from '../api';
import { Recipe } from '../types';

export const Favourites = () => {
  const { user } = useUser();
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    if (user?.favourites?.length) {
      getRecipesByIds(user.favourites).then(setRecipes);
    } else {
      setRecipes([]);
    }
  }, [user?.favourites]);

  return <RecipesList recipes={recipes} />;
};
