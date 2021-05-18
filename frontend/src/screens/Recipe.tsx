import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { MainStackProps } from '../navigation/types';
import {
  DefaultTheme,
  Headline,
  IconButton,
  List,
  Title,
} from 'react-native-paper';
import { getRecipeInstructions } from '../api';
import { RecipeInstruction } from '../types';
import { Stats } from '../components/Recipe/Stats';
import { RecipeHeaderButtons } from '../components/RecipeHeaderButtons';

type Props = MainStackProps<'Recipe'>;

const Instructions: React.FC<RecipeInstruction> = ({ steps, name }) => (
  <View style={styles.instructionContainer}>
    {/* HeadLine is similar to h1 tag. Used for recipes with multiple set of instructions, not just one set*/}
    <Headline>{name}</Headline>
    {steps.map((step) => (
      <List.Item
        key={step.number.toString()}
        title={`Step: ${step.number}`}
        description={step.step}
        descriptionNumberOfLines={10000} //default would only display 2 lines, and since we don't know the max, use 10000
        left={() => <List.Icon icon={'check-circle'} style={{ margin: 0 }} />}
      />
    ))}
  </View>
);

export const Recipe: React.FC<Props> = ({
  navigation,
  route: {
    params: { recipe },
  },
}) => {
  const { width } = useWindowDimensions(); // get window width, later used in styles
  const [recipeInstructions, setRecipeInstructions] = useState<
    RecipeInstruction[]
  >([]);

  useEffect(() => {
    getRecipeInstructions(recipe.id).then((result) =>
      setRecipeInstructions(result),
    );
    navigation.setOptions({
      headerRight: () => <RecipeHeaderButtons id={recipe.id} />,
    });
  }, [recipe]); //useEffect will run when recipe changes, which in this case will only run once at the beginning

  return (
    <ScrollView>
      <View style={styles.headerContainer}>
        <Image style={styles.image} source={{ uri: recipe.image }} />
        <View style={styles.header}>
          <View style={[styles.headerTopContent, { width: width - 64 }]}>
            <Title style={styles.title}>{recipe.title}</Title>
          </View>
          <Stats
            aggregateLikes={recipe.aggregateLikes}
            pricePerServing={recipe.pricePerServing}
            readyInMinutes={recipe.readyInMinutes}
          />
        </View>
      </View>
      {recipeInstructions.map((recipeInstruction, i) => (
        <Instructions key={`${i}-instruction`} {...recipeInstruction} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 320,
    width: '100%',
  },
  header: {
    position: 'absolute',
    bottom: -32,
    backgroundColor: 'orange',
    alignSelf: 'center',
    borderRadius: 8,
    // shadow style properties for IOS (don't work on android)
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.22,
    shadowRadius: 4,
    // shadow style property for android
    elevation: 2,
  },
  headerTopContent: { flex: 1, padding: 8 },
  title: {
    color: 'white',
  },
  instructionContainer: {
    paddingHorizontal: 16,
  },
  headerContainer: {
    marginBottom: 32,
  },
});
