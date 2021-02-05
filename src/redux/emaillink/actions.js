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
  EMAIL_LINK_LIST_GET_ITEM,
  EMAIL_LINK_LIST_GET_ITEM_SUCCESS,
  EMAIL_LINK_LIST_GET_ITEM_ERROR,
  EMAIL_LINK_LIST_SEND_EMAIL_CONTACT,
  EMAIL_LINK_LIST_SEND_EMAIL_CONTACT_SUCCESS,
  EMAIL_LINK_LIST_SEND_EMAIL_CONTACT_ERROR,
  EMAIL_LINK_LIST_CHECK_EMAIL_INVITED,
  EMAIL_LINK_LIST_CHECK_EMAIL_INVITED_SUCCESS,
  EMAIL_LINK_LIST_CHECK_EMAIL_INVITED_ERROR,
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

export const getEmailLinkItem = (id) => ({
  type: EMAIL_LINK_LIST_GET_ITEM,
  payload: {id},
});

export const getEmailLinkItemSuccess = (payload) => ({
  type: EMAIL_LINK_LIST_GET_ITEM_SUCCESS,
  payload,
});

export const getEmailLinkItemError = (payload) => ({
  type: EMAIL_LINK_LIST_GET_ITEM_ERROR,
  payload,
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

export const sendEmailContact = (id, email) => ({
  type: EMAIL_LINK_LIST_SEND_EMAIL_CONTACT,
  payload: {id, email}
});

export const sendEmailContactSuccess = (payload) => ({
  type: EMAIL_LINK_LIST_SEND_EMAIL_CONTACT_SUCCESS,
  payload,
});

export const sendEmailContactError = (error) => ({
  type: EMAIL_LINK_LIST_SEND_EMAIL_CONTACT_ERROR,
  payload: error,
});

export const checkIfEmailIsInvited = (link_id, email) => ({
  type: EMAIL_LINK_LIST_CHECK_EMAIL_INVITED,
  payload: {link_id, email},
});

export const checkIfEmailIsInvitedSuccess = (payload) => ({
  type: EMAIL_LINK_LIST_CHECK_EMAIL_INVITED_SUCCESS,
  payload,
});

export const checkIfEmailIsInvitedError = (error) => ({
  type: EMAIL_LINK_LIST_CHECK_EMAIL_INVITED_ERROR,
  payload: error,
})