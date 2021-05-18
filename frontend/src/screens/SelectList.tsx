import { Button, List, TextInput } from 'react-native-paper';
import { FlatList } from 'react-native';
import React, { useState } from 'react';
import { useUser } from '../hooks/useUser';
import { MainStackProps } from '../navigation/types';

type Props = MainStackProps<'SelectList'>;

export const SelectList: React.FC<Props> = ({
  route: {
    params: { recipeId },
  },
}) => {
  const { user, addList, addRecipeToList, removeRecipeFromList } = useUser();

  const [isCreation, setIsCreation] = useState(false);
  const [name, setName] = useState('');

  const reset = () => {
    setName('');
    setIsCreation(false);
  };

  return (
    <FlatList
      data={user?.lists}
      keyExtractor={(item) => item.name}
      renderItem={({ item: { name, recipes } }) => (
        <List.Item
          title={name}
          description={`Recipes: ${recipes.length}`}
          onPress={() => {
            recipes.includes(`${recipeId}`)
              ? removeRecipeFromList(recipeId, name)
              : addRecipeToList(recipeId, name);
          }}
        />
      )}
      ListFooterComponent={() =>
        isCreation ? (
          <TextInput
            autoFocus
            value={name}
            onChangeText={setName}
            onBlur={reset}
            onSubmitEditing={() => {
              addList(name);
              reset();
            }}
            returnKeyType={'done'}
          />
        ) : (
          <Button onPress={() => setIsCreation(true)}>Add list</Button>
        )
      }
    />
  );
};
