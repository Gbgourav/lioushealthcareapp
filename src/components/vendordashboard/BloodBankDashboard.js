import React, {useState} from 'react';
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
} from 'native-base';
import Carousel from 'react-native-snap-carousel';
import {Icons} from '../icons';
import {VendorIcons} from '../VStackIcons';
import {connect} from 'react-redux';

const BloodBankDashboard = ({user}) => {
  const [isActive, setIsActive] = useState(false);
  console.log('OOOOOO', user);

  const handleToggle = () => {
    setIsActive(!isActive);
  };
  const carouselData = [
    {title: 'Item 1'},
    {title: 'Item 2'},
    {title: 'Item 3'},
    // Add more items as needed
  ];

  const iconArr = [
    <Icons.Raw />,
    <Icons.Raw1 />,
    <Icons.Raw2 />,
    <Icons.Raw3 />,
    <Icons.Raw4 />,
    <Icons.Raw5 />,
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

  return (
    <>
      <View
        style={{
          width: '100%',
          height: '100%',
          padding: 15,
        }}>
        <ScrollView>
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
            <View style={styles.container}>
              <HStack
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  width: '100%',
                  marginBottom: 20,
                }}>
                <Button
                  // isDisabled={!user.is_verified}
                  // isDisabled={!isActive}
                  style={{
                    borderBottomRightRadius: 0,
                    borderTopRightRadius: 0,
                    borderBottomLeftRadius: 20,
                    borderTopLeftRadius: 20,
                    width: 120,
                    fontWeight: 'bold',
                    backgroundColor: '#0C4E5F',
                  }}>
                  Active
                </Button>
                <Button
                  isDisabled={!isActive}
                  style={{
                    borderBottomRightRadius: 20,
                    borderTopRightRadius: 20,
                    borderBottomLeftRadius: 0,
                    borderTopLeftRadius: 0,
                    width: 120,
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  Inactive
                </Button>
              </HStack>
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
                <HStack key={index} style={{height: 160}}>
                  {item}
                </HStack>
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
    user: state.user,
  };
};
export default connect(mapStateToProps)(BloodBankDashboard);
