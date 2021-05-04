import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import AutocompleteInput from 'react-native-autocomplete-input';
import { Ingredient } from '../types';
import { getIngredients } from '../api';

type Props = {
  placeholder: string;
  selectedIngredients: string[];
  addSelectedIngredient: (item: string) => void;
};

export const Autocomplete: React.FC<Props> = ({
  placeholder,
  selectedIngredients,
  addSelectedIngredient,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [query, setQuery] = useState('');
  const [ingredients, setAllIngredients] = useState<Ingredient[]>([]);

  const getIngs = (q: string) => {
    setQuery(q);
    if (q.length >= 3) {
      // need a minimum of 3 chars before suggestions are fetched from API
      getIngredients(q).then((result) => {
        setAllIngredients(
          result.filter(({ name }) => !selectedIngredients.includes(name)),
        );
      });
    }
  };

  return (
    <AutocompleteInput
      containerStyle={[styles.autocomplete, { zIndex: isActive ? 1 : 0 }]}
      autoCapitalize="none"
      autoCorrect={false}
      data={ingredients}
      onChangeText={getIngs} //when text is changed, fetch new suggestions
      placeholder={placeholder} //placeholder is different for each autocomplete box (ingredient/dislike) , so used as prop
      value={query}
      /*
       * when user was typing in the box, the suggestions were going underneath other elements on the page
       * to fix this, we set isActive as true when the item has focus, and change zIndex based on isActive to 1 or 0
       * */
      onFocus={() => setIsActive(true)}
      onBlur={() => {
        setAllIngredients([]); // to hide autocomplete list
        setIsActive(false);
      }}
      inputContainerStyle={styles.inputContainer}
      style={styles.input}
      flatListProps={{
        /* initially needed two taps to be able to type. first one was to release keyboard, with keyboardShouldPersistTaps this is fixed  */
        keyboardShouldPersistTaps: 'handled',
        keyExtractor: (item) => item.name,
        renderItem: ({ item }) => (
          <TouchableOpacity // TouchableOpacity is touchable (unlike view) and shows a brief animation when tapped
            onPress={() => {
              setQuery(''); // reset the query to empty to prepare for the next input
              setAllIngredients([]); // to remove the autocomplete list
              addSelectedIngredient(item.name); // selected ingredient added to list ingredients selected
            }}>
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        ),
      }}
      /* renderItem is required in this module, otherwise error is thrown, however we don't need it, so we set it
      to a function that returns null */
      renderItem={() => null}
    />
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: 4,
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    borderRadius: 4,
  },
  autocomplete: {
    marginTop: 8,
  },

  itemText: {
    fontSize: 15,
    margin: 8,
  },
});
