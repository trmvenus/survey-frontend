import {
  ORGANIZATION_LIST_GET_LIST,
  ORGANIZATION_LIST_GET_LIST_SUCCESS,
  ORGANIZATION_LIST_GET_LIST_ERROR,
  ORGANIZATION_LIST_ADD_ITEM,
  ORGANIZATION_LIST_ADD_ITEM_SUCCESS,
  ORGANIZATION_LIST_ADD_ITEM_ERROR,
  ORGANIZATION_LIST_DELETE_ITEMS_SUCCESS,
  ORGANIZATION_LIST_DELETE_ITEMS,
  ORGANIZATION_LIST_DELETE_ITEMS_ERROR,
  ORGANIZATION_LIST_GET_LIST_FILTER,
} from '../actions';

const INIT_STATE = {
  allOrganizations: [],
  organizations: [],
  error: '',
  totalPage: 1,
  totalCount: 0,
  isLoaded: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ORGANIZATION_LIST_GET_LIST:
      return { ...state, isLoaded: false };
    case ORGANIZATION_LIST_GET_LIST_SUCCESS:
      return {
        ...state, 
        isLoaded: true,
        allOrganizations: action.payload,
      };
    case ORGANIZATION_LIST_GET_LIST_ERROR:
      return { ...state, isLoaded: true, error: action.payload };

    case ORGANIZATION_LIST_GET_LIST_FILTER:
    {
      const {pageSize, currentPage, orderBy, search} = action.payload;

      const filteredItems = state.allOrganizations.filter(organization => organization.name.toLowerCase().includes(search.toLowerCase()) === true);

      filteredItems.sort((a, b) => a[orderBy] > b[orderBy]);

      const limitIndex = currentPage*pageSize < filteredItems.length ? currentPage*pageSize : filteredItems.length;
      
      const pageItems = [];
      for (let i = (currentPage-1)*pageSize; i < limitIndex; i ++) {
        pageItems.push(filteredItems[i]);
      }

      return {
        ...state,
        organizations: pageItems,
        totalCount: filteredItems.length,
        totalPage: (filteredItems.length-1)/pageSize+1,
      }
    }

    case ORGANIZATION_LIST_ADD_ITEM:
      return { ...state, isLoaded: false };
    case ORGANIZATION_LIST_ADD_ITEM_SUCCESS:
      return {
        ...state,
        isLoaded: true, 
        allOrganizations: [...state.allOrganizations, action.payload],
      };
    case ORGANIZATION_LIST_ADD_ITEM_ERROR:
      return { ...state, isLoaded: true, error: action.payload };

    case ORGANIZATION_LIST_DELETE_ITEMS:
      return { ...state };
    case ORGANIZATION_LIST_DELETE_ITEMS_SUCCESS:
      const ids = action.payload.map(item => item.id);
      return {
        ...state,
        allOrganizations: state.allOrganizations.filter(item => !ids.includes(item.id)),
      }
    case ORGANIZATION_LIST_DELETE_ITEMS_ERROR:
      return { ...state, error: action.payload, };
      

    default:
      return { ...state };
  }
};
