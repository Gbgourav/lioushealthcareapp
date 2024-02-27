import React, {useEffect, useState} from 'react';
import {Text, FormControl, Input, Box} from 'native-base';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import styles from '../vendorforms/vendroformcss';

const TimePicker = ({fieldName, formik}) => {
  const [date, setDate] = useState(new Date());
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const handleConfirm = time => {
    formik.setFieldValue(fieldName, time);
    setTimePickerVisibility(false);
  };

  return (
    <>
      <Box width="50%">
        <FormControl
          isInvalid={formik.touched[fieldName] && formik.errors[fieldName]}>
          <FormControl.Label>
            {' '}
            {fieldName === 'start_time' ? 'Start Time' : 'End Time'}
          </FormControl.Label>
          <Input
            placeholder={
              fieldName === 'start_time' ? 'Eg: 10:00 AM' : 'Eg: 06:00 PM'
            }
            variant="underlined"
            value={formik.values[fieldName]}
            onFocus={() => setTimePickerVisibility(true)}
            onChangeText={value => formik.setFieldValue(fieldName, value)}
          />
          {formik.touched[fieldName] && formik.errors[fieldName] && (
            <FormControl.ErrorMessage>
              {formik.errors[fieldName]}
            </FormControl.ErrorMessage>
          )}
        </FormControl>
      </Box>
      <DatePicker
        modal
        mode={'time'}
        date={date}
        open={isTimePickerVisible}
        onConfirm={date => {
          const data = moment(date).format('HH:mm:ss');
          handleConfirm(data);
        }}
        onCancel={() => {
          setTimePickerVisibility(false);
        }}
      />
    </>
  );
};

export default TimePicker;
