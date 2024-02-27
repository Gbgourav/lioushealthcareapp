import {Divider, Text, View} from 'native-base';
import React from 'react';

export const RateCard = ({prices}) => {
  return (
    <View
      style={{
        borderWidth: 0.5,
        borderColor: 'lightgray',
        borderRadius: 16,
        gap: 10,
        padding: 10,
      }}>
      <Text style={{fontWeight: 700, fontSize: 15, marginBottom: 15}}>
        Order Summary
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text>Item Total (MRP)</Text>
        <Text>₹ {prices.price}</Text>
      </View>
      <Divider style={{marginVertical: 2}} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text>Packaging Charge</Text>
        <Text>₹ 00</Text>
      </View>
      <Divider style={{marginVertical: 2}} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text>Total Discount</Text>
        <Text>₹ 00</Text>
      </View>
      <Divider style={{marginVertical: 2}} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text>Shipping</Text>
        <Text>Free</Text>
      </View>
      <Divider style={{marginVertical: 2}} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 18}}> To be paid</Text>
        <Text style={{fontSize: 18}}>{prices.price}</Text>
      </View>
    </View>
  );
};
