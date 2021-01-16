/* eslint-disable import/no-cycle */
/* SETTINGS */
export const CHANGE_LOCALE = 'CHANGE_LOCALE';

/* AUTH */
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';
export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';
export const LOGOUT_USER = 'LOGOUT_USER';
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';

/* MENU */
export const MENU_SET_CLASSNAMES = 'MENU_SET_CLASSNAMES';
export const MENU_CONTAINER_ADD_CLASSNAME = 'MENU_CONTAINER_ADD_CLASSNAME';
export const MENU_CLICK_MOBILE_MENU = 'MENU_CLICK_MOBILE_MENU';
export const MENU_CHANGE_DEFAULT_CLASSES = 'MENU_CHANGE_DEFAULT_CLASSES';
export const MENU_CHANGE_HAS_SUB_ITEM_STATUS = 'MENU_CHANGE_HAS_SUB_ITEM_STATUS';

/* SURVEY LIST APP */
export const SURVEY_LIST_GET_LIST = 'SURVEY_LIST_GET_LIST';
export const SURVEY_LIST_GET_LIST_SUCCESS = 'SURVEY_LIST_GET_LIST_SUCCESS';
export const SURVEY_LIST_GET_LIST_ERROR = 'SURVEY_LIST_GET_LIST_ERROR';
export const SURVEY_LIST_GET_LIST_WITH_FILTER = 'SURVEY_LIST_GET_LIST_WITH_FILTER';
export const SURVEY_LIST_GET_LIST_WITH_ORDER = 'SURVEY_LIST_GET_LIST_WITH_ORDER';
export const SURVEY_LIST_GET_LIST_SEARCH = 'SURVEY_LIST_GET_LIST_SEARCH';
export const SURVEY_LIST_ADD_ITEM = 'SURVEY_LIST_ADD_ITEM';
export const SURVEY_LIST_ADD_ITEM_SUCCESS = 'SURVEY_LIST_ADD_ITEM_SUCCESS';
export const SURVEY_LIST_ADD_ITEM_ERROR = 'SURVEY_LIST_ADD_ITEM_ERROR';
export const SURVEY_LIST_SELECTED_ITEMS_CHANGE = 'SURVEY_LIST_SELECTED_ITEMS_CHANGE';
export const SURVEY_LIST_DELETE_ITEMS = 'SURVEY_LIST_DELETE_ITEMS';
export const SURVEY_LIST_DELETE_ITEMS_SUCCESS = 'SURVEY_LIST_DELETE_ITEMS_SUCCESS';
export const SURVEY_LIST_DELETE_ITEMS_ERROR = 'SURVEY_LIST_DELETE_ITEMS_ERROR';
export const SURVEY_LIST_COPY_ITEMS = 'SURVEY_LIST_COPY_ITEMS';
export const SURVEY_LIST_COPY_ITEMS_SUCCESS = 'SURVEY_LIST_COPY_ITEMS_SUCCESS';
export const SURVEY_LIST_COPY_ITEMS_ERROR = 'SURVEY_LIST_COPY_ITEMS_ERROR';

/* CATEGORY LIST APP */
export const CATEGORY_LIST_GET_LIST = 'CATEGORY_LIST_GET_LIST';
export const CATEGORY_LIST_GET_LIST_SUCCESS = 'CATEGORY_LIST_GET_LIST_SUCCESS';
export const CATEGORY_LIST_GET_LIST_ERROR = 'CATEGORY_LIST_GET_LIST_ERROR';
export const CATEGORY_LIST_ADD_ITEM = 'CATEGORY_LIST_ADD_ITEM';
export const CATEGORY_LIST_ADD_ITEM_SUCCESS = 'CATEGORY_LIST_ADD_ITEM_SUCCESS';
export const CATEGORY_LIST_ADD_ITEM_ERROR = 'CATEGORY_LIST_ADD_ITEM_ERROR';

/* SURVEY */
export const GET_SURVEY = 'GET_SURVEY';
export const GET_SURVEY_SUCCESS = 'GET_SURVEY_SUCCESS';
export const GET_SURVEY_ERROR = 'GET_SURVEY_ERROR';
export const UPDATE_SURVEY = 'UPDATE_SURVEY';
export const UPDATE_SURVEY_SUCCESS = 'UPDATE_SURVEY_SUCCESS';
export const UPDATE_SURVEY_ERROR = 'UPDATE_SURVEY_ERROR';

/* RESULT LIST */
export const RESULT_LIST_GET_LIST = 'RESULT_LIST_GET_LIST';
export const RESULT_LIST_GET_LIST_SUCCESS = 'RESULT_LIST_GET_LIST_SUCCESS';
export const RESULT_LIST_GET_LIST_ERROR = 'RESULT_LIST_GET_LIST_ERROR';
export const RESULT_LIST_GET_ITEM = 'RESULT_LIST_GET_ITEM';
export const RESULT_LIST_GET_ITEM_SUCCESS = 'RESULT_LIST_GET_ITEM_SUCCESS';
export const RESULT_LIST_GET_ITEM_ERROR = 'RESULT_LIST_GET_ITEM_ERROR';
export const RESULT_LIST_UPDATE_RESULT = 'RESULT_LIST_UPDATE_RESULT';
export const RESULT_LIST_UPDATE_RESULT_SUCCESS = 'RESULT_LIST_UPDATE_RESULT_SUCCESS';
export const RESULT_LIST_UPDATE_RESULT_ERROR = 'RESULT_LIST_UPDATE_RESULT_ERROR';

export * from './menu/actions';
export * from './settings/actions';
export * from './auth/actions';
export * from './surveyList/actions';
export * from './categoryList/actions';
export * from './survey/actions';
export * from './result/actions';