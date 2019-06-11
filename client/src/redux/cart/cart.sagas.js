import { all, call, takeLatest, put, select } from 'redux-saga/effects';

import { getCartRefFromUserId } from '../../firebase/firebase.utils';

import UserActionTypes from '../user/user.types';
import { selectCurrentUser } from '../user/user.selectors';
import {
  clearCart,
  updateCartStart,
  updateCartFailure,
  updateCartSuccess,
  fetchCartStart,
  fetchCartSuccess,
  fetchCartFailure
} from './cart.actions';
import CartActionTypes from './cart.types';
import { selectCartItems } from './cart.selectors';

export function* fetchCartAsync() {
  const currentUser = yield select(selectCurrentUser);
  try {
    const cartRef = yield getCartRefFromUserId(currentUser.id);
    const cartSnapshot = yield cartRef.get();
    yield put(fetchCartSuccess(cartSnapshot.data().cartItems));
  } catch (error) {
    yield put(fetchCartFailure(error));
  }
}

export function* updateCartOnFirebase() {
  const currentUser = yield select(selectCurrentUser);
  if (!currentUser) return;

  const newCartItems = yield select(selectCartItems);
  try {
    const cartRef = yield getCartRefFromUserId(currentUser.id);
    yield cartRef.update({ cartItems: newCartItems });
    yield put(updateCartSuccess());
  } catch (error) {
    yield put(updateCartFailure(error));
  }
}

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* onSignInSuccess() {
  yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, function*() {
    yield put(fetchCartStart());
  });
}

export function* onFetchCartStart() {
  yield takeLatest(CartActionTypes.FETCH_CART_START, fetchCartAsync);
}

export function* onUpdateCartStart() {
  yield takeLatest(CartActionTypes.UPDATE_CART_START, updateCartOnFirebase);
}

export function* onCartAction() {
  yield takeLatest(
    [
      CartActionTypes.ADD_ITEM,
      CartActionTypes.REMOVE_ITEM,
      CartActionTypes.CLEAR_ITEM_FROM_CART,
      CartActionTypes.CLEAR_CART
    ],
    function*() {
      yield put(updateCartStart());
    }
  );
}

export function* cartSagas() {
  yield all([
    call(onSignOutSuccess),
    call(onCartAction),
    call(onSignInSuccess),
    call(onFetchCartStart),
    call(onUpdateCartStart)
  ]);
}
