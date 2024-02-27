import {Image, TouchableOpacity} from 'react-native';
import styles from '../../screens/customer/pharmacycss';
import {API_ENDPOINTS} from '../../utils/api';
import {Text, View} from 'native-base';
import React from 'react';

const CategoryCard = ({category, allProductModal}) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => allProductModal(category.name, category.uid)}>
    <Image
      source={{uri: API_ENDPOINTS.BASE + category.image}}
      style={styles.image}
    />
    <View style={styles.textContainer}>
      <Text style={styles.cardText_text}>{category.name}</Text>
    </View>
  </TouchableOpacity>
);

export default CategoryCard;
