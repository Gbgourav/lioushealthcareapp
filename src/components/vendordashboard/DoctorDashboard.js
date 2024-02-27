import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, Switch} from 'react-native';
import {
  View,
  Text,
  HStack,
  Center,
  VStack,
  Alert,
  Box,
  Divider,
  Button,
} from 'native-base';
import EvilIcons from 'react-native-vector-icons/SimpleLineIcons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconAntFeather from 'react-native-vector-icons/Feather';
import {API_ENDPOINTS} from '../../utils/api';
import moment from 'moment';

const DoctorDashBoard = ({user, profileData}) => {
  const formattedTimeRange =
    moment(profileData.timing, 'HH:mm:ss').format('h:mm A') +
    ' - ' +
    moment(profileData.timing.split('-')[1], 'HH:mm:ss').format('h:mm A');
  const carouselData = [
    {title: 'Item 1'},
    {title: 'Item 2'},
    {title: 'Item 3'},
    // Add more items as needed
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
      <Text>Doctor</Text>
    </View>
  );

  return (
    <>
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          padding: 10,
          backgroundColor: 'white',
          // opacity: 0.5,
        }}>
        <ScrollView style={{flex: 1}}>
          <Center>
            <Alert w="100%" status={'info'} mb={2}>
              <VStack space={2} flexShrink={1} w="100%">
                <HStack
                  flexShrink={1}
                  space={2}
                  alignItems="center"
                  justifyContent="space-between">
                  <HStack space={2} flexShrink={2} alignItems="center">
                    <Alert.Icon />
                    <Text color={'coolGray.800'}>
                      Your profile is under review we will notify you soon!
                    </Text>
                  </HStack>
                </HStack>
              </VStack>
            </Alert>
            <HStack
              space={0}
              style={{
                flex: 0,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                flexDirection: 'row',
                gap: 5,
              }}>
              <Box
                shadow={1.9}
                _light={{
                  borderColor: 'coolGray.200',
                  borderWidth: 1,
                }}
                _dark={{
                  borderColor: 'coolGray.600',
                  backgroundColor: 'gray.700',
                }}
                backgroundColor={'#0C4E5F'}
                borderRadius="md"
                width={'100%'}>
                <VStack space="2" divider={<Divider />}>
                  <Box px="4" pt="4">
                    <HStack space={'2'} alignItems={'center'}>
                      {profileData.image ? (
                        <Image
                          source={{uri: API_ENDPOINTS.BASE + profileData.image}}
                          style={{width: 50, height: 50, borderRadius: 100}}
                        />
                      ) : null}
                      <View>
                        <Text
                          fontWeight={'500'}
                          color={'white'}
                          fontSize={'16'}>
                          {user.first_name} {user.last_name}
                        </Text>
                        <Text color={'white'}>{user.contact_no}</Text>
                      </View>
                    </HStack>
                  </Box>
                  <Box px="4" gap={'1'} pb={'5'}>
                    <HStack space={'2'}>
                      <EvilIcons
                        name="location-pin"
                        size={15}
                        color={'white'}
                      />
                      <Text style={{fontWeight: 400, color: 'white'}}>
                        {profileData.address}, {profileData.pin_code},{' '}
                        {profileData.state.name}
                      </Text>
                    </HStack>
                    <HStack space={'2'}>
                      <IconAntDesign
                        name="clockcircleo"
                        size={15}
                        color={'white'}
                      />
                      <Text style={{fontWeight: 400, color: 'white'}}>
                        {formattedTimeRange}
                      </Text>
                    </HStack>
                    <HStack space={'2'}>
                      <IconAntDesign name="laptop" size={15} color={'white'} />
                      <Text style={{fontWeight: 400, color: 'white'}}>
                        {profileData.working_days}
                      </Text>
                    </HStack>
                    <HStack space={'2'}>
                      <IconAntFeather
                        name="dollar-sign"
                        size={15}
                        color={'white'}
                      />
                      <Text style={{fontWeight: 400, color: 'white'}}>
                        <Text>Video consultation: </Text>
                        {profileData.video_consultation_fees} ₹
                      </Text>
                    </HStack>
                    <HStack space={'2'}>
                      <IconAntFeather
                        name="dollar-sign"
                        size={15}
                        color={'white'}
                      />
                      <Text style={{fontWeight: 400, color: 'white'}}>
                        <Text>Clinic visit: </Text>
                        {profileData.clinic_visit_fees} ₹
                      </Text>
                    </HStack>
                  </Box>
                </VStack>
              </Box>
              <Box
                shadow={1.9}
                _light={{
                  borderColor: 'coolGray.200',
                  borderWidth: 1,
                }}
                _dark={{
                  borderColor: 'coolGray.600',
                  backgroundColor: 'gray.700',
                }}
                backgroundColor={'#0C4E5F'}
                borderRadius="md"
                width={'100%'}>
                <VStack space="2" divider={<Divider />}>
                  <Box px="4" pt="4">
                    <Text fontWeight={'400'} fontSize={'18'} color={'white'}>
                      Slots Status of {moment().format('MMM YYYY')}
                    </Text>
                  </Box>
                  <Box px="4" gap={'1'} pb={'5'}>
                    <HStack space={'2'} alignItems={'center'}>
                      <Text fontWeight={'500'} color={'white'} fontSize={'25'}>
                        5
                      </Text>
                      <Text fontWeight={'400'} color={'white'} fontSize={'15'}>
                        Pending Slots
                      </Text>
                    </HStack>
                    <HStack space={'2'} alignItems={'center'}>
                      <Text fontWeight={'500'} color={'white'} fontSize={'25'}>
                        10
                      </Text>
                      <Text fontWeight={'400'} color={'white'} fontSize={'15'}>
                        Approved Slots
                      </Text>
                    </HStack>
                    <HStack space={'2'} alignItems={'center'}>
                      <Button width={'100%'} backgroundColor={'white'}>
                        <Text style={{color: '#0C4E5F', fontWeight: 'bold'}}>
                          View Details
                        </Text>
                      </Button>
                    </HStack>
                  </Box>
                </VStack>
              </Box>
              <Box
                shadow={1.9}
                _light={{
                  borderColor: 'coolGray.200',
                  borderWidth: 1,
                }}
                _dark={{
                  borderColor: 'coolGray.600',
                  backgroundColor: 'gray.700',
                }}
                backgroundColor={'#0C4E5F'}
                borderRadius="md"
                width={'100%'}>
                <VStack space="2" divider={<Divider />}>
                  <Box px="4" pt="4">
                    <Text fontWeight={'400'} fontSize={'18'} color={'white'}>
                      Earnings of {moment().format('MMM YYYY')}
                    </Text>
                  </Box>
                  <Box px="4" gap={'1'} pb={'5'}>
                    <HStack space={'2'} alignItems={'center'}>
                      <Text fontWeight={'500'} color={'white'} fontSize={'22'}>
                        ₹ 11000
                      </Text>
                      <Text fontWeight={'400'} color={'white'} fontSize={'18'}>
                        Guaranteed Payment
                      </Text>
                    </HStack>
                    <HStack space={'2'} alignItems={'center'}>
                      <Text fontWeight={'500'} color={'white'} fontSize={'22'}>
                        ₹ 1000
                      </Text>
                      <Text fontWeight={'400'} color={'white'} fontSize={'18'}>
                        Upcoming Payment
                      </Text>
                    </HStack>
                    <HStack space={'2'} alignItems={'center'}>
                      <Text fontWeight={'500'} color={'white'} fontSize={'22'}>
                        ₹ 0
                      </Text>
                      <Text fontWeight={'400'} color={'white'} fontSize={'18'}>
                        Canceled Payment
                      </Text>
                    </HStack>
                    <HStack space={'2'} alignItems={'center'}>
                      <Button width={'100%'} backgroundColor={'white'}>
                        <Text style={{color: '#0C4E5F', fontWeight: 'bold'}}>
                          View Details
                        </Text>
                      </Button>
                    </HStack>
                  </Box>
                </VStack>
              </Box>
            </HStack>
          </Center>
        </ScrollView>
      </View>
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
export default React.memo(DoctorDashBoard);
