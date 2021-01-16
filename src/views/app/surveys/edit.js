import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { 
  Row,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Collapse,
  ButtonDropdown, 
  CustomInput,
} from 'reactstrap';

import IntlMessages from '../../../helpers/IntlMessages';

import Breadcrumb from '../../../containers/navs/Breadcrumb';
import SurveyCreator from '../../../containers/surveyjs/SurveyCreator';

import {
  getSurvey, updateSurvey,
} from '../../../redux/actions';

import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import { NotificationManager } from '../../../components/common/react-notifications';


const EditSurvey = ({ 
  match,
  surveyItem,
  error,
  loading,
  getSurveyAction,
  updateSurveyAction,
 }) => {

  const saveSurvey = (json) => {
    updateSurveyAction({id: match.params.surveyid, json: json});
  }

  useEffect(() => {
    if (error) {
      NotificationManager.warning(error.message??error, 'Edit Survey Error', 3000, null, null, '');
    }
  }, [error]);
  
  useEffect(() => {
    getSurveyAction({id: match.params.surveyid});
  }, [getSurveyAction]);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            {loading && (
            <h1>
              {surveyItem.name}
            </h1>
            )}

            <Breadcrumb match={match} />
          </div>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          {loading ? (
            <SurveyCreator 
              json={surveyItem.json} 
              saveSurvey={saveSurvey}
              />
          ) : (
            <div className="loading" />
          )}
          
        </Colxx>
      </Row>
    </>
  )
};

const mapStateToProps = ({ survey }) => {
  const {
    surveyItem,
    error,
    loading
  } = survey;

  return {
    surveyItem,
    error,
    loading
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    getSurveyAction: getSurvey,
    updateSurveyAction: updateSurvey
  })(EditSurvey)
);