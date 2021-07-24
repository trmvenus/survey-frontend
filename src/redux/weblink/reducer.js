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
  WEB_LINK_LIST_DELETE_ITEM_SUCCESS,
  WEB_LINK_LIST_DELETE_ITEM_ERROR,
} from '../actions';

const INIT_STATE = {
  webLinkItems: [],
  webLinksTotalResponses:{},
  weblinksCompletedResponse:{},
  isLoaded: false,
  isSaved: false,
  error: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case WEB_LINK_LIST_GET_LIST:
      return { ...state, isLoaded: false, };
    case WEB_LINK_LIST_GET_LIST_SUCCESS:
      return { ...state, isLoaded: true, webLinkItems: action.payload.webLinks,webLinksTotalResponses:action.payload.webLinksTotalResponses,weblinksCompletedResponse:action.payload.weblinksCompletedResponse };
    case WEB_LINK_LIST_GET_LIST_ERROR:
      return { ...state, isLoaded: true, error: action.payload, };

    case WEB_LINK_LIST_ADD_ITEM:
      return { ...state, isSaved: false, };
    case WEB_LINK_LIST_ADD_ITEM_SUCCESS:
      return {
        ... state,
        isSaved: true,
        webLinkItems: [...state.webLinkItems, action.payload],
      };
    case WEB_LINK_LIST_ADD_ITEM_ERROR:
      return { ...state, isSaved: true, error: action.payload };


    case WEB_LINK_LIST_UPDATE_ITEM:
      return { ...state, isSaved: false };
    case WEB_LINK_LIST_UPDATE_ITEM_SUCCESS:
      return { ...state, isSaved: true, reportItem: action.payload, };
    case WEB_LINK_LIST_UPDATE_ITEM_ERROR:
      return { ...state, isSaved: true, error: action.payload };


    case WEB_LINK_LIST_DELETE_ITEM:
      return { ...state, };
    case WEB_LINK_LIST_DELETE_ITEM_SUCCESS:
      return { 
        ...state, 
        webLinkItems: state.webLinkItems.filter(item => item.id !== action.payload.id),
      };
    case WEB_LINK_LIST_DELETE_ITEM_ERROR:
      return { ...state, error: action.payload, };


    default:
      return { ...state };
  }
};
