import React, {useEffect, useState} from 'react';
import {ImageBackground, Keyboard, TouchableOpacity} from 'react-native';
import {
  View,
  Button,
  VStack,
  Heading,
  Center,
  Text,
  ArrowBackIcon,
} from 'native-base';
import OTPTextInput from 'react-native-otp-textinput';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Icons} from '../../components/icons';
import {API_ENDPOINTS, message, useAxios} from '../../utils/api';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {userToken} from '../../redux/actions/actions';
import {useDispatch} from 'react-redux';

const OTPVerificationScreen = ({navigation, user}) => {
  const dispatch = useDispatch();
  const route = useRoute();
  const CoverImage = require('../../../assets/images/background.png');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const {phoneNumber} = route.params;

  const initialValues = {
    otp: '',
    phoneNumber: phoneNumber,
  };

  const validationSchema = Yup.object().shape({
    otp: Yup.string()
      .length(4, 'OTP must be 4 characters')
      .required('OTP is required'),
  });

  const handleVerifyOTP = async values => {
    await handleOtp(values);
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

  const handleOtp = async value => {
    let data = {
      otp_value: value.otp.toString(),
      number: '+91' + value.phoneNumber,
    };
    let endpoint = API_ENDPOINTS.BASE + '/accounts/otp/verified/';
    try {
      setLoading(true);
      const response = await useAxios.post(endpoint, data);
      let responseData = response.data;
      if (responseData.success) {
        if (responseData.is_reg) {
          message(responseData.message, 'success');
          await AsyncStorage.setItem('token', responseData.user.access_token);
          dispatch(userToken(responseData.user.access_token));
          setLoading(false);
          navigation.reset({
            routes: [{name: 'AppNavigator'}],
          });
          setLoading(false);
        } else {
          let uid = responseData.uid;
          navigation.navigate('SignUpForm', {uid});
          setLoading(false);
        }
      } else {
        message(responseData.message, 'error');
        setLoading(false);
      }
    } catch (error) {
      message('Fetch Error, Try again', 'error');
      setLoading(false);
    }
  };

  const handleProceed = async values => {
    try {
      setOtpLoading(true);
      let data = {
        number: '+91' + phoneNumber,
      };
      const response = await useAxios.post(
        API_ENDPOINTS.USERS + '/send/otp/',
        data,
      );
      let responseData = response.data;
      setOtpLoading(false);
      if (responseData.success) {
        message(responseData.message, 'success');
      } else {
        setOtpLoading(false);
        message(responseData.message, 'error');
      }
    } catch (error) {
      console.log(' ERROR', error);
      setOtpLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleVerifyOTP}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View style={{flex: 1}}>
          <ImageBackground
            source={CoverImage}
            style={{flex: 1, resizeMode: 'cover', justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                position: 'absolute',
                top: 30,
                left: 16,
                zIndex: 1,
              }}>
              <ArrowBackIcon size="6" color="white" />
            </TouchableOpacity>
            <View alignItems={'center'} mt={'30%'}>
              <Icons.Logo />
            </View>
            <Center>
              {!isKeyboardVisible ? (
                <View
                  flex="0"
                  justifyContent="center"
                  alignItems="center"
                  marginY="30"
                  w="100%"
                  maxW="350">
                  {user === 'Consumer' ? <Icons.OTP /> : <Icons.Vendor />}
                </View>
              ) : null}
              <VStack flex="0" justifyContent="flex-end" w="100%" maxW="350">
                <Heading
                  my="10"
                  fontFamily="body"
                  fontWeight="600"
                  textAlign={'center'}
                  fontSize="20">
                  Enter One Time Password
                </Heading>
                <OTPTextInput
                  handleTextChange={handleChange('otp')}
                  containerStyle={{marginBottom: 20}}
                  textInputStyle={{
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: 'coolGray.300',
                    backgroundColor: 'white',
                  }}
                  inputCount={4}
                  keyboardType="numeric"
                />
                {touched.otp && errors.otp && (
                  <Text color="red.500" marginBottom={2}>
                    {errors.otp}
                  </Text>
                )}
              </VStack>
            </Center>
            <Center flex={1} px="3">
              <Center>
                <VStack flex="0" w="100%" maxW="350">
                  {!errors.otp && values.otp ? (
                    <Button
                      isLoading={loading}
                      disabled={otpLoading}
                      isLoadingText="Verify OTP"
                      width={300}
                      onPress={handleSubmit}>
                      Verify OTP
                    </Button>
                  ) : null}
                  <Button
                    isLoading={otpLoading}
                    disabled={loading}
                    isLoadingText="Resend OTP"
                    mb={'5'}
                    variant="unstyled"
                    onPress={handleProceed}>
                    Resend OTP
                  </Button>
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
export default connect(mapStateToProps)(OTPVerificationScreen);
