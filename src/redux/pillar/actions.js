import {
  PILLAR_LIST_GET_LIST,
  PILLAR_LIST_GET_LIST_SUCCESS,
  PILLAR_LIST_GET_LIST_ERROR,
  PILLAR_LIST_ADD_ITEM,
  PILLAR_LIST_ADD_ITEM_SUCCESS,
  PILLAR_LIST_ADD_ITEM_ERROR,
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
