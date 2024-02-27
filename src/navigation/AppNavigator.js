import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStack} from './authStack';
import {connect, useDispatch} from 'react-redux';
import {CustomerStack} from './CustomerStack';
import {useEffect} from 'react';
import {initializeUserFromStorage} from '../redux/actions/userActions';
import Splash from '../screens/auth/Splash';
import VendorStack from './VendorStack';

const Stack = createNativeStackNavigator();

const AppNavigator = ({userData}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUserFromStorage());
  }, []);

  return (
    <>
      <Stack.Navigator>
        {userData.loading ? (
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          />
        ) : !userData.token ? (
          <Stack.Screen
            name="AuthStack"
            component={AuthStack}
            options={{headerShown: false}}
            initialParams={{userData}}
          />
        ) : userData.usertype === 'Consumer' ? (
          <Stack.Screen
            name="CustomerStack"
            component={CustomerStack}
            options={{headerShown: false}}
            initialParams={{userData}}
          />
        ) : (
          <Stack.Screen
            name="VendorStack"
            component={VendorStack}
            options={{headerShown: false}}
            initialParams={{userData}}
          />
        )}
      </Stack.Navigator>
    </>
  );
};

const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};
export default connect(mapStateToProps)(AppNavigator);
