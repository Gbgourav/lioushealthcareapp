import CartButton from '../../comman/CartButton';
import CustomAlert from '../../comman/MessageOver';
import {Button, Divider, Spinner, Text, View} from 'native-base';
import {FlatList, Image, ScrollView, TouchableOpacity} from 'react-native';
import {Icons} from '../../icons';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {API_ENDPOINTS, useAxios} from '../../../utils/api';
import styles from '../../../screens/customer/pharmacycss';
import EmptyListImage from '../../comman/EmptyList';
import {updateCart} from '../../../redux/actions/actions';
import {useDispatch} from 'react-redux';
import ConfirmAddress from './ConfirmAddress';
import {RateCard} from '../../comman/RateCard';

const ConfirmPayment = ({toggleDrawer, open}) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [indexL, setIndexL] = useState(null);
  const [loading2, setLoading2] = useState(false);
  const [products, setProducts] = useState([]);
  const [prices, setPrices] = useState(null);
  const [productsUid, setProductsUid] = useState([]);
  const [openAddressModal, setOpenAddressModal] = useState({
    open: false,
    price: null,
    products_uid: [],
  });
  const [showError, setShowError] = useState({
    open: false,
    type: null,
    message: null,
  });

  const handleAddressModal = () => {
    setOpenAddressModal({
      open: true,
      price: prices,
      products_uid: productsUid,
    });
  };

  const handleCloseAddress = () => {
    setOpenAddressModal({open: false, price: null, products_uid: []});
  };

  const getProduct = async (uid, type, cartId) => {
    let data = {
      uid: uid,
      type: type,
    };
    if (type) {
      setIndexL(cartId);
      setLoading2(true);
    }
    const response = await useAxios.post(
      API_ENDPOINTS.PHARMACY + `/confirm_pay/`,
      data,
    );
    let responseData = response.data;
    console.log('responseData responseData', responseData);
    if (responseData.success) {
      setProducts(responseData.cart_data);
      setPrices(responseData.cart_data_updated);
      setProductsUid(responseData.cart_items_uid);
      dispatch(updateCart(responseData.cart_data_updated));
      setLoading(false);
      if (type) {
        setLoading2(false);
      }
    } else {
      setShowError({open: true, type: 'error', message: responseData.message});
      setLoading2(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const ItemList = ({item, index}) => {
    const product = item.product;
    return (
      <View
        style={{
          borderBottomWidth: 0.5,
          paddingVertical: 15,
          paddingHorizontal: 5,
          borderColor: 'gray',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={{uri: API_ENDPOINTS.BASE + product.image}}
                style={{height: 50, width: 50}}
              />
              <View style={{gap: 5}}>
                <View>
                  <Text style={{color: 'gray'}}>{product.name}</Text>
                  <Text style={{color: 'gray'}}>
                    {product.short_description}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <Text style={{fontSize: 18}}>₹ {item.total_price}</Text>
                  <Text
                    style={{fontSize: 18, textDecorationLine: 'line-through'}}>
                    ₹ {item.price_offer}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              backgroundColor: '#33A593',
            }}>
            <Button
              style={{backgroundColor: '#33A593'}}
              disabled={loading2 && item.uid === indexL}
              size={'sm'}
              onPress={() => getProduct(product.uid, 'add_more', item.uid)}>
              <Text style={{fontWeight: 'bold', color: 'white'}}>+</Text>
            </Button>
            {loading2 && item.uid === indexL ? (
              <Spinner color="emerald.500" />
            ) : (
              <Text style={{fontWeight: 'bold', color: 'white'}}>
                {item.quantity}
              </Text>
            )}
            <Button
              style={{backgroundColor: '#33A593'}}
              disabled={loading2 && item.uid === indexL}
              size={'sm'}
              onPress={() => getProduct(product.uid, 'remove', item.item)}>
              <Text style={{fontWeight: 'bold', color: 'white'}}>-</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <Modal
        isVisible={open}
        onBackdropPress={() => toggleDrawer(null)}
        // swipeDirection={['down']}
        scrollHorizontal={true}
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
                <FlatList
                  data={products}
                  keyExtractor={item => item.uid.toString()}
                  renderItem={({item, index}) => (
                    <ItemList item={item} index={item.uid} />
                  )}
                  ListEmptyComponent={<EmptyListImage />}
                />
                <Divider style={{marginVertical: 20}} />
                <RateCard prices={prices} />
                <Button style={{marginTop: 20}} onPress={handleAddressModal}>
                  Confirm Payment
                </Button>
              </ScrollView>
            </>
          )}
        </View>
      </Modal>
      {openAddressModal.open ? (
        <ConfirmAddress
          open={openAddressModal.open}
          data={openAddressModal}
          toggleDrawer={handleCloseAddress}
          closeOuterModal={toggleDrawer}
        />
      ) : null}
    </>
  );
};

export default ConfirmPayment;
