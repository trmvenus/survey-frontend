import {
  GET_SURVEY,
  GET_SURVEY_SUCCESS,
  GET_SURVEY_ERROR,
  UPDATE_SURVEY,
  UPDATE_SURVEY_SUCCESS,
  UPDATE_SURVEY_ERROR,
  GET_SURVEY_BY_WEB_LINK,
  GET_SURVEY_BY_EMAIL_LINK
} from '../actions';

export const getSurvey = (payload) => ({
  type: GET_SURVEY,
  payload: payload,
});

export const getSurveyItemByWebLink = (share_id) => ({
  type: GET_SURVEY_BY_WEB_LINK,
  payload: share_id,
});

export const getSurveyItemByEmailLink = (share_id) => ({
  type: GET_SURVEY_BY_EMAIL_LINK,
  payload: share_id,
});

export const getSurveySuccess = (item) => ({
  type: GET_SURVEY_SUCCESS,
  payload: item,
});

export const getSurveyError = (error) => ({
  type: GET_SURVEY_ERROR,
  payload: error,
});

export const updateSurvey = (payload) => ({
  type: UPDATE_SURVEY,
  payload: payload,
});

export const updateSurveySuccess = (item) => ({
  type: UPDATE_SURVEY_SUCCESS,
  payload: item,
});

export const updateSurveyError = (error) => ({
  type: UPDATE_SURVEY_ERROR,
  payload: error,
});
