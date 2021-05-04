import { StyleSheet, Text, View } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import React from 'react';

// component for displaying likes, duration and cost

type Props = {
  aggregateLikes: number;
  readyInMinutes: number;
  pricePerServing: number;
};

export const Stats: React.FC<Props> = ({
  aggregateLikes,
  readyInMinutes,
  pricePerServing,
}) => {
  return (
    <View style={styles.headerBottomContent}>
      <View style={styles.statContainer}>
        <AntDesign name="like1" style={styles.statIcon} />
        <Text>{aggregateLikes}</Text>
      </View>
      <View style={styles.statContainer}>
        <AntDesign name="clockcircle" style={styles.statIcon} />
        <Text>{readyInMinutes}</Text>
      </View>
      <View style={styles.statContainer}>
        <FontAwesome name="money" style={styles.statIcon} />
        <Text>${pricePerServing.toFixed()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBottomContent: {
    backgroundColor: 'white',
    borderBottomEndRadius: 8, // bottom right radius
    borderBottomStartRadius: 8, // bottom left radius
    height: 32,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  statContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 14,
    marginRight: 8,
  },
});
