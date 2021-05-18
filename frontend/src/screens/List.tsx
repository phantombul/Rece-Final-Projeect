import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useUser } from '../hooks/useUser';
import { getRecipesByIds } from '../api';
import { Recipe } from '../types';
import { RecipeCard, RecipesList } from '../components/RecipesList';
import { ListsStackProps } from '../navigation/types';

type Props = ListsStackProps<'List'>;

export const List: React.FC<Props> = ({
  navigation,
  route: {
    params: { name },
  },
}) => {
  const { user } = useUser();

  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    if (user?.lists?.length) {
      const list = user.lists.find((list) => list.name === name);
      if (list) {
        getRecipesByIds(list.recipes).then(setRecipes);
      }
    } else {
      setRecipes([]);
    }
  }, [user?.lists, name]);

  return <RecipesList recipes={recipes} />;
};
