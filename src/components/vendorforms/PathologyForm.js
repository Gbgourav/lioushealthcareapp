// import React from 'react';
// import {useFormik} from 'formik';
// import * as Yup from 'yup';
// import {VStack, FormControl, Input, Button, HStack, Text} from 'native-base';
//
// const PathologyForm = ({handleNext, data, handlePre}) => {
//   const initialValues = {
//     days: data?.days ? data.days : '',
//     timing: data?.timing ? data.timing : '',
//   };
//
//   const validationSchema = Yup.object({
//     days: Yup.string().required('Days are required'),
//     timing: Yup.string().required('Timing is required'),
//   });
//
//   const formik = useFormik({
//     initialValues,
//     validationSchema,
//     onSubmit: async values => {
//       console.log('formValues', values);
//       let newValue = {...values, type: 'Pathology'};
//       handleNext(newValue);
//     },
//   });
//
//   return (
//     <VStack
//       height={'100%'}
//       maxH={'600'}
//       width={'100%'}
//       padding={'4'}
//       space={'4'}>
//       <Text color={'#0C4E5F'}>Days:</Text>
//       <FormControl isInvalid={formik.touched.days && formik.errors.days}>
//         <Input
//           variant="underlined"
//           placeholder="Enter Days"
//           value={formik.values.days}
//           onChangeText={value => formik.setFieldValue('days', value)}
//         />
//       </FormControl>
//       {formik.touched.days && formik.errors.days && (
//         <Text style={{color: 'red'}}>{formik.errors.days}</Text>
//       )}
//
//       <Text color={'#0C4E5F'}>Timing:</Text>
//       <FormControl isInvalid={formik.touched.timing && formik.errors.timing}>
//         <Input
//           variant="underlined"
//           placeholder="Enter Timing"
//           value={formik.values.timing}
//           onChangeText={value => formik.setFieldValue('timing', value)}
//         />
//       </FormControl>
//       {formik.touched.timing && formik.errors.timing && (
//         <Text style={{color: 'red'}}>{formik.errors.timing}</Text>
//       )}
//
//       <HStack space={2} mt={10} justifyContent="space-between">
//         <Button
//           onPress={() => handlePre()}
//           style={{
//             backgroundColor: '#0C4E5F',
//             fontWeight: 'bold',
//             minWidth: 100,
//           }}>
//           Previous
//         </Button>
//         <Button
//           onPress={formik.handleSubmit}
//           style={{
//             backgroundColor: '#0C4E5F',
//             fontWeight: 'bold',
//             minWidth: 100,
//           }}>
//           Next
//         </Button>
//       </HStack>
//     </VStack>
//   );
// };
//
// export default React.memo(PathologyForm);

import React, {useState} from 'react';
import {useFormik} from 'formik';
import styles from './vendroformcss';
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
} from 'native-base';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AddSpacial from './AddSpacial';
import TimePicker from '../comman/TimePicker';

const PathologyForm = ({
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
    lab_name: data?.lab_name ? data.lab_name : '',
    start_day: data?.start_day ? data.start_day : '',
    end_day: data?.end_day ? data.end_day : '',
    start_time: data?.start_time ? data.start_time : '',
    end_time: data?.end_time ? data.end_time : '',
  };

  const closeAddMore = () => {
    setOpen({se: false, sp: false, fs: false});
  };

  const handleSpp = (text, type) => {
    handleSp(text, type);
    closeAddMore();
  };

  const validationSchema = Yup.object({
    lab_name: Yup.string().required('Lab Name Name is required'),
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
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async values => {
      if (is_facilities && is_specialization && is_services) {
        let newValue = {...values, type: 'Pathology'};
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

  return (
    <VStack
      height={'100%'}
      width={'100%'}
      padding={'4'}
      space={'4'}
      paddingBottom={'40'}>
      <Text style={styles.label}>Lab Name:</Text>
      <FormControl
        isInvalid={formik.touched.lab_name && formik.errors.lab_name}>
        <Input
          placeholder="Enter Lab Name"
          variant="underlined"
          value={formik.values.lab_name}
          onChangeText={value => formik.setFieldValue('lab_name', value)}
        />
      </FormControl>
      {formik.touched.lab_name && formik.errors.lab_name && (
        <Text style={{color: 'red'}}>{formik.errors.lab_name}</Text>
      )}
      <Text style={styles.label}>Select Services:</Text>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {rowServices.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              handleSelection(index, 'service');
              setError(prevState => ({...prevState, is_services: false}));
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              backgroundColor: !item.selected ? 'lightgray' : '#0C4E5F',
              width: 100,
              margin: 5,
              padding: 10,
              borderRadius: 16,
            }}
            key={index}>
            <Text style={{color: item.selected ? 'white' : 'black'}}>
              {item.service_name}
            </Text>
          </TouchableOpacity>
        ))}
        <>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              borderWidth: 1,
              width: 100,
              margin: 5,
              padding: 10,
              borderRadius: 16,
            }}
            onPress={() => {
              setOpen({se: true, sp: false, fs: false});
              setError(prevState => ({
                ...prevState,
                is_services: false,
              }));
            }}>
            <Center>
              <Text style={{textAlign: 'center'}}>Add yourself</Text>
              <Icon name="plus" size={20} color="#00f" />
            </Center>
          </TouchableOpacity>
        </>
      </View>
      {error.is_services ? (
        <Text style={{color: 'red'}}>{error.is_services}</Text>
      ) : null}

      <Text style={styles.label}>Select Specializations:</Text>
      <FormControl>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {rowSpecialty.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                handleSelection(index, 'specializations');
                setError(prevState => ({
                  ...prevState,
                  is_specialization: false,
                }));
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                backgroundColor: !item.selected ? 'lightgray' : '#0C4E5F',
                width: 100,
                margin: 5,
                padding: 10,
                borderRadius: 16,
              }}
              key={index}>
              <Text style={{color: item.selected ? 'white' : 'black'}}>
                {item.specialization_name}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              borderWidth: 1,
              width: 100,
              margin: 5,
              padding: 10,
              borderRadius: 16,
            }}
            onPress={() => {
              setOpen({se: false, sp: true, fs: false});
              setError(prevState => ({
                ...prevState,
                is_specialization: false,
              }));
            }}>
            <Center>
              <Text style={{textAlign: 'center'}}>Add yourself</Text>
              <Icon name="plus" size={20} color="#00f" />
            </Center>
          </TouchableOpacity>
        </View>
      </FormControl>

      {error.is_specialization ? (
        <Text style={{color: 'red'}}>{error.is_specialization}</Text>
      ) : null}
      <HStack space={4} style={{marginVertical: 10}}>
        <Box width="50%">
          <FormControl
            isInvalid={formik.touched.start_day && formik.errors.start_day}>
            <Text style={styles.label}>From</Text>
            <Select
              placeholder="Start"
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
          </FormControl>
          {formik.touched.start_day && formik.errors.start_day && (
            <Text style={{color: 'red'}}>{formik.errors.start_day}</Text>
          )}
        </Box>

        <Box width="50%">
          <FormControl
            isInvalid={formik.touched.end_day && formik.errors.end_day}>
            <Text style={styles.label}>To</Text>
            <Select
              placeholder="End"
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
          </FormControl>
          {formik.touched.end_day && formik.errors.end_day && (
            <Text style={{color: 'red'}}>{formik.errors.end_day}</Text>
          )}
        </Box>
      </HStack>

      <HStack space={4} style={{marginVertical: 10}}>
        <TimePicker formik={formik} fieldName="start_time" />
        <TimePicker formik={formik} fieldName="end_time" />
      </HStack>

      <Text style={styles.label}>Facilities Available:</Text>
      <FormControl>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {rowFacilities.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                handleSelection(index, 'facilities');
                setError(prevState => ({...prevState, is_facilities: false}));
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                backgroundColor: !item.selected ? 'lightgray' : '#0C4E5F',
                width: 100,
                margin: 5,
                padding: 10,
                borderRadius: 16,
              }}
              key={index}>
              <Text style={{color: item.selected ? 'white' : 'black'}}>
                {item.facility_name}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              borderWidth: 1,
              width: 100,
              margin: 5,
              padding: 10,
              borderRadius: 16,
            }}
            onPress={() => {
              setOpen({se: false, sp: false, fs: true});
              setError(prevState => ({...prevState, is_facilities: false}));
            }}>
            <Center>
              <Text style={{textAlign: 'center'}}>Add yourself</Text>
              <Icon name="plus" size={20} color="#00f" />
            </Center>
          </TouchableOpacity>
        </View>
      </FormControl>
      {error.is_facilities ? (
        <Text style={{color: 'red'}}>{error.is_facilities}</Text>
      ) : null}

      <HStack space={2} mt={10} justifyContent="space-between">
        <Button
          onPress={() => handlePre()}
          style={{
            backgroundColor: '#0C4E5F',
            fontWeight: 'bold',
            minWidth: 100,
          }}>
          Previous
        </Button>
        <Button
          onPress={formik.handleSubmit}
          style={{
            backgroundColor: '#0C4E5F',
            fontWeight: 'bold',
            minWidth: 100,
          }}>
          Next
        </Button>
      </HStack>
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

export default React.memo(PathologyForm);
