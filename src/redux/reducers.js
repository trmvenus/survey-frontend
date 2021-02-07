import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import entireSurvey from './entireSurvey/reducer';
import surveyListApp from './surveyList/reducer';
import sharedSurvey from './sharedSurvey/reducer';
import categoryList from './categoryList/reducer';
import survey from './survey/reducer';
import result from './result/reducer';
import report from './report/reducer';
import weblink from './weblink/reducer';
import emaillink from './emaillink/reducer';
import user from './user/reducer';
import organization from './organization/reducer';
import pillar from './pillar/reducer';
import dashboard from './dashboard/reducer';

const reducers = combineReducers({
  menu,
  settings,
  authUser,
  entireSurvey,
  surveyListApp,
  sharedSurvey,
  categoryList,
  survey,
  result,
  report,
  weblink,
  emaillink,
  user,
  organization,
  pillar,
  dashboard,
});

export default reducers;
