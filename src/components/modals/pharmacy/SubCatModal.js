import {View, Text, Spinner, Divider, HStack, Button} from 'native-base';
import Modal from 'react-native-modal';
import {FlatList, Image, ScrollView, TouchableOpacity} from 'react-native';
import {Icons} from '../../icons';
import React, {useEffect, useState} from 'react';
import {API_ENDPOINTS, useAxios} from '../../../utils/api';
import styles from '../../../screens/customer/pharmacycss';
import EmptyListImage from '../../comman/EmptyList';
import CustomAlert from '../../comman/MessageOver';
import BrandModal from './BrandModal';
import ProductCard from '../../comman/ProductCard';
import ProductCardList from '../../comman/ProductCard';
import AllProductsList from './AllProductsList';
import CartButton from '../../comman/CartButton';

const SubCatModal = ({data, open, toggleDrawer}) => {
  const [loading, setLoading] = useState(true);
  const [subCatList, setSubCatList] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [openProductModal, setOpenProductModal] = useState({
    open: false,
    data: null,
  });
  const [showError, setShowError] = useState({
    open: false,
    type: null,
    message: null,
  });
  const [openAllProduct, setOpenAllProduct] = useState({
    open: false,
    data: null,
  });

  const closeAllProductModal = () => {
    setOpenAllProduct({
      open: false,
      data: null,
    });
  };

  const allProductModal = (type, uid) => {
    setOpenAllProduct({
      open: true,
      data: {type: type, uid: uid},
    });
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

  const getSubCatData = async () => {
    const response = await useAxios.get(
      API_ENDPOINTS.PHARMACY + `/get_sub_cat/?uid=${data.uid}`,
    );
    let responseData = response.data;
    if (responseData.success) {
      setSubCatList(responseData.sub_cat);
      setBrands(responseData.brand_data);
      setProducts(responseData.products_data);
      setLoading(false);
    } else {
      setMessageModal('error', responseData.message, true);
    }
  };

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

  useEffect(() => {
    getSubCatData();
  }, []);

  const CategoryCard = ({category}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => allProductModal('sub_cat', category.uid)}>
      <Image
        source={{uri: API_ENDPOINTS.BASE + category.image}}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.cardText_text}>{category.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const BrandCard = ({brands}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => allProductModal('brand', brands.uid)}>
      <Image
        source={{uri: API_ENDPOINTS.BASE + brands.image}}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.cardText_text}>{brands.name}</Text>
      </View>
    </TouchableOpacity>
  );

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
        <CartButton />
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
                <Text>{data.name}</Text>
              </View>
              <Divider />
              <ScrollView style={{flex: 1}}>
                <FlatList
                  data={subCatList}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({item}) => <CategoryCard category={item} />}
                  numColumns={3}
                  contentContainerStyle={styles.container}
                  ListEmptyComponent={<EmptyListImage />}
                />
                <Divider style={{marginVertical: 20}}></Divider>
                <View>
                  <Text style={styles.heading}>Products</Text>
                </View>
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
                  numColumns={3}
                  contentContainerStyle={styles.container}
                  ListEmptyComponent={<EmptyListImage />}
                />
                {products.length > 0 ? (
                  <TouchableOpacity
                    style={styles.view_all}
                    onPress={() => allProductModal('main_cat', data.uid)}>
                    <Text style={styles.view_all_text}>
                      {/*{show ? 'Slow less' : 'See all'}*/}
                      View all
                    </Text>
                    <Icons.Right />
                  </TouchableOpacity>
                ) : null}
                <Divider style={{marginVertical: 20}}></Divider>
                <View>
                  <Text style={styles.heading}>Top Brands</Text>
                </View>
                <HStack
                  style={{
                    paddingHorizontal: 0,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 10,
                  }}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={{flexDirection: 'row'}}>
                      <FlatList
                        horizontal
                        data={brands}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({item}) => <BrandCard brands={item} />}
                        ListEmptyComponent={<EmptyListImage />}
                      />
                    </View>
                  </ScrollView>
                </HStack>
              </ScrollView>
            </>
          )}
        </View>
      </Modal>
      {openProductModal.open ? (
        <BrandModal
          open={openProductModal.open}
          toggleDrawer={closeProduct}
          data={openProductModal.data}
        />
      ) : null}
      {openAllProduct.open ? (
        <AllProductsList
          open={openAllProduct.open}
          data={openAllProduct.data}
          toggleDrawer={closeAllProductModal}
        />
      ) : null}
    </>
  );
};

export default SubCatModal;
