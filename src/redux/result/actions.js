import {
  RESULT_LIST_GET_LIST,
  RESULT_LIST_GET_LIST_SUCCESS,
  RESULT_LIST_GET_LIST_ERROR,
  RESULT_LIST_GET_ITEM,
  RESULT_LIST_GET_ITEM_SUCCESS,
  RESULT_LIST_GET_ITEM_ERROR,
  RESULT_LIST_UPDATE_RESULT,
  RESULT_LIST_UPDATE_RESULT_SUCCESS,
  RESULT_LIST_UPDATE_RESULT_ERROR,
} from '../actions';

export const getResultList = (payload) => ({
  type: RESULT_LIST_GET_LIST,
  payload,
});

export const getResultListSuccess = (items) => ({
  type: RESULT_LIST_GET_LIST_SUCCESS,
  payload: items,
});

export const getResultListError = (error) => ({
  type: RESULT_LIST_GET_LIST_ERROR,
  payload: error,
});

export const getResultItem = (payload) => ({
  type: RESULT_LIST_GET_ITEM,
  payload,
});

export const getResultItemSuccess = (item) => ({
  type: RESULT_LIST_GET_ITEM_SUCCESS,
  payload: item,
});

export const getResultItemError = (error) => ({
  type: RESULT_LIST_GET_ITEM_ERROR,
  payload: error,
});

export const updateResultItem = (payload) => ({
  type: RESULT_LIST_UPDATE_RESULT,
  payload: payload,
});

export const updateResultItemSuccess = (item) => ({
  type: RESULT_LIST_UPDATE_RESULT_SUCCESS,
  payload: item,
});

export const updateResultItemError = (error) => ({
  type: RESULT_LIST_UPDATE_RESULT_ERROR,
  payload: error,
});
