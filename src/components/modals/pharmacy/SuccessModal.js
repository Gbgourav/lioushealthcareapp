import {View, Text, Button} from 'native-base';
import React from 'react';
import Modal from 'react-native-modal';
import {Icons} from '../../icons';

const SuccessModal = ({open, toggleDrawer, data}) => {
  return (
    <Modal
      isVisible={open}
      onBackdropPress={() => toggleDrawer(null)}
      // swipeDirection={['down']}
      style={{
        justifyContent: 'center',
        margin: 0,
      }}>
      <View
        style={{
          backgroundColor: 'white',
          padding: 20,
          height: '60%',
          margin: 20,
          borderRadius: 16,
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 10,
          }}>
          <Icons.Logo />
          <Icons.Success />
          <Text style={{textAlign: 'center'}}>{data.text}</Text>
          <View
            style={{
              flex: 1,
              marginTop: 20,
              gap: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Button>{data.btn}</Button>
            <Text>Order id</Text>
            <Text>{data.orderid}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SuccessModal;
