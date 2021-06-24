import {
  CATEGORY_LIST_GET_LIST,
  CATEGORY_LIST_GET_LIST_SUCCESS,
  CATEGORY_LIST_GET_LIST_ERROR,
  CATEGORY_LIST_ADD_ITEM,
  CATEGORY_LIST_ADD_ITEM_SUCCESS,
  CATEGORY_LIST_ADD_ITEM_ERROR,
  CATEGORY_DELETE_ITEM,
  CATEGORY_DELETE_ITEM_SUCCESS,
  CATEGORY_DELETE_ITEM_ERROR,
  CATEGORY_UPDATE_ITEM,
  CATEGORY_UPDATE_ITEM_SUCCESS,
  CATEGORY_UPDATE_ITEM_ERROR

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


export const deleteCategoryItem = (item) => ({
  type: CATEGORY_DELETE_ITEM,
  payload: item
})

export const deleteCategoryItemSuccess = (item) => ({
  type: CATEGORY_DELETE_ITEM_SUCCESS,
  payload: item
})

export const deleteCategoryItemError = (error) => ({
  type: CATEGORY_DELETE_ITEM_ERROR,
  payload: error,
})


export const updateCategoryItem = (item) => ({
  type: CATEGORY_UPDATE_ITEM,
  payload: item
})

export const updateCategoryItemSuccess = (item) => ({
  type: CATEGORY_UPDATE_ITEM_SUCCESS,
  payload: item
})

export const updateCategoryItemError = (error) => ({
  type: CATEGORY_UPDATE_ITEM_ERROR,
  payload: error,
})