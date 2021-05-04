import { DefaultTheme, IconButton } from 'react-native-paper';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useUser } from '../hooks/useUser';

export const FavouriteButton: React.FC<{ id: number }> = ({ id }) => {
  const { user, addFavourite, removeFavourite } = useUser();
  const isFavourite = user?.favourites.includes(`${id}`);
  return (
    <IconButton
      icon={isFavourite ? 'heart' : 'heart-outline'}
      color={DefaultTheme.colors.primary}
      style={styles.icon}
      onPress={() => {
        isFavourite ? removeFavourite(id) : addFavourite(id);
      }}
    />
  );
};

const styles = StyleSheet.create({
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
