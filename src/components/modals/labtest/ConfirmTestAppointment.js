import {Box, Button, Divider, Spinner, Text, View} from 'native-base';
import Modal from 'react-native-modal';
import React, {useEffect, useState} from 'react';
import {API_ENDPOINTS, message, useAxios} from '../../../utils/api';
import {Image, ScrollView, TouchableOpacity} from 'react-native';
import {Icons} from '../../icons';
import moment from 'moment/moment';
import RazorpayCheckout from 'react-native-razorpay';
import {connect, useDispatch, useSelector} from 'react-redux';
import {successOrder} from '../../../redux/actions/actions';

const ConfirmTestAppointment = ({bookedSlot, closeModal, user}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [prices, setPrices] = useState(null);
  useEffect(() => {
    const getPrices = async () => {
      const queryParams = new URLSearchParams({
        doctor_id: bookedSlot.doctor_id,
        service_type: bookedSlot.service_type,
        date: bookedSlot.date,
        slot_start: bookedSlot.slot_start,
        slot_end: bookedSlot.slot_end,
        type: 'labtest',
      });
      const response = await useAxios.get(
        API_ENDPOINTS.DOCTOR + '/cost/?' + queryParams.toString(),
      );
      let responseData = response.data;
      console.log('responseData responseData', responseData);
      if (responseData.success) {
        setData(responseData.doctor);
        setPrices({
          fees: responseData.fees,
          texes: responseData.texes,
          total_fees: responseData.total_fees,
        });

        setIsLoading(false);
      } else {
        setIsLoading(false);
        message(responseData.message, 'error');
      }
    };
    if (bookedSlot.doctor_id) {
      getPrices();
    }
  }, []);

  const createPayment = async () => {
    let data = {
      service_type: bookedSlot.service_type,
      date: bookedSlot.date,
      slot_start: bookedSlot.slot_start,
      slot_end: bookedSlot.slot_end,
      doctor_id: bookedSlot.doctor_id,
      type: 'labtest',
    };

    const response = await useAxios.post(
      API_ENDPOINTS.DOCTOR + '/payment/',
      data,
    );

    let responseData = response.data;
    if (responseData.success) {
      let read_data = {
        orderid: responseData.data.uid,
        text: 'We hope you have a good experience! Our Representative will connect with you for sample collection.',
        btn: 'Go to home',
      };
      closeModal();
      let order_created = {
        open: true,
        data: read_data,
      };
      dispatch(successOrder(order_created));
      message('Your payment completed successfully!', 'success');
    } else {
      message('Somthing went wrong please again!', 'error');
    }
  };

  const handlePayNow = async () => {
    console.log('data', prices);
    let amount = prices.total_fees;
    let options = {
      description: ``,
      image: '',
      currency: 'INR',
      key: 'rzp_test_RYD3idiWfFEaSr',
      amount: amount * 100,
      name: 'LIOUS',
      // order_id: order_id,
      prefill: {
        email: 'rajat@gmail.com',
        contact: '+919338473644',
        name: data.doctor_name,
      },
      theme: {color: '#CB89EA'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        createPayment();
      })
      .catch(error => {
        console.log('error error', error);
        setIsLoading(false);
        // setSuccess({value: false, message: "Payment Cancelled!"});
      });
  };

  return (
    <>
      <Modal
        isVisible={bookedSlot.open}
        onBackdropPress={() => closeModal()}
        // swipeDirection={['down']}
        style={{justifyContent: 'flex-end', margin: 0}}>
        <View style={{backgroundColor: 'white', padding: 10, height: '100%'}}>
          <View
            style={{
              flex: 0,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 20,
              marginVertical: 10,
              paddingHorizontal: 8,
            }}>
            <TouchableOpacity onPress={() => closeModal()}>
              <Icons.Right />
            </TouchableOpacity>
            <Text>Confirm an appointment</Text>
          </View>
          {isLoading ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Spinner color="emerald.500" />
            </View>
          ) : (
            <>
              <ScrollView style={{flex: 1}}>
                <Box
                  px="1"
                  shadow={1}
                  py={'3'}
                  my={'1'}
                  rounded={'sm'}
                  backgroundColor={'whitesmoke'}>
                  <View
                    style={{
                      padding: 10,
                      flex: 0,
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Icons.User />
                    <View style={{marginLeft: 20, gap: 10}}>
                      <Text
                        style={{
                          fontWeight: '600',
                          fontFamily: 'body',
                          fontSize: 18,
                        }}>
                        Patients
                      </Text>
                      <Text style={{fontSize: 20}}>
                        {user.first_name} {user.last_name}
                      </Text>
                    </View>
                  </View>
                </Box>

                <Box
                  px="1"
                  shadow={1}
                  my={'1'}
                  py={'3'}
                  rounded={'sm'}
                  backgroundColor={'whitesmoke'}>
                  <View
                    style={{
                      padding: 10,
                      flex: 0,
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Icons.Video />
                    <View style={{marginLeft: 20, gap: 10}}>
                      <Text
                        style={{
                          fontWeight: '600',
                          fontFamily: 'body',
                          fontSize: 18,
                        }}>
                        Sample Collection Slot
                      </Text>
                      <Text style={{fontSize: 20}}>
                        {moment(bookedSlot.date).format('ddd, DD MMM')},{' '}
                        {moment(bookedSlot.slot_start, 'HH:mm:ss').format(
                          'HH:mm',
                        )}{' '}
                        to{' '}
                        {moment(bookedSlot.slot_end, 'HH:mm:ss').format(
                          'HH:mm',
                        )}
                      </Text>
                    </View>
                  </View>
                </Box>
                <Box
                  px="1"
                  shadow={1}
                  my={'1'}
                  py={'3'}
                  rounded={'sm'}
                  backgroundColor={'whitesmoke'}>
                  <View
                    style={{
                      padding: 10,
                      flex: 0,
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Icons.Video />
                    <View style={{marginLeft: 20, gap: 10}}>
                      <Text
                        style={{
                          fontWeight: '600',
                          fontFamily: 'body',
                          fontSize: 18,
                        }}>
                        Sample Collection Address
                      </Text>
                      <Text style={{fontSize: 20}}>{data.address}</Text>
                    </View>
                  </View>
                </Box>
                <Box
                  px="3"
                  shadow={1}
                  py={'3'}
                  my={1}
                  rounded={'sm'}
                  gap={'2'}
                  backgroundColor={'whitesmoke'}>
                  <View
                    style={{
                      flex: 0,
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        fontWeight: '600',
                        fontFamily: 'body',
                        color: 'gray',
                        fontSize: 22,
                      }}>
                      Bill Details
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        color: 'gray',
                        fontSize: 16,
                      }}>
                      Item Total (MRP)
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                      }}>
                      ₹ {prices.fees}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    }}>
                    <Text
                      style={{
                        color: 'gray',
                        fontSize: 16,
                      }}>
                      Service Fees and Tax
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                      }}>
                      ₹ {prices.texes}
                    </Text>
                  </View>
                  <Divider style={{marginVertical: 10}} />
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                      }}>
                      To be paid
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                      }}>
                      ₹ {prices.total_fees}
                    </Text>
                  </View>
                  <Button
                    style={{backgroundColor: '#376095', marginTop: 20}}
                    onPress={handlePayNow}>
                    Confirm Payment
                  </Button>
                </Box>
              </ScrollView>
            </>
          )}
        </View>
      </Modal>
    </>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user.user,
  };
};
export default connect(mapStateToProps)(ConfirmTestAppointment);
