import {
  REPORT_LIST_GET_ITEM,
  REPORT_LIST_GET_ITEM_ERROR,
  REPORT_LIST_GET_ITEM_SUCCESS,
  REPORT_LIST_GET_LIST,
  REPORT_LIST_GET_LIST_SUCCESS,
  REPORT_LIST_UPDATE_ITEM,
  REPORT_LIST_UPDATE_ITEM_ERROR,
  REPORT_LIST_UPDATE_ITEM_SUCCESS,
  REPORT_LIST_ADD_ITEM,
  REPORT_LIST_ADD_ITEM_ERROR,
  REPORT_LIST_ADD_ITEM_SUCCESS,
} from '../actions';

const INIT_STATE = {
  reportItems: [],
  reportItem: null,
  loading: true,
  saving: false,
  error: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case REPORT_LIST_GET_LIST:
      return { ...state, loading: true, };
    case REPORT_LIST_GET_LIST_SUCCESS:
      return { ...state, loading: false, reportItems: action.payload, };
    case REPORT_LIST_GET_ITEM_ERROR:
      return { ...state, loading: false, error: action.payload, };

    case REPORT_LIST_GET_ITEM:
      return { ...state, loading: true, };
    case REPORT_LIST_GET_ITEM_SUCCESS:
      return { ...state, loading: false, reportItem: action.payload, };
    case REPORT_LIST_GET_ITEM_ERROR:
      return { ...state, loading: false, error: action.payload, };


    case REPORT_LIST_UPDATE_ITEM:
      return { ...state, saving: true };
    case REPORT_LIST_UPDATE_ITEM_SUCCESS:
      return { ...state, saving: false };
    case REPORT_LIST_UPDATE_ITEM_ERROR:
      return { ...state, saving: false, error: action.payload };

    case REPORT_LIST_ADD_ITEM:
      return { ...state, saving: true, };
    case REPORT_LIST_ADD_ITEM_SUCCESS:
      return {
        ... state,
        saving: false,
        reportItems: [action.payload, ...state.reportItems],
      };
    case REPORT_LIST_ADD_ITEM_ERROR:
      return { ...state, saving: false, error: action.payload };

    default:
      return { ...state };
  }
};
