import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { client } from '../../helpers/client';

import { CATEGORY_LIST_GET_LIST, CATEGORY_LIST_ADD_ITEM } from '../actions';

import {
  getCategoryListSuccess,
  getCategoryListError,
  addCategoryItemSuccess,
  addCategoryItemError,
} from './actions';

const getCategoryListRequest = async () => {
  return await client
    .get('/category')
    .then((user) => user.data)
    .catch((error) => {throw error});
}


function* getCategoryListItems() {
  try {
    const response = yield call(getCategoryListRequest);
    yield put(getCategoryListSuccess(response));
  } catch (error) {
    yield put(getCategoryListError(error));
  }
}

const addCategoryItemRequest = async (item) => 
  await client
    .post('/category', item)
    .then((user) => user.data)
    .catch((error) => {throw error});


function* addCategoryItem({ payload }) {
  try {
    const response = yield call(addCategoryItemRequest, payload);
    yield put(addCategoryItemSuccess(response));
  } catch (error) {
    yield put(addCategoryItemError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(CATEGORY_LIST_GET_LIST, getCategoryListItems);
}

export function* watchAddItem() {
  yield takeEvery(CATEGORY_LIST_ADD_ITEM, addCategoryItem);
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(watchAddItem)]);
}
