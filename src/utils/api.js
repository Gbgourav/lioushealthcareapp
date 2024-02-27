import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Toast, Box} from 'native-base';

const API_BASE_URL = 'http://192.168.157.208:8000';

const GOOGLE_CLIENT =
  '973554262670-vp5gcl0i85sdj20ur4gn62f5pbm39joe.apps.googleusercontent.com';

const useAxios = axios.create({
  baseURL: API_BASE_URL,
});

useAxios.interceptors.request.use(
  async config => {
    try {
      const accessToken = await AsyncStorage.getItem('token');
      if (accessToken) {
        config.headers.Authorization = `Token ${accessToken}`;
        config.headers['credentials'] = 'include';
      }
      config.headers['Accept-Language'] = 'en-US';
      config.headers['Content-Type'] = 'multipart/form-data';
      return config;
    } catch (error) {
      console.error('Error fetching session:', error);
      return Promise.reject(error);
    }
  },
  error => {
    return Promise.reject(error);
  },
);

const API_ENDPOINTS = {
  USERS: `/accounts/auth`,
  AUTH: `${API_BASE_URL}/api/accounts`,
  VENDOR: `/vendor`,
  DOCTOR: `${API_BASE_URL}/doctor`,
  PHARMACY: `${API_BASE_URL}/pharmacy`,
  BLOOD_BANK: `${API_BASE_URL}/blood_bank`,
  LabTest: `${API_BASE_URL}/labtest`,
  POSTS: `/posts`,
  BASE: `${API_BASE_URL}`,
  SEARCH: `/api/search`,
};

function message(text, type) {
  Toast.show({
    placement: 'top',
    render: () => {
      return (
        <Box
          style={{
            backgroundColor: type === 'success' ? 'lightgreen' : 'lightcoral',
            color: type === 'success' ? 'green' : 'red',
          }}
          px="2"
          py="1"
          rounded="sm"
          mb={5}>
          {text}
        </Box>
      );
    },
  });
}

export {useAxios, API_ENDPOINTS, message};
