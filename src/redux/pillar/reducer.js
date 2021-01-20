import {
  PILLAR_LIST_GET_LIST,
  PILLAR_LIST_GET_LIST_SUCCESS,
  PILLAR_LIST_GET_LIST_ERROR,
  PILLAR_LIST_ADD_ITEM,
  PILLAR_LIST_ADD_ITEM_SUCCESS,
  PILLAR_LIST_ADD_ITEM_ERROR,
} from '../actions';

const INIT_STATE = {
  pillarItems: [],
  error: '',
  loading: false,
  saving: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case PILLAR_LIST_GET_LIST:
      return { ...state, loading: false };
    case PILLAR_LIST_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: true,
        pillarItems: action.payload,
      };
    case PILLAR_LIST_GET_LIST_ERROR:
      return { ...state, loading: true, error: action.payload };

    case PILLAR_LIST_ADD_ITEM:
      return { ...state, saving: true, };
    case PILLAR_LIST_ADD_ITEM_SUCCESS:
      return {
        ... state,
        saving: false,
        pillarItems: [...state.pillarItems, action.payload],
      };
    case PILLAR_LIST_ADD_ITEM_ERROR:
      return { ...state, saving: false, error: action.payload };

    default:
      return { ...state };
  }
};
