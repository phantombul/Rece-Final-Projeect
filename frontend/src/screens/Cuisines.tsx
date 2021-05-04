import React, { useEffect, useState } from 'react';
import { RecipeCard } from '../components/RecipesList';
import { getRecipesForCuisines } from '../api';
import { SectionList, StyleSheet, View } from 'react-native';
import { Recipe } from '../types';
import { MainStackProps } from '../navigation/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Headline } from 'react-native-paper';

export const Cuisines: React.FC<MainStackProps<'Cuisines'>> = ({
  navigation,
}) => {
  const { bottom: paddingBottom } = useSafeAreaInsets();

  const [response, setResponse] = useState<
    { cuisine: string; data: Recipe[] }[]
  >([]);

  useEffect(() => {
    getRecipesForCuisines().then(setResponse);
  }, []);

  return (
    <SectionList
      contentContainerStyle={{ paddingBottom }}
      sections={response}
      renderItem={({ item: recipe }) => (
        <RecipeCard
          recipe={recipe}
          onCardPress={() => navigation.navigate('Recipe', { recipe })}
        />
      )}
      renderSectionHeader={({ section }) => (
        <View style={styles.section}>
          <Headline>{section.cuisine}</Headline>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: 'white',
    padding: 16,
    alignItems: 'center',
  },
});
