import { 
  REPORT_LIST_GET_ITEM, 
  REPORT_LIST_GET_ITEM_ERROR, 
  REPORT_LIST_GET_ITEM_SUCCESS, 
  REPORT_LIST_GET_ITEM_SHARE,
  REPORT_LIST_GET_LIST, 
  REPORT_LIST_GET_LIST_ERROR, 
  REPORT_LIST_GET_LIST_SUCCESS, 
  REPORT_LIST_UPDATE_ITEM, 
  REPORT_LIST_UPDATE_ITEM_ERROR, 
  REPORT_LIST_UPDATE_ITEM_SUCCESS,
  REPORT_LIST_ADD_ITEM,
  REPORT_LIST_ADD_ITEM_ERROR,
  REPORT_LIST_ADD_ITEM_SUCCESS,
  REPORT_LIST_DELETE_ITEM,
  REPORT_LIST_DELETE_ITEM_ERROR,
  REPORT_LIST_DELETE_ITEM_SUCCESS,
  REPORT_LIST_ADD_SECTION,
  REPORT_LIST_UPDATE_SECTION,
  REPORT_LIST_CHANGE_SAVING,
  REPORT_LIST_RESET_SHARE_LINK,
  REPORT_LIST_RESET_SHARE_LINK_SUCCESS,
  REPORT_LIST_RESET_SHARE_LINK_ERROR,
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

export const getReportItemShare = (payload) => ({
  type: REPORT_LIST_GET_ITEM_SHARE,
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

export const updateReportItem = payload => ({
  type: REPORT_LIST_UPDATE_ITEM,
  payload,
});

export const updateReportItemSuccess = (item) => ({
  type: REPORT_LIST_UPDATE_ITEM_SUCCESS,
  payload: item,
});

export const updateReportItemError = (error) => ({
  type: REPORT_LIST_UPDATE_ITEM_ERROR,
  payload: error,
});

export const deleteReportItem = (id) => ({
  type: REPORT_LIST_DELETE_ITEM,
  payload: {id},
});

export const deleteReportItemSuccess = (id) => ({
  type: REPORT_LIST_DELETE_ITEM_SUCCESS,
  payload: id,
});

export const deleteReportItemError = (error) => ({
  type: REPORT_LIST_DELETE_ITEM_ERROR,
  payload: error,
});

export const addReportSection = (section) => ({
  type: REPORT_LIST_ADD_SECTION,
  payload: section,
});

export const updateReportSection = (section) => ({
  type: REPORT_LIST_UPDATE_SECTION,
  payload: section,
});

export const resetReportShareLink = (id) => ({
  type: REPORT_LIST_RESET_SHARE_LINK,
  payload: id,
});

export const resetReportShareLinkSuccess = (item) => ({
  type: REPORT_LIST_RESET_SHARE_LINK_SUCCESS,
  payload: item
});

export const resetReportShareLinkError = (error) => ({
  type: REPORT_LIST_RESET_SHARE_LINK_ERROR,
  payload: error, 
});

export const changeReportItemSavingStatus = (status) => ({
  type: REPORT_LIST_CHANGE_SAVING,
  payload: status,
});