import {
  RESULT_LIST_GET_LIST,
  RESULT_LIST_GET_LIST_SUCCESS,
  RESULT_LIST_GET_LIST_ERROR,
  RESULT_LIST_UPDATE_ITEM,
  RESULT_LIST_UPDATE_ITEM_SUCCESS,
  RESULT_LIST_UPDATE_ITEM_ERROR,
  RESULT_LIST_GET_ITEM,
  RESULT_LIST_GET_ITEM_SUCCESS,
  RESULT_LIST_GET_ITEM_ERROR,
  IS_COMPLETE_UPDATE,
  RESULT_LIST_POST_ITEM,
  RESULT_LIST_POST_ITEM_SUCCESS,
  RESULT_LIST_POST_ITEM_ERROR,
  RESULT_LIST_GET_ITEM_BY_WEB_LINK_AND_NAME,
} from '../actions';

const INIT_STATE = {
  resultItems: [],
  resultItem: null,
  loading: true,
  saving: false,
  isCompleted: false,
  error: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case RESULT_LIST_GET_LIST:
      return { ...state, loading: true, };

    case RESULT_LIST_GET_LIST_SUCCESS:
      return { ...state, loading: false, resultItems: action.payload, };

    case RESULT_LIST_GET_LIST_ERROR:
      return { ...state, loading: false, error: action.payload, };

    case RESULT_LIST_GET_ITEM:
      return { ...state, loading: true, };
    case RESULT_LIST_GET_ITEM_BY_WEB_LINK_AND_NAME:
      return { ...state, loading: true, }
    case RESULT_LIST_GET_ITEM_SUCCESS:
      return { ...state, loading: false, resultItem: action.payload, };
    case RESULT_LIST_GET_ITEM_ERROR:
      return { ...state, loading: false, error: action.payload, };


    case RESULT_LIST_POST_ITEM:
      return { ...state, };
    case RESULT_LIST_POST_ITEM_SUCCESS:
      return { ...state, resultItem: action.payload };
    case RESULT_LIST_POST_ITEM_ERROR:
      return { ...state, error: action.payload };

    case IS_COMPLETE_UPDATE:
      return {...state, isCompleted: action.payload.isCompleted}

    case RESULT_LIST_UPDATE_ITEM:
      return { ...state, saving: true };

    case RESULT_LIST_UPDATE_ITEM_SUCCESS:
      return { ...state, saving: false ,isCompleted:true};

    case RESULT_LIST_UPDATE_ITEM_ERROR:
      return { ...state, saving: false, error: action.payload ,isCompleted:true};

    default:
      return { ...state };
  }
};
