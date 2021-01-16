import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import surveyListApp from './surveyList/reducer';
import categoryList from './categoryList/reducer';
import survey from './survey/reducer';
import result from './result/reducer';

const reducers = combineReducers({
  menu,
  settings,
  authUser,
  surveyListApp,
  categoryList,
  survey,
  result,
});

export default reducers;
