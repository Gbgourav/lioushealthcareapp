import {
  View,
  Text,
  ChevronRightIcon,
  CheckIcon,
  Button,
  HStack,
  VStack,
  Center,
} from 'native-base';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import React, {useCallback, useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import CommonForm from '../../../components/vendorforms/CommonForm';
import DoctorForm from '../../../components/vendorforms/DoctorForm';
import PharmacyForm from '../../../components/vendorforms/PharmacyForm';
import PathologyForm from '../../../components/vendorforms/PathologyForm';
import {API_ENDPOINTS, message, useAxios} from '../../../utils/api';
import {profileCompleted} from '../../../redux/store';
import {useDispatch} from 'react-redux';
import {
  createChannel,
  getLocation,
  requestUserPermission,
} from '../../../api/commanfuncations';
import BloodBankVendor from '../../../components/vendorforms/BloodBankVendor';
import Icon from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native';

const CompleteVendorProfile = ({navigation}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState([]);
  const [formDataArrayDoc, setFormDataArrayDoc] = useState({});
  const [formDataArrayPathology, setFormDataArrayPathology] = useState({});
  const [formDataArrayPhlebologist, setFormDataArrayPhlebologist] = useState(
    {},
  );
  const [formDataArrayPharmacy, setFormDataArrayPharmacy] = useState({});

  const [currentStep, setCurrentStep] = useState(0);
  const [currentType, setCurrentType] = useState({});
  useFocusEffect(
    useCallback(() => {
      navigation.getParent('bottomNavigator').setOptions({
        tabBarStyle: {display: 'none'},
      });
      return () => {
        navigation.getParent('bottomNavigator').setOptions({
          tabBarStyle: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: 92,
          },
        });
      };
    }, []),
  );

  const [services, setServices] = useState([]);
  const [specialization, setSpecialization] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [rowServices, setRowServices] = useState([]);
  const [rowSpecialty, setRowSpecialty] = useState([]);
  const [rowFacilities, setRowFacilities] = useState([]);
  const [imageObj, setImageObj] = useState(null);

  const handleImage = (uri, imageObj) => {
    setImageObj(imageObj);
  };

  const handleSelection = (id, type) => {
    if (type === 'service') {
      setRowServices(prevState => {
        const updatedService = prevState.map((item, index) => {
          if (index === id) {
            if (!item.selected) {
              handleArr('services', item.service_name, 'add');
            } else {
              handleArr('services', item.service_name, 'remove');
            }
            return {
              ...item,
              selected: !item.selected,
            };
          } else {
            return item;
          }
        });
        return updatedService;
      });
    } else if (type === 'specializations') {
      setRowSpecialty(prevState => {
        const updated = prevState.map((item, index) => {
          if (id === index) {
            if (!item.selected) {
              handleArr('specialization', item.specialization_name, 'add');
            } else {
              handleArr('specialization', item.specialization_name, 'remove');
            }
            return {
              ...item,
              selected: !item.selected,
            };
          } else {
            return item;
          }
        });
        return updated;
      });
    } else {
      setRowFacilities(prevState => {
        const updated = prevState.map((item, index) => {
          if (!item.selected) {
            handleArr('facilities', item.facility_name, 'add');
          } else {
            handleArr('facilities', item.facility_name, 'remove');
          }
          if (id === index) {
            return {
              ...item,
              selected: !item.selected,
            };
          } else {
            return item;
          }
        });
        return updated;
      });
    }
  };

  const getdataInit = async () => {
    const response = await useAxios.get(API_ENDPOINTS.DOCTOR + '/init/');
    let responseData = response.data;
    if (responseData.success) {
      const updatedServicesData = responseData.services_data.map(service => ({
        ...service,
        selected: false,
      }));
      const spacialization = responseData.specialization_data.map(
        specialization => ({
          ...specialization,
          selected: false,
        }),
      );
      const facilities = responseData.facilities_data.map(facility => ({
        ...facility,
        selected: false,
      }));
      setRowServices(updatedServicesData);
      setRowSpecialty(spacialization);
      setRowFacilities(facilities);
    } else {
      message(responseData.message, 'error');
    }
  };

  const handleSp = (text, type) => {
    if (type === 'spacial') {
      let data = {
        specialization_name: text,
        uid: null,
        selected: true,
      };
      rowSpecialty.push(data);
      setSpecialization(prevSpecializations => [...prevSpecializations, text]);
    } else if (type === 'service') {
      let data = {
        service_name: text,
        uid: null,
        selected: true,
      };
      rowServices.push(data);
      services.push(text);
      setServices(prevSpecializations => [...prevSpecializations, text]);
    } else {
      let data = {
        facility_name: text,
        uid: null,
        selected: true,
      };
      rowFacilities.push(data);
      setFacilities(prevSpecializations => [...prevSpecializations, text]);
    }
  };

  const handleArr = (type, value, action) => {
    const stateObjects = {
      services: [services, setServices],
      specialization: [specialization, setSpecialization],
      facilities: [facilities, setFacilities],
    };
    const [currentState, setState] = stateObjects[type];
    if (action === 'add') {
      setState(prevState => [...prevState, value]);
    } else {
      const updatedState = currentState.filter(service => service !== value);
      setState(updatedState);
    }
  };

  const handleNext = formValues => {
    if (formValues.type === 'Doctor') {
      setFormDataArrayDoc({
        ...formDataArrayDoc,
        ...formValues,
      });
    } else if (formValues.type === 'Pathology') {
      setFormDataArrayPathology({...formDataArrayPathology, ...formValues});
    } else if (formValues.type === 'Blood Bank') {
      setFormDataArrayPhlebologist({
        ...formDataArrayPhlebologist,
        ...formValues,
      });
    } else if (formValues.type === 'Pharmacy') {
      setFormDataArrayPharmacy({...formDataArrayPharmacy, ...formValues});
    }
    setCurrentStep(currentStep + 1);
    setCurrentType({...currentType, ...formValues});
  };

  const someOtherFunction = async () => {
    try {
      const coords = await getLocation();
      if (coords) {
        const roundedLatitude = coords.latitude.toFixed(6);
        const roundedLongitude = coords.longitude.toFixed(6);
        fetchStatePincode(roundedLatitude, roundedLongitude);
      } else {
        console.log('Failed to get coordinates.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    createChannel();
    requestUserPermission();
    someOtherFunction();
    getStates();
    getdataInit();
  }, []);

  const fetchStatePincode = async (latitude, longitude) => {
    try {
      const response = await useAxios.post(
        API_ENDPOINTS.USERS + '/state-pincode/',
        {
          latitude,
          longitude,
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  const getStates = async () => {
    const response = await useAxios.get(API_ENDPOINTS.USERS + '/get-states/');
    const responseData = response.data;
    if (responseData.success) {
      setStates(responseData.states);
    } else {
      message('Try Again!', 'error');
    }
  };

  const handlePre = () => {
    setCurrentStep(currentStep - 1);
  };

  const finalSubmit = async () => {
    try {
      setLoading(true);
      let data;
      if (currentType.type === 'Doctor') {
        const numericValue = formDataArrayDoc.contact.replace(/[^\d]/g, '');
        const formattedContact = `+91${numericValue}`;
        const newData = {
          ...formDataArrayDoc,
          services: JSON.stringify(services),
          specialization: JSON.stringify(specialization),
          facilities: JSON.stringify(facilities),
          image: {
            uri: imageObj.uri,
            type: imageObj.type,
            name: imageObj.fileName,
          },
          contact: formattedContact,
        };
        data = newData;
        console.log('Gourav bhadiu', data);
      } else if (currentType.type === 'Pathology') {
        const newData = {
          ...formDataArrayPathology,
          services: JSON.stringify(services),
          specialization: JSON.stringify(specialization),
          facilities: JSON.stringify(facilities),
        };
        data = newData;
      } else if (currentType.type === 'Blood Bank') {
        const newData = {
          ...formDataArrayPhlebologist,
          services: JSON.stringify(services),
          specialization: JSON.stringify(specialization),
          facilities: JSON.stringify(facilities),
        };
        data = newData;
      } else if (currentType.type === 'Pharmacy') {
        data = formDataArrayPharmacy;
      }
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await useAxios.post(
        API_ENDPOINTS.VENDOR + '/create/',
        formData,
      );
      const responseData = response.data;
      if (responseData.success) {
        message('Your details has been submitted', 'success');
        dispatch(profileCompleted(true));
        navigation.reset({
          routes: [{name: 'AppNavigator'}],
        });
        setLoading(false);
      } else {
        message('Please try again, or connect with us', 'error');
        setLoading(false);
      }
    } catch (error) {
      console.log('error', error);
      message('Please try again, or connect with us', 'error');
      setLoading(false);
    }
  };

  return (
    <>
      <View style={{flex: 1, padding: 10}}>
        <View style={{padding: 20}}>
          {currentStep !== 0 ? (
            <TouchableOpacity
              style={{position: 'absolute', top: 20, left: 5, padding: 5}}
              onPress={handlePre}>
              <Icon name="arrowleft" size={20} color="#0C4E5F" />
            </TouchableOpacity>
          ) : null}
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 25,
              paddingBottom: 5,
              paddingTop: 30,
              color: '#0C4E5F',
              textAlign: 'center',
            }}>
            Let’s Setup Your Profile
          </Text>
        </View>
        <ProgressSteps
          activeStep={currentStep}
          style={{bottomNavigationStyle: {backBtn: {display: 'none'}}}}
          completedProgressBarColor="#0C4E5F"
          activeStepIconBorderColor={'#0C4E5F'}
          activeLabelColor={'#0C4E5F'}
          completedStepIconColor={'#0C4E5F'}
          topOffset={8}>
          <ProgressStep
            label="First Step"
            onNext={handleNext}
            onPrevious={handlePre}
            removeBtnRow={true}
            nextBtnTextStyle={{display: 'none'}}
            previousBtnStyle={{display: 'none'}}>
            <View
              style={{
                flex: 1,
                alignItems: 'stretch',
              }}>
              <CommonForm
                handleNext={handleNext}
                currentType={currentType}
                states={states}
              />
            </View>
          </ProgressStep>
          <ProgressStep
            label="Second Step"
            onNext={handleNext}
            onPrevious={handlePre}
            removeBtnRow={true}
            nextBtnTextStyle={{display: 'none'}}
            previousBtnStyle={{display: 'none'}}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {currentType.type === 'Doctor' ? (
                <DoctorForm
                  handleNext={handleNext}
                  data={formDataArrayDoc}
                  handlePre={handlePre}
                  is_specialization={specialization.length > 0}
                  is_services={services.length > 0}
                  is_facilities={facilities.length > 0}
                  handleArr={handleArr}
                  rowServices={rowServices}
                  rowSpecialty={rowSpecialty}
                  rowFacilities={rowFacilities}
                  handleSelection={handleSelection}
                  handleSp={handleSp}
                  handleImage={handleImage}
                  image={imageObj?.uri || null}
                />
              ) : currentType.type === 'Pathology' ? (
                <PathologyForm
                  handleNext={handleNext}
                  data={formDataArrayPathology}
                  handlePre={handlePre}
                  is_specialization={specialization.length > 0}
                  is_services={services.length > 0}
                  is_facilities={facilities.length > 0}
                  handleArr={handleArr}
                  rowServices={rowServices}
                  rowSpecialty={rowSpecialty}
                  rowFacilities={rowFacilities}
                  handleSelection={handleSelection}
                  handleSp={handleSp}
                />
              ) : currentType.type === 'Blood Bank' ? (
                <BloodBankVendor
                  handleNext={handleNext}
                  data={formDataArrayPhlebologist}
                  handlePre={handlePre}
                  is_specialization={specialization.length > 0}
                  is_services={services.length > 0}
                  is_facilities={facilities.length > 0}
                  handleArr={handleArr}
                  rowServices={rowServices}
                  rowSpecialty={rowSpecialty}
                  rowFacilities={rowFacilities}
                  handleSelection={handleSelection}
                  handleSp={handleSp}
                />
              ) : currentType.type === 'Pharmacy' ? (
                <PharmacyForm
                  handleNext={handleNext}
                  data={formDataArrayPharmacy}
                  handlePre={handlePre}
                />
              ) : null}
            </View>
          </ProgressStep>
          <ProgressStep
            label="Third Step"
            removeBtnRow={true}
            onNext={handleNext}
            onPrevious={handlePre}
            nextBtnTextStyle={{display: 'none'}}
            previousBtnStyle={{display: 'none'}}>
            <View
              style={{alignItems: 'center', marginVertical: 60, width: '100%'}}>
              <VStack
                space={16}
                style={{width: '80%', justifyContent: 'flex-end'}}>
                <View
                  style={{
                    flex: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <CheckIcon
                    size={70}
                    style={{
                      backgroundColor: 'lightgreen',
                      borderRadius: 50,
                      padding: 40,
                    }}
                  />
                  <Text
                    style={{
                      paddingVertical: 20,
                      fontSize: 25,
                      fontWeight: 'bold',
                      color: '#0C4E5F',
                    }}>
                    All Set
                  </Text>
                  <Text style={{fontSize: 15}}>Submit your profile</Text>
                </View>
                <View style={{gap: 20}}>
                  <Button
                    style={{backgroundColor: '#0C4E5F', fontWeight: 'bold'}}
                    onPress={finalSubmit}
                    isLoading={loading}
                    isLoadingText={'Submitting'}>
                    Submit
                  </Button>
                  <Button
                    onPress={handlePre}
                    style={{backgroundColor: 'lightgray', fontWeight: 'bold'}}>
                    Back
                  </Button>
                </View>
              </VStack>
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
    </>
  );
};

export default CompleteVendorProfile;
