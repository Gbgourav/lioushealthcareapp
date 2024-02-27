import React from 'react';
import {ScrollView, TouchableWithoutFeedback} from 'react-native';
import {
  View,
  Text,
  Container,
  Card,
  Button,
  Icon,
  Input,
  HStack,
  Center,
  VStack,
  Box,
  Divider,
  Row,
  List,
} from 'native-base';
import Carousel from 'react-native-snap-carousel';
import {Icons} from '../../../components/icons';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DoctorBooking from '../../customer/DoctorBooking';
import Pharmacy from '../../customer/Pharmacy';
import BloodBank from '../../customer/BloodBank';
import LabTest from '../../customer/LabTest';

const HomeStack = createNativeStackNavigator();

export function HomeStackScreen({navigation, route}) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeStackScreen"
        component={Chome}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="DoctorBooking"
        component={DoctorBooking}
        navigation={navigation}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Pharmacy"
        component={Pharmacy}
        navigation={navigation}
        options={{headerShown: true, title: 'Pharmacy'}}
      />
      <HomeStack.Screen
        name="BloodBank"
        component={BloodBank}
        navigation={navigation}
        options={{headerShown: true, title: 'Blood Bank'}}
      />
      <HomeStack.Screen
        name="LabTest"
        component={LabTest}
        navigation={navigation}
        options={{headerShown: true, title: 'Lab Tests'}}
      />
    </HomeStack.Navigator>
  );
}

const Chome = ({navigation, route}) => {
  // Dummy data for the carousel
  const carouselData = [
    {title: 'Item 1'},
    {title: 'Item 2'},
    {title: 'Item 3'},
    // Add more items as needed
  ];

  const iconArr = [
    {type: 'doctor', icon: <Icons.Raw />},
    {type: 'pharmacy', icon: <Icons.Raw1 />},
    {type: 'blood_bank', icon: <Icons.Raw2 />},
    {type: 'lab_tests', icon: <Icons.Raw3 />},
    {type: 'doctor', icon: <Icons.Raw4 />},
    {type: 'doctor', icon: <Icons.Raw5 />},
  ];

  const renderCarouselItem = ({item}) => (
    <View
      style={{
        backgroundColor: 'lightblue',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>{item.title}</Text>
    </View>
  );

  const openStack = type => {
    console.log('Type', type);
    if (type === 'doctor') {
      navigation.navigate('DoctorBooking');
    } else if (type === 'pharmacy') {
      navigation.navigate('Pharmacy');
    } else if (type === 'blood_bank') {
      navigation.navigate('BloodBank');
    } else if (type === 'lab_tests') {
      navigation.navigate('LabTest');
    }
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        padding: 15,
      }}>
      <HStack
        my={'3'}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        <Icons.Logo />
        <Button>Current Location</Button>
      </HStack>
      <Divider my="3" />
      <ScrollView>
        <Center>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#f0f0f0',
              padding: 8,
              borderRadius: 5,
              marginVertical: 10,
            }}>
            <Input
              placeholder="Search"
              style={{flex: 1, fontSize: 16, color: 'black'}}
            />
          </View>
          <HStack
            space={0}
            // w="90%"
            style={{
              flex: 0,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              flexDirection: 'row',
            }}>
            {iconArr.map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                style={{height: 160}}
                onPress={() => openStack(item.type)}>
                {item.icon}
              </TouchableWithoutFeedback>
            ))}
          </HStack>
          <View w={'100%'} my={'2'}>
            <Text
              style={{
                textAlign: 'left',
                fontWeight: 600,
                fontSize: 18,
                color: '#376095',
              }}>
              Hospitals Nearby
            </Text>
          </View>
          <Carousel
            data={carouselData}
            renderItem={renderCarouselItem}
            sliderWidth={400}
            itemWidth={400}
          />
        </Center>
      </ScrollView>
    </View>
  );
};

export default Chome;
