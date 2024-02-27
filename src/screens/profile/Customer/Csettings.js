import {Button, Text, View} from 'native-base';
import {clearAuthState} from '../../../redux/actions/userActions';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import {logout} from '../../../redux/store';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {message} from '../../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Csettings = ({navigation}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const logoutHandler = async () => {
    setLoading(true);
    const accessToken = await AsyncStorage.getItem('Gtoken');
    if (accessToken) {
      await GoogleSignin.signOut();
    }
    await clearAuthState();
    dispatch(logout());
    message('You have logout successfully', 'success');
    setLoading(false);

    navigation.reset({
      routes: [{name: 'AppNavigator'}],
    });
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

export default Csettings;
