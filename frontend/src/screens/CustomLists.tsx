import React from 'react';
import { FlatList } from 'react-native';
import { useUser } from '../hooks/useUser';
import { List } from 'react-native-paper';
import { ListsStackProps } from '../navigation/types';

type Props = ListsStackProps<'CustomLists'>;

export const CustomLists: React.FC<Props> = ({ navigation }) => {
  const { user } = useUser();

  return (
    <FlatList
      data={user?.lists}
      keyExtractor={(item) => item.name}
      renderItem={({ item: { name, recipes } }) => (
        <List.Item
          title={name}
          description={`Recipes: ${recipes.length}`}
          onPress={() => navigation.navigate('List', { name, recipes })}
        />
      )}
    />
  );
};
