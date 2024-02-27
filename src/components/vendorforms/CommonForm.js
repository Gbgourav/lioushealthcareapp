import React from 'react';
import {View, Text} from 'native-base';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {VStack, FormControl, Input, Select, Button} from 'native-base';

const CommonForm = ({handleNext, currentType, states}) => {
  const initialValues = {
    type: currentType?.type ? currentType.type : '',
    establishment_name: currentType?.establishment_name
      ? currentType?.establishment_name
      : '',
    pin_code: currentType?.pin_code ? currentType.pin_code : '', // New field
    address: currentType?.address ? currentType.address : '', // New field
    state: currentType?.state ? currentType.state : '', // New field
    contact: currentType?.contact ? currentType?.contact : '',
  };

  const validationSchema = Yup.object({
    type: Yup.string().required('Type is required'),
    establishment_name: Yup.string().required('Establishment Name is required'),
    address: Yup.string().required('Home address is required'),
    pin_code: Yup.string()
      .required('Pin code is required')
      .matches(/^\d{6}$/, 'Pin code must be exactly 6 digits'),
    state: Yup.string().required('State is required'),
    contact: Yup.string()
      .matches(/^[0-9]{10}$/, 'Invalid phone number (must be 10 digits)')
      .required('Contact is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async values => {
      handleNext(values);
    },
  });

  return (
    <VStack width={'100%'} padding={'4'} space={'4'} p="b-4">
      <FormControl
        isInvalid={formik.touched.type && formik.errors.type}
        isReadOnly>
        <FormControl.Label>Are you a</FormControl.Label>

        <Select
          placeholder="Eg: Doctor"
          variant="underlined"
          selectedValue={formik.values.type}
          onValueChange={value => formik.setFieldValue('type', value)}>
          <Select.Item label="Doctor" value="Doctor" />
          <Select.Item label="Pathology" value="Pathology" />
          <Select.Item label="Blood Bank" value="Blood Bank" />
          <Select.Item label="Pharmacy" value="Pharmacy" />
        </Select>
        {formik.touched.type && formik.errors.type && (
          <FormControl.ErrorMessage>
            {formik.errors.type}
          </FormControl.ErrorMessage>
        )}
      </FormControl>

      <FormControl
        isInvalid={
          formik.touched.establishment_name && formik.errors.establishment_name
        }>
        <FormControl.Label>Establishment Name</FormControl.Label>

        <Input
          placeholder="Eg: Khanna Clinic"
          variant="underlined"
          value={formik.values.establishment_name}
          onChangeText={value =>
            formik.setFieldValue('establishment_name', value)
          }
        />
        {formik.touched.establishment_name &&
          formik.errors.establishment_name && (
            <FormControl.ErrorMessage>
              {formik.errors.establishment_name}
            </FormControl.ErrorMessage>
          )}
      </FormControl>

      <FormControl
        isInvalid={formik.touched.pin_code && formik.errors.pin_code}>
        <FormControl.Label>Pin Code</FormControl.Label>

        <Input
          placeholder="Eg: 110092"
          keyboardType="numeric"
          maxLength={6}
          variant="underlined"
          value={formik.values.pin_code}
          onChangeText={value => formik.setFieldValue('pin_code', value)}
        />
        {formik.touched.pin_code && formik.errors.pin_code && (
          <FormControl.ErrorMessage>
            {formik.errors.pin_code}
          </FormControl.ErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={formik.touched.address && formik.errors.address}>
        <FormControl.Label>Home Address</FormControl.Label>
        <Input
          placeholder="Eg: Tower 11 Shop no 5"
          variant="underlined"
          value={formik.values.address}
          onChangeText={value => formik.setFieldValue('address', value)}
        />
        {formik.touched.address && formik.errors.address && (
          <FormControl.ErrorMessage>
            {formik.errors.address}
          </FormControl.ErrorMessage>
        )}
      </FormControl>

      <FormControl
        isInvalid={formik.touched.state && formik.errors.state}
        isReadOnly>
        <FormControl.Label>State</FormControl.Label>
        <Select
          placeholder="Eg: Delhi"
          variant="underlined"
          selectedValue={formik.values.state}
          onValueChange={itemValue => formik.setFieldValue('state', itemValue)}>
          {states.map((state, index) => (
            <Select.Item key={index} label={state.name} value={state.name} />
          ))}
        </Select>
        {formik.touched.state && formik.errors.state && (
          <FormControl.ErrorMessage>
            {formik.errors.state}
          </FormControl.ErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={formik.touched.contact && formik.errors.contact}>
        <FormControl.Label>Contact Phone Number</FormControl.Label>
        <Input
          placeholder="Eg: 932*******"
          keyboardType="numeric"
          maxLength={10}
          variant="underlined"
          value={formik.values.contact}
          onChangeText={value => formik.setFieldValue('contact', value)}
        />
        {formik.touched.contact && formik.errors.contact && (
          <FormControl.ErrorMessage>
            {formik.errors.contact}
          </FormControl.ErrorMessage>
        )}
      </FormControl>

      <Button onPress={formik.handleSubmit} mt={4}>
        Next
      </Button>
    </VStack>
  );
};

export default React.memo(CommonForm);
