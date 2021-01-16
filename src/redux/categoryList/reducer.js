import {
  CATEGORY_LIST_GET_LIST,
  CATEGORY_LIST_GET_LIST_SUCCESS,
  CATEGORY_LIST_GET_LIST_ERROR,
  CATEGORY_LIST_ADD_ITEM,
  CATEGORY_LIST_ADD_ITEM_SUCCESS,
  CATEGORY_LIST_ADD_ITEM_ERROR,
} from '../actions';

const INIT_STATE = {
  categoryItems: [],
  error: '',
  loading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CATEGORY_LIST_GET_LIST:
      return { ...state, loading: false };

    case CATEGORY_LIST_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: true,
        categoryItems: action.payload,
      };

    case CATEGORY_LIST_GET_LIST_ERROR:
      return { ...state, loading: true, error: action.payload };

    case CATEGORY_LIST_ADD_ITEM:
      return { ...state, };

    case CATEGORY_LIST_ADD_ITEM_SUCCESS:
      return {
        ... state,
        categoryItems: [...state.categoryItems, action.payload],
      };

    case CATEGORY_LIST_ADD_ITEM_ERROR:
      return { ...state, error: action.payload };

    default:
      return { ...state };
  }
};
