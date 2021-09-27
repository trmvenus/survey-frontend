import {
  PILLAR_LIST_GET_LIST,
  PILLAR_LIST_GET_LIST_SUCCESS,
  PILLAR_LIST_GET_LIST_ERROR,
  PILLAR_LIST_ADD_ITEM,
  PILLAR_LIST_ADD_ITEM_SUCCESS,
  PILLAR_LIST_ADD_ITEM_ERROR,
  PILLAR_LIST_DELETE_ITEMS,
  PILLAR_LIST_DELETE_ITEMS_SUCCESS,
  PILLAR_LIST_DELETE_ITEMS_ERROR,
  PILLAR_LIST_UPDATE_ITEM,
  PILLAR_LIST_UPDATE_ITEM_SUCCESS,
  PILLAR_LIST_UPDATE_ITEM_ERROR
} from '../actions';

const INIT_STATE = {
  filterPillars: [],
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


    case PILLAR_LIST_DELETE_ITEMS_SUCCESS:
      const ids = action.payload.map(item => item.id);
      return {
        ...state,
        pillarItems: state.pillarItems.filter(item => !ids.includes(item.id))
      }
    case PILLAR_LIST_DELETE_ITEMS_ERROR:
     return {
      ...state, error: action.payload,
     }
    case PILLAR_LIST_DELETE_ITEMS: 
     return{
       ...state
     }


    case PILLAR_LIST_UPDATE_ITEM:
       return {
         ...state, loading:false
       }
    case PILLAR_LIST_UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        pillarItems: state.pillarItems.map(pillar =>
          pillar.id === action.payload.id ? action.payload : pillar
        ),
        loading: true
      };
    case PILLAR_LIST_UPDATE_ITEM_ERROR:
      return {
        ...state,
        loading:true,
        error:action.payload
      }
    default:
      return { ...state };
  }
};
