import {Button, Text, View} from 'native-base';
import {clearAuthState} from '../../../redux/actions/userActions';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import {logout} from '../../../redux/store';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {message} from '../../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Vdeliveries = ({navigation}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const logoutHandler = async () => {
    try {
      setLoading(true);
      const accessToken = await AsyncStorage.getItem('Gtoken');
      console.log('G id', accessToken);
      if (accessToken) {
        try {
          await GoogleSignin.signOut();
        } catch (e) {
          console.log('logoutGoogle', e);
        }
      }
      await clearAuthState();
      dispatch(logout());
      setLoading(false);
      message('You have logout successfully', 'success');

      navigation.reset({
        routes: [{name: 'AppNavigator'}],
      });
    } catch (error) {
      console.log('Error while logout', error);
    }
  };
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Vendor</Text>
      <Button
        isLoading={loading}
        isLoadingText={'Loging out..'}
        onPress={() => logoutHandler()}>
        Logout
      </Button>
    </View>
  );
};

export default Vdeliveries;
