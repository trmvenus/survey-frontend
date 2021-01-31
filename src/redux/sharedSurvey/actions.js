import {
  SHARED_SURVEY_LIST_GET_LIST,
  SHARED_SURVEY_LIST_GET_LIST_SUCCESS,
  SHARED_SURVEY_LIST_GET_LIST_ERROR,
  SHARED_SURVEY_LIST_GET_LIST_WITH_FILTER,
  SHARED_SURVEY_LIST_GET_LIST_WITH_ORDER,
  SHARED_SURVEY_LIST_GET_LIST_SEARCH,
  SHARED_SURVEY_LIST_ADD_ITEM,
  SHARED_SURVEY_LIST_ADD_ITEM_SUCCESS,
  SHARED_SURVEY_LIST_ADD_ITEM_ERROR,
  SHARED_SURVEY_LIST_SELECTED_ITEMS_CHANGE,
  SHARED_SURVEY_LIST_DELETE_ITEMS,
  SHARED_SURVEY_LIST_DELETE_ITEMS_SUCCESS,
  SHARED_SURVEY_LIST_DELETE_ITEMS_ERROR,
  SHARED_SURVEY_LIST_COPY_ITEMS,
  SHARED_SURVEY_LIST_COPY_ITEMS_SUCCESS,
  SHARED_SURVEY_LIST_COPY_ITEMS_ERROR,
  SHARED_SURVEY_LIST_SHARE_ITEM,
  SHARED_SURVEY_LIST_SHARE_ITEM_SUCCESS,
  SHARED_SURVEY_LIST_SHARE_ITEM_ERROR,
} from '../actions';

export const getSharedSurveyList = () => ({
  type: SHARED_SURVEY_LIST_GET_LIST,
});

export const getSharedSurveyListSuccess = (items) => ({
  type: SHARED_SURVEY_LIST_GET_LIST_SUCCESS,
  payload: items,
});

export const getSharedSurveyListError = (error) => ({
  type: SHARED_SURVEY_LIST_GET_LIST_ERROR,
  payload: error,
});

export const getSharedSurveyListWithFilter = (column, value) => ({
  type: SHARED_SURVEY_LIST_GET_LIST_WITH_FILTER,
  payload: { column, value },
});

export const getSharedSurveyListWithOrder = (column) => ({
  type: SHARED_SURVEY_LIST_GET_LIST_WITH_ORDER,
  payload: column,
});

export const getSharedSurveyListSearch = (keyword) => ({
  type: SHARED_SURVEY_LIST_GET_LIST_SEARCH,
  payload: keyword,
});

export const addSharedSurveyItem = (item) => ({
  type: SHARED_SURVEY_LIST_ADD_ITEM,
  payload: item,
});

export const addSharedSurveyItemSuccess = (item) => ({
  type: SHARED_SURVEY_LIST_ADD_ITEM_SUCCESS,
  payload: item,
});

export const addSharedSurveyItemError = (error) => ({
  type: SHARED_SURVEY_LIST_ADD_ITEM_ERROR,
  payload: error,
});

export const selectedSharedSurveyItemsChange = (selectedItems) => ({
  type: SHARED_SURVEY_LIST_SELECTED_ITEMS_CHANGE,
  payload: selectedItems,
});

export const deleteSharedSurveyItems = (items) => ({
  type: SHARED_SURVEY_LIST_DELETE_ITEMS,
  payload: items
});

export const deleteSharedSurveyItemsSuccess = () => ({
  type: SHARED_SURVEY_LIST_DELETE_ITEMS_SUCCESS,
});

export const deleteSharedSurveyItemsError = (error) => ({
  type: SHARED_SURVEY_LIST_DELETE_ITEMS_ERROR,
  payload: error,
});

export const copySharedSurveyItems = (items) => ({
  type: SHARED_SURVEY_LIST_COPY_ITEMS,
  payload: items
});

export const copySharedSurveyItemsSuccess = (items) => ({
  type: SHARED_SURVEY_LIST_COPY_ITEMS_SUCCESS,
  payload: items,
});

export const copySharedSurveyItemsError = (error) => ({
  type: SHARED_SURVEY_LIST_COPY_ITEMS_ERROR,
  payload: error,
});

export const shareSharedSurveyItem = (payload) => ({
  type: SHARED_SURVEY_LIST_SHARE_ITEM,
  payload: payload,
});

export const shareSharedSurveyItemSuccess = (item) => ({
  type: SHARED_SURVEY_LIST_SHARE_ITEM_SUCCESS,
  payload: item,
});

export const shareSharedSurveyItemError = (error) => ({
  type: SHARED_SURVEY_LIST_SHARE_ITEM_ERROR,
  payload: error,
});