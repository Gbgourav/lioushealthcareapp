import {Button, Text, View} from 'native-base';
import {Icons} from '../icons';
import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import ConfirmPayment from '../modals/pharmacy/ConfirmPayment';
import {API_ENDPOINTS, message, useAxios} from '../../utils/api';
import {deletedCart, updateCart} from '../../redux/actions/actions';
import AreYouSure from '../modals/AreYouSure';

const CartButton = ({cart, cart_delete}) => {
  console.log('cart cart', cart);
  const dispatch = useDispatch();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleConfirmPay = () => {
    setOpenConfirmModal(true);
  };

  const closeModal = () => {
    setOpenConfirmModal(false);
  };

  const closeDeleteModal = () => {
    setDeleteConfirm(false);
  };
  const deleteCart = async () => {
    setLoading(true);
    const response = await useAxios.delete(
      API_ENDPOINTS.PHARMACY + '/delete_cart/',
    );
    let responseData = response.data;
    if (responseData.success) {
      message(responseData.message, 'success');
      const cart = {
        product_name: null,
        product_count: null,
        price: 0,
      };
      dispatch(updateCart(cart));
      dispatch(deletedCart(!cart_delete));
      setDeleteConfirm(false);
      setLoading(false);
    }
  };

  return (
    <>
      {cart.price ? (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            height: 80,
            backgroundColor: 'white',
            zIndex: 9999,
            width: '100%',
            padding: 20,
            borderTopRightRadius: 2,
            borderTopLeftRadius: 2,
            borderWidth: 0.1,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
            elevation: 6,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              gap: 20,
            }}>
            {cart.cart_items.length > 0 ? (
              <View>
                <Text style={{fontSize: 16}}>
                  {cart.cart_items[0]}{' '}
                  {cart.count > 1 ? <>and + {cart.count - 1}</> : null}
                </Text>
              </View>
            ) : null}
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
              }}>
              <Button
                size={'lg'}
                onPress={handleConfirmPay}
                style={{backgroundColor: '#33A593', width: 120}}>
                <Text style={{color: 'white', fontWeight: 600, fontSize: 18}}>
                  ₹ {cart.price}
                </Text>
                <Text style={{color: 'white', fontWeight: 600, fontSize: 16}}>
                  Checkout
                </Text>
              </Button>
              <Button
                isDisabled={loading}
                isLoading={loading}
                style={{backgroundColor: '#CF05051A'}}
                onPress={() => setDeleteConfirm(true)}>
                <Icons.Delete />
              </Button>
            </View>
          </View>
        </View>
      ) : null}
      {openConfirmModal ? (
        <ConfirmPayment open={openConfirmModal} toggleDrawer={closeModal} />
      ) : null}
      {deleteConfirm ? (
        <AreYouSure
          open={deleteConfirm}
          loading={loading}
          onConfirm={deleteCart}
          toggleDrawer={closeDeleteModal}
          message={'Are you sure, you want to remove items from cart?'}
        />
      ) : null}
    </>
  );
};

const mapStateToProps = state => {
  return {
    cart: state.user.cart,
    user: state.user,
    cart_delete: state.user.cart_delete,
  };
};
export default connect(mapStateToProps)(CartButton);
