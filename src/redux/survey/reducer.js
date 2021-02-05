import {
  GET_SURVEY,
  GET_SURVEY_SUCCESS,
  GET_SURVEY_ERROR,
  UPDATE_SURVEY,
  UPDATE_SURVEY_SUCCESS,
  UPDATE_SURVEY_ERROR,
  GET_SURVEY_BY_WEB_LINK,
  GET_SURVEY_BY_EMAIL_LINK,
} from '../actions';

const INIT_STATE = {
  surveyItem: null,
  loading: false,
  saving: false,
  error: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SURVEY:
      return { ...state, loading: false };
    case GET_SURVEY_BY_WEB_LINK:
      return { ...state, loading: false };
    case GET_SURVEY_BY_EMAIL_LINK:
        return { ...state, loading: false };
    case GET_SURVEY_SUCCESS:
      return {
        ...state,
        loading: true,
        surveyItem: action.payload,
      };
    case GET_SURVEY_ERROR:
      return { ...state, loading: true, error: action.payload };

    case UPDATE_SURVEY:
      return { ...state, saving: false };
    case UPDATE_SURVEY_SUCCESS:
      return { ...state, saving: true };
    case UPDATE_SURVEY_ERROR:
      return { ...state, saving: false, error: action.payload };

    default:
      return { ...state };
  }
};
