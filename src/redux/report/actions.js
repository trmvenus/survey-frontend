import { 
  REPORT_LIST_GET_ITEM, 
  REPORT_LIST_GET_ITEM_ERROR, 
  REPORT_LIST_GET_ITEM_SUCCESS, 
  REPORT_LIST_GET_LIST, 
  REPORT_LIST_GET_LIST_ERROR, 
  REPORT_LIST_GET_LIST_SUCCESS, 
  REPORT_LIST_UPDATE_ITEM, 
  REPORT_LIST_UPDATE_ITEM_ERROR, 
  REPORT_LIST_UPDATE_ITEM_SUCCESS,
  REPORT_LIST_ADD_ITEM,
  REPORT_LIST_ADD_ITEM_ERROR,
  REPORT_LIST_ADD_ITEM_SUCCESS,
} from '../actions';

export const getReportList = (payload) => ({
  type: REPORT_LIST_GET_LIST,
  payload,
});

export const getReportListSuccess = (items) => ({
  type: REPORT_LIST_GET_LIST_SUCCESS,
  payload: items,
});

export const getReportListError = (error) => ({
  type: REPORT_LIST_GET_LIST_ERROR,
  payload: error,
});

export const getReportItem = (payload) => ({
  type: REPORT_LIST_GET_ITEM,
  payload,
});

export const getReportItemSuccess = (item) => ({
  type: REPORT_LIST_GET_ITEM_SUCCESS,
  payload: item,
});

export const getReportItemError = (error) => ({
  type: REPORT_LIST_GET_ITEM_ERROR,
  payload: error,
});

export const addReportItem = (item) => ({
  type: REPORT_LIST_ADD_ITEM,
  payload: item,
});

export const addReportItemSuccess = (item) => ({
  type: REPORT_LIST_ADD_ITEM_SUCCESS,
  payload: item,
});

export const addReportItemError = (error) => ({
  type: REPORT_LIST_ADD_ITEM_ERROR,
  payload: error,
});

export const updateReportItem = (payload) => ({
  type: REPORT_LIST_UPDATE_ITEM,
  payload: payload,
});

export const updateReportItemSuccess = (item) => ({
  type: REPORT_LIST_UPDATE_ITEM_SUCCESS,
  payload: item,
});

export const updateReportItemError = (error) => ({
  type: REPORT_LIST_UPDATE_ITEM_ERROR,
  payload: error,
});
