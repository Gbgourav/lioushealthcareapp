import moment from 'moment/moment';
import {Box, HStack, Text, View} from 'native-base';
import React from 'react';

const ReviewList = ({item}) => {
  const createdDateMoment = moment(item.created_date, 'DD-MM-YYYY');

  const todayMoment = moment();

  const daysDifference = todayMoment.diff(createdDateMoment, 'days');

  const formattedDate =
    daysDifference === 0
      ? 'Today'
      : daysDifference === 1
      ? '1 day ago'
      : `${daysDifference} days ago`;
  return (
    <Box px="1" shadow={1} py={'3'} rounded={'sm'} backgroundColor={'white'}>
      <View
        style={{
          padding: 10,
          flex: 0,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: 'gray',
            flex: 0,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>S</Text>
        </View>
        <View style={{marginLeft: 10}}>
          <Text
            style={{
              fontWeight: '600',
              fontFamily: 'body',
              fontSize: 18,
            }}>
            {item.review_by}
          </Text>
          <Text color="gray">{formattedDate}</Text>
        </View>
      </View>
      <HStack
        style={{
          paddingHorizontal: 10,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text color={'gray.500'}>{item.review}</Text>
      </HStack>
    </Box>
  );
};

export default ReviewList;
