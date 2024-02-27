import React, {useState} from 'react';
import {useFormik} from 'formik';
import styles from './vendroformcss';
import Icon from 'react-native-vector-icons/AntDesign';
import * as Yup from 'yup';
import {
  VStack,
  FormControl,
  Input,
  Button,
  Select,
  View,
  HStack,
  Text,
  Center,
  Box,
  Image,
} from 'native-base';
import {ImageBackground, TouchableOpacity} from 'react-native';
import AddSpacial from './AddSpacial';
import TimePicker from '../comman/TimePicker';
import {launchImageLibrary} from 'react-native-image-picker';
import AddYorSelf from './AddYorSelf';

const DoctorForm = ({
  handleNext,
  data,
  handlePre,
  is_specialization,
  is_services,
  is_facilities,
  rowServices,
  rowSpecialty,
  rowFacilities,
  handleSelection,
  handleSp,
  handleImage,
  image,
}) => {
  const [open, setOpen] = useState({
    sp: false,
    se: false,
    fs: false,
  });

  const [error, setError] = useState({
    is_specialization: null,
    is_services: null,
    is_facilities: null,
  });

  const initialValues = {
    doctor_name: data?.doctor_name ? data.doctor_name : '',
    start_day: data?.start_day ? data.start_day : '',
    end_day: data?.end_day ? data.end_day : '',
    timing: data?.timing ? data.timing : '',
    start_time: data?.start_time ? data.start_time : '',
    end_time: data?.end_time ? data.end_time : '',
    fees: data?.fees ? data.fees : '',
    video_consultation_fees: data?.video_consultation_fees
      ? data.video_consultation_fees
      : '',
    clinic_visit_fees: data?.clinic_visit_fees ? data.clinic_visit_fees : '',
  };

  const closeAddMore = () => {
    setOpen({se: false, sp: false, fs: false});
  };

  const handleSpp = (text, type) => {
    handleSp(text, type);
    closeAddMore();
  };

  const selectImage = async () => {
    try {
      await launchImageLibrary({mediaType: 'photo', quality: 0.5}, response => {
        if (!response.didCancel && response?.assets[0]?.uri) {
          handleImage(response?.assets[0]?.uri, response?.assets[0]);
        }
      });
    } catch (error) {
      console.log('Error', error);
    }
  };

  const validationSchema = Yup.object({
    doctor_name: Yup.string().required('Doctor Name is required'),
    start_day: Yup.string().required('Days are required'),
    end_day: Yup.string()
      .required('End day is required')
      .test(
        'is-valid-day',
        'End day must be after start day',
        function (endDay) {
          const {start_day} = this.parent;
          if (!start_day || !endDay) return true;
          return (
            ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(endDay) >=
            ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(start_day)
          );
        },
      ),
    start_time: Yup.string().required('Timing is required'),
    end_time: Yup.string()
      .required('Timing is required')
      .test(
        'is-valid-time',
        'End time must be after start time',
        function (endTime) {
          const {start_time} = this.parent;
          if (!start_time || !endTime) return true;
          return (
            new Date(`2000-01-01T${endTime}`) >
            new Date(`2000-01-01T${start_time}`)
          );
        },
      ),

    video_consultation_fees: Yup.number()
      .required('Fees are required')
      .label('Video Consultation Fees'),
    clinic_visit_fees: Yup.number()
      .required('Fees are required')
      .label('Clinic Visit Fees'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async values => {
      if (is_facilities && is_specialization && is_services) {
        let newValue = {...values, type: 'Doctor'};
        handleNext(newValue);
      } else {
        if (!is_facilities) {
          setError(prevState => ({
            ...prevState,
            is_facilities: 'Select at list one facilities',
          }));
        }
        if (!is_specialization) {
          setError(prevState => ({
            ...prevState,
            is_specialization: 'Select at list one facilities',
          }));
        }
        if (!is_services) {
          setError(prevState => ({
            ...prevState,
            is_services: 'Select at list one facilities',
          }));
        }
      }
    },
  });

  const handleAction = (type, index) => {
    if (type === 'is_services') {
      if (index) {
        handleSelection(index, 'service');
      } else {
        setOpen({se: true, sp: false, fs: false});
      }
      setError(prevState => ({...prevState, is_services: false}));
    } else if (type === 'is_specialization') {
      if (index) {
        handleSelection(index, 'specializations');
      } else {
        setOpen({se: false, sp: true, fs: false});
      }
      setError(prevState => ({
        ...prevState,
        is_specialization: false,
      }));
    } else {
      if (index) {
        handleSelection(index, 'facilities');
      } else {
        setOpen({se: false, sp: false, fs: true});
      }
      setError(prevState => ({
        ...prevState,
        is_facilities: false,
      }));
    }
  };

  return (
    <VStack
      height={'100%'}
      width={'100%'}
      padding={'4'}
      space={'4'}
      paddingBottom={'40'}>
      <View style={styles.container}>
        <TouchableOpacity onPress={selectImage}>
          <View style={styles.circle}>
            {image ? (
              <ImageBackground
                source={{uri: image}}
                style={styles.circleImage}
                imageStyle={styles.circleImage}></ImageBackground>
            ) : (
              <Icon name="camera" size={50} color="lightgray" />
            )}
          </View>
        </TouchableOpacity>
      </View>
      <FormControl
        isInvalid={formik.touched.doctor_name && formik.errors.doctor_name}>
        <FormControl.Label>Doctor Name</FormControl.Label>
        <Input
          placeholder="Eg: Dr Rakesh Kumar"
          variant="underlined"
          value={formik.values.doctor_name}
          onChangeText={value => formik.setFieldValue('doctor_name', value)}
        />
        {formik.touched.doctor_name && formik.errors.doctor_name && (
          <FormControl.ErrorMessage>
            {formik.errors.doctor_name}
          </FormControl.ErrorMessage>
        )}
      </FormControl>

      <HStack space={4} style={{marginVertical: 10}}>
        <Box width="50%">
          <FormControl
            isReadOnly
            isInvalid={formik.touched.start_day && formik.errors.start_day}>
            <FormControl.Label>From</FormControl.Label>
            <Select
              isReadOnly
              placeholder="Eg: Monday"
              variant="underlined"
              selectedValue={formik.values.start_day}
              onValueChange={value => formik.setFieldValue('start_day', value)}>
              <Select.Item label="Mon" value="Mon" />
              <Select.Item label="Tue" value="Tue" />
              <Select.Item label="Wed" value="Wed" />
              <Select.Item label="Thu" value="Thu" />
              <Select.Item label="Fri" value="Fri" />
              <Select.Item label="Sat" value="Sat" />
              <Select.Item label="Sun" value="Sun" />
            </Select>
            {formik.touched.start_day && formik.errors.start_day && (
              <FormControl.ErrorMessage>
                {formik.errors.start_day}
              </FormControl.ErrorMessage>
            )}
          </FormControl>
        </Box>

        <Box width="50%">
          <FormControl
            isInvalid={formik.touched.end_day && formik.errors.end_day}>
            <FormControl.Label>To</FormControl.Label>
            <Select
              isReadOnly
              placeholder="Eg: Friday"
              variant="underlined"
              selectedValue={formik.values.end_day}
              onValueChange={value => formik.setFieldValue('end_day', value)}>
              <Select.Item label="Mon" value="Mon" />
              <Select.Item label="Tue" value="Tue" />
              <Select.Item label="Wed" value="Wed" />
              <Select.Item label="Thu" value="Thu" />
              <Select.Item label="Fri" value="Fri" />
              <Select.Item label="Sat" value="Sat" />
              <Select.Item label="Sun" value="Sun" />
            </Select>
            {formik.touched.end_day && formik.errors.end_day && (
              <FormControl.ErrorMessage>
                {formik.errors.end_day}
              </FormControl.ErrorMessage>
            )}
          </FormControl>
        </Box>
      </HStack>

      <HStack space={4} style={{marginVertical: 10}}>
        <TimePicker formik={formik} fieldName="start_time" />
        <TimePicker formik={formik} fieldName="end_time" />
      </HStack>

      <HStack space={4} style={{marginVertical: 10}}>
        <Box width="50%">
          <FormControl
            isInvalid={
              formik.touched.clinic_visit_fees &&
              formik.errors.clinic_visit_fees
            }>
            <FormControl.Label>Clinic Visit Fees</FormControl.Label>
            <Input
              placeholder="Eg: 1000 ₹"
              variant="underlined"
              keyboardType={'numeric'}
              value={formik.values.clinic_visit_fees}
              onChangeText={value =>
                formik.setFieldValue('clinic_visit_fees', value)
              }
            />
            {formik.touched.clinic_visit_fees &&
              formik.errors.clinic_visit_fees && (
                <FormControl.ErrorMessage>
                  {formik.errors.clinic_visit_fees}
                </FormControl.ErrorMessage>
              )}
          </FormControl>
        </Box>
        <Box width="50%">
          <FormControl
            isInvalid={
              formik.touched.video_consultation_fees &&
              formik.errors.video_consultation_fees
            }>
            <FormControl.Label>Video Consultation Fees</FormControl.Label>
            <Input
              placeholder="Eg: 700 ₹"
              variant="underlined"
              keyboardType={'numeric'}
              value={formik.values.video_consultation_fees}
              onChangeText={value =>
                formik.setFieldValue('video_consultation_fees', value)
              }
            />
            {formik.touched.video_consultation_fees &&
              formik.errors.video_consultation_fees && (
                <FormControl.ErrorMessage>
                  {formik.errors.video_consultation_fees}
                </FormControl.ErrorMessage>
              )}
          </FormControl>
        </Box>
      </HStack>
      {console.log('error', error.is_facilities)}

      <FormControl style={{marginVertical: 10}}>
        <AddYorSelf
          title={'Select Services your are providing:'}
          dataList={rowServices}
          handleAction={handleAction}
          type={'is_services'}
        />

        {error.is_services && (
          <Text style={{fontSize: 12, color: 'red', marginTop: 10}}>
            {error.is_services}
          </Text>
        )}
      </FormControl>

      <FormControl style={{marginVertical: 10}}>
        <AddYorSelf
          title={'Select Specializations:'}
          dataList={rowSpecialty}
          handleAction={handleAction}
          type={'is_specialization'}
        />
        {error.is_specialization && (
          <Text style={{fontSize: 12, color: 'red', marginTop: 10}}>
            {error.is_specialization}
          </Text>
        )}
      </FormControl>

      <FormControl style={{marginVertical: 10}}>
        <AddYorSelf
          title={'Facilities Available:'}
          dataList={rowFacilities}
          handleAction={handleAction}
          type={'is_facilities'}
        />
        {error.is_facilities && (
          <Text style={{fontSize: 12, color: 'red', marginTop: 10}}>
            {error.is_facilities}
          </Text>
        )}
      </FormControl>

      <View space={2} mt={10} justifyContent="space-between">
        <Button onPress={formik.handleSubmit}>Next</Button>
      </View>
      {open.se || open.sp || open.fs ? (
        <AddSpacial
          open={open}
          closeAddMore={closeAddMore}
          handleSp={handleSpp}
        />
      ) : null}
    </VStack>
  );
};

export default React.memo(DoctorForm);
