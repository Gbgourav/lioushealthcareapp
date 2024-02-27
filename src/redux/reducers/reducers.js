const initialState = {
  count: 0,
  usertype: null,
  user: null,
  token: null,
  loading: true,
  cart: {
    product_name: null,
    product_count: null,
    price: 0,
  },
  lab_cart: {
    product_name: null,
    product_count: null,
    price: 0,
  },
  order_created: {
    open: false,
    data: null,
  },
  cart_delete: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USERTYPE':
      return {...state, usertype: action.payload};
    case 'SET_USER_DETAILS':
      return {...state, token: action.payload};
    case 'GET_USER_DETAILS':
      return {...state, user: action.payload};
    case 'SAT_LOADING':
      return {...state, loading: action.payload};
    case 'UPDATE_CART':
      return {...state, cart: action.payload};
    case 'ORDER_CREATED':
      return {...state, order_created: action.payload};
    case 'CART_DELETE':
      return {...state, cart_delete: action.payload};
    case 'LAB_UPDATE_CART':
      return {...state, lab_cart: action.payload};
    case 'PROFILE_COMPLETED':
      return {
        ...state,
        user: {
          ...state.user,
          is_profile_completed: action.payload,
        },
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
