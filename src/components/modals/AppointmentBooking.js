import CalendarStrip from 'react-native-calendar-strip';
import {Divider, HStack, Spinner, Text, View, VStack} from 'native-base';
import Modal from 'react-native-modal';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import {Icons} from '../icons';
import React, {useEffect, useState} from 'react';
import moment from 'moment/moment';
import Night from '../../../assets/svgs/night.svg';
import {API_ENDPOINTS, message, useAxios} from '../../utils/api';
import DoctorProfile from './DoctorProfile';
import ConfirmAppointment from './ConfirmAppointment';

const AppointmentBooking = ({appointmentData, closeModal, navigation}) => {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [loading, setLoading] = useState(false);
  const [openProfile, setOpenProfile] = useState({
    open: false,
    doctor_id: null,
    service_type: null,
    slot_start: null,
    slot_end: null,
    date: null,
  });
  const [data, setData] = useState([]);

  const closeProfile = async () => {
    setOpenProfile({
      open: false,
      doctor_id: null,
      service_type: null,
      slot_start: null,
      slot_end: null,
      date: null,
    });
  };

  const openProfileModal = async slot => {
    setOpenProfile({
      open: true,
      doctor_id: appointmentData.uid,
      service_type: appointmentData.type,
      slot_start: slot.start_time,
      slot_end: slot.end_time,
      date: selectedDate,
    });
  };

  const handleOneDay = async date => {
    await handleBookSlot(date);
  };

  const handleBookSlot = async date => {
    try {
      setSelectedDate(moment(date).format('YYYY-MM-DD'));
      setLoading(true);
      const response = await useAxios.get(
        API_ENDPOINTS.DOCTOR +
          `/slots/uid=${appointmentData.uid}/date=${moment(date).format(
            'YYYY-MM-DD',
          )}/type='doctor'`,
      );
      let responseData = response.data;
      if (responseData) {
        setData(responseData.data);
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.log('error', error);
      setLoading(false);
      message(error.toString(), 'error');
    }
  };

  useEffect(() => {
    handleBookSlot(moment().format('YYYY-MM-DD'));
  }, []);

  const renderItem = ({item}) => {
    return (
      <HStack style={styles.h_s}>
        {item.morning_times.length > 0 ? (
          <View style={styles.flex_v}>
            <Icons.Morning />
            <Text style={styles.logo_t}> Morning</Text>
          </View>
        ) : null}
        {item.morning_times.map((slotItem, index) => {
          return (
            <>
              <TouchableWithoutFeedback
                disabled={!slotItem.active}
                style={{
                  backgroundColor: 'blue',
                }}
                key={index}
                onPress={() => openProfileModal(slotItem)}>
                <View
                  style={{
                    width: '30%',
                    padding: 5,
                    opacity: !slotItem.active ? 0.5 : 1,
                  }}>
                  <View style={styles.in_view}>
                    <Text style={styles.slot_text}>
                      {moment(slotItem.start_time, 'HH:mm:ss').format('HH:mm')}{' '}
                      to {moment(slotItem.end_time, 'HH:mm:ss').format('HH:mm')}
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </>
          );
        })}
        {item.afternoon_times.length > 0 ? (
          <View style={styles.flex_v}>
            <Icons.Morning />
            <Text style={styles.logo_t}> After noon</Text>
          </View>
        ) : null}
        {item.afternoon_times.map((slotItem, index) => {
          return (
            <>
              <TouchableWithoutFeedback
                disabled={!slotItem.active}
                style={{backgroundColor: 'blue'}}
                key={index}
                onPress={() => openProfileModal(slotItem)}>
                <View
                  style={{
                    width: '30%',
                    padding: 5,
                    opacity: !slotItem.active ? 0.5 : 1,
                  }}>
                  <View style={styles.in_view}>
                    <Text style={styles.slot_text}>
                      {moment(slotItem.start_time, 'HH:mm:ss').format('HH:mm')}{' '}
                      to {moment(slotItem.end_time, 'HH:mm:ss').format('HH:mm')}
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </>
          );
        })}
        {item.evening_times.length > 0 ? (
          <View style={styles.flex_v}>
            <Icons.Morning />
            <Text style={styles.logo_t}>Evening</Text>
          </View>
        ) : null}
        {item.evening_times.map((slotItem, index) => {
          return (
            <>
              <TouchableWithoutFeedback
                disabled={!slotItem.active}
                style={{
                  backgroundColor: 'blue',
                  opacity: !slotItem.active ? 0.5 : 1,
                }}
                key={index}
                onPress={() => openProfileModal(slotItem)}>
                <View style={{width: '30%', padding: 5}}>
                  <View style={styles.in_view}>
                    <Text style={styles.slot_text}>
                      {moment(slotItem.start_time, 'HH:mm:ss').format('HH:mm')}{' '}
                      to {moment(slotItem.end_time, 'HH:mm:ss').format('HH:mm')}
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </>
          );
        })}
        {item.night_times.length > 0 ? (
          <View style={styles.flex_v}>
            <Icons.Night />
            <Text style={styles.logo_t}> Dark</Text>
          </View>
        ) : null}
        {item.night_times.map((slotItem, index) => {
          return (
            <>
              <TouchableWithoutFeedback
                disabled={!slotItem.active}
                style={{backgroundColor: 'blue'}}
                key={index}
                onPress={() => openProfileModal(slotItem)}>
                <View
                  style={{
                    width: '30%',
                    padding: 5,
                    opacity: !slotItem.active ? 0.5 : 1,
                  }}>
                  <View style={styles.in_view}>
                    <Text style={styles.slot_text}>
                      {moment(slotItem.start_time, 'HH:mm:ss').format('HH:mm')}{' '}
                      to {moment(slotItem.end_time, 'HH:mm:ss').format('HH:mm')}
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </>
          );
        })}
      </HStack>
    );
  };

  return (
    <>
      <Modal
        isVisible={appointmentData.open}
        onBackdropPress={() => closeModal()}
        // swipeDirection={['down']}
        style={{justifyContent: 'flex-end', margin: 0}}>
        <View style={{backgroundColor: 'white', padding: 16, height: '100%'}}>
          <View
            style={{
              flex: 0,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 20,
              marginVertical: 10,
              paddingHorizontal: 8,
            }}>
            <TouchableOpacity onPress={() => closeModal()}>
              <Icons.Right />
            </TouchableOpacity>
            <Text>Book an appointment</Text>
          </View>
          <Divider style={{marginVertical: 10}} />
          <CalendarStrip
            scrollable={true}
            scrollerPaging={true}
            style={{height: 110}}
            startingDate={moment()}
            selectedDate={selectedDate}
            minDate={moment()}
            daySelectionAnimation={{
              type: 'background',
              highlightColor: '#376095',
            }}
            dateNumberStyle={{color: 'black'}}
            dateNameStyle={{marginBottom: 16, color: 'black'}}
            // dateNumberStyle={FontStyles.Medium14}
            calendarHeaderFormat={'MMMM'}
            dateContainerStyle={{backgroundColor: 'pink'}}
            styleWeekend={false}
            disabledDateOpacity={0.6}
            disabledDateNameStyle={{marginBottom: 16, color: 'red'}}
            disabledDateNumberStyle={{color: 'red'}}
            iconRightStyle={{display: 'none'}}
            iconLeftStyle={{display: 'none'}}
            iconContainer={{}}
            dayComponentHeight={70}
            onDateSelected={date => handleOneDay(date)}
          />
          <Divider />
          <>
            {loading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Spinner color="emerald.500" />
              </View>
            ) : (
              <ScrollView>
                <>
                  <VStack>
                    {data.length > 0 ? (
                      <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        ListEmptyComponent={() => (
                          <Text>No appointments available</Text>
                        )}
                      />
                    ) : null}
                  </VStack>
                </>
              </ScrollView>
            )}
          </>
          {openProfile.open ? (
            <ConfirmAppointment
              closeModal={closeModal}
              bookedSlot={openProfile}
            />
          ) : null}
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  in_view: {
    borderWidth: 2,
    minHeight: 70,
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#376095',
    borderRadius: 20,
    backgroundColor: 'white',
    color: '#376095',
  },
  slot_text: {
    color: '#376095',
    fontWeight: '600',
    fontFamily: 'body',
    fontSize: 18,
  },

  flex_v: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    width: '100%',
    marginVertical: 20,
  },

  h_s: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'start',
    gap: 5,
    flexWrap: 'wrap',
  },

  logo_t: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default AppointmentBooking;
