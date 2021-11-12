import authSaga from 'features/auth/authSaga';
import productSaga from 'features/product/productSaga';
import { all } from 'redux-saga/effects';
export default function* rootSaga() {
  yield all([productSaga(), authSaga()]);
}
