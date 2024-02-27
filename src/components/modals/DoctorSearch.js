import {
  Box,
  Button,
  Divider,
  HStack,
  Input,
  Spinner,
  Text,
  View,
  VStack,
} from 'native-base';
import {ScrollView, TouchableOpacity, Image, FlatList} from 'react-native';
import Modal from 'react-native-modal';
import React, {useEffect, useState} from 'react';
import {API_ENDPOINTS, message, useAxios} from '../../utils/api';
import {Icons} from '../icons';
import AppointmentBooking from './AppointmentBooking';
import moment from 'moment/moment';
import DoctorProfile from './DoctorProfile';

const DoctorSearch = ({isDrawerVisible, toggleDrawer}) => {
  const [loading, setLoading] = useState(true);
  const [docData, setDocData] = useState([]);
  const [appointmentData, setAppointmentData] = useState({
    data: [],
    open: false,
    uid: null,
  });
  const [openProfile, setOpenProfile] = useState({
    open: false,
    uid: null,
  });

  const handleOpen = id => {
    setOpenProfile({
      open: true,
      uid: id,
    });
  };

  const onClickDate = () => {};

  useEffect(() => {
    const getDoctors = async () => {
      const response = await useAxios.get(
        API_ENDPOINTS.DOCTOR + `/doctor-vendors/uid=${isDrawerVisible.data}`,
      );
      let responseData = response.data;
      if (responseData) {
        setDocData(responseData.data);
      }
      setLoading(false);
    };
    getDoctors();
  }, []);

  const handleClose = () => {
    setOpenProfile({open: false, uid: null});
  };

  const renderItem = ({item}) => (
    <Box
      px="1"
      shadow={1}
      py={'3'}
      rounded={'sm'}
      backgroundColor={'whitesmoke'}>
      <View
        style={{
          padding: 20,
          flex: 0,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Image
          source={require('../../../assets/images/doc.png')}
          style={{width: 70, height: 70}}
        />
        <View style={{marginLeft: 20}}>
          <Text
            style={{
              fontWeight: '600',
              fontFamily: 'body',
              fontSize: 18,
            }}>
            {item.doctor_name}
          </Text>
          <Text>{isDrawerVisible.data}</Text>
          <Text>
            {item.address}-{item.establishment_name}
          </Text>
          <Text>{item.fees} Consultation Fees</Text>
        </View>
      </View>
      <View>
        <Button
          style={{
            borderColor: '#376095',
            borderWidth: 1,
            width: '100%',
            backgroundColor: '#376095',
          }}
          onPress={() => handleOpen(item.uid)}>
          <Text style={{color: 'white', fontWeight: '600'}}>
            Visit & Consult
          </Text>
        </Button>
      </View>
    </Box>
  );

  return (
    <>
      <Modal
        isVisible={isDrawerVisible.open}
        onBackdropPress={() => toggleDrawer(null)}
        // swipeDirection={['down']}
        style={{justifyContent: 'flex-end', margin: 0}}>
        <View style={{backgroundColor: 'white', padding: 16, height: '100%'}}>
          {loading ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Spinner color="emerald.500" />
            </View>
          ) : (
            <>
              <View>
                {console.log('docData', docData)}
                <View
                  style={{
                    flex: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 20,
                    marginVertical: 10,
                    paddingHorizontal: 8,
                  }}>
                  <TouchableOpacity onPress={() => toggleDrawer(null)}>
                    <Icons.Right />
                  </TouchableOpacity>
                  <Text>Choose your doctor</Text>
                </View>
                <Divider />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    padding: 8,
                    borderRadius: 5,
                    marginVertical: 10,
                  }}>
                  <Input
                    placeholder="Search"
                    style={{flex: 1, fontSize: 16, color: 'black'}}
                  />
                </View>
              </View>
            </>
          )}
          <ScrollView style={{flex: 1}}>
            <Box border="1" borderRadius="md">
              <VStack space="4" divider={<Divider />}>
                {docData.length > 0 ? (
                  <>
                    <FlatList
                      data={docData}
                      renderItem={renderItem}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </>
                ) : null}
              </VStack>
            </Box>
          </ScrollView>
        </View>
      </Modal>
      {openProfile.open ? (
        <DoctorProfile data={openProfile} toggleDrawer={handleClose} />
      ) : null}
    </>
  );
};

export default DoctorSearch;
