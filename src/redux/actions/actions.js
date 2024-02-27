import {createAction} from '@reduxjs/toolkit';

export const userType = userType => ({type: 'USERTYPE', payload: userType});
export const userToken = token => ({
  type: 'SET_USER_DETAILS',
  payload: token,
});

export const userDetails = details => ({
  type: 'GET_USER_DETAILS',
  payload: details,
});

export const reduxLoading = loading => ({
  type: 'SAT_LOADING',
  payload: loading,
});

export const profileCompleted = is_completed => ({
  type: 'PROFILE_COMPLETED',
  payload: is_completed,
});

export const logout = logout => ({
  type: 'LOGOUT',
  payload: logout,
});

export const updateCart = data => ({
  type: 'UPDATE_CART',
  payload: data,
});

export const updateLabCart = data => ({
  type: 'Lab_UPDATE_CART',
  payload: data,
});

export const deletedCart = data => ({
  type: 'CART_DELETE',
  payload: data,
});

export const successOrder = data => ({
  type: 'ORDER_CREATED',
  payload: data,
});
