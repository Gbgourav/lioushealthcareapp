import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const CustomAlert = ({type, message, onClose}) => {
  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return '#d4edda'; // Light green background for success
      case 'error':
        return '#f8d7da'; // Light red background for error
      default:
        return '#d1ecf1'; // Light blue background for other types (info, warning, etc.)
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return '#155724'; // Dark green text color for success
      case 'error':
        return '#721c24'; // Dark red text color for error
      default:
        return '#0c5460'; // Dark blue text color for other types (info, warning, etc.)
    }
  };

  return (
    <View
      style={{
        backgroundColor: getBackgroundColor(),
        padding: 15,
        borderRadius: 8,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 16, color: getTextColor()}}>{message}</Text>
      <TouchableOpacity onPress={onClose}>
        <Text style={{color: '#155724', fontWeight: 'bold'}}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomAlert;
