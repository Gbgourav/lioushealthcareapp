import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducers/reducers';
import { increment, decrement } from './actions/actions';

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export { store, increment, decrement };




//import React from 'react';
// import { View, Text, Button } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { increment, decrement } from './actions';
//
// const CounterComponent = () => {
//   const dispatch = useDispatch();
//   const count = useSelector((state) => state.counter.count); // Update this line
//
//   return (
//     <View>
//       <Text>Count: {count}</Text>
//       <Button title="Increment" onPress={() => dispatch(increment())} />
//       <Button title="Decrement" onPress={() => dispatch(decrement())} />
//     </View>
//   );
// };
//
// export default CounterComponent;