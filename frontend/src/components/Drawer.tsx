import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useUser } from '../hooks/useUser';

export const Drawer = (props: DrawerContentComponentProps) => {
  const { logout } = useUser();
  const { bottom } = useSafeAreaInsets();
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={[
        props.contentContainerStyle,
        {
          flexGrow: 1,
          justifyContent: 'space-between',
          paddingBottom: bottom + 16,
        },
      ]}>
      <View>
        <DrawerItemList {...props} />
      </View>
      <Button onPress={logout}>Logout</Button>
    </DrawerContentScrollView>
  );
};
