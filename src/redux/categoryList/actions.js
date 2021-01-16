import {
  CATEGORY_LIST_GET_LIST,
  CATEGORY_LIST_GET_LIST_SUCCESS,
  CATEGORY_LIST_GET_LIST_ERROR,
  CATEGORY_LIST_ADD_ITEM,
  CATEGORY_LIST_ADD_ITEM_SUCCESS,
  CATEGORY_LIST_ADD_ITEM_ERROR,
} from '../actions';

export const getCategoryList = () => ({
  type: CATEGORY_LIST_GET_LIST,
});

export const getCategoryListSuccess = (items) => ({
  type: CATEGORY_LIST_GET_LIST_SUCCESS,
  payload: items,
});

export const getCategoryListError = (error) => ({
  type: CATEGORY_LIST_GET_LIST_ERROR,
  payload: error,
});

export const addCategoryItem = (item) => ({
  type: CATEGORY_LIST_ADD_ITEM,
  payload: item,
});

export const addCategoryItemSuccess = (item) => ({
  type: CATEGORY_LIST_ADD_ITEM_SUCCESS,
  payload: item,
});

export const addCategoryItemError = (error) => ({
  type: CATEGORY_LIST_ADD_ITEM_ERROR,
  payload: error,
});
