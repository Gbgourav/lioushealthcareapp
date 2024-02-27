import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {ImageBackground, Alert, Keyboard} from 'react-native';
import {
  View,
  Input,
  Button,
  VStack,
  Heading,
  Center,
  Text,
  Spinner,
  Progress,
} from 'native-base';
import {Icons} from '../../components/icons';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {API_ENDPOINTS, message, useAxios} from '../../utils/api';
import {useDispatch} from 'react-redux';
import {userType} from '../../redux/actions/actions';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

const SendOtp = ({navigation, user}) => {
  const dispatch = useDispatch();
  const CoverImage = require('../../../assets/images/background.png');
  const [loader, setLoader] = useState(false);
  const [authLoader, setAuthLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    dispatch(userType('Consumer'));
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
    phoneNumber: '',
  };

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required('Mobile number is required')
      .matches(/^\d{10}$/, 'Must be 10 digits'),
  });

  const handleType = type => {
    setIsLoading(true);
    setTimeout(() => {
      dispatch(userType(type));
      setTimeout(() => {
        setIsLoading(false);
      }, 50);
    }, 50);
  };

  const handleProceed = async values => {
    try {
      setLoader(true);
      let data = {
        number: '+91' + values.phoneNumber,
      };
      const response = await useAxios.post(
        API_ENDPOINTS.USERS + '/send/otp/',
        data,
      );
      let responseData = response.data;
      setLoader(false);
      if (responseData.success) {
        message(responseData.message, 'success');
        navigation.navigate('OTPVerificationScreen', {
          phoneNumber: values.phoneNumber,
        });
      } else {
        setLoader(false);
        message(responseData.message, 'error');
      }
    } catch (error) {
      console.log('ERROR', error);
      setLoader(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Spinner color="emerald.500" />
        </View>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleProceed}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={{flex: 1}}>
              <ImageBackground
                source={CoverImage}
                style={{
                  flex: 1,
                  resizeMode: 'cover',
                  justifyContent: 'center',
                }}>
                <View
                  alignItems={'center'}
                  mt={isKeyboardVisible ? '10%' : '20%'}>
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
                  <VStack
                    flex="0"
                    justifyContent="flex-end"
                    w="100%"
                    maxW="350"
                    my="5">
                    <Heading fontFamily="body" fontWeight="600" fontSize="18">
                      We sent you a code to verify your phone number.
                    </Heading>
                    <Input
                      variant="underlined"
                      placeholder="Mobile Number"
                      keyboardType={'phone-pad'}
                      value={values.phoneNumber}
                      onChangeText={handleChange('phoneNumber')}
                      onBlur={handleBlur('phoneNumber')}
                      isRequired
                    />
                    {touched.phoneNumber && errors.phoneNumber && (
                      <Text color="red.500">{errors.phoneNumber}</Text>
                    )}
                  </VStack>
                </Center>
                <Center flex={1} px="3">
                  <Center>
                    <VStack
                      flex="0"
                      justifyContent="center"
                      w="100%"
                      alignItems={'center'}>
                      <Button
                        isLoading={loader}
                        disabled={authLoader || isLoading}
                        isLoadingText="Proceed"
                        width={300}
                        onPress={() => handleSubmit()}>
                        Proceed
                      </Button>
                    </VStack>
                    <VStack flex="0" justifyContent="flex-end" w="100%">
                      <Button
                        disabled={isLoading}
                        variant="unstyled"
                        width={300}
                        onPress={() =>
                          handleType(
                            user === 'Consumer' ? 'Vendor' : 'Consumer',
                          )
                        }>
                        {user ? (
                          <Text
                            fontFamily="body"
                            color={'#376095'}
                            fontWeight="500"
                            fontSize="15">
                            {`Login as ${
                              user === 'Consumer' ? 'an vendor' : 'a customer'
                            }`}
                          </Text>
                        ) : null}
                      </Button>
                    </VStack>
                  </Center>
                </Center>
              </ImageBackground>
            </View>
          )}
        </Formik>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user.usertype,
  };
};
export default connect(mapStateToProps)(SendOtp);
