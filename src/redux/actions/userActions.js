import AsyncStorage from '@react-native-async-storage/async-storage';
import {profileCompleted, userDetails, userToken, userType} from '../store';
import {API_ENDPOINTS, message, useAxios} from '../../utils/api';
import {reduxLoading} from './actions';

export const initializeUserFromStorage = () => async dispatch => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      await dispatch(userToken(token));
      const response = await useAxios.get(API_ENDPOINTS.USERS + '/user_cred/');
      let responseData = response.data;
      if (responseData.success) {
        dispatch(userDetails(responseData.data));
        dispatch(userType(responseData.data.type));
        // message('You have logged in successfully', 'success');
      } else {
        message('Try again', 'error');
      }
    }
    await dispatch(reduxLoading(false));
    // await dispatch(profileCompleted(false));
  } catch (error) {
    console.error('Error initializing user from storage:', error);
  }
};

export const clearAuthState = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (error) {
    console.error('Error clearing auth state from AsyncStorage:', error);
  }
};
