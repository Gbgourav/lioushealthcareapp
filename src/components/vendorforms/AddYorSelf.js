import {View, Text, Center, FormControl} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const AddYorSelf = ({dataList, handleAction, type, title}) => {
  return (
    <>
      <FormControl.Label>{title}</FormControl.Label>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 8,
          marginTop: 10,
        }}>
        {dataList.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              handleAction(type, index);
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              backgroundColor: !item.selected ? 'lightgray' : '#0C4E5F',
              width: '31%',
              padding: 10,
              borderRadius: 10,
              borderColor: 'gray',
              textAlign: 'center',
            }}
            key={index}>
            <Text
              style={{
                fontWeight: 500,
                color: item.selected ? 'white' : 'gray',
                fontSize: 12,
              }}>
              {type === 'is_services'
                ? item.service_name
                : type === 'is_specialization'
                ? item.specialization_name
                : type === 'is_facilities'
                ? item.facility_name
                : null}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            borderWidth: 1,
            width: '31%',
            padding: 10,
            borderRadius: 10,
            borderStyle: 'dashed',
            borderColor: 'gray',
            textAlign: 'center',
          }}
          onPress={() => {
            handleAction(type);
          }}>
          <Center>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 12,
                fontWeight: 500,
                color: 'lightgray',
              }}>
              Add yourself
            </Text>
            <Icon name="plus" size={20} color="#0C4E5F" />
          </Center>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default React.memo(AddYorSelf);
