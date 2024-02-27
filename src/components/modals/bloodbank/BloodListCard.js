import {Button, Text, View} from 'native-base';
import styles from '../../../screens/customer/bloodbankcss';
import React from 'react';
import {Linking, TouchableOpacity} from 'react-native';

const BloodListCard = ({item, openProduct}) => {
  // Function to open the phone dialer
  const openDialer = phoneNumber => {
    const phoneNumberWithoutSpaces = phoneNumber.replace(/\s/g, ''); // Remove any spaces in the phone number
    const dialerUrl = `tel:${phoneNumberWithoutSpaces}`;

    Linking.canOpenURL(dialerUrl)
      .then(supported => {
        if (supported) {
          return Linking.openURL(dialerUrl);
        } else {
          console.log('Phone dialer not supported');
        }
      })
      .catch(error =>
        console.error(
          'An error occurred while opening the phone dialer',
          error,
        ),
      );
  };

  return (
    <TouchableOpacity style={styles.list_card}>
      <View style={styles.list_card_in}>
        <View style={styles.list_card_box}>
          <Text style={styles.list_card_text_b}>
            {item.name.slice(0, 2).toUpperCase()}
          </Text>
        </View>
        <View style={{gap: 8, paddingTop: 10}}>
          <Text style={styles.font_bold}> {item.name}</Text>
          <Text style={styles.font_text}>{item.contact_number}</Text>
          <Text style={styles.font_text}> {item.address}</Text>
        </View>
      </View>
      <View style={styles.list_card_btn}>
        <View style={{width: openProduct ? '48%' : '100%'}}>
          <Button style={styles.list_card_white_btn}>
            <Text
              style={{color: '#376095'}}
              onPress={() => openDialer(item.contact_number)}>
              Call
            </Text>
          </Button>
        </View>
        {openProduct ? (
          <View style={{width: '48%'}}>
            <Button onPress={() => openProduct(item.uid, item.name)}>
              View
            </Button>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default BloodListCard;
