import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { MainStackProps } from '../navigation/types';
import { useChipList } from '../hooks/useChipList';
import { Button, Checkbox } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUser } from '../hooks/useUser';

const allAllergies = [
  'Dairy',
  'Egg',
  'Gluten',
  'Grain',
  'Peanut',
  'Seafood',
  'Sesame',
  'Shellfish',
  'Soy',
  'Sulfite',
  'Tree Nut',
  'Wheat',
];

export const Allergies: React.FC<MainStackProps<'Allergies'>> = ({
  navigation,
  route: {
    params: { initialAllergies },
  },
}) => {
  const { bottom } = useSafeAreaInsets(); // used to handle notches in the screen
  const { items, addItem, removeItem } = useChipList(initialAllergies);
  const { updateAllergies } = useUser();

  const save = () => {
    updateAllergies(items);
    navigation.navigate('Search', { allergies: items });
  };

  return (
    <ScrollView
      //contentContainerStyle is used to style the container of ScrollView
      contentContainerStyle={[
        styles.contentContainer,
        { paddingBottom: bottom + 24 }, // bottom padding should be relative to the safe area
      ]}>
      <View>
        {allAllergies.map((allergy) => (
          <Checkbox.Item
            key={allergy}
            label={allergy}
            status={items.includes(allergy) ? 'checked' : 'unchecked'}
            onPress={() => {
              items.includes(allergy) ? removeItem(allergy) : addItem(allergy);
            }}
          />
        ))}
      </View>
      <Button mode={'contained'} style={styles.button} onPress={save}>
        Save
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    flexGrow: 1, // scrollView in this case has 2 children, the View and Button. Using flexGrow, it will be spanned/stretched
    // across the screen horizontally, so the last child (Save button) is always fixed at the bottom of screen
    // flex: 1 would look the same as flexGrow: 1 but won't be scrollable
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 24,
  },
});
