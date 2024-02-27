import {Button, HStack, Text, View} from 'native-base';
import {VendorIcons} from '../../../components/VStackIcons';
import React, {useCallback, useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Approved from '../../../components/vendordashboard/history/Approved';
import Pending from '../../../components/vendordashboard/history/Pending';
import {API_ENDPOINTS, message, useAxios} from '../../../utils/api';
import {useFocusEffect} from '@react-navigation/native';
import {FlatList} from 'react-native';

const Vpartner = () => {
  const [selectedSide, setSelectedSide] = useState(null);
  const [pending, setPending] = useState([]);
  const [cancelled, setCancelled] = useState([]);
  const [approved, setApproved] = useState(null);
  // get_slots_data

  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );

  const getData = async () => {
    const response = await useAxios.get(
      API_ENDPOINTS.DOCTOR + '/get_slots_data/',
    );
    let responseData = response.data;
    if (responseData.success) {
      console.log('responseData', responseData);
      setPending(responseData.pending);
      setCancelled(responseData.cancelled);
      setApproved(responseData.cancelled);
    } else {
      message('Something went wrong! please try again.', 'error');
    }
  };

  const handleSide = value => {
    setSelectedSide(value);
  };

  const renderData = ({item}) => {
    return (
      <View>
        {/*<Text>*/}
        {/*  Customer Name: {item.customer.first_name} {item.customer._last_name}*/}
        {/*</Text>*/}
        <Text>Start Time: {item.start_time}</Text>
        <Text>End Time: {item.end_time}</Text>
        <Text>Booking Date: {item.booking_date}</Text>
        <Text>Created At: {item.created_at}</Text>
        <Text>Service Type: {item.service_type}</Text>
      </View>
    );
  };

  const renderFlatList = () => {
    switch (selectedSide) {
      case 'pending':
        return (
          <FlatList
            data={pending}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => {
              renderData(item);
            }}
          />
        );
      case 'approved':
        return (
          <FlatList
            data={approved}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View>
                <Text>
                  Customer Name: {item.customer.first_name}{' '}
                  {item.customer._last_name}
                </Text>
                <Text>Start Time: {item.start_time}</Text>
                <Text>End Time: {item.end_time}</Text>
                <Text>Booking Date: {item.booking_date}</Text>
                <Text>Created At: {item.created_at}</Text>
                <Text>Service Type: {item.service_type}</Text>
              </View>
            )}
          />
        );
      case 'cancelled':
        return (
          <FlatList
            data={cancelled}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <Text>{item}</Text>}
          />
        );
      default:
        return null;
    }
  };

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
      <HStack style={{marginTop: 10, justifyContent: 'center', gap: 2}}>
        <Button
          style={{
            backgroundColor: selectedSide === 'pending' ? '#0C4E5F' : 'white',
          }}
          onPress={() => handleSide('pending')}>
          <Text style={{color: selectedSide === 'pending' ? 'white' : 'black'}}>
            Pending Slots
          </Text>
        </Button>
        <Button
          style={{
            backgroundColor: selectedSide === 'approved' ? '#0C4E5F' : 'white',
          }}
          onPress={() => handleSide('approved')}>
          <Text
            style={{color: selectedSide === 'approved' ? 'white' : 'black'}}>
            Approved Slots
          </Text>
        </Button>
        <Button
          style={{
            backgroundColor: selectedSide === 'canceled' ? '#0C4E5F' : 'white',
          }}
          onPress={() => handleSide('canceled')}>
          <Text
            style={{color: selectedSide === 'canceled' ? 'white' : 'black'}}>
            Canceled Slots
          </Text>
        </Button>
      </HStack>
      <View>{renderFlatList()}</View>
    </>
  );
};

export default Vpartner;
