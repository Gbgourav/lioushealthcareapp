import {View, Text, Spinner, Input, HStack} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {API_ENDPOINTS, message, useAxios} from '../../utils/api';
import {FlatList, ScrollView, TouchableOpacity} from 'react-native';
import BloodBankList from '../../components/modals/bloodbank/BloodBankListModal';
import styles from './bloodbankcss';
import BloodBankDetail from '../../components/modals/bloodbank/BloodBankDetail';

const BloodBank = ({navigation}) => {
  const [type, setType] = useState([]);
  const [bankData, setBankData] = useState([]);
  const [openListModal, setOpenListModal] = useState({open: false, data: null});
  const [loading, setLoading] = useState(true);
  const [openBloodBankModal, set0penBloodBankModal] = useState({
    open: false,
    data: null,
  });

  const closeProduct = () => {
    set0penBloodBankModal({open: false, data: null});
  };

  const openProduct = (uid, name) => {
    set0penBloodBankModal({open: true, data: {uid: uid, name: name}});
  };

  const closeModal = () => {
    setOpenListModal({open: false, data: null});
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

  const getData = async () => {
    const response = await useAxios.get(
      API_ENDPOINTS.BLOOD_BANK + '/get_blood_bank_dashboard/',
    );
    let responseData = response.data;
    console.log('ResponseData', responseData);
    if (responseData.success) {
      setType(responseData.types_data);
      setBankData(responseData.bank_data);
      setLoading(false);
    } else {
      message(responseData.message, 'error');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const renderCard = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        setOpenListModal({
          open: true,
          data: {
            uid: item.uid,
            name: item.name,
          },
        })
      }>
      <View
        style={{
          padding: 20,
          borderRadius: 60,
          borderColor: '#BA1A4C',
          borderWidth: 1,
          flex: 0,
          alignItems: 'center',
          justifyContent: 'center',
          height: 80,
          width: 80,
          backgroundColor: 'white',
        }}>
        <Text
          style={{
            color: '#BA1A4C',
            fontSize: 18,
            fontWeight: 600,
            // height: 40,
            // width: 40,
            // flex: 0,
            // flexDirection: 'row',
            // alignItems: 'center',
            // justifyContent: 'center',
          }}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderRow = ({item, index}) => (
    <View style={styles.row}>
      {[index * 3, index * 3 + 1, index * 3 + 2].map(cardIndex =>
        cardIndex < type.length
          ? renderCard({item: type[cardIndex], index: cardIndex})
          : null,
      )}
    </View>
  );

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        padding: 10,
        backgroundColor: 'white',
      }}>
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
        <>
          <>
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
            <ScrollView style={{flex: 1, paddingBottom: 50}}>
              <FlatList
                data={type}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderRow}
              />
              <Text style={{color: '#BA1A4C', marginVertical: 20}}>
                Find Blood Banks Near You
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{flexDirection: 'row'}}>
                  <FlatList
                    horizontal
                    data={bankData}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        style={styles.card_out}
                        onPress={() => openProduct(item.uid, item.name)}>
                        <>
                          <View style={styles.card_in}>
                            <Text style={styles.card_hold}>
                              {item.name.slice(0, 2).toUpperCase()}
                            </Text>
                          </View>
                        </>
                        <View style={styles.card_text}>
                          <View>
                            <Text style={styles.font_bold}>{item.name}</Text>
                            <Text style={styles.font_text}>
                              {item.contact_number}
                            </Text>
                            <Text style={styles.font_text}>{item.address}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </ScrollView>
            </ScrollView>
            {openListModal.open ? (
              <BloodBankList
                toggleDrawer={closeModal}
                data={openListModal.data}
                open={openListModal.data}
              />
            ) : null}
            {openBloodBankModal.open ? (
              <BloodBankDetail
                open={openBloodBankModal.open}
                data={openBloodBankModal.data}
                toggleDrawer={closeProduct}
              />
            ) : null}
          </>
        </>
      )}
    </View>
  );
};

export default BloodBank;
