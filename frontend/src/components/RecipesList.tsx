import React from 'react';
import { FlatList, FlatListProps, StyleSheet } from 'react-native';
import { Recipe } from '../types';
import { Card, Title } from 'react-native-paper';
import { Paragraph } from './Paragraph';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stats } from './Recipe/Stats';
import { useNavigation } from '@react-navigation/native';

type Props = Omit<
  FlatListProps<Recipe>,
  'data' | 'keyExtractor' | 'contentContainerStyle' | 'renderItem'
> & {
  recipes: Recipe[];
};

export const RecipeCard = ({
  recipe: recipe,
  onCardPress,
}: {
  recipe: Recipe;
  onCardPress: () => void;
}) => {
  return (
    <Card style={styles.card} onPress={onCardPress}>
      <Card.Cover source={{ uri: recipe.image }} />
      <Stats
        aggregateLikes={recipe.aggregateLikes}
        pricePerServing={recipe.pricePerServing}
        readyInMinutes={recipe.readyInMinutes}
      />
      <Card.Content>
        <Title>{recipe.title}</Title>
        <Paragraph>{recipe.summary}</Paragraph>
      </Card.Content>
    </Card>
  );
};

export const RecipesList: React.FC<Props> = ({ recipes, ...flatListProps }) => {
  const navigation = useNavigation();
  const { bottom: paddingBottom } = useSafeAreaInsets();

  const onCardPress = (recipe: Recipe) => {
    navigation.navigate('Recipe', { recipe });
  };

  return (
    <FlatList
      contentContainerStyle={[styles.contentContainer, { paddingBottom }]}
      data={recipes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <RecipeCard recipe={item} onCardPress={() => onCardPress(item)} />
      )}
      {...flatListProps}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: { paddingTop: 16 },
  card: {
    marginBottom: 16,
    borderRadius: 10,
    marginHorizontal: 16,
  },
});
