import { 
  EMAIL_LINK_LIST_GET_LIST, 
  EMAIL_LINK_LIST_GET_LIST_ERROR, 
  EMAIL_LINK_LIST_GET_LIST_SUCCESS, 
  EMAIL_LINK_LIST_UPDATE_ITEM, 
  EMAIL_LINK_LIST_UPDATE_ITEM_ERROR, 
  EMAIL_LINK_LIST_UPDATE_ITEM_SUCCESS,
  EMAIL_LINK_LIST_ADD_ITEM,
  EMAIL_LINK_LIST_ADD_ITEM_ERROR,
  EMAIL_LINK_LIST_ADD_ITEM_SUCCESS,
  EMAIL_LINK_LIST_DELETE_ITEM,
  EMAIL_LINK_LIST_DELETE_ITEM_ERROR,
  EMAIL_LINK_LIST_DELETE_ITEM_SUCCESS,
  EMAIL_LINK_LIST_SEND_EMAIL,
  EMAIL_LINK_LIST_SEND_EMAIL_SUCCESS,
  EMAIL_LINK_LIST_SEND_EMAIL_ERROR,
} from '../actions';

export const getEmailLinkList = (payload) => ({
  type: EMAIL_LINK_LIST_GET_LIST,
  payload,
});

export const getEmailLinkListSuccess = (items) => ({
  type: EMAIL_LINK_LIST_GET_LIST_SUCCESS,
  payload: items,
});

export const getEmailLinkListError = (error) => ({
  type: EMAIL_LINK_LIST_GET_LIST_ERROR,
  payload: error,
});

export const addEmailLinkItem = (item) => ({
  type: EMAIL_LINK_LIST_ADD_ITEM,
  payload: item,
});

export const addEmailLinkItemSuccess = (item) => ({
  type: EMAIL_LINK_LIST_ADD_ITEM_SUCCESS,
  payload: item,
});

export const addEmailLinkItemError = (error) => ({
  type: EMAIL_LINK_LIST_ADD_ITEM_ERROR,
  payload: error,
});

export const updateEmailLinkItem = (id, item) => ({
  type: EMAIL_LINK_LIST_UPDATE_ITEM,
  payload: {id, item},
});

export const updateEmailLinkItemSuccess = (item) => ({
  type: EMAIL_LINK_LIST_UPDATE_ITEM_SUCCESS,
  payload: item,
});

export const updateEmailLinkItemError = (error) => ({
  type: EMAIL_LINK_LIST_UPDATE_ITEM_ERROR,
  payload: error,
});

export const deleteEmailLinkItem = (id) => ({
  type: EMAIL_LINK_LIST_DELETE_ITEM,
  payload: id,
});

export const deleteEmailLinkItemSuccess = (id) => ({
  type: EMAIL_LINK_LIST_DELETE_ITEM_SUCCESS,
  payload: id,
});

export const deleteEmailLinkItemError = (error) => ({
  type: EMAIL_LINK_LIST_DELETE_ITEM_ERROR,
  payload: error,
});

export const sendEmailLink = (id) => ({
  type: EMAIL_LINK_LIST_SEND_EMAIL,
  payload: id
});

export const sendEmailLinkSuccess = (payload) => ({
  type: EMAIL_LINK_LIST_SEND_EMAIL_SUCCESS,
  payload,
});

export const sendEmailLinkError = (error) => ({
  type: EMAIL_LINK_LIST_SEND_EMAIL_ERROR,
  payload: error,
});
