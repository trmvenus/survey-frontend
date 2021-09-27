import {
  DASHBOARD_GET_MY_INFO,
  DASHBOARD_GET_MY_INFO_SUCCESS,
  DASHBOARD_GET_MY_INFO_ERROR,
  DASHBOARD_GET_TOTAL_INFO,
  DASHBOARD_GET_TOTAL_INFO_ERROR,
  DASHBOARD_GET_TOTAL_INFO_SUCCESS
} from '../actions';

const INIT_STATE = {
  totalInfo: null,
  myInfo: null,
  error: '',
  isLoaded: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case DASHBOARD_GET_MY_INFO:
      return { ...state, isLoaded: false };
    case DASHBOARD_GET_MY_INFO_SUCCESS:
      return { ...state, isLoaded: true, myInfo: action.payload, };
    case DASHBOARD_GET_MY_INFO_ERROR:
      return { ...state, isLoaded: true, error: action.payload };

    case DASHBOARD_GET_TOTAL_INFO:
      return { ...state, isLoaded: false };
    case DASHBOARD_GET_TOTAL_INFO_SUCCESS:
      return { ...state, isLoaded: true, totalInfo: action.payload, };
    case DASHBOARD_GET_TOTAL_INFO_ERROR:
      return { ...state, isLoaded: true, error: action.payload };

    default:
      return { ...state };
  }
};
