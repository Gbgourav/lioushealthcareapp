import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SendOtp from '../screens/auth/SendOtp';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SendOtp" component={SendOtp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
