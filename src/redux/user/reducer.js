import {
  USER_GET_LIST,
  USER_GET_LIST_SUCCESS,
  USER_GET_LIST_ERROR,
  USER_GET_LIST_WITH_FILTER,
  USER_ADD,
  USER_ADD_SUCCESS,
  USER_ADD_ERROR,
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
    case USER_GET_LIST:
      return { ...state, loading: false };

    case USER_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: true,
        users: action.payload.data,
        totalCount: action.payload.totalCount,
        totalPage: action.payload.totalPage,
      };

    case USER_GET_LIST_ERROR:
      return { ...state, loading: true, error: action.payload };

    case USER_GET_LIST_WITH_FILTER:
      if (action.payload.column === '' || action.payload.value === '') {
        return {
          ...state,
          loading: true,
          users: action.payload,
        };
      }

    case USER_ADD:
      return { ...state, loading: false };

    case USER_ADD_SUCCESS:
      console.log('new user => ');
      console.log(action.payload);
      return {
        ...state,
        loading: true, 
        users: [action.payload, ...state.users]
      };

    case USER_ADD_ERROR:
      return { ...state, loading: true, error: action.payload };

    default:
      return { ...state };
  }
};
