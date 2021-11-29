import { call, delay, fork, put, spawn, take } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { push } from 'connected-react-router';
import { User } from 'models';
import { UserRespone, UserResponeGoogle } from 'models/common';
import authApi from '../../api/authApi';
import { authActions, LoginGooglePayload, LoginPayload } from './authSlice';
function* handleLogin(payload: LoginPayload) {
  try {
    const resToken: UserRespone = yield call(authApi.login, payload);
    if (resToken) {
      localStorage.setItem(
        'access_token',
        JSON.stringify(resToken.accessToken)
      );
      localStorage.setItem(
        'refresh_token',
        JSON.stringify(resToken.refreshToken)
      );
      const resUser: User = yield call(authApi.getUser, resToken.accessToken);
      yield put(authActions.getUserSuccess(resUser));
      yield put(authActions.loginSuccess(resUser));
      yield put(push('/'));
    }
  } catch (error) {
    let msg = (error as AxiosError).response?.data.message;
    yield put(authActions.loginFailed(msg));
  }
}
function* handleLoginGoole(payload: LoginGooglePayload) {
  try {
    const res: UserResponeGoogle = yield call(authApi.loginGoogle, payload);
    if (res) {
      localStorage.setItem('access_token', JSON.stringify(res.token));
      const currentUser = {
        id: res.data.id,
        name: res.data.name,
        email: res.data.email,
        picture: res.data.picture,
        phone: res.data.phone,
        address: res.data.address,
      };
      yield put(authActions.loginSuccess(currentUser));
      yield put(push('/'));
    }
  } catch (error) {
    let msg = (error as AxiosError).response?.data.message;
    yield put(authActions.loginFailed(msg));
  }
}
function* getUser(payload: string) {
  const resUser: User = yield call(authApi.getUser, payload);
  if (resUser) yield put(authActions.getUserSuccess(resUser));
  else {
    yield fork(handleLogout);
  }
  // else {
  //   const response: UserRespone = yield call(authApi.refreshToken, {
  //     token: payload,
  //   });
  //   localStorage.setItem('access_token', JSON.stringify(response.accessToken));
  // }
}
function* handleLogout() {
  yield localStorage.removeItem('access_token');
  yield localStorage.removeItem('refresh_token');
  yield put(push('/'));
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(
        authActions.login.type
      );
      yield fork(handleLogin, action.payload);
    } else {
      yield take(authActions.logout.type);
      yield fork(handleLogout);
    }
    yield delay(1000);
  }
}

function* watchLoginGoogleFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    if (!isLoggedIn) {
      const actionGoole: PayloadAction<LoginGooglePayload> = yield take(
        authActions.loginGoogle.type
      );
      yield fork(handleLoginGoole, actionGoole.payload);
    } else {
      yield take(authActions.logout.type);
      yield call(handleLogout);
    }
    yield delay(1000);
  }
}

function* watchGetUser() {
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));
  if (isLoggedIn) {
    const action: PayloadAction<string> = yield take(authActions.getUser.type);
    yield fork(getUser, action.payload);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
  yield fork(watchLoginGoogleFlow);
  yield spawn(watchGetUser);
}
