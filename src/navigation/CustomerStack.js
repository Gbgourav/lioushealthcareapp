import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import Consumer from '../screens/profile/Consumer';

const Stack = createStackNavigator();
export const CustomerStack = () => {
  return (
    <Stack.Navigator initialRouteName={'Consumer'} animationEnabled={true}>
      <Stack.Screen
        name="Consumer"
        component={Consumer}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
