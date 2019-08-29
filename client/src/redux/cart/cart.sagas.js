import { all, call, takeLatest, put, select } from 'redux-saga/effects';

import { firestore } from '../../firebase/firebase.utils';
import UserActionTypes from '../user/user.types';
import { selectCurrentUser } from '../user/user.selectors';
import CartActionTypes from '../cart/cart.types';
import { selectCartItems } from './cart.selectors';
import { clearCart } from './cart.actions';

export function* createReceipt({ payload }) {
  try {
    const docRef = yield firestore.collection('receipts').doc();
    const cartItems = yield select(selectCartItems);
    const currentUser = yield select(selectCurrentUser);

    console.log(docRef);
    console.log({
      price: payload,
      user: currentUser,
      cartItems: cartItems
    });
    docRef.set({
      price: payload,
      user: currentUser,
      cartItems: cartItems
    });
  } catch (error) {
    console.log(error);
  }
}

export function* onPaymentSuccess() {
  yield takeLatest(CartActionTypes.PAYMENT_SUCCESFUL, createReceipt);
}

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* cartSagas() {
  yield all([call(onSignOutSuccess), call(onPaymentSuccess)]);
}
