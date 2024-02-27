import {View, Text, Divider, Spinner} from 'native-base';
import React, {useEffect, useState} from 'react';
import CustomAlert from '../../comman/MessageOver';
import {FlatList, ScrollView, TouchableOpacity} from 'react-native';
import {Icons} from '../../icons';
import Modal from 'react-native-modal';
import ProductCardList from '../../comman/ProductCard';
import styles from '../../../screens/customer/pharmacycss';
import EmptyListImage from '../../comman/EmptyList';
import {API_ENDPOINTS, useAxios} from '../../../utils/api';
import BrandModal from './BrandModal';
import CartButton from '../../comman/CartButton';

const AllProductsList = ({data, toggleDrawer, open}) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [showError, setShowError] = useState({
    open: false,
    type: null,
    message: null,
  });
  const [openProductModal, setOpenProductModal] = useState({
    open: false,
    data: null,
  });

  const addToCart = (productUid, type) => {
    const updatedProducts = products.map(product => {
      if (product.uid === productUid) {
        return {
          ...product,
          cart_count:
            type === 'remove' ? product.cart_count - 1 : product.cart_count + 1,
        };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const closeProduct = () => {
    setOpenProductModal({open: false, data: null});
  };

  const openProduct = (uid, name) => {
    setOpenProductModal({open: true, data: {uid: uid, name: name}});
  };

  const setMessageModal = (type, message, open) => {
    setShowError({
      type: type,
      message: message,
      open: open,
    });
  };

  const getAllProducts = async (type, uid) => {
    const response = await useAxios.get(
      API_ENDPOINTS.PHARMACY +
        `/get_product_list/?uid=${data.uid}&type=${type}`,
    );
    let responseData = response.data;
    if (responseData.success) {
      setProducts(responseData.products_data);
      setLoading(false);
    } else {
      setShowError({
        type: 'error',
        message: responseData.message,
        open: true,
      });
    }
  };

  useEffect(() => {
    getAllProducts(data.type, data.uid);
  }, []);

  return (
    <>
      <Modal
        isVisible={open}
        onBackdropPress={() => toggleDrawer(null)}
        // swipeDirection={['down']}
        style={{justifyContent: 'flex-end', margin: 0}}>
        <CartButton />
        <View style={{backgroundColor: 'white', padding: 10, height: '100%'}}>
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
              <Text>Products</Text>
            </View>
            <Divider />
            {loading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Spinner color="emerald.500" />
              </View>
            ) : (
              <ScrollView style={{flex: 1}}>
                <FlatList
                  data={products}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({item}) => (
                    <ProductCardList
                      product={item}
                      openProduct={openProduct}
                      setMessageModal={setMessageModal}
                      addToCart={addToCart}
                    />
                  )}
                  numColumns={2}
                  contentContainerStyle={styles.container}
                  ListEmptyComponent={<EmptyListImage />}
                />
              </ScrollView>
            )}
          </>
        </View>
      </Modal>
      {openProductModal.open ? (
        <BrandModal
          open={openProductModal.open}
          toggleDrawer={closeProduct}
          data={openProductModal.data}
          setMessageModal={setMessageModal}
          addToCart={addToCart}
        />
      ) : null}
    </>
  );
};

export default AllProductsList;
