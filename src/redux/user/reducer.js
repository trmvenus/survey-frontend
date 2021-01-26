import {
  USER_LIST_GET_LIST,
  USER_LIST_GET_LIST_SUCCESS,
  USER_LIST_GET_LIST_ERROR,
  USER_LIST_ADD_ITEM,
  USER_LIST_ADD_ITEM_SUCCESS,
  USER_LIST_ADD_ITEM_ERROR,
  USER_LIST_DELETE_ITEMS,
  USER_LIST_DELETE_ITEMS_SUCCESS,
  USER_LIST_DELETE_ITEMS_ERROR,
  USER_LIST_CHANGE_ORGANIZATION,
  USER_LIST_CHANGE_ORGANIZATION_SUCCESS,
  USER_LIST_CHANGE_ORGANIZATION_ERROR,
} from '../actions';

const INIT_STATE = {
  users: [],
  error: '',
  totalPage: 1,
  totalCount: 0,
  filter: null,
  searchKeyword: '',
  orderColumn: null,
  loading: false,
  orderColumns: [
    { column: 'name', label: 'Name' },
    { column: 'category', label: 'Category' },
    { column: 'responses', label: 'Responses' },
  ],
  selectedUsers: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case USER_LIST_GET_LIST:
      return { ...state, loading: false };
    case USER_LIST_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: true,
        users: action.payload.data,
        totalCount: action.payload.totalCount,
        totalPage: action.payload.totalPage,
      };
    case USER_LIST_GET_LIST_ERROR:
      return { ...state, loading: true, error: action.payload };


    case USER_LIST_ADD_ITEM:
      return { ...state, loading: false };
    case USER_LIST_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: true, 
        users: [action.payload, ...state.users]
      };
    case USER_LIST_ADD_ITEM_ERROR:
      return { ...state, loading: true, error: action.payload };

    case USER_LIST_DELETE_ITEMS:
      return { ...state };
    case USER_LIST_DELETE_ITEMS_SUCCESS:
      const ids = action.payload.map(item => item.id);
      return {
        ...state,
        users: state.users.filter(item => !ids.includes(item.id))
      }
    case USER_LIST_DELETE_ITEMS_ERROR:
      return { ...state, error: action.payload, };

    case USER_LIST_CHANGE_ORGANIZATION:
      return { ...state, };
    case USER_LIST_CHANGE_ORGANIZATION_SUCCESS:
      console.log(action.payload);
      return { 
        ...state, 
        users: state.users.map(user => 
          user.id === action.payload.id ? {
            ...user, organization_id: action.payload.organization_id, organization_name: action.payload.organization_name
          } : user
        ),
      };
    case USER_LIST_CHANGE_ORGANIZATION_ERROR:
      return { ...state, error: action.payload }

    default:
      return { ...state };
  }
};
