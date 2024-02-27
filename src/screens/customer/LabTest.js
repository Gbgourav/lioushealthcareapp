import CustomAlert from '../../components/comman/MessageOver';
import CartButton from '../../components/comman/CartButton';
import {Divider, Input, Spinner, Text, View} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import styles from './pharmacycss';
import {FlatList, ScrollView, TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {API_ENDPOINTS, useAxios} from '../../utils/api';
import CategoryCard from '../../components/comman/CategoryCard';
import {Icons} from '../../components/icons';
import EmptyListImage from '../../components/comman/EmptyList';
import LabListModal from '../../components/modals/labtest/LabListModal';
import SuccessModal from '../../components/modals/pharmacy/SuccessModal';
import {useDispatch, useSelector} from 'react-redux';
import {successOrder} from '../../redux/actions/actions';

const LabTest = ({navigation}) => {
  const dispatch = useDispatch();
  const orderCreated = useSelector(state => state.user.order_created);

  const [concernData, setConcernData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [womenHealthData, setWomenHealthData] = useState([]);
  const [menHealthData, setMenHealthData] = useState([]);
  const [elderlyCareData, setElderlyCareData] = useState([]);
  const [testsByOrgans, setTestsByOrgans] = useState([]);
  const [healthCheckupsData, setHealthCheckupsData] = useState([]);
  const [openList, setOpenList] = useState({open: false, data: null});
  const [showError, setShowError] = useState({
    open: false,
    type: null,
    message: null,
  });

  const openListModal = ({uid, name}) => {
    setOpenList({open: true, data: {uid: uid, name: name}});
  };

  const closeModal = () => {
    setOpenList({open: false, data: null});
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

  useEffect(() => {
    if (orderCreated.open) {
      // set(true);
      closeModal();
    }
    getData();
  }, [orderCreated]);

  useEffect(() => {
    getData();
  }, []);

  const closeSuccessModal = () => {
    let order_created = {
      open: false,
      data: null,
    };
    dispatch(successOrder(order_created));
  };

  const getData = async () => {
    const response = await useAxios.get(
      API_ENDPOINTS.LabTest + '/lab_dashboard/',
    );
    let responseData = response.data;
    console.log('responseDatassss', responseData);
    if (responseData.success) {
      setConcernData(responseData.concern_data);
      setTestsByOrgans(responseData.tests_by_organs_data);
      setHealthCheckupsData(responseData.health_checkups_data);
      setMenHealthData(responseData.men_health_data);
      setWomenHealthData(responseData.women_health_data);
      setElderlyCareData(responseData.elderly_care_data);
      console.log('Response data', responseData);
      setIsLoading(false);
    } else {
      message(responseData.message, 'error');
    }
  };

  const allProductModal = (name, uid) => {
    setOpenList({open: true, data: {uid: uid, name: name}});
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white', zIndex: 9}}>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Spinner color="emerald.500" />
        </View>
      ) : (
        <>
          {showError.open && (
            <CustomAlert
              type={showError.type}
              message={showError.message}
              onClose={() =>
                setShowError({open: false, type: null, message: null})
              }
            />
          )}
          <CartButton />
          <View style={{marginHorizontal: 10, flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white',
                paddingVertical: 8,
                borderRadius: 5,
                marginVertical: 10,
              }}>
              <Input
                placeholder="Search"
                style={{flex: 1, fontSize: 16, color: 'black'}}
              />
            </View>
            <ScrollView style={{flex: 1}}>
              <View>
                <Text style={[styles.heading, {color: 'black'}]}>
                  Lab Tests for Health Concerns
                </Text>
              </View>
              <Divider style={{marginTop: 10}} />
              <FlatList
                data={concernData}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <CategoryCard
                    category={item}
                    allProductModal={allProductModal}
                  />
                )}
                numColumns={3}
                contentContainerStyle={styles.container}
                ListEmptyComponent={<EmptyListImage />}
              />
              {concernData.length > 0 ? (
                <TouchableOpacity
                  style={styles.view_all}
                  // onPress={() => allProductModal('main_cat', data.uid)}
                >
                  <Text style={[styles.view_all_text, {color: '#F83007'}]}>
                    Explore More in Health Concerns
                  </Text>
                  <Icons.Right />
                </TouchableOpacity>
              ) : null}
              <Divider style={{marginVertical: 10}} />
              <View>
                <Text style={[styles.heading, {color: 'black'}]}>
                  Lab Tests for Health Checkups
                </Text>
              </View>
              <FlatList
                data={healthCheckupsData}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <CategoryCard
                    category={item}
                    allProductModal={allProductModal}
                  />
                )}
                numColumns={3}
                contentContainerStyle={styles.container}
                ListEmptyComponent={<EmptyListImage />}
              />
              {concernData.length > 0 ? (
                <TouchableOpacity
                  style={styles.view_all}
                  // onPress={() => allProductModal('main_cat', data.uid)}
                >
                  <Text style={[styles.view_all_text, {color: '#F83007'}]}>
                    Explore More in Health Checkups
                  </Text>
                  <Icons.Right />
                </TouchableOpacity>
              ) : null}
              <Divider style={{marginVertical: 10}} />
              <View>
                <Text style={[styles.heading, {color: 'black'}]}>
                  Lab Tests for Women’s Health{' '}
                </Text>
              </View>
              <FlatList
                data={womenHealthData}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <CategoryCard
                    category={item}
                    allProductModal={allProductModal}
                  />
                )}
                numColumns={3}
                contentContainerStyle={styles.container}
                ListEmptyComponent={<EmptyListImage />}
              />
              {concernData.length > 0 ? (
                <TouchableOpacity
                  style={styles.view_all}
                  // onPress={() => allProductModal('main_cat', data.uid)}
                >
                  <Text style={[styles.view_all_text, {color: '#F83007'}]}>
                    Explore More in Women’s Health
                  </Text>
                  <Icons.Right />
                </TouchableOpacity>
              ) : null}
              <Divider style={{marginVertical: 10}} />
              <View>
                <Text style={[styles.heading, {color: 'black'}]}>
                  Lab Tests for Men’s Health{' '}
                </Text>
              </View>
              <FlatList
                data={menHealthData}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <CategoryCard
                    category={item}
                    allProductModal={allProductModal}
                  />
                )}
                numColumns={3}
                contentContainerStyle={styles.container}
                ListEmptyComponent={<EmptyListImage />}
              />
              {concernData.length > 0 ? (
                <TouchableOpacity
                  style={styles.view_all}
                  // onPress={() => allProductModal('main_cat', data.uid)}
                >
                  <Text style={[styles.view_all_text, {color: '#F83007'}]}>
                    Explore More in Men’s Health
                  </Text>
                  <Icons.Right />
                </TouchableOpacity>
              ) : null}
              <Divider style={{marginVertical: 10}} />
              <View>
                <Text style={[styles.heading, {color: 'black'}]}>
                  Lab Tests for Elderly Care
                </Text>
              </View>
              <FlatList
                data={elderlyCareData}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <CategoryCard
                    category={item}
                    allProductModal={allProductModal}
                  />
                )}
                numColumns={3}
                contentContainerStyle={styles.container}
                ListEmptyComponent={<EmptyListImage />}
              />
              {concernData.length > 0 ? (
                <TouchableOpacity
                  style={styles.view_all}
                  // onPress={() => allProductModal('main_cat', data.uid)}
                >
                  <Text style={[styles.view_all_text, {color: '#F83007'}]}>
                    Explore More in Elderly Care
                  </Text>
                  <Icons.Right />
                </TouchableOpacity>
              ) : null}
              <Divider style={{marginVertical: 10}} />
              <View>
                <Text style={[styles.heading, {color: 'black'}]}>
                  Lab Tests by Organs
                </Text>
              </View>
              <FlatList
                data={testsByOrgans}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <CategoryCard
                    category={item}
                    allProductModal={allProductModal}
                  />
                )}
                numColumns={3}
                contentContainerStyle={styles.container}
                ListEmptyComponent={<EmptyListImage />}
              />
              {concernData.length > 0 ? (
                <TouchableOpacity
                  style={styles.view_all}
                  // onPress={() => allProductModal('main_cat', data.uid)}
                >
                  <Text style={[styles.view_all_text, {color: '#F83007'}]}>
                    Explore More in Organs
                  </Text>
                  <Icons.Right />
                </TouchableOpacity>
              ) : null}
            </ScrollView>
          </View>
        </>
      )}
      {openList.open ? (
        <LabListModal
          open={openList.open}
          toggleDrawer={closeModal}
          data={openList.data}
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

export default LabTest;
