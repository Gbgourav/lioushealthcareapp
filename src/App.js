import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {store} from './redux/store';
import AppNavigator from './navigation/AppNavigator';
import {extendTheme, NativeBaseProvider} from 'native-base';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const App = () => {
  const Stack = createNativeStackNavigator();
  const theme = extendTheme({
    components: {
      Input: {
        baseStyle: {
          style: {
            fontSize: 14.5,
          },
        },
        variants: {
          outline: {
            style: {
              fontSize: 14.5,
            },
          },
        },
      },
      FormControlLabel: {
        baseStyle: {
          _text: {
            fontSize: 14,
            fontWeight: 400,
            color: '#0C4E5F',
          },
        },
      },
    },
    colors: {
      primary: {
        50: '#0C4E5F',
        100: '#0C4E5F',
        200: '#0C4E5F',
        300: '#0C4E5F',
        400: '#0C4E5F',
        500: '#0C4E5F',
        600: '#0C4E5F',
        700: '#0C4E5F',
        800: '#a6becb',
        900: '#003F5E',
      },
      amber: {
        400: '#d97706',
      },
    },
    fontConfig: {
      Poppins: {
        100: {
          normal: 'Poppins-ExtraLight',
        },
        200: {
          normal: 'Poppins-Light',
        },
        300: {
          normal: 'Poppins-Light',
        },
        400: {
          normal: 'Poppins-Regular',
        },
        500: {
          normal: 'Poppins-SemiBold',
        },
        600: {
          normal: 'Poppins-SemiBold',
        },
        700: {
          normal: 'Poppins-Bold',
        },
      },
    },
    fonts: {
      heading: 'Poppins',
      body: 'Poppins',
      mono: 'Poppins',
    },
  });

  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator animationEnabled={true}>
            <Stack.Screen
              name="AppNavigator"
              component={AppNavigator}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
