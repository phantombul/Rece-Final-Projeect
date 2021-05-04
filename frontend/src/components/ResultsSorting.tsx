import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SortDirection, SortOption } from '../types';
import { Chip, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MainStackProps } from '../navigation/types';

type Props = {
  sortOption: SortOption;
  sortDirection: SortDirection;
  setSortDirection: React.Dispatch<React.SetStateAction<SortDirection>>;
};

export const ResultsSorting: React.FC<Props> = ({
  sortOption,
  sortDirection,
  setSortDirection,
}) => {
  const navigation = useNavigation<MainStackProps<'Results'>['navigation']>();

  return (
    <View style={styles.container}>
      <Chip
        // used to capitalize every word, for better display of name
        // for example min missing ingredient becomes Min Missing Ingredient
        textStyle={{ textTransform: 'capitalize' }}
        onPress={() =>
          navigation.navigate('ResultsSorting', {
            initialSortOption: sortOption,
          })
        }>
        {/* used to replace all instances of - with space, for better display of name
            for example min-missing-ingredient becomes min missing ingredient
          */}
        {sortOption.replace(/-/g, ' ')}
      </Chip>
      <IconButton
        icon={`arrow-${sortDirection === 'asc' ? 'down' : 'up'}`}
        onPress={() =>
          setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
});
