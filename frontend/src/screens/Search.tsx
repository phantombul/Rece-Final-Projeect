import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Divider, RadioButton, Title } from 'react-native-paper';
import { ChipList } from '../components/ChipList';
import { useChipList } from '../hooks/useChipList';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Autocomplete } from '../components/Autocomplete';
import { MainStackParams, MainStackProps } from '../navigation/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SearchMode } from '../types';

export const Search: React.FC<MainStackProps<'Search'>> = ({
  navigation,
  route: {
    params: { allergies },
  },
}) => {
  const { bottom } = useSafeAreaInsets();
  const [searchMode, setSearchMode] = useState<SearchMode>('some');

  const {
    items: selectedIngredients,
    addItem: addSelectedIngredient,
    removeItem: removeSelectedIngredient,
  } = useChipList();

  const {
    items: selectedDislikes,
    addItem: addSelectedDislikes,
    removeItem: removeSelectedDislikes,
  } = useChipList();

  const onSearchPress = () => {
    navigation.navigate('Results', {
      ingredients: selectedIngredients,
      dislikes: selectedDislikes,
      allergies,
      searchMode,
    } as MainStackParams['Results']);
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[
        styles.container,
        { paddingBottom: bottom + 24 },
      ]}>
      <View>
        <Title>Ingredients</Title>
        <Autocomplete
          placeholder={'Add ingredients'}
          selectedIngredients={selectedIngredients}
          addSelectedIngredient={addSelectedIngredient}
        />
        <ChipList
          items={selectedIngredients}
          removeItem={removeSelectedIngredient}
        />
        <RadioButton.Group
          value={searchMode}
          onValueChange={(value) => setSearchMode(value as SearchMode)}>
          <RadioButton.Item value="some" label={'Some of them'} />
          <RadioButton.Item value="all" label={'All of them'} />
        </RadioButton.Group>
        <Divider style={styles.divider} />
        <Title>Dislikes</Title>
        <Autocomplete
          placeholder={'Add dislikes'}
          selectedIngredients={selectedDislikes}
          addSelectedIngredient={addSelectedDislikes}
        />
        <ChipList
          items={selectedDislikes}
          removeItem={removeSelectedDislikes}
        />
        <Divider style={styles.divider} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Title>Allergies</Title>
          <Button
            hitSlop={{ left: 16, right: 16 }}
            labelStyle={{ marginHorizontal: 0 }}
            onPress={() =>
              navigation.navigate('Allergies', {
                initialAllergies: allergies,
              })
            }>
            + Add
          </Button>
        </View>
        <ChipList items={allergies} />
      </View>

      <Button
        disabled={!selectedIngredients.length}
        onPress={onSearchPress}
        mode="contained">
        Search
      </Button>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  searchModeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  divider: {
    height: 2,
    marginVertical: 24,
  },
});
