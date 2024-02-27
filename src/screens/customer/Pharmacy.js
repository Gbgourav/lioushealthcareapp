import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Button,
  Input,
  View,
  Text,
  Center,
  Divider,
  HStack,
  Spinner,
} from 'native-base';
import {ScrollView, TouchableOpacity, FlatList, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {API_ENDPOINTS, message, useAxios} from '../../utils/api';
import {Icons} from '../../components/icons';
import styles from './pharmacycss';
import SubCatModal from '../../components/modals/pharmacy/SubCatModal';
import BrandModal from '../../components/modals/pharmacy/BrandModal';
import ProductCardList from '../../components/comman/ProductCard';
import AllProductsList from '../../components/modals/pharmacy/AllProductsList';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  deletedCart,
  successOrder,
  updateCart,
  userToken,
} from '../../redux/actions/actions';
import CartButton from '../../components/comman/CartButton';
import CustomAlert from '../../components/comman/MessageOver';
import SuccessModal from '../../components/modals/pharmacy/SuccessModal';
import userReducer from '../../redux/reducers/reducers';

const Pharmacy = ({navigation, order_created}) => {
  const dispatch = useDispatch();
  const orderCreated = useSelector(state => state.user.order_created);
  const cartDeleted = useSelector(state => state.user.cart_delete);
  const [products, setProducts] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [healthConcernsData, setHealthConcernsData] = useState([]);
  const [subCatModal, setSubCatModal] = useState({open: false, data: null});
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

  const setMessageModal = (type, message, open) => {
    setShowError({
      type: type,
      message: message,
      open: open,
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

  const closeSubCat = () => {
    setSubCatModal({open: false, data: null});
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
    if (orderCreated.open || cartDeleted) {
      setIsLoading(true);
      setOpenProductModal({open: false, data: null});
      setSubCatModal({open: false, data: null});
      setOpenAllProduct({
        open: false,
        data: null,
      });
      getPharmacyData();
    }
  }, [orderCreated, cartDeleted]);
  const closeSuccessModal = () => {
    let order_created = {
      open: false,
      data: null,
    };
    dispatch(successOrder(order_created));
  };
  const handleSubCat = (uid, name) => {
    setSubCatModal({open: true, data: {name: name, uid: uid}});
  };
  const getPharmacyData = async () => {
    const response = await useAxios.get(
      API_ENDPOINTS.PHARMACY + '/get_pharmacy/',
    );
    let responseData = response.data;
    console.log('responseData', responseData);
    if (responseData.success) {
      setCategoriesData(responseData.data);
      setProducts(responseData.products_data);
      setHealthConcernsData(responseData.health_concerns_data);
      dispatch(updateCart(responseData.cart_data));
      dispatch(deletedCart(false));
      setIsLoading(false);
    } else {
      message('Something went wrong try again!');
    }
  };

  useEffect(() => {
    getPharmacyData();
  }, []);

  const carouselData = [
    {title: 'Item 1'},
    {title: 'Item 2'},
    {title: 'Item 3'},
  ];
  useFocusEffect(
    useCallback(() => {
      navigation.getParent('bottomNavigator').setOptions({
        tabBarStyle: {display: 'none'},
      });

      return () => {
        navigation.getParent().setOptions({
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
  const renderCarouselItem = ({item}) => (
    <View
      style={{
        backgroundColor: 'lightblue',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>{item.title}</Text>
    </View>
  );
  const CategoryCard = ({category}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleSubCat(category.uid, category.name)}>
      <Image
        source={{uri: API_ENDPOINTS.BASE + category.image}}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.cardText_text}>{category.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const HealthConcernCard = ({category}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => allProductModal('health_concerns', category.uid)}>
      <Image
        source={{uri: API_ENDPOINTS.BASE + category.image}}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.cardText_text}>{category.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Spinner color="emerald.500" />
        </View>
      ) : (
        <View style={{flex: 1, backgroundColor: 'white', zIndex: 9}}>
          {showError.open && (
            <CustomAlert
              type={showError.type}
              message={showError.message}
              onClose={() =>
                setShowError({open: false, type: null, message: null})
              }
            />
          )}
          <CartButton />
          <View style={{marginHorizontal: 10, flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white',
                paddingVertical: 8,
                borderRadius: 5,
                marginVertical: 10,
              }}>
              <Input
                placeholder="Search"
                style={{flex: 1, fontSize: 16, color: 'black'}}
              />
            </View>
            <ScrollView style={{flex: 1}}>
              <View
                style={{
                  gap: 10,
                }}>
                <View style={styles.button_card}>
                  <View style={styles.btn_card_in}>
                    <View style={styles.btn_in_in}>
                      <Text style={{fontSize: 18}}>
                        Call to order medicines
                      </Text>
                      <Text style={{fontSize: 16, color: 'gray'}}>
                        Order medicines hassle-free
                      </Text>
                    </View>
                    <View>
                      <Button
                        backgroundColor={'#006600'}
                        size={'lg'}
                        fontWeight={'bold'}
                        borderRadius={16}
                        width={95}>
                        Call Now
                      </Button>
                    </View>
                  </View>
                </View>
                <View style={styles.button_card}>
                  <View style={styles.btn_card_in}>
                    <View style={styles.btn_in_in}>
                      <Text style={{fontSize: 18}}>
                        Upload your prescription
                      </Text>
                      <Text style={{fontSize: 16, color: 'gray'}}>
                        Save upto 25%
                      </Text>
                    </View>
                    <View>
                      <Button
                        backgroundColor={'#006600'}
                        size={'lg'}
                        fontWeight={'bold'}
                        borderRadius={16}
                        width={95}>
                        Upload
                      </Button>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{marginVertical: 20}}>
                <Carousel
                  data={carouselData}
                  renderItem={renderCarouselItem}
                  sliderWidth={400}
                  itemWidth={400}
                />
              </View>
              <View>
                <Text style={styles.heading}>Popular Categories</Text>
              </View>
              <Divider style={{marginTop: 10}} />
              <FlatList
                data={categoriesData}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => <CategoryCard category={item} />}
                numColumns={3}
                contentContainerStyle={styles.container}
              />
              <Divider style={{marginVertical: 20}}></Divider>
              <View>
                <Text style={styles.heading}>Deals of the day</Text>
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
                    />
                  </View>
                </ScrollView>
              </HStack>
              <TouchableOpacity
                style={styles.view_all}
                onPress={() => allProductModal('all', 'none')}>
                <Text style={styles.view_all_text}>View all</Text>
                <Icons.Right />
              </TouchableOpacity>
              <Divider style={{marginVertical: 20}}></Divider>
              <View>
                <Text style={styles.heading}>Shop by Health Concerns</Text>
              </View>
              <FlatList
                data={healthConcernsData}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => <HealthConcernCard category={item} />}
                numColumns={3}
                contentContainerStyle={styles.container}
              />
            </ScrollView>
          </View>
          {subCatModal.open ? (
            <SubCatModal
              toggleDrawer={closeSubCat}
              data={subCatModal.data}
              open={subCatModal.open}
            />
          ) : null}
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
          {orderCreated.open ? (
            <SuccessModal
              open={orderCreated.open}
              toggleDrawer={closeSuccessModal}
              data={orderCreated.data}
            />
          ) : null}
        </View>
      )}
    </>
  );
};

export default Pharmacy;
