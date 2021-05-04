import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';
import { SortOption, sortOptions } from '../types';
import { MainStackParams, MainStackProps } from '../navigation/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const ResultsSorting: React.FC<MainStackProps<'ResultsSorting'>> = ({
  navigation,
  route: {
    params: { initialSortOption },
  },
}) => {
  const { bottom } = useSafeAreaInsets();
  const [sortOption, setSortOption] = useState<SortOption>(initialSortOption);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.contentContainer,
        { paddingBottom: bottom + 24 },
      ]}>
      <RadioButton.Group // results sorting options are actually radio buttons
        onValueChange={(value) => setSortOption(value as SortOption)}
        value={sortOption}>
        {sortOptions.map((option) => (
          <RadioButton.Item
            key={option}
            label={option.replace(/-/g, ' ')}
            value={option}
            labelStyle={{ textTransform: 'capitalize' }}
          />
        ))}
      </RadioButton.Group>
      <Button
        style={styles.button}
        mode="contained" // contained mode gives the button a rectangular background. outlined is another mode, with a rectangular border around it. no fill.
        onPress={
          () =>
            navigation.navigate('Results', {
              sortOption,
            } as MainStackParams['Results'])
          // without "as MainStackParams['Results'])" the code will give error because it needs all params for
          // MainStackParams['Results'] (allergies, dislikes, etc). by saying "as MainStackParams['Results'])", we're
          // basically saying {sortOption,} is the same as "MainStackParams['Results'])" with the rest of keys having
          // undefined as values. so the error goes away
        }>
        Save
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  button: {
    marginHorizontal: 16,
    marginTop: 24,
  },
});
