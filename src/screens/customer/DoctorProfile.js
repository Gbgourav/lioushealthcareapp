import {View, Text, Divider, Spinner} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {Icons} from '../../components/icons';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {API_ENDPOINTS, message, useAxios} from '../../utils/api';

const DoctorProfile = () => {
  const [docData, useDocData] = useState(null);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const uid = route.params?.uid;

  const getDetails = async () => {
    try {
      const response = await useAxios.get(
        API_ENDPOINTS.DOCTOR + '/doctor-profile/',
      );
      let responseData = response.data;
      console.log('responseData', responseData);
      if (responseData.success) {
        useDocData(responseData);
        setLoading(false);
      } else {
        message('Server error, try again');
        setLoading(false);
      }
    } catch (error) {
      message('Server error, try again');
      // setLoading(false);
    }
  };

  useEffect(() => {
    if (uid) {
      getDetails();
    }
  }, [uid]);

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Spinner color="emerald.500" />
        </View>
      ) : (
        <>
          <View
            style={{
              flex: 0,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 20,
              marginVertical: 10,
              paddingVertical: 12,
              paddingHorizontal: 8,
            }}>
            <TouchableOpacity onPress={() => closeModal()}>
              <Icons.Right />
            </TouchableOpacity>
            <Text>Book an appointment</Text>
          </View>
          <Divider />
        </>
      )}
    </View>
  );
};

export default DoctorProfile;
