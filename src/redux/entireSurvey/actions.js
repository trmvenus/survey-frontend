import {
  ENTIRE_SURVEY_LIST_GET_LIST,
  ENTIRE_SURVEY_LIST_GET_LIST_SUCCESS,
  ENTIRE_SURVEY_LIST_GET_LIST_ERROR,
  ENTIRE_SURVEY_LIST_GET_LIST_WITH_FILTER,
  ENTIRE_SURVEY_LIST_GET_LIST_WITH_ORDER,
  ENTIRE_SURVEY_LIST_GET_LIST_SEARCH,
  ENTIRE_SURVEY_LIST_SELECTED_ITEMS_CHANGE,
  ENTIRE_SURVEY_LIST_DELETE_ITEMS,
  ENTIRE_SURVEY_LIST_DELETE_ITEMS_SUCCESS,
  ENTIRE_SURVEY_LIST_DELETE_ITEMS_ERROR,
  ENTIRE_SURVEY_LIST_COPY_ITEMS,
  ENTIRE_SURVEY_LIST_COPY_ITEMS_SUCCESS,
  ENTIRE_SURVEY_LIST_COPY_ITEMS_ERROR,
  ENTIRE_SURVEY_LIST_SHARE_ITEM,
  ENTIRE_SURVEY_LIST_SHARE_ITEM_SUCCESS,
  ENTIRE_SURVEY_LIST_SHARE_ITEM_ERROR,
  ENTIRE_SURVEY_LIST_ACTIVE_ITEM,
  ENTIRE_SURVEY_LIST_ACTIVE_ITEM_SUCCESS,
  ENTIRE_SURVEY_LIST_ACTIVE_ITEM_ERROR,
  ENTIRE_SURVEY_LIST_SET_MULTI_RESPONSES_ITEM,
  ENTIRE_SURVEY_LIST_SET_MULTI_RESPONSES_ITEM_SUCCESS,
  ENTIRE_SURVEY_LIST_SET_MULTI_RESPONSES_ITEM_ERROR,
} from '../actions';

export const getEntireSurveyList = () => ({
  type: ENTIRE_SURVEY_LIST_GET_LIST,
});

export const getEntireSurveyListSuccess = (items) => ({
  type: ENTIRE_SURVEY_LIST_GET_LIST_SUCCESS,
  payload: items,
});

export const getEntireSurveyListError = (error) => ({
  type: ENTIRE_SURVEY_LIST_GET_LIST_ERROR,
  payload: error,
});

export const getEntireSurveyListWithFilter = (column, value) => ({
  type: ENTIRE_SURVEY_LIST_GET_LIST_WITH_FILTER,
  payload: { column, value },
});

export const getEntireSurveyListWithOrder = (column) => ({
  type: ENTIRE_SURVEY_LIST_GET_LIST_WITH_ORDER,
  payload: column,
});

export const getEntireSurveyListSearch = (keyword) => ({
  type: ENTIRE_SURVEY_LIST_GET_LIST_SEARCH,
  payload: keyword,
});

export const selectedEntireSurveyItemsChange = (selectedItems) => ({
  type: ENTIRE_SURVEY_LIST_SELECTED_ITEMS_CHANGE,
  payload: selectedItems,
});

export const deleteEntireSurveyItems = (items) => ({
  type: ENTIRE_SURVEY_LIST_DELETE_ITEMS,
  payload: items
});

export const deleteEntireSurveyItemsSuccess = () => ({
  type: ENTIRE_SURVEY_LIST_DELETE_ITEMS_SUCCESS,
});

export const deleteEntireSurveyItemsError = (error) => ({
  type: ENTIRE_SURVEY_LIST_DELETE_ITEMS_ERROR,
  payload: error,
});

export const copyEntireSurveyItems = (items) => ({
  type: ENTIRE_SURVEY_LIST_COPY_ITEMS,
  payload: items
});

export const copyEntireSurveyItemsSuccess = (items) => ({
  type: ENTIRE_SURVEY_LIST_COPY_ITEMS_SUCCESS,
  payload: items,
});

export const copyEntireSurveyItemsError = (error) => ({
  type: ENTIRE_SURVEY_LIST_COPY_ITEMS_ERROR,
  payload: error,
});

export const shareEntireSurveyItem = (payload) => ({
  type: ENTIRE_SURVEY_LIST_SHARE_ITEM,
  payload: payload,
});

export const shareEntireSurveyItemSuccess = (item) => ({
  type: ENTIRE_SURVEY_LIST_SHARE_ITEM_SUCCESS,
  payload: item,
});

export const shareEntireSurveyItemError = (error) => ({
  type: ENTIRE_SURVEY_LIST_SHARE_ITEM_ERROR,
  payload: error,
});

export const activeEntireSurveyItem = (payload) => ({
  type: ENTIRE_SURVEY_LIST_ACTIVE_ITEM,
  payload: payload,
});

export const activeEntireSurveyItemSuccess = (item) => ({
  type: ENTIRE_SURVEY_LIST_ACTIVE_ITEM_SUCCESS,
  payload: item,
});

export const activeEntireSurveyItemError = (error) => ({
  type: ENTIRE_SURVEY_LIST_ACTIVE_ITEM_ERROR,
  payload: error,
});

export const setMultiResponsesEntireSurveyItem = (payload) => ({
  type: ENTIRE_SURVEY_LIST_SET_MULTI_RESPONSES_ITEM,
  payload: payload,
});

export const setMultiResponsesEntireSurveyItemSuccess = (item) => ({
  type: ENTIRE_SURVEY_LIST_SET_MULTI_RESPONSES_ITEM_SUCCESS,
  payload: item,
});

export const setMultiResponsesEntireSurveyItemError = (error) => ({
  type: ENTIRE_SURVEY_LIST_SET_MULTI_RESPONSES_ITEM_ERROR,
  payload: error,
});