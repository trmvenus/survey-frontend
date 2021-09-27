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
  EMAIL_LINK_LIST_DELETE_ITEM_SUCCESS,
  EMAIL_LINK_LIST_DELETE_ITEM_ERROR,
  EMAIL_LINK_LIST_SEND_EMAIL,
  EMAIL_LINK_LIST_SEND_EMAIL_ERROR,
  EMAIL_LINK_LIST_SEND_EMAIL_SUCCESS,
  EMAIL_LINK_LIST_GET_ITEM,
  EMAIL_LINK_LIST_GET_ITEM_SUCCESS,
  EMAIL_LINK_LIST_GET_ITEM_ERROR,
  EMAIL_LINK_LIST_SEND_EMAIL_CONTACT,
  EMAIL_LINK_LIST_SEND_EMAIL_CONTACT_SUCCESS,
  EMAIL_LINK_LIST_SEND_EMAIL_CONTACT_ERROR,
  EMAIL_LINK_LIST_CHECK_EMAIL_INVITED,
  EMAIL_LINK_LIST_CHECK_EMAIL_INVITED_SUCCESS,
  EMAIL_LINK_LIST_CHECK_EMAIL_INVITED_ERROR,
  CONTACT_ADD_ITEM,
  CONTACT_ADD_ITEM_ERROR,
  CONTACT_ADD_ITEM_SUCCESS,
  CONTACT_DELETE_ITEM_SUCCESS,
  CONTACT_DELETE_ITEM,
  CONTACT_DELETE_ITEM_ERROR,
  CONTACT_UPDATE_ITEM,
  CONTACT_UPDATE_ITEM_SUCCESS,
  CONTACT_UPDATE_ITEM_ERROR
} from '../actions';

const INIT_STATE = {
  emailLinkItems: [],
  emailLinkItem: null,
  emailLinksCompletedResponse:{},
  emailLinksTotalResponses:{},
  emailContact: null,
  isLoaded: false,
  isLoadedItem: false,
  isSaved: false,
  isSending: false,
  sendingSuccess: false,
  error: '',
  contactError:''
};
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case EMAIL_LINK_LIST_GET_LIST:
      return { ...state, isLoaded: false, };
    case EMAIL_LINK_LIST_GET_LIST_SUCCESS:
      return { ...state, isLoaded: true, emailLinkItems: action.payload.emailLinks,emailLinksCompletedResponse:action.payload.emailLinksCompletedResponse,emailLinksTotalResponses:action.payload.emailLinksTotalResponses};
    case EMAIL_LINK_LIST_GET_LIST_ERROR:
      return { ...state, isLoaded: true, error: action.payload, };

    case EMAIL_LINK_LIST_GET_ITEM:
      return { ...state, isLoadedItem: false, };
    case EMAIL_LINK_LIST_GET_ITEM_SUCCESS:
      return { ...state, isLoadedItem: true, emailLinkItem: action.payload,contactError:'' };
    case EMAIL_LINK_LIST_GET_ITEM_ERROR:
      return { ...state, isLoadedItem: true, error: action.payload, };

    case EMAIL_LINK_LIST_ADD_ITEM:
      return { ...state, isSaved: false, };
    case EMAIL_LINK_LIST_ADD_ITEM_SUCCESS:
      return {
        ... state,
        isSaved: true,
        emailLinkItems: [...state.emailLinkItems, action.payload],
      };
    case EMAIL_LINK_LIST_ADD_ITEM_ERROR:
      return { ...state, isSaved: true, error: action.payload };


    case EMAIL_LINK_LIST_UPDATE_ITEM:
      return { ...state, isSaved: false };
    case EMAIL_LINK_LIST_UPDATE_ITEM_SUCCESS:
      return { ...state, isSaved: true, reportItem: action.payload, };
    case EMAIL_LINK_LIST_UPDATE_ITEM_ERROR:
      return { ...state, isSaved: true, error: action.payload };


    case EMAIL_LINK_LIST_DELETE_ITEM:
      return { ...state, };
    case EMAIL_LINK_LIST_DELETE_ITEM_SUCCESS:
      return { 
        ...state, 
        emailLinkItems: state.emailLinkItems.filter(item => item.id !== action.payload.id),
      };
    case EMAIL_LINK_LIST_DELETE_ITEM_ERROR:
      return { ...state, error: action.payload, };


    case EMAIL_LINK_LIST_SEND_EMAIL:
      return { ...state, isSending: true};
    case EMAIL_LINK_LIST_SEND_EMAIL_SUCCESS:
      return { 
        ...state, 
        isSending: false,
        sendingSuccess: true, 
        emailLinkItems: state.emailLinkItems.map(item => item.id === action.payload.id ? {...item, is_sent: true} : item)
      };
    case EMAIL_LINK_LIST_SEND_EMAIL_ERROR:
      return { ...state, error: action.payload, sendingSuccess: false, isSending: false };


    case EMAIL_LINK_LIST_SEND_EMAIL_CONTACT:
      return { ...state, isSending: true, };
    case EMAIL_LINK_LIST_SEND_EMAIL_CONTACT_SUCCESS:
      return { 
        ...state, 
        emailLinkItem: {
          ...state.emailLinkItem,
          contacts: state.emailLinkItem.contacts.map(item => item.id === action.payload.id ? action.payload : item),
        },
        isSending: false, 
      };
    case EMAIL_LINK_LIST_SEND_EMAIL_CONTACT_ERROR:
      return { ...state, error: action.payload, isSending: false, };

    case EMAIL_LINK_LIST_CHECK_EMAIL_INVITED:
      return { ...state, emailContact: null };
    case EMAIL_LINK_LIST_CHECK_EMAIL_INVITED_SUCCESS:
      return { ...state, emailContact: action.payload, };
    case EMAIL_LINK_LIST_CHECK_EMAIL_INVITED_ERROR:
      return { ...state, error: action.payload };
    case CONTACT_ADD_ITEM:
      return { ...state, emailContact:null};
    case CONTACT_ADD_ITEM_SUCCESS:
      return { ...state, emailContact: action.payload};
    case CONTACT_ADD_ITEM_ERROR:
      return { ...state, contactError: action.payload};
    case CONTACT_UPDATE_ITEM:
      return {...state, emailContact:null}
    case CONTACT_UPDATE_ITEM_SUCCESS:
      return {...state, emailContact: action.payload}
    case CONTACT_UPDATE_ITEM_ERROR:
      return {...state, contactError: action.payload}
    case CONTACT_DELETE_ITEM:
      return {...state, emailContact: null};
    case CONTACT_DELETE_ITEM_SUCCESS:
      return {...state, emailContact: action.payload};
    case CONTACT_DELETE_ITEM_ERROR:
      return { ...state, contactError: action.payload}
    default:
      return { ...state, };
  }
};
