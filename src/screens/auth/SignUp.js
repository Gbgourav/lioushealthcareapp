import React, {useEffect, useState} from 'react';
import {ImageBackground, Keyboard} from 'react-native';
import {
  View,
  Input,
  Button,
  VStack,
  Heading,
  Center,
  Text,
  Spinner,
} from 'native-base';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Icons} from '../../components/icons';
import {connect} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {API_ENDPOINTS, message, useAxios} from '../../utils/api';
import {userDetails, userToken} from '../../redux/actions/actions';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {initializeUserFromStorage} from '../../redux/actions/userActions';

const SignUpForm = ({navigation, user}) => {
  const dispatch = useDispatch();
  const route = useRoute();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gLoading, setGloading] = useState(false);

  const CoverImage = require('../../../assets/images/background.png');
  const {uid} = route.params;

  useEffect(() => {
    const configureGoogleSignIn = async () => {
      try {
        GoogleSignin.configure({
          androidClientId:
            '973554262670-r9vg6nna8tk7v5accrtgpam2h1d7uqjk.apps.googleusercontent.com',
        });
      } catch (error) {
        console.error('Error configuring Google Sign-In:', error);
      }
    };

    configureGoogleSignIn();
  }, []);

  const signIn = async () => {
    //  {"email": "gbgourav123@gmail.com", "familyName": "Bhandari", "givenName": "Gourav", "id": "117106095885157059426", "name": "Gourav Bhandari", "photo": null}}
    try {
      setGloading(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const gToken = await GoogleSignin.getTokens();
      const accessToken = gToken.accessToken;
      await AsyncStorage.setItem('Gtoken', accessToken);
      let data = {
        first_name: userInfo.user.givenName,
        last_name: userInfo.user.familyName,
        email: userInfo.user.email,
        type: user,
        uid: uid,
      };
      setGloading(false);
      await handleReg(data);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Error', error);
        setGloading(false);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Error', error);
        setGloading(false);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Error', error);
        setGloading(false);
      } else {
        console.log('Error occurred', error);
        setGloading(false);
      }
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const initialValues = {
    email: '',
    userType: user,
    first_name: '',
    last_name: '',
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    userType: Yup.string().required('User Type is required'),
  });

  const handleReg = async data => {
    try {
      setLoading(true);
      const response = await useAxios.post(
        API_ENDPOINTS.USERS + '/registration/',
        data,
      );
      let responseData = response.data;
      if (responseData.success) {
        message(responseData.message, 'success');
        await AsyncStorage.setItem('token', responseData.user.access_token);
        dispatch(userToken(responseData.user.access_token));
        // dispatch(initializeUserFromStorage());
        setLoading(false);
        navigation.reset({
          routes: [{name: 'AppNavigator'}],
        });
      } else {
        message(responseData.message, 'error');
        setLoading(false);
      }
    } catch (error) {
      console.log('error', error?.response?.data);
      let errors = error?.response?.data;
      message(errors ? errors.toString() : 'fetch error. try again', 'error');
      setLoading(false);
    }
  };

  const handleProceed = async values => {
    let data = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      uid: uid,
      type: user,
    };
    await handleReg(data);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleProceed}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View style={{flex: 1}}>
          <ImageBackground
            source={CoverImage}
            style={{flex: 1, resizeMode: 'cover', justifyContent: 'center'}}>
            <View alignItems={'center'} mt={isKeyboardVisible ? '10%' : '20%'}>
              <Icons.Logo />
            </View>
            {!isKeyboardVisible ? (
              <View
                flex="0"
                justifyContent="center"
                alignSelf={'center'}
                alignItems="center"
                marginY="30"
                w="100%"
                maxW="200">
                {user === 'Consumer' ? <Icons.OTP /> : <Icons.Vendor />}
              </View>
            ) : null}
            <Center>
              <VStack
                flex="0"
                justifyContent="flex-end"
                w="100%"
                maxW="350"
                style={{gap: 5}}>
                <Heading
                  my="5"
                  fontFamily="body"
                  fontWeight="600"
                  fontSize="20">
                  Sign Up
                </Heading>
                <Input
                  variant="underlined"
                  placeholder="First Name"
                  value={values.first_name}
                  onChangeText={handleChange('first_name')}
                  onBlur={handleBlur('first_name')}
                  isRequired
                />
                {touched.first_name && errors.first_name && (
                  <Text color="red.500">{errors.first_name}</Text>
                )}

                <Input
                  variant="underlined"
                  placeholder="Last Name"
                  value={values.last_name}
                  onChangeText={handleChange('last_name')}
                  onBlur={handleBlur('last_name')}
                  isRequired
                />
                {touched.last_name && errors.last_name && (
                  <Text color="red.500">{errors.last_name}</Text>
                )}

                <Input
                  variant="underlined"
                  placeholder="Email"
                  keyboardType="email-address"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  isRequired
                />
                {touched.email && errors.email && (
                  <Text color="red.500">{errors.email}</Text>
                )}
              </VStack>
            </Center>
            <Center flex={1} px="1">
              <Center>
                <VStack flex="1" justifyContent="center" w="100%">
                  <Button
                    mb="2"
                    width={300}
                    onPress={handleSubmit}
                    isLoading={loading}
                    isLoadingText={'Signing Up...'}>
                    Sign Up
                  </Button>
                  <Center my="1">
                    <Text>Or</Text>
                  </Center>
                  <View>
                    <GoogleSigninButton
                      size={GoogleSigninButton.Size.Wide}
                      color={GoogleSigninButton.Color.Dark}
                      onPress={signIn}
                      disabled={loading}
                    />
                    {gLoading && !loading ? (
                      <View style={{position: 'absolute', top: 15, right: 25}}>
                        <Spinner />
                      </View>
                    ) : null}
                  </View>
                </VStack>
              </Center>
            </Center>
          </ImageBackground>
        </View>
      )}
    </Formik>
  );
};
const mapStateToProps = state => {
  return {
    user: state.user.usertype,
  };
};
export default connect(mapStateToProps)(SignUpForm);
