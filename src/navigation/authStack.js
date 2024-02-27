import {createStackNavigator} from '@react-navigation/stack';
import SendOtp from '../screens/auth/SendOtp';
import OTPVerificationScreen from '../screens/auth/VerifyOtp';
import SignUpForm from '../screens/auth/SignUp';
import * as React from 'react';

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'SendOtp'}
      animationEnabled={true}
      screenOptions={{
        headerShown: false,
        title: false,
      }}>
      <Stack.Screen
        name="SendOtp"
        component={SendOtp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OTPVerificationScreen"
        component={OTPVerificationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpForm"
        component={SignUpForm}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
