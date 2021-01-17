import {
  GET_SURVEY,
  GET_SURVEY_SUCCESS,
  GET_SURVEY_ERROR,
  UPDATE_SURVEY,
  UPDATE_SURVEY_SUCCESS,
  UPDATE_SURVEY_ERROR
} from '../actions';

export const getSurvey = (payload) => ({
  type: GET_SURVEY,
  payload: payload,
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
