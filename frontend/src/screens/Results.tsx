import React, { useEffect, useRef, useState } from 'react';
import { MainStackProps } from '../navigation/types';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { RecipesResponse, SortDirection } from '../types';
import { getRecipes } from '../api';
import { ResultsSorting } from '../components/ResultsSorting';
import { RecipesList } from '../components/RecipesList';

type Props = MainStackProps<'Results'>;

export const Results: React.FC<Props> = ({
  route: {
    params: { ingredients, dislikes, allergies, searchMode, sortOption },
  },
}) => {
  const isLoadingRef = useRef(false); //?
  const [isLoading, setIsLoading] = useState(true);

  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const [response, setResponse] = useState<RecipesResponse>({
    results: [],
    totalResults: 0,
  });

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
  }, [sortOption, sortDirection]);

  const onEndReached = () => fetchData();

  return (
    <RecipesList
      // ListHeaderComponent is for displaying something at the top of a FlatList, which is opposiite of ListFooterComponent used below to display spinner
      ListHeaderComponent={() => (
        <ResultsSorting {...{ sortOption, sortDirection, setSortDirection }} />
      )}
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
