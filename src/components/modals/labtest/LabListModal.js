import {Button, Divider, Spinner, Text, View} from 'native-base';
import CartButton from '../../comman/CartButton';
import CustomAlert from '../../comman/MessageOver';
import {FlatList, ScrollView, TouchableOpacity} from 'react-native';
import {Icons} from '../../icons';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {API_ENDPOINTS, useAxios} from '../../../utils/api';
import EmptyListImage from '../../comman/EmptyList';
import LabSlotBooking from './LabSlotBooking';

const LabListModal = ({open, toggleDrawer, data}) => {
  const [loading, setLoading] = useState(true);
  const [openBooking, setOpenBooking] = useState({
    open: false,
    uid: null,
    service_uid: null,
  });
  const [list, setList] = useState([]);
  const [showError, setShowError] = useState({
    open: false,
    type: null,
    message: null,
  });
  const [openProductModal, setOpenProductModal] = useState({
    open: false,
    data: null,
  });

  useEffect(() => {
    getdata();
  }, []);

  const handleSlotBooking = (uid, service_uid) => {
    setOpenBooking({open: true, uid: uid, service_uid: service_uid});
  };

  const closeModal = () => {
    setOpenBooking({open: false, uid: null, service_uid: null});
  };

  const getdata = async () => {
    const response = await useAxios.get(
      API_ENDPOINTS.LabTest + `/lab_list/?uid=${data.uid}`,
    );
    let responseData = response.data;
    if (responseData.success) {
      setList(responseData.lab_list);
      setLoading(false);
    } else {
      setShowError({
        type: 'error',
        message: responseData.message,
        open: true,
      });
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        // Handle lab item click
        setOpenProductModal({open: true, data: item});
      }}
      style={{
        padding: 16,
        borderWidth: 1,
        borderColor: 'lightgray',
        marginVertical: 15,
        borderRadius: 16,
      }}>
      <Text style={{fontWeight: 600, fontSize: 18}}>{item.name}</Text>
      <Text>Contains {item.total_tests_count} Tests</Text>
      <Text>{item.description}</Text>
      <Text style={{fontSize: 20, fontWeight: 600, marginVertical: 5}}>
        ₹ {item.price} Onwards
      </Text>
      <Button
        style={{
          marginVertical: 20,
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: '#376095',
        }}
        onPress={() => handleSlotBooking(item.vendor_uid, item.uid)}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            color: '#376095',
          }}>
          Book
        </Text>
      </Button>
    </TouchableOpacity>
  );
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
              <ScrollView style={{flex: 1}}>
                <FlatList
                  data={list}
                  renderItem={renderItem}
                  keyExtractor={item => item.uid}
                  ListEmptyComponent={<EmptyListImage />}
                />
              </ScrollView>
            )}
          </>
        </View>
      </Modal>
      {openBooking.open ? (
        <LabSlotBooking appointmentData={openBooking} closeModal={closeModal} />
      ) : null}
    </>
  );
};

export default LabListModal;
