import {View, Text, Divider, Spinner, Input} from 'native-base';
import CartButton from '../../comman/CartButton';
import CustomAlert from '../../comman/MessageOver';
import {ScrollView, TouchableOpacity} from 'react-native';
import {Icons} from '../../icons';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {API_ENDPOINTS, useAxios} from '../../../utils/api';
import BloodListCard from './BloodListCard';
import styles from '../../../screens/customer/bloodbankcss';
import {RateList} from './RateList';

const BloodBankDetail = ({open, data, toggleDrawer}) => {
  const [loading, setLoading] = useState(true);
  const [bankData, setBankData] = useState(null);
  const [stock1, setStock1] = useState([]);
  const [stock2, setStock2] = useState([]);
  const [stock3, setStock3] = useState([]);
  const [stock4, setStock4] = useState([]);
  const [showError, setShowError] = useState({
    open: false,
    type: null,
    message: null,
  });

  useEffect(() => {
    getBankData();
  }, []);

  const getBankData = async () => {
    const response = await useAxios.get(
      API_ENDPOINTS.BLOOD_BANK + `/get_blood_bank/?uid=${data.uid}`,
    );
    let responseData = response.data;
    console.log('responseData', responseData);
    if (responseData.success) {
      setBankData(responseData.bank_data);
      setStock1(responseData.stock_data_1);
      setStock2(responseData.stock_data_2);
      setStock3(responseData.stock_data_3);
      setStock4(responseData.stock_data_4);
      setLoading(false);
    } else {
      setShowError({
        type: 'error',
        message: responseData.message,
        open: true,
      });
    }
  };

  return (
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
            <Text>{data.name}</Text>
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
                <BloodListCard item={bankData} openProduct={null} />
                <View style={{marginVertical: 10}}>
                  <RateList title={'Cryoprotectant (CRYO)'} stock={stock1} />
                </View>
                <View style={{marginVertical: 10}}>
                  <RateList
                    title={'Platelet Concentrate (PC)'}
                    stock={stock2}
                  />
                </View>
                <View style={{marginVertical: 10}}>
                  <RateList
                    title={'Fresh Frozen Plasma (FFP)'}
                    stock={stock3}
                  />
                </View>
                <View style={{marginVertical: 10}}>
                  <RateList
                    title={'Packed Red Blood Cell (PRBC)'}
                    stock={stock4}
                  />
                </View>
              </ScrollView>
            </>
          )}
        </>
      </View>
    </Modal>
  );
};

export default BloodBankDetail;
