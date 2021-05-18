import { DefaultTheme, IconButton } from 'react-native-paper';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useUser } from '../hooks/useUser';
import { useNavigation } from '@react-navigation/native';
import { MainStackProps } from '../navigation/types';

export const RecipeHeaderButtons: React.FC<{ id: number }> = ({ id }) => {
  const navigation = useNavigation<MainStackProps<'Recipe'>['navigation']>();
  const { user, addFavourite, removeFavourite } = useUser();
  const isFavourite = user?.favourites.includes(`${id}`);

  return (
    <View style={styles.container}>
      <IconButton
        icon={'playlist-check'}
        color={DefaultTheme.colors.primary}
        style={styles.icon}
        onPress={() => navigation.navigate('SelectList', { recipeId: id })}
      />
      <IconButton
        icon={isFavourite ? 'heart' : 'heart-outline'}
        color={DefaultTheme.colors.primary}
        style={styles.icon}
        onPress={() => {
          isFavourite ? removeFavourite(id) : addFavourite(id);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  icon: {
    backgroundColor: 'white',
    // shadow style properties for IOS (don't work on android)
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.22,
    shadowRadius: 4,
    // shadow style property for android
    elevation: 2,
    // by default IconButton has overflow: hidden. When overflow is hidden, shadow isn't visible
    overflow: 'visible',
  },
});
