import { 
  WEB_LINK_LIST_GET_LIST, 
  WEB_LINK_LIST_GET_LIST_ERROR, 
  WEB_LINK_LIST_GET_LIST_SUCCESS, 
  WEB_LINK_LIST_UPDATE_ITEM, 
  WEB_LINK_LIST_UPDATE_ITEM_ERROR, 
  WEB_LINK_LIST_UPDATE_ITEM_SUCCESS,
  WEB_LINK_LIST_ADD_ITEM,
  WEB_LINK_LIST_ADD_ITEM_ERROR,
  WEB_LINK_LIST_ADD_ITEM_SUCCESS,
  WEB_LINK_LIST_DELETE_ITEM,
  WEB_LINK_LIST_DELETE_ITEM_ERROR,
  WEB_LINK_LIST_DELETE_ITEM_SUCCESS,
} from '../actions';

export const getWebLinkList = (payload) => ({
  type: WEB_LINK_LIST_GET_LIST,
  payload,
});

export const getWebLinkListSuccess = (items) => ({
  type: WEB_LINK_LIST_GET_LIST_SUCCESS,
  payload: items,
});

export const getWebLinkListError = (error) => ({
  type: WEB_LINK_LIST_GET_LIST_ERROR,
  payload: error,
});

export const addWebLinkItem = (item) => ({
  type: WEB_LINK_LIST_ADD_ITEM,
  payload: item,
});

export const addWebLinkItemSuccess = (item) => ({
  type: WEB_LINK_LIST_ADD_ITEM_SUCCESS,
  payload: item,
});

export const addWebLinkItemError = (error) => ({
  type: WEB_LINK_LIST_ADD_ITEM_ERROR,
  payload: error,
});

export const updateWebLinkItem = (id, item) => ({
  type: WEB_LINK_LIST_UPDATE_ITEM,
  payload: {id, item},
});

export const updateWebLinkItemSuccess = (item) => ({
  type: WEB_LINK_LIST_UPDATE_ITEM_SUCCESS,
  payload: item,
});

export const updateWebLinkItemError = (error) => ({
  type: WEB_LINK_LIST_UPDATE_ITEM_ERROR,
  payload: error,
});

export const deleteWebLinkItem = (id) => ({
  type: WEB_LINK_LIST_DELETE_ITEM,
  payload: id,
});

export const deleteWebLinkItemSuccess = (id) => ({
  type: WEB_LINK_LIST_DELETE_ITEM_SUCCESS,
  payload: id,
});

export const deleteWebLinkItemError = (error) => ({
  type: WEB_LINK_LIST_DELETE_ITEM_ERROR,
  payload: error,
});
