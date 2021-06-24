import {
  CATEGORY_LIST_GET_LIST,
  CATEGORY_LIST_GET_LIST_SUCCESS,
  CATEGORY_LIST_GET_LIST_ERROR,
  CATEGORY_LIST_ADD_ITEM,
  CATEGORY_LIST_ADD_ITEM_SUCCESS,
  CATEGORY_LIST_ADD_ITEM_ERROR,
  CATEGORY_DELETE_ITEM,
  CATEGORY_DELETE_ITEM_SUCCESS,
  CATEGORY_DELETE_ITEM_ERROR,
  CATEGORY_UPDATE_ITEM,
  CATEGORY_UPDATE_ITEM_SUCCESS,
  CATEGORY_UPDATE_ITEM_ERROR
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
    
    case CATEGORY_DELETE_ITEM:
      return { ...state, };
    case CATEGORY_DELETE_ITEM_SUCCESS:
      return {
        ...state, 
        categoryItems: [...state.categoryItems.filter(item => item.id!= action.payload.id) ]
      };
    case CATEGORY_DELETE_ITEM_ERROR:
      return { ...state, error: action.payload };
    case CATEGORY_UPDATE_ITEM:
      return { ...state };
    case CATEGORY_UPDATE_ITEM_SUCCESS:
      let objIndex = state.categoryItems.findIndex((obj => obj.id == action.payload.id));
      state.categoryItems[objIndex].name= action.payload.name
      return {
        ...state,
        categoryItems: [...state.categoryItems]
      };
    case CATEGORY_LIST_GET_LIST_ERROR:
      return {
        ...state,
        error: action.payload
      }

    default:
      return { ...state };
  }
};
