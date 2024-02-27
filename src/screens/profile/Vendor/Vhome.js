import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Switch} from 'react-native';
import {
  View,
  Text,
  HStack,
  Center,
  Button,
  IconButton,
  CloseIcon,
  VStack,
  Alert,
  Spinner,
} from 'native-base';
import Carousel from 'react-native-snap-carousel';
import {Icons} from '../../../components/icons';
import {VendorIcons} from '../../../components/VStackIcons';
import {connect} from 'react-redux';
import DoctorDashBoard from '../../../components/vendordashboard/DoctorDashboard';
import BloodBankDashboard from '../../../components/vendordashboard/BloodBankDashboard';
import PharmacyDashboard from '../../../components/vendordashboard/PharmacyDashboard';
import {API_ENDPOINTS, message, useAxios} from '../../../utils/api';

const Vhome = ({user}) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const is_doctor = user.is_doctor;
  const is_pathology = user.is_pathology;
  const is_blood_bank = user.is_blood_bank;
  const is_pharmacy = user.is_pharmacy;

  const getCompleteProfile = async () => {
    try {
      setLoading(true);
      let data = {
        email: user.email,
      };
      const response = await useAxios.post(
        API_ENDPOINTS.VENDOR + '/get_complete_profile/',
        data,
      );
      let responseData = response.data;
      if (responseData.success) {
        setProfileData(responseData.data);
        setLoading(false);
      } else {
        message('Something went wrong! please try again.', 'error');
        setLoading(false);
      }
    } catch (error) {
      message('Something went wrong! please try again.', 'error');
      setLoading(false);
    }
  };

  useEffect(() => {
    getCompleteProfile();
  }, []);

  return (
    <>
      <View bgColor={'#0C4E5F'}>
        <HStack
          padding={'3'}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <VendorIcons.WhiteLogo />
          <Text color={'white'} fontSize={22}>
            Vendor
          </Text>
        </HStack>
      </View>
      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Spinner />
        </View>
      ) : (
        <>
          {is_doctor && profileData ? (
            <DoctorDashBoard user={user} profileData={profileData} />
          ) : is_blood_bank && profileData ? (
            <BloodBankDashboard user={user} profileData={profileData} />
          ) : is_pharmacy && profileData ? (
            <PharmacyDashboard user={user} profileData={profileData} />
          ) : (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Spinner />
            </View>
          )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginRight: 10,
    fontWeight: 'bold',
  },
});
const mapStateToProps = state => {
  return {
    user: state.user.user,
  };
};
export default connect(mapStateToProps)(Vhome);
