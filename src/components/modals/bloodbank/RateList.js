import {Text, View} from 'native-base';
import styles from '../../../screens/customer/bloodbankcss';
import React from 'react';

export const RateList = ({title, stock}) => {
  return (
    <View>
      <View
        style={{
          paddingVertical: 10,
          backgroundColor: '#EF769CFF',
        }}>
        <Text style={[styles.font_bold, {textAlign: 'center', color: 'white'}]}>
          {title}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          backgroundColor: 'whitesmoke',
          paddingVertical: 10,
        }}>
        <Text styles={styles.font_text}>Blood Group</Text>
        <Text styles={styles.font_text}>Cost Per unit</Text>
      </View>
      {stock.map((item, index) => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            borderBottomWidth: 0.5,
            borderColor: 'lightgray',
            paddingVertical: 5,
          }}>
          <View>
            <Text key={index}>{item.group_name}</Text>
          </View>
          <View>
            <Text key={index}>₹ {item.price}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};
