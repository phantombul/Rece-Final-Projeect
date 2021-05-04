import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';

type Props = {
  items: string[];
  /* ? means it is not required (undefined). So removeItem is not required,
  and type is function which receives a string and does not return anything*/
  removeItem?: (item: string) => void;
};

export const ChipList: React.FC<Props> = ({ items, removeItem }) => {
  return (
    <View style={styles.container}>
      {items.map((item) => (
        <View key={item}>
          <Chip
            style={styles.chip}
            /* action to take when the close icon is pressed. For ingredients it will remove from list, for allergies
              it will pass undefined which means it won't show close icon */
            onClose={removeItem ? () => removeItem(item) : undefined}>
            {item}
          </Chip>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap', // if an item is going outside the range of flexDirection, then put it in the next axis (next row)
    alignItems: 'flex-start',
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
});
