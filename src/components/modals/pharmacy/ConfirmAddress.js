import CustomAlert from '../../comman/MessageOver';
import {Divider, Spinner, Text, View, Input, Button} from 'native-base';
import {ScrollView, TouchableOpacity} from 'react-native';
import {Icons} from '../../icons';
import React, {useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import Modal from 'react-native-modal';
import moment from 'moment';
import {RateCard} from '../../comman/RateCard';
import RazorpayCheckout from 'react-native-razorpay';
import {API_ENDPOINTS, message, useAxios} from '../../../utils/api';
import SuccessModal from './SuccessModal';
import {successOrder, updateCart} from '../../../redux/actions/actions';

const ConfirmAddress = ({open, toggleDrawer, data, user, closeOuterModal}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState({open: false, data: null});
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState({
    open: false,
    type: null,
    message: null,
  });
  const [residentialAddress, setResidentialAddress] = useState(
    user.residential_address,
  );
  const [officeAddress, setOfficeAddress] = useState(user.office_address);
  const [isEdit, setIsEdit] = useState(false);

  const openSuccessModal = data => {
    setSuccessModal({open: true, data: data});
  };

  const closeSuccessModal = () => {
    setSuccessModal({open: false, data: null});
  };

  const createPayment = async () => {
    let dataItems = {
      payment_date: moment().format('DD-MM-YYYY'),
      payment_method: 'razorpay',
      product: data.price.cart_items_uid,
      amount: data.price.price,
    };

    const response = await useAxios.post(
      API_ENDPOINTS.PHARMACY + '/create_order/',
      dataItems,
    );

    let responseData = response.data;
    if (responseData.success) {
      const cart = {
        product_name: null,
        product_count: null,
        price: 0,
      };
      dispatch(updateCart(cart));
      let read_data = {
        orderid: responseData.order_id,
        text: 'Your Order has been successfully placed!',
        btn: 'Track Order',
      };
      // let order_id = responseData.order_id;
      closeOuterModal();
      toggleDrawer();
      let order_created = {
        open: true,
        data: read_data,
      };
      dispatch(successOrder(order_created));
    } else {
      message('Somthing went wrong please again!', 'error');
    }
  };

  const handlePayNow = async () => {
    console.log('doctorData', data);
    let options = {
      description: ``,
      image: '',
      currency: 'INR',
      key: 'rzp_test_RYD3idiWfFEaSr',
      amount: data.price.price * 100,
      name: 'LIOUS',
      // order_id: order_id,
      prefill: {
        email: user.email,
        contact: user.contact,
        name: user.first_name + ' ' + user.last_name,
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
        isVisible={open}
        onBackdropPress={() => toggleDrawer(null)}
        // swipeDirection={['down']}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 10,
            height: '100%',
          }}>
          {showError.open && (
            <CustomAlert
              type={showError.type}
              message={showError.message}
              onClose={() =>
                setShowError({open: false, type: null, message: null})
              }
            />
          )}
          {loading ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Spinner color="emerald.500" />
            </View>
          ) : (
            <>
              <View
                style={{
                  flex: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 20,
                  marginVertical: 10,
                  paddingHorizontal: 8,
                }}>
                <TouchableOpacity onPress={() => toggleDrawer(null)}>
                  <Icons.Right />
                </TouchableOpacity>
                <Text>Confirm your payment</Text>
              </View>
              <Divider />
              <ScrollView style={{flex: 1}}>
                <View style={{gap: 10, marginVertical: 10}}>
                  {isEdit ? (
                    <>
                      <Text style={{fontWeight: 600}}>Residential Address</Text>
                      <Input
                        placeholder="Enter residential address"
                        value={residentialAddress}
                        isDisabled={true}
                        onChangeText={setResidentialAddress}
                      />
                      <Text style={{fontWeight: 600}}>Office Address</Text>
                      <Input
                        placeholder="Enter office address"
                        value={officeAddress}
                        isDisabled={true}
                        onChangeText={setOfficeAddress}
                      />
                    </>
                  ) : null}
                  <View
                    style={{
                      marginVertical: 20,
                      backgroundColor: 'whitesmoke',
                      paddingVertical: 20,
                      paddingHorizontal: 10,
                    }}>
                    <Text style={{color: 'gray', marginVertical: 16}}>
                      Delivery Address
                    </Text>
                    <Text
                      style={{fontSize: 16, fontWeight: 600, marginBottom: 20}}>
                      {user.residential_address ? 'Residential' : 'Office'}{' '}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        gap: 10,
                      }}>
                      <Icons.Location />
                      <View>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: 600,
                          }}>
                          {user.residential_address || user.office_address}
                        </Text>
                        <Text style={{fontSize: 16, marginTop: 20}}>
                          {user.contact_no}
                        </Text>
                        <Text style={{fontSize: 16}}>
                          {user.first_name} {user.last_name}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                        marginTop: 10,
                      }}>
                      <Icons.Calendar />
                      <Text>Order date - {moment().format('DD-MM-YYYY')}</Text>
                    </View>
                    <Button
                      style={{
                        marginVertical: 20,
                        backgroundColor: 'white',
                        borderColor: 'black',
                        borderWidth: 0.5,
                      }}>
                      <Text>Change Address</Text>
                    </Button>
                  </View>
                </View>
                <View>
                  <RateCard prices={data.price} />
                </View>
                <Button
                  onPress={handlePayNow}
                  style={{backgroundColor: '#376095', marginVertical: 20}}>
                  Confirm Payment
                </Button>
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
export default connect(mapStateToProps)(ConfirmAddress);
