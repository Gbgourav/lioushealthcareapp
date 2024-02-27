import styles from '../../screens/customer/pharmacycss';
import {Image, TouchableOpacity} from 'react-native';
import {API_ENDPOINTS, useAxios} from '../../utils/api';
import {Button, Spinner, Text, View} from 'native-base';
import React, {useState} from 'react';
import {updateCart} from '../../redux/actions/actions';
import {useDispatch} from 'react-redux';

const ProductCardList = ({
  product,
  openProduct,
  setMessageModal,
  addToCart,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleAddToCart = async (uid, type) => {
    setLoading(true);
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
      addToCart(responseData.product_uid, type);
      dispatch(updateCart(responseData.cart_data));
      setLoading(false);
    } else {
      setMessageModal('error', responseData.message, true);
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      style={styles.card_hor}
      onPress={() => openProduct(product.uid, product.name)}>
      <Image
        source={{uri: API_ENDPOINTS.BASE + product.image}}
        style={styles.image_pro}
      />
      <View>
        <Text style={{fontWeight: 500, fontSize: 18}}>{product.name}</Text>
        <Text style={{fontWeight: 500, fontSize: 14, color: 'gray'}}>
          {product.short_description}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 3,
          }}>
          <Text style={styles.heading}>₹{product.price}</Text>
          <Text style={{color: 'gray'}}>30% Off</Text>
        </View>
        {product.cart_count ? (
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
              disabled={loading}
              size={'sm'}
              onPress={() => handleAddToCart(product.uid, 'add_more')}>
              <Text style={{fontWeight: 'bold', color: 'white'}}>+</Text>
            </Button>
            {loading ? (
              <Spinner color="emerald.500" />
            ) : (
              <Text style={{fontWeight: 'bold', color: 'white'}}>
                {product.cart_count}
              </Text>
            )}
            <Button
              style={{backgroundColor: '#33A593'}}
              disabled={loading}
              size={'sm'}
              onPress={() => handleAddToCart(product.uid, 'remove')}>
              <Text style={{fontWeight: 'bold', color: 'white'}}>-</Text>
            </Button>
          </View>
        ) : (
          <Button
            isLoading={loading}
            disabled={loading}
            style={{backgroundColor: '#33A593'}}
            size={'sm'}
            onPress={() => handleAddToCart(product.uid)}>
            Add to cart
          </Button>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ProductCardList;
