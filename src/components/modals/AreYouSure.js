import {Button, Text, View} from 'native-base';
import {Icons} from '../icons';
import Modal from 'react-native-modal';
import React from 'react';

const AreYouSure = ({open, message, toggleDrawer, onConfirm, loading}) => {
  const onOkay = () => {
    onConfirm();
  };
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
          height: '30%',
          margin: 20,
          borderRadius: 16,
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
          <Text style={{fontSize: 18, fontWeight: 600, textAlign: 'center'}}>
            {message}
          </Text>
        </View>
        <View
          style={{
            flex: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
          }}>
          <Button onPress={onOkay} isLoading={loading} isDisabled={loading}>
            Confirm
          </Button>
          <Button style={{backgroundColor: 'lightgray', borderColor: 'black'}}>
            <Text style={{color: 'gray'}} onPress={toggleDrawer}>
              {' '}
              Cancel
            </Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default AreYouSure;
