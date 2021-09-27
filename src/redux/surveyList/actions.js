import {
  SURVEY_LIST_GET_TOTAL,
  SURVEY_LIST_GET_TOTAL_ERROR,
  SURVEY_LIST_GET_TOTAL_SUCCESS,
  SURVEY_LIST_GET_LIST,
  SURVEY_LIST_GET_LIST_SUCCESS,
  SURVEY_LIST_GET_LIST_ERROR,
  SURVEY_LIST_GET_LIST_WITH_FILTER,
  SURVEY_LIST_GET_LIST_WITH_ORDER,
  SURVEY_LIST_GET_LIST_SEARCH,
  SURVEY_LIST_ADD_ITEM,
  SURVEY_LIST_ADD_ITEM_SUCCESS,
  SURVEY_LIST_ADD_ITEM_ERROR,
  SURVEY_LIST_SELECTED_ITEMS_CHANGE,
  SURVEY_LIST_DELETE_ITEMS,
  SURVEY_LIST_DELETE_ITEMS_SUCCESS,
  SURVEY_LIST_DELETE_ITEMS_ERROR,
  SURVEY_LIST_COPY_ITEMS,
  SURVEY_LIST_COPY_ITEMS_SUCCESS,
  SURVEY_LIST_COPY_ITEMS_ERROR,
  SURVEY_LIST_SHARE_ITEM,
  SURVEY_LIST_SHARE_ITEM_SUCCESS,
  SURVEY_LIST_SHARE_ITEM_ERROR,
  SURVEY_LIST_ACTIVE_ITEM,
  SURVEY_LIST_ACTIVE_ITEM_SUCCESS,
  SURVEY_LIST_ACTIVE_ITEM_ERROR,
  SURVEY_LIST_SET_MULTI_RESPONSES_ITEM,
  SURVEY_LIST_SET_MULTI_RESPONSES_ITEM_SUCCESS,
  SURVEY_LIST_SET_MULTI_RESPONSES_ITEM_ERROR,

  SURVEY_STYLE_UPDATE_ITEM,
  SURVEY_STYLE_UPDATE_ITEM_SUCCESS,
  SURVEY_STYLE_UPDATE_ITEM_ERROR
} from '../actions';

export const getSurveyList = () => ({
  type: SURVEY_LIST_GET_LIST,
});

export const getSurveyListSuccess = (items) => ({
  type: SURVEY_LIST_GET_LIST_SUCCESS,
  payload: items,
});

export const getSurveyListError = (error) => ({
  type: SURVEY_LIST_GET_LIST_ERROR,
  payload: error,
});

export const getSurveyTotalList = () => ({
  type: SURVEY_LIST_GET_TOTAL,
});

export const getSurveyTotalListSuccess = (items) => ({
  type: SURVEY_LIST_GET_TOTAL_SUCCESS,
  payload: items,
});

export const getSurveyTotalListError = (error) => ({
  type: SURVEY_LIST_GET_TOTAL_ERROR,
  payload: error,
});

export const getSurveyListWithFilter = (column, value) => ({
  type: SURVEY_LIST_GET_LIST_WITH_FILTER,
  payload: { column, value },
});

export const getSurveyListWithOrder = (column) => ({
  type: SURVEY_LIST_GET_LIST_WITH_ORDER,
  payload: column,
});

export const getSurveyListSearch = (keyword) => ({
  type: SURVEY_LIST_GET_LIST_SEARCH,
  payload: keyword,
});

export const addSurveyItem = (item) => ({
  type: SURVEY_LIST_ADD_ITEM,
  payload: item,
});

export const addSurveyItemSuccess = (item) => ({
  type: SURVEY_LIST_ADD_ITEM_SUCCESS,
  payload: item,
});

export const addSurveyItemError = (error) => ({
  type: SURVEY_LIST_ADD_ITEM_ERROR,
  payload: error,
});

export const selectedSurveyItemsChange = (selectedItems) => ({
  type: SURVEY_LIST_SELECTED_ITEMS_CHANGE,
  payload: selectedItems,
});

export const deleteSurveyItems = (items) => ({
  type: SURVEY_LIST_DELETE_ITEMS,
  payload: items
});

export const deleteSurveyItemsSuccess = () => ({
  type: SURVEY_LIST_DELETE_ITEMS_SUCCESS,
});

export const deleteSurveyItemsError = (error) => ({
  type: SURVEY_LIST_DELETE_ITEMS_ERROR,
  payload: error,
});

export const copySurveyItems = (items) => ({
  type: SURVEY_LIST_COPY_ITEMS,
  payload: items
});

export const copySurveyItemsSuccess = (items) => ({
  type: SURVEY_LIST_COPY_ITEMS_SUCCESS,
  payload: items,
});

export const copySurveyItemsError = (error) => ({
  type: SURVEY_LIST_COPY_ITEMS_ERROR,
  payload: error,
});

export const shareSurveyItem = (payload) => ({
  type: SURVEY_LIST_SHARE_ITEM,
  payload: payload,
});


export const shareSurveyItemSuccess = (item) => ({
  type: SURVEY_LIST_SHARE_ITEM_SUCCESS,
  payload: item,
});

export const shareSurveyItemError = (error) => ({
  type: SURVEY_LIST_SHARE_ITEM_ERROR,
  payload: error,
});


export const changeStyleSurveyItem = (payload) => ({
  type: SURVEY_STYLE_UPDATE_ITEM,
  payload: payload
})

export const changeStyleSurveyItem_Success = (payload) => ({
  type: SURVEY_STYLE_UPDATE_ITEM_SUCCESS,
  payload: payload
})
export const changeStyleSurveyItem_Error = (payload) => ({
  type: SURVEY_STYLE_UPDATE_ITEM_ERROR,
  payload: payload
})

export const activeSurveyItem = (payload) => ({
  type: SURVEY_LIST_ACTIVE_ITEM,
  payload: payload,
});

export const activeSurveyItemSuccess = (item) => ({
  type: SURVEY_LIST_ACTIVE_ITEM_SUCCESS,
  payload: item,
});

export const activeSurveyItemError = (error) => ({
  type: SURVEY_LIST_ACTIVE_ITEM_ERROR,
  payload: error,
});

export const setMultiResponsesSurveyItem = (payload) => ({
  type: SURVEY_LIST_SET_MULTI_RESPONSES_ITEM,
  payload: payload,
});

export const setMultiResponsesSurveyItemSuccess = (item) => ({
  type: SURVEY_LIST_SET_MULTI_RESPONSES_ITEM_SUCCESS,
  payload: item,
});

export const setMultiResponsesSurveyItemError = (error) => ({
  type: SURVEY_LIST_SET_MULTI_RESPONSES_ITEM_ERROR,
  payload: error,
});