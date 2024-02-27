import {View, Text, Divider, Spinner, Button, Input} from 'native-base';
import React, {useEffect, useState} from 'react';
import CustomAlert from '../../comman/MessageOver';
import {FlatList, ScrollView, TouchableOpacity} from 'react-native';
import {Icons} from '../../icons';
import Modal from 'react-native-modal';
import styles from '../../../screens/customer/bloodbankcss';
import EmptyListImage from '../../comman/EmptyList';
import {API_ENDPOINTS, useAxios} from '../../../utils/api';
import CartButton from '../../comman/CartButton';
import BloodListCard from './BloodListCard';
import BloodBankDetail from './BloodBankDetail';

const BloodBankList = ({data, toggleDrawer, open}) => {
  const [loading, setLoading] = useState(true);
  const [bloodBankList, setBloodBankList] = useState([]);
  const [showError, setShowError] = useState({
    open: false,
    type: null,
    message: null,
  });
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

  const setMessageModal = (type, message, open) => {
    setShowError({
      type: type,
      message: message,
      open: open,
    });
  };

  const getAllProducts = async (type, uid) => {
    const response = await useAxios.get(
      API_ENDPOINTS.BLOOD_BANK + `/get_blood_bank_by_group/?uid=${data.uid}`,
    );
    let responseData = response.data;
    console.log('responseData', responseData);
    if (responseData.success) {
      setBloodBankList(responseData.bank_data);
      setLoading(false);
    } else {
      setShowError({
        type: 'error',
        message: responseData.message,
        open: true,
      });
    }
  };

  useEffect(() => {
    getAllProducts(data.type, data.uid);
  }, []);

  return (
    <>
      <Modal
        isVisible={open}
        onBackdropPress={() => toggleDrawer(null)}
        // swipeDirection={['down']}
        style={{justifyContent: 'flex-end', margin: 0}}>
        <CartButton />
        <View style={{backgroundColor: 'white', padding: 5, height: '100%'}}>
          {showError.open && (
            <CustomAlert
              type={showError.type}
              message={showError.message}
              onClose={() =>
                setShowError({open: false, type: null, message: null})
              }
            />
          )}
          <>
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
              <Text>Blood Banks for {data.name}</Text>
            </View>
            <Divider />
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
                <ScrollView style={{flex: 1}}>
                  <FlatList
                    data={bloodBankList}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => (
                      <BloodListCard item={item} openProduct={openProduct} />
                    )}
                    numColumns={1}
                    ListEmptyComponent={<EmptyListImage />}
                  />
                </ScrollView>
              </>
            )}
          </>
        </View>
      </Modal>
      {openBloodBankModal.open ? (
        <BloodBankDetail
          open={openBloodBankModal.open}
          data={openBloodBankModal.data}
          toggleDrawer={closeProduct}
        />
      ) : null}
    </>
  );
};

export default BloodBankList;
