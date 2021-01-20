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

import publicIp from 'public-ip';

import IntlMessages from '../../../helpers/IntlMessages';

import Breadcrumb from '../../../containers/navs/Breadcrumb';
import SurveyPage from '../../../containers/surveyjs/SurveyRun';

import {
  getResultItem, updateResultItem,
} from '../../../redux/actions';

import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import { NotificationManager } from '../../../components/common/react-notifications';


const RunSurvey = ({ 
  match,
  survey_id,

  surveyItem,
  surveyItemError,
  surveyItemLoading,
  resultItem,
  resultItemError,
  resultItemLoading,

  getResultItemAction,
  updateResultItemAction,
}) => {

  const handleOnUpdate = async (result, timeSpent, completed=false) => {
    const ip_address = await publicIp.v4();

    if (resultItem && resultItem.id) {
      updateResultItemAction({
        id: resultItem.id,
        result,
        time_spent: timeSpent,
        ip_address,
        completed,
      });
    }
  }

  useEffect(() => {
    const getResult = async () => {
      const ip_address = await publicIp.v4();
      getResultItemAction({
        survey_id: survey_id,
        ip_address,
      })
    };
    getResult();
  }, [getResultItemAction]);

  useEffect(() => {
    if (surveyItemError) {
      NotificationManager.warning(surveyItemError.message??surveyItemError, 'Run Survey Error', 3000, null, null, '');
    }
  }, [surveyItemError]);

  useEffect(() => {
    if (resultItemError) {
      NotificationManager.warning(resultItemError.message??resultItemError, 'Run Survey Error', 3000, null, null, '');
    }
  }, [resultItemError]);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            {surveyItemLoading && (
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
          {surveyItemLoading && !resultItemLoading ? (
            <SurveyPage 
              surveyJson={surveyItem.json}
              resultJson={resultItem.json}
              timeSpent={resultItem.time_spent}
              handleOnUpdate={handleOnUpdate} />
          ) : (
            <div className="loading" />
          )}
          
        </Colxx>
      </Row>
    </>
  )
};

const mapStateToProps = ({ survey, result }) => {
  const surveyItem = survey.surveyItem;
  const surveyItemError = survey.error;
  const surveyItemLoading = survey.loading;

  const resultItem = result.resultItem;
  const resultItemError = result.error;
  const resultItemLoading = result.loading;

  return {
    surveyItem,
    surveyItemError,
    surveyItemLoading,
    resultItem,
    resultItemError,
    resultItemLoading,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    getResultItemAction: getResultItem,
    updateResultItemAction: updateResultItem
  })(RunSurvey)
);