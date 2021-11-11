import authSaga from 'features/auth/authSaga';
import productSaga from 'features/product/productSage';
import { all } from 'redux-saga/effects';
export default function* rootSaga() {
  yield all([productSaga(), authSaga()]);
}
