import {View, Text, Spinner, Divider, Button, Box, HStack} from 'native-base';
import CustomAlert from '../../comman/MessageOver';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, ScrollView, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {Icons} from '../../icons';
import {API_ENDPOINTS, useAxios} from '../../../utils/api';
import styles from '../../../screens/customer/pharmacycss';
import moment from 'moment';
import ReviewList from '../../comman/ReviewList';
import EmptyListImage from '../../comman/EmptyList';
import CartButton from '../../comman/CartButton';
import {updateCart} from '../../../redux/actions/actions';
import {useDispatch} from 'react-redux';

const BrandModal = ({open, data, toggleDrawer, setMessageModal, addToCart}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [productData, setProductData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showError, setShowError] = useState({
    open: false,
    type: null,
    message: null,
  });

  const handleAddToCart = async (uid, type) => {
    setLoading2(true);
    let data = {
      uid: uid,
      type: type,
    };
    const response = await useAxios.post(
      API_ENDPOINTS.PHARMACY + `/add_to_cart/`,
      data,
    );
    let responseData = response.data;
    if (responseData.success) {
      setProductData(responseData.product_data);
      dispatch(updateCart(responseData.cart_data));
      setLoading2(false);
    } else {
      setMessageModal('error', responseData.message, true);
      setLoading2(false);
    }
  };

  const getProduct = async () => {
    const response = await useAxios.get(
      API_ENDPOINTS.PHARMACY + `/get_product/?uid=${data.uid}`,
    );
    let responseData = response.data;
    if (responseData.success) {
      setReviews(responseData.review_data);
      setProductData(responseData.products_data);
      setLoading(false);
    } else {
      setShowError({open: true, type: 'error', message: responseData.message});
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <Modal
      isVisible={open}
      onBackdropPress={() => toggleDrawer(null)}
      // swipeDirection={['down']}
      style={{justifyContent: 'flex-end', margin: 0}}>
      <CartButton />
      <View style={{backgroundColor: 'white', padding: 16, height: '100%'}}>
        {showError.open && (
          <CustomAlert
            type={showError.type}
            message={showError.message}
            onClose={() =>
              setShowError({open: false, type: null, message: null})
            }
          />
        )}
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
            <Text>{data.name}</Text>
          </View>
          <Divider />
          {loading ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Spinner color="emerald.500" />
            </View>
          ) : (
            <ScrollView style={{flex: 1}}>
              <View style={{marginVertical: 20, gap: 20}}>
                <View
                  style={{
                    height: 200,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: 'lightgray',
                    borderRadius: 16,
                  }}>
                  <Image
                    source={{uri: API_ENDPOINTS.BASE + productData.image}}
                    style={styles.image_big}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{gap: 8}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                      {productData.name}
                    </Text>
                    <Text style={{fontSize: 16, fontWeight: 600}}>
                      by {productData.brand_name}
                    </Text>
                    <Text
                      style={{fontSize: 16, fontWeight: 500, color: 'gray'}}>
                      {productData.short_description}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: '#376095',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingHorizontal: 30,
                      height: 30,
                      borderRadius: 5,
                    }}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>
                      Review
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: '#ECF1F8',
                    padding: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: 16,
                  }}>
                  <View style={{gap: 5}}>
                    <Text>Total Price</Text>
                    <Text
                      style={{
                        color: '#006600',
                        fontWeight: 'bold',
                        fontSize: 22,
                      }}>
                      ₹ {productData.price}
                    </Text>
                    <View style={{flexDirection: 'row', gap: 10}}>
                      <Text
                        style={{
                          textDecorationLine: 'line-through',
                          color: 'gray',
                          fontSize: 16,
                        }}>
                        ₹ {productData.real_price}
                      </Text>
                      <Text
                        style={{
                          color: '#006600',
                          fontSize: 18,
                          fontWeight: 600,
                        }}>
                        {productData.offer_per} off
                      </Text>
                    </View>
                  </View>
                  <View style={{gap: 10}}>
                    {productData.cart_count ? (
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
                          disabled={loading2}
                          size={'sm'}
                          onPress={() =>
                            handleAddToCart(productData.uid, 'add_more')
                          }>
                          <Text style={{fontWeight: 'bold', color: 'white'}}>
                            +
                          </Text>
                        </Button>
                        {loading2 ? (
                          <Spinner color="emerald.500" />
                        ) : (
                          <Text style={{fontWeight: 'bold', color: 'white'}}>
                            {productData.cart_count}
                          </Text>
                        )}
                        <Button
                          style={{backgroundColor: '#33A593'}}
                          disabled={loading2}
                          size={'sm'}
                          onPress={() =>
                            handleAddToCart(productData.uid, 'remove')
                          }>
                          <Text style={{fontWeight: 'bold', color: 'white'}}>
                            -
                          </Text>
                        </Button>
                      </View>
                    ) : (
                      <Button
                        isLoading={loading2}
                        disabled={loading2}
                        style={{backgroundColor: '#33A593'}}
                        size={'sm'}
                        onPress={() => handleAddToCart(productData.uid)}>
                        Add to cart
                      </Button>
                    )}
                  </View>
                </View>
                <Text style={styles.heading}>Review by patients</Text>
                <FlatList
                  data={reviews}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => <ReviewList item={item} />}
                  ListEmptyComponent={<EmptyListImage />}
                />
                {productData.description ? (
                  <>
                    <Text style={styles.heading}>PRODUCT INFORMATION</Text>
                    <Text>{productData.description}</Text>
                  </>
                ) : null}
              </View>
            </ScrollView>
          )}
        </>
      </View>
    </Modal>
  );
};

export default BrandModal;
