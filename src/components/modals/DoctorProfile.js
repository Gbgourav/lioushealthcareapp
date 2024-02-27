import {Box, Button, Divider, HStack, Spinner, Text, View} from 'native-base';
import {ScrollView, TouchableOpacity, Image, FlatList} from 'react-native';
import Modal from 'react-native-modal';
import React, {useEffect, useState} from 'react';
import {API_ENDPOINTS, message, useAxios} from '../../utils/api';
import {Icons} from '../icons';
import AppointmentBooking from './AppointmentBooking';
import moment from 'moment/moment';
import ReviewList from '../comman/ReviewList';

const DoctorProfile = ({data, toggleDrawer}) => {
  const [loading, setLoading] = useState(true);
  const [docData, setDocData] = useState(null);
  const [docTimings, setDocTimings] = useState([]);
  const [docServices, setDocServices] = useState([]);
  const [specialization, setSpecialization] = useState([]);
  const [customerReview, setCustomerReview] = useState([]);
  const [completeProfile, setCompleteProfile] = useState({
    open: false,
    uid: null,
    type: null,
  });

  useEffect(() => {
    if (data.uid) {
      handleBookSlot();
    }
  }, [data]);

  const handleOpenModal = type => {
    setCompleteProfile({
      open: true,
      uid: data.uid,
      type: type,
    });
  };

  const closeModal = () => {
    setCompleteProfile({
      open: false,
      uid: null,
      type: null,
    });
  };

  const handleBookSlot = async uid => {
    try {
      const response = await useAxios.get(
        API_ENDPOINTS.DOCTOR + `/doctor-profile/uid=${data.uid}/`,
      );
      let responseData = response.data;
      if (responseData) {
        setCustomerReview(responseData.customer_review);
        setDocTimings(responseData.doctor_timings);
        setDocServices(responseData.doctor_data?.services);
        setSpecialization(responseData.doctor_data?.specializations);
        let doc_data = responseData.doctor_data;
        let doc = {
          address: doc_data.address,
          contact: doc_data.contact,
          days: doc_data.days,
          doctor_name: doc_data.doctor_name,
          establishment_name: doc_data.establishment_name,
          facilities_available: doc_data.facilities_available,
          fees: doc_data.fees,
          is_activated: doc_data.is_activated,
          specialty: doc_data.specialty,
          sub_specialty: doc_data.sub_specialty,
          timing: doc_data.timing,
          uid: doc_data.uid,
        };
        setDocData(doc);
      }
      console.log('responseData 1111', responseData);

      setLoading(false);
    } catch (error) {
      console.log('error', error);
      message(error.toString(), 'error');
    }
  };
  const renderTimings = ({item}) => {
    const start = moment(item.start_time, 'HH:mm:ss').format('hh:mm A');
    const end = moment(item.end_time, 'HH:mm:ss').format('hh:mm A');
    return (
      <View
        style={{
          backgroundColor: 'white',
          borderColor: '#376095',
          color: 'white',
          borderWidth: 1,
          padding: 8,
          margin: 5,
          borderRadius: 16,
        }}>
        <Text style={{color: '#376095', fontWeight: '600'}}>{item.day}</Text>
        <Text style={{color: '#376095', fontWeight: '600'}}>
          {start} to {end}
        </Text>
      </View>
    );
  };

  const renderServices = ({item}) => {
    return (
      <HStack
        style={{
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 10,
          marginVertical: 10,
        }}>
        <View
          style={{
            height: 10,
            width: 10,
            backgroundColor: 'black',
            borderRadius: 50,
          }}></View>
        <Text style={{fontSize: 16}}>{item.service_name}</Text>
      </HStack>
    );
  };

  const renderSpecialization = ({item}) => {
    return (
      <HStack
        style={{
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 10,
          marginVertical: 10,
        }}>
        <View
          style={{
            height: 10,
            width: 10,
            backgroundColor: 'black',
            borderRadius: 50,
          }}></View>
        <Text style={{fontSize: 16}}>{item.specialization_name}</Text>
      </HStack>
    );
  };

  return (
    <>
      <Modal
        isVisible={data.open}
        onBackdropPress={() => toggleDrawer(null)}
        // swipeDirection={['down']}
        style={{justifyContent: 'flex-end', margin: 0}}>
        <View style={{backgroundColor: 'white', padding: 10, height: '100%'}}>
          {loading ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Spinner color="emerald.500" />
            </View>
          ) : (
            <>
              <View>
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
                  <Text>Complete Your Booking</Text>
                </View>
                <Divider />
              </View>
              <ScrollView style={{flex: 1}}>
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
                        {docData.doctor_name}
                      </Text>
                      <Text>{docData.contact}</Text>
                      <Text>{docData.address}</Text>
                      <Text>₹ {docData.fees} Consultation Fees</Text>
                    </View>
                  </View>
                  <HStack
                    style={{
                      paddingHorizontal: 20,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Button
                      style={{
                        backgroundColor: 'white',
                        borderColor: '#376095',
                        color: 'white',
                        borderWidth: 1,
                      }}
                      onPress={() => handleOpenModal('video')}>
                      <Text style={{color: '#376095', fontWeight: '600'}}>
                        Book Video Consult
                      </Text>
                    </Button>
                    <Button
                      style={{
                        backgroundColor: '#376095',
                        fontWeight: '600',
                      }}
                      onPress={() => handleOpenModal('visit')}>
                      Book Clinic Visit
                    </Button>
                  </HStack>
                </Box>
                <Text
                  style={{
                    fontWeight: 'normal',
                    marginVertical: 20,
                    fontSize: 18,
                  }}>
                  Review by patients
                </Text>
                <Divider />
                {customerReview.length > 0 ? (
                  <>
                    <FlatList
                      data={customerReview}
                      renderItem={({item}) => <ReviewList item={item} />}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </>
                ) : null}
                <Text
                  style={{fontWeight: 'normal', marginTop: 20, fontSize: 18}}>
                  Clinic Details
                </Text>
                <Divider style={{marginVertical: 10}} />
                {docData ? (
                  <Box
                    px="1"
                    shadow={1}
                    py={'3'}
                    rounded={'sm'}
                    backgroundColor={'whitesmoke'}>
                    <View
                      style={{
                        padding: 10,
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
                          {docData.establishment_name}
                        </Text>
                        <Text>{docData.address}</Text>
                        <Text>
                          {docData.address}-{docData?.doctor_name || ''}
                        </Text>
                        <Text>{docData.fees} Consultation Fees</Text>
                      </View>
                    </View>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 15,
                        padding: 10,
                      }}>
                      {' '}
                      Timings:
                    </Text>
                    <HStack
                      style={{
                        paddingHorizontal: 0,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 10,
                      }}>
                      <>
                        <ScrollView
                          horizontal
                          showsHorizontalScrollIndicator={false}>
                          <View style={{flexDirection: 'row'}}>
                            <FlatList
                              data={docTimings}
                              horizontal
                              renderItem={renderTimings}
                              keyExtractor={(item, index) => index.toString()}
                            />
                          </View>
                        </ScrollView>
                      </>
                    </HStack>
                  </Box>
                ) : null}
                <Text
                  style={{fontWeight: 'normal', marginTop: 20, fontSize: 18}}>
                  Service by {docData?.doctor_name || ''}
                </Text>
                <Divider style={{marginVertical: 10}} />
                <Box
                  px="1"
                  shadow={1}
                  py={'3'}
                  rounded={'sm'}
                  backgroundColor={'whitesmoke'}>
                  <>
                    <FlatList
                      data={docServices}
                      renderItem={renderServices}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </>
                </Box>
                <Text
                  style={{fontWeight: 'normal', marginTop: 20, fontSize: 18}}>
                  Specializations
                </Text>
                <Divider style={{marginVertical: 10}} />
                <Box
                  px="1"
                  shadow={1}
                  py={'3'}
                  rounded={'sm'}
                  backgroundColor={'whitesmoke'}>
                  <>
                    <FlatList
                      data={specialization}
                      renderItem={renderSpecialization}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </>
                </Box>
              </ScrollView>
            </>
          )}
        </View>
      </Modal>
      {completeProfile.open ? (
        <AppointmentBooking
          appointmentData={completeProfile}
          closeModal={closeModal}
        />
      ) : null}
    </>
  );
};

export default DoctorProfile;
