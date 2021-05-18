import React, { useEffect, useRef, useState } from 'react';
import { MainStackProps } from '../navigation/types';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { FridgeModeRanking, RecipesResponse, SortDirection } from '../types';
import { getRecipes } from '../api';
import { ResultsSorting } from '../components/ResultsSorting';
import { RecipesList } from '../components/RecipesList';
import { Chip } from 'react-native-paper';

type Props = MainStackProps<'Results'>;

export const Results: React.FC<Props> = ({
  route: {
    params: { ingredients, dislikes, allergies, searchMode, sortOption },
  },
}) => {
  const isLoadingRef = useRef(false); //?
  const [isLoading, setIsLoading] = useState(true);

  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const [fridgeModeRanking, setFridgeModeRanking] =
    useState<FridgeModeRanking>(1);

  const [response, setResponse] = useState<RecipesResponse>({
    results: [],
    totalResults: 0,
  });
  console.log(response);
  const setLoading = (value: boolean) => {
    setIsLoading(value);
    isLoadingRef.current = value;
  };

  const fetchData = (clearPrev?: boolean) => {
    if (isLoadingRef.current) return;

    if (clearPrev) {
      setResponse({ results: [], totalResults: 0 });
    }

    setLoading(true);
    getRecipes({
      ingredients,
      dislikes,
      allergies,
      searchMode,
      sortOption,
      sortDirection,
      fridgeModeRanking,
      offset: clearPrev ? 0 : response.results.length,
    }).then((res) => {
      setLoading(false);
      setResponse((prev) => ({
        ...res,
        results: prev.results.concat(res.results),
        totalResults: res.totalResults || prev.totalResults, // when last page is fetched, API is returning totalResults 0
      }));
    });
  };

  useEffect(() => {
    fetchData(true);
  }, [sortOption, sortDirection, fridgeModeRanking]);

  const onEndReached = () => fetchData();

  return (
    <RecipesList
      // ListHeaderComponent is for displaying something at the top of a FlatList, which is opposiite of ListFooterComponent used below to display spinner
      ListHeaderComponent={() =>
        searchMode === 'fridge' ? (
          <Chip
            style={{
              alignSelf: 'flex-start',
              marginBottom: 16,
              marginLeft: 16,
            }}
            onPress={() =>
              setFridgeModeRanking((prev) => (prev === 1 ? 2 : 1))
            }>
            {fridgeModeRanking === 1
              ? 'Maximize used ingredients'
              : 'Minimize missing ingredients'}
          </Chip>
        ) : (
          <ResultsSorting
            {...{ sortOption, sortDirection, setSortDirection }}
          />
        )
      }
      recipes={response.results}
      ListFooterComponent={isLoading ? () => <ActivityIndicator /> : null} // spinner for loading
      onEndReached={
        response.totalResults !== response.results.length // if we haven't got all recipes yet, keep fetching else nothing
          ? onEndReached
          : undefined
      }
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
