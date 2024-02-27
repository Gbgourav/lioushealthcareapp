import {configureStore} from '@reduxjs/toolkit';
import userReducer from './reducers/reducers';
import {
  userType,
  userToken,
  userDetails,
  reduxLoading,
  profileCompleted,
  logout,
  updateCart,
  successOrder,
  deletedCart,
  updateLabCart,
} from './actions/actions';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export {
  store,
  userType,
  userToken,
  userDetails,
  reduxLoading,
  profileCompleted,
  logout,
  updateCart,
  successOrder,
  deletedCart,
  updateLabCart,
};
