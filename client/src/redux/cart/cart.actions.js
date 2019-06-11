import CartActionTypes from './cart.types';

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN
});

export const addItem = item => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item
});

export const removeItem = item => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: item
});

export const clearItemFromCart = item => ({
  type: CartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: item
});

export const clearCart = () => ({
  type: CartActionTypes.CLEAR_CART
});

export const updateCartStart = () => ({
  type: CartActionTypes.UPDATE_CART_START
});

export const updateCartSuccess = () => ({
  type: CartActionTypes.UPDATE_CART_SUCCESS
});

export const updateCartFailure = error => ({
  type: CartActionTypes.UPDATE_CART_FAILURE,
  payload: error
});

export const fetchCartStart = () => ({
  type: CartActionTypes.FETCH_CART_START
});

export const fetchCartSuccess = cartItems => ({
  type: CartActionTypes.FETCH_CART_SUCCESS,
  payload: cartItems
});
export const fetchCartFailure = error => ({
  type: CartActionTypes.FETCH_CART_START,
  payload: error
});
