import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {VStack, FormControl, Input, Button, HStack, Text} from 'native-base';

const PharmacyForm = ({handleNext, data, handlePre}) => {
  const initialValues = {
    days: data?.days ? data.days : '',
    timing: data?.timing ? data.timing : '',
  };

  const validationSchema = Yup.object({
    days: Yup.string().required('Days are required'),
    timing: Yup.string().required('Timing is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async values => {
      let newValue = {...values, type: 'Pharmacy'};
      handleNext(newValue);
    },
  });

  return (
    <VStack
      height={'100%'}
      maxH={'600'}
      width={'100%'}
      padding={'4'}
      space={'4'}>
      <Text color={'#0C4E5F'}>Days:</Text>
      <FormControl isInvalid={formik.touched.days && formik.errors.days}>
        <Input
          variant="underlined"
          placeholder="Enter Days"
          value={formik.values.days}
          onChangeText={value => formik.setFieldValue('days', value)}
        />
      </FormControl>
      {formik.touched.days && formik.errors.days && (
        <Text style={{color: 'red'}}>{formik.errors.days}</Text>
      )}

      <Text color={'#0C4E5F'}>Timing:</Text>
      <FormControl isInvalid={formik.touched.timing && formik.errors.timing}>
        <Input
          variant="underlined"
          placeholder="Enter Timing"
          value={formik.values.timing}
          onChangeText={value => formik.setFieldValue('timing', value)}
        />
      </FormControl>
      {formik.touched.timing && formik.errors.timing && (
        <Text style={{color: 'red'}}>{formik.errors.timing}</Text>
      )}

      <HStack space={2} mt={10} justifyContent="space-between">
        <Button
          onPress={() => handlePre()}
          style={{
            backgroundColor: '#0C4E5F',
            fontWeight: 'bold',
            minWidth: 100,
          }}>
          <>Previous</>
        </Button>
        <Button
          onPress={formik.handleSubmit}
          style={{
            backgroundColor: '#0C4E5F',
            fontWeight: 'bold',
            minWidth: 100,
          }}>
          <>Next</>
        </Button>
      </HStack>
    </VStack>
  );
};

export default React.memo(PharmacyForm);
