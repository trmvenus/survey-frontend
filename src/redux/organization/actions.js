import { 
  ORGANIZATION_LIST_ADD_ITEM, 
  ORGANIZATION_LIST_ADD_ITEM_ERROR, 
  ORGANIZATION_LIST_ADD_ITEM_SUCCESS, 
  ORGANIZATION_LIST_DELETE_ITEMS, 
  ORGANIZATION_LIST_DELETE_ITEMS_ERROR, 
  ORGANIZATION_LIST_DELETE_ITEMS_SUCCESS, 
  ORGANIZATION_LIST_GET_LIST, 
  ORGANIZATION_LIST_GET_LIST_ERROR, 
  ORGANIZATION_LIST_GET_LIST_FILTER, 
  ORGANIZATION_LIST_GET_LIST_SUCCESS,
} from '../actions';

export const getOrganizationList = () => ({
  type: ORGANIZATION_LIST_GET_LIST,
});

export const getOrganizationListSuccess = (organizations) => ({
  type: ORGANIZATION_LIST_GET_LIST_SUCCESS,
  payload: organizations,
});

export const getOrganizationListError = (error) => ({
  type: ORGANIZATION_LIST_GET_LIST_ERROR,
  payload: error,
});

export const getOrganizationListWithFilter = (filterOption) => ({
  type: ORGANIZATION_LIST_GET_LIST_FILTER,
  payload: filterOption,
});

export const addOrganizationItem = (organization) => ({
  type: ORGANIZATION_LIST_ADD_ITEM,
  payload: organization,
});

export const addOrganizationItemSuccess = (organization) => ({
  type: ORGANIZATION_LIST_ADD_ITEM_SUCCESS,
  payload: organization,
});

export const addOrganizationItemError = (error) => ({
  type: ORGANIZATION_LIST_ADD_ITEM_ERROR,
  payload: error,
});

export const deleteOrganizationItems = (ids) => ({
  type: ORGANIZATION_LIST_DELETE_ITEMS,
  payload: ids,
});

export const deleteOrganizationItemsSuccess = (items) => ({
  type: ORGANIZATION_LIST_DELETE_ITEMS_SUCCESS,
  payload: items,
});

export const deleteOrganizationItemsError = (error) => ({
  type: ORGANIZATION_LIST_DELETE_ITEMS_ERROR,
  payload: error,
});