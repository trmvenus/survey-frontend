import {
  PILLAR_LIST_GET_LIST,
  PILLAR_LIST_GET_LIST_SUCCESS,
  PILLAR_LIST_GET_LIST_ERROR,
  PILLAR_LIST_ADD_ITEM,
  PILLAR_LIST_ADD_ITEM_SUCCESS,
  PILLAR_LIST_ADD_ITEM_ERROR,
  PILLAR_LIST_GET_LIST_FILTER,
  PILLAR_LIST_DELETE_ITEMS_SUCCESS,
  PILLAR_LIST_DELETE_ITEMS,
  PILLAR_LIST_DELETE_ITEMS_ERROR,
  PILLAR_LIST_UPDATE_ITEM,
  PILLAR_LIST_UPDATE_ITEM_SUCCESS,
  PILLAR_LIST_UPDATE_ITEM_ERROR
} from '../actions';

export const getPillarList = () => ({
  type: PILLAR_LIST_GET_LIST,
});

export const getPillarListSuccess = (items) => ({
  type: PILLAR_LIST_GET_LIST_SUCCESS,
  payload: items,
});

export const getPillarListError = (error) => ({
  type: PILLAR_LIST_GET_LIST_ERROR,
  payload: error,
});

export const addPillarItem = (item) => ({
  type: PILLAR_LIST_ADD_ITEM,
  payload: item,
});

export const addPillarItemSuccess = (item) => ({
  type: PILLAR_LIST_ADD_ITEM_SUCCESS,
  payload: item,
});

export const addPillarItemError = (error) => ({
  type: PILLAR_LIST_ADD_ITEM_ERROR,
  payload: error,
});


export const updatePillarItem = (pillar_id, pillar) => ({
  type: PILLAR_LIST_UPDATE_ITEM,
  payload: {pillar_id, pillar},
});

export const updatePillarItemSuccess = (item) => ({
  type: PILLAR_LIST_UPDATE_ITEM_SUCCESS,
  payload: item,
});

export const updatePillarItemError = (error) => ({
  type: PILLAR_LIST_UPDATE_ITEM_ERROR,
  payload: error,
});



export const deletePillarItems = (ids) => ({
  type: PILLAR_LIST_DELETE_ITEMS,
  payload: ids,
});

export const deletePillarItemSuccess = (items) => ({
  type: PILLAR_LIST_DELETE_ITEMS_SUCCESS,
  payload: items,
});

export const deletePillarItemError = (error) => ({
  type: PILLAR_LIST_DELETE_ITEMS_ERROR,
  payload: error,
});