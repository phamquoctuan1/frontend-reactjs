import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import authReducer from 'features/auth/authSlice';
import cartReducer from 'features/cart/cartItemsSlice';
import productReducer from 'features/product/productSlice';
import createSagaMiddleware from 'redux-saga';
import { history } from 'utils';
import rootSaga from './rootSaga';

const rootReducer = combineReducers({
  router: connectRouter(history),
  product: productReducer,
  auth: authReducer,
  cart: cartReducer,
});
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
});
sagaMiddleware.run(rootSaga);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
