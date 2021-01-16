import {
  RESULT_LIST_GET_LIST,
  RESULT_LIST_GET_LIST_SUCCESS,
  RESULT_LIST_GET_LIST_ERROR,
  RESULT_LIST_UPDATE_RESULT,
  RESULT_LIST_UPDATE_RESULT_SUCCESS,
  RESULT_LIST_UPDATE_RESULT_ERROR,
  RESULT_LIST_GET_ITEM,
  RESULT_LIST_GET_ITEM_SUCCESS,
  RESULT_LIST_GET_ITEM_ERROR,
} from '../actions';

const INIT_STATE = {
  resultItems: [],
  resultItem: null,
  loading: true,
  saving: false,
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
    case RESULT_LIST_GET_ITEM_SUCCESS:
      return { ...state, loading: false, resultItem: action.payload, };
    case RESULT_LIST_GET_ITEM_ERROR:
      return { ...state, loading: false, error: action.payload, };


    case RESULT_LIST_UPDATE_RESULT:
      return { ...state, saving: true };

    case RESULT_LIST_UPDATE_RESULT_SUCCESS:
      return { ...state, saving: false };

    case RESULT_LIST_UPDATE_RESULT_ERROR:
      return { ...state, saving: false, error: action.payload };

    default:
      return { ...state };
  }
};
