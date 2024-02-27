import {View, Text, Input, HStack, Divider, Spinner, Center} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {API_ENDPOINTS, useAxios} from '../../utils/api';
import {
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Icons} from '../../components/icons';
import Modal from 'react-native-modal';
import DoctorSearch from '../../components/modals/DoctorSearch';
import {useDispatch, useSelector} from 'react-redux';
import SuccessModal from '../../components/modals/pharmacy/SuccessModal';
import {successOrder} from '../../redux/actions/actions';
import styles from './pharmacycss';

const DoctorBooking = ({navigation}) => {
  const dispatch = useDispatch();
  const orderCreated = useSelector(state => state.user.order_created);
  const [trendingTypes, setTrendingTypes] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerVisible, setDrawerVisible] = useState({
    open: false,
    data: null,
  });

  const toggleDrawer = data => {
    if (data) {
      console.log('I am data', data);
      setDrawerVisible({open: true, data: data});
    } else {
      setDrawerVisible({open: false, data: null});
    }
  };

  useFocusEffect(
    useCallback(() => {
      navigation.getParent('bottomNavigator').setOptions({
        tabBarStyle: {display: 'none'},
      });

      return () => {
        navigation.getParent().setOptions({
          tabBarStyle: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: 92,
          },
        });
      };
    }, []),
  );

  const getTypes = async () => {
    try {
      const response = await useAxios.get(
        API_ENDPOINTS.DOCTOR + '/doctor-types/',
      );
      let responseData = response.data;
      console.log('responseData', responseData);
      const shuffledTypes = responseData.sort(() => 0.5 - Math.random());
      const trending = shuffledTypes.slice(0, 4);
      setTrendingTypes(trending);
      setTypeList(responseData);
      setIsLoading(false);
    } catch (error) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    if (orderCreated.open) {
      toggleDrawer();
    }
    getTypes();
  }, [orderCreated]);

  const handleSeeAll = type => {
    if (type === 'more') {
      setShow(true);
      setTrendingTypes(typeList);
    } else {
      setShow(false);
      const shuffledTypes = typeList.sort(() => 0.5 - Math.random());
      const trending = shuffledTypes.slice(0, 4);
      setTrendingTypes(trending);
    }
  };

  const closeSuccessModal = () => {
    let order_created = {
      open: false,
      data: null,
    };
    dispatch(successOrder(order_created));
  };

  const renderItem = ({item, index}) => (
    <TouchableWithoutFeedback
      key={index}
      onPress={() => toggleDrawer(item.name)}>
      <View style={{width: '50%', padding: 5}}>
        <View
          style={{
            borderWidth: 1,
            minHeight: 100,
            flex: 0,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: 'lightgray',
            borderRadius: 20,
            backgroundColor: '#5C4DB1',
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: '600',
              fontFamily: 'body',
              fontSize: 18,
            }}>
            {item.name}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  const CategoryCard = ({category}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => toggleDrawer(category.uid)}>
      <Image source={{uri: category.image}} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.cardText_text}>{category.specialization_name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Spinner color="emerald.500" />
        </View>
      ) : (
        <>
          <View>
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
          </View>
          <ScrollView style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: 10,
                flexWrap: 'wrap',
              }}>
              <View
                style={{
                  paddingVertical: 20,
                  paddingHorizontal: 5,
                  borderWidth: 1,
                  borderColor: 'lightgray',
                  borderRadius: 10,
                  fontWeight: 'bold',
                  flex: 1,
                  flexShrink: 1,
                  height: 60,
                }}>
                <Text style={{fontSize: 18, textAlign: 'center'}}>
                  Book Appointment
                </Text>
              </View>
              <View
                style={{
                  paddingVertical: 20,
                  paddingHorizontal: 5,
                  borderWidth: 1,
                  borderColor: 'lightgray',
                  borderRadius: 10,
                  flex: 1,
                  flexShrink: 1,
                  marginLeft: 10,
                  fontWeight: '700',
                  fontFamily: 'body',
                  height: 60,
                }}>
                <Text style={{fontSize: 18, textAlign: 'center'}}>
                  Instant Video Consult
                </Text>
              </View>
            </View>
            <Center>
              <FlatList
                data={typeList}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => <CategoryCard category={item} />}
                numColumns={3}
                contentContainerStyle={styles.container}
              />
            </Center>

            {/*<View*/}
            {/*  style={{backgroundColor: 'white', padding: 10, marginTop: 20}}>*/}
            {/*  <HStack alignItems={'center'} justifyContent={'space-between'}>*/}
            {/*    <Text*/}
            {/*      style={{color: '#5C4DB1', marginVertical: 20, fontSize: 16}}>*/}
            {/*      Choose from Top Specialities*/}
            {/*    </Text>*/}
            {/*    {show ? (*/}
            {/*      <TouchableOpacity onPress={() => handleSeeAll('less')}>*/}
            {/*        <Text*/}
            {/*          style={{*/}
            {/*            color: 'gray',*/}
            {/*            marginVertical: 20,*/}
            {/*            fontSize: 12,*/}
            {/*            fontWeight: 'bold',*/}
            {/*          }}>*/}
            {/*          {' '}*/}
            {/*          Show less*/}
            {/*        </Text>*/}
            {/*      </TouchableOpacity>*/}
            {/*    ) : null}*/}
            {/*  </HStack>*/}
            {/*  <HStack*/}
            {/*    space={0}*/}
            {/*    style={{*/}
            {/*      flex: 0,*/}
            {/*      justifyContent: 'space-between',*/}
            {/*      alignItems: 'center',*/}
            {/*      flexDirection: 'row',*/}
            {/*      flexWrap: 'wrap',*/}
            {/*    }}>*/}
            {/*    <FlatList*/}
            {/*      data={trendingTypes}*/}
            {/*      renderItem={renderItem}*/}
            {/*      keyExtractor={(item, index) => index.toString()}*/}
            {/*      numColumns={2}*/}
            {/*    />*/}
            {/*  </HStack>*/}
            {/*  <Divider />*/}
            {/*  <TouchableOpacity*/}
            {/*    style={{*/}
            {/*      flex: 0,*/}
            {/*      flexDirection: 'row',*/}
            {/*      alignItems: 'center',*/}
            {/*      justifyContent: 'space-between',*/}
            {/*      marginHorizontal: 20,*/}
            {/*    }}*/}
            {/*    onPress={() => handleSeeAll(show ? 'less' : 'more')}>*/}
            {/*    <Text*/}
            {/*      style={{color: '#5C4DB1', marginVertical: 20, fontSize: 16}}>*/}
            {/*      {show ? 'Slow less' : 'See all'}*/}
            {/*    </Text>*/}
            {/*    <Icons.Right />*/}
            {/*  </TouchableOpacity>*/}
            {/*</View>*/}
          </ScrollView>
        </>
      )}
      {isDrawerVisible.open ? (
        <DoctorSearch
          isDrawerVisible={isDrawerVisible}
          toggleDrawer={toggleDrawer}
        />
      ) : null}
      {orderCreated.open ? (
        <SuccessModal
          open={orderCreated.open}
          toggleDrawer={closeSuccessModal}
          data={orderCreated.data}
        />
      ) : null}
    </View>
  );
};

export default DoctorBooking;
