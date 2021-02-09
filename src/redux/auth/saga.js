import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { client } from '../../helpers/client';
import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  GET_CURRENT_USER,
  UPDATE_USER_PROFILE,
  GET_ADDITIONAL_USER_INFO,
  UPDATE_PASSWORD,
} from '../actions';

import {
  loginUserSuccess,
  loginUserError,
  registerUserSuccess,
  registerUserError,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordSuccess,
  resetPasswordError,
  getCurrentUserSuccess,
  getCurrentUserError,
  getAdditionalUserInfoSuccess,
  getAdditionalUserInfoError,
  updatePasswordSuccess,
  updatePasswordError,
  updateUserProfileError,
  updateUserProfileSuccess,
} from './actions';

import { adminRoot } from "../../constants/defaultValues"
import { setCurrentUser, getCurrentUser as getCurrentUserFromLocalStorage } from '../../helpers/Utils';

export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

const loginWithEmailPasswordAsync = async (email, password) => 
  await client
    .get(`/auth/login?email=${email}&password=${password}`)
    .then((user) => user.data)
    .catch((error) => {throw error.response.data})


function* loginWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const loginUser = yield call(loginWithEmailPasswordAsync, email, password);
    if (!loginUser.message) {
      const item = { ...loginUser.user };
      
      setCurrentUser(item);
      yield put(loginUserSuccess(item));
      history.push(adminRoot);
    } else {
      yield put(loginUserError(loginUser.message));
    }
  } catch (error) {
    yield put(loginUserError(error));
  }
}

export function* watchRegisterUser() {
  yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

const registerWithEmailPasswordAsync = async (name, email, password) =>
  await client
    .post('/auth/signup', {name, email, password})
    .then((user) => user.data)
    .catch((error) => {throw error.response.data});

function* registerWithEmailPassword({ payload }) {
  const { name, email, password } = payload.user;
  const { history } = payload;
  try {
    const registerUser = yield call(
      registerWithEmailPasswordAsync,
      name,
      email,
      password
    );
    if (!registerUser.message) {
      const item = { ...registerUser.user };
      setCurrentUser(item);
      yield put(registerUserSuccess(item));
      history.push(adminRoot);
    } else {
      yield put(registerUserError(registerUser.message));
    }
  } catch (error) {
    yield put(registerUserError(error));
  }
}

export function* watchLogoutUser() {
  yield takeEvery(LOGOUT_USER, logout);
}

function* logout({ payload }) {
  const { history } = payload;
  setCurrentUser();
  history.push('/user/login');
}

export function* watchForgotPassword() {
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

const forgotPasswordAsync = async (email) => 
  await client
    .get(`/auth/forgot-password?email=${email}`)
    .then((res) => res.data)
    .catch((error) => {throw error.response.data});

function* forgotPassword({ payload }) {
  const { email } = payload.forgotUserMail;
  try {
    const forgotPasswordStatus = yield call(forgotPasswordAsync, email);
    if (!forgotPasswordStatus) {
      yield put(forgotPasswordSuccess('success'));
    } else {
      yield put(forgotPasswordError(forgotPasswordStatus.message));
    }
  } catch (error) {
    yield put(forgotPasswordError(error));
  }
}

export function* watchResetPassword() {
  yield takeEvery(RESET_PASSWORD, resetPassword);
}

const resetPasswordAsync = async (resetPasswordCode, newPassword) => {
  return await client
    .post('/auth/reset-password', {resetPasswordCode, newPassword})
    .then((res) => res.data)
    .catch((error) => {throw error.response.data});
};

function* resetPassword({ payload }) {
  const { newPassword, resetPasswordCode } = payload;
  try {
    const resetPasswordStatus = yield call(
      resetPasswordAsync,
      resetPasswordCode,
      newPassword
    );
    if (!resetPasswordStatus) {
      yield put(resetPasswordSuccess('success'));
    } else {
      yield put(resetPasswordError(resetPasswordStatus.message));
    }
  } catch (error) {
    yield put(resetPasswordError(error));
  }
}


export function* watchGetCurrentUser() {
  yield takeEvery(GET_CURRENT_USER, getCurrentUser);
}

const getCurrentUserAsync = async () => 
  await client
    .get('/auth/me')
    .then(res => res.data)
    .catch(error => {throw error.response.data});


function* getCurrentUser() {
  try {
    const user = yield call(getCurrentUserAsync);
    setCurrentUser(user);
    yield put(getCurrentUserSuccess(user));
  } catch (error) {
    yield put(getCurrentUserError(error));
  }
}


export function* watchGetAdditionalUserInfo() {
  yield takeEvery(GET_ADDITIONAL_USER_INFO, getAdditionalUserInfo);
}

const getAdditionalUserInfoAsync = async (payload) =>
  await client
    .get('/auth/me/profile', payload)
    .then(res => res.data)
    .catch(error => {throw error.response.data});

function* getAdditionalUserInfo({payload}) {
  try {
    const additionalInfo = yield call(getAdditionalUserInfoAsync, payload);
    yield put(getAdditionalUserInfoSuccess(additionalInfo));
  } catch (error) {
    yield put(getAdditionalUserInfoError(error));
  }
}


export function* watchUpdateUserProfile() {
  yield takeEvery(UPDATE_USER_PROFILE, updateUserProfile);
}

const updateUserProfileAsync = async (payload) => 
  await client 
    .put('/auth/me', payload)
    .then(res => res.data)
    .catch(error => {throw error.response.data});

function* updateUserProfile({payload}) {
  try {
    const user = yield call(updateUserProfileAsync, payload);
    setCurrentUser({...getCurrentUserFromLocalStorage(), name: user.name});
    yield put(updateUserProfileSuccess(user));
  } catch (error) {
    yield put(updateUserProfileError(error));
  }
}


export function* watchUpdatePassword() {
  yield takeEvery(UPDATE_PASSWORD, updatePassword);
}

const updatePasswordRequest = async (password) => 
  await client 
    .put('/auth/password', {password})
    .then(res => res.data)
    .catch(error => {throw error.response.data});

function* updatePassword({payload}) {
  try {
    const {password} = payload;
    const user = yield call(updatePasswordRequest, password);
    setCurrentUser({...getCurrentUserFromLocalStorage(), password: user.password});
    yield put(updatePasswordSuccess(user));
  } catch (error) {
    yield put(updatePasswordError(error));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
    fork(watchForgotPassword),
    fork(watchResetPassword),
    fork(watchGetCurrentUser),
    fork(watchGetAdditionalUserInfo),
    fork(watchUpdateUserProfile),
    fork(watchUpdatePassword),
  ]);
}
