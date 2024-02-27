import React from 'react';
import {View, Image, Text} from 'react-native';

const EmptyListImage = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 16,
        marginVertical: 10,
        padding: 20,
        borderColor: 'lightgray',
      }}>
      <Image
        source={require('../../../assets/images/emptybox.jpg')}
        style={{width: 100, height: 100}}
      />
      <Text>No items available</Text>
    </View>
  );
};

export default EmptyListImage;
