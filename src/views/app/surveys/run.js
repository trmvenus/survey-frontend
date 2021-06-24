import React, {useEffect, useState} from 'react';
  import { connect } from 'react-redux';
  import { injectIntl } from 'react-intl';
import { 
  Row,
  Button
} from 'reactstrap';

import publicIp from 'public-ip';

import Breadcrumb from '../../../containers/navs/Breadcrumb';
import SurveyPage from '../../../containers/surveyjs/SurveyRun';
import SurveyTopPageTool from './SurveyTopPageTool.js'

import {
  getResultItem, updateResultItem,
} from '../../../redux/actions';

import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import { NotificationManager } from '../../../components/common/react-notifications';
import IntlMessages from '../../../helpers/IntlMessages';


const RunSurvey = ({ 
  match,
  surveyid,

  surveyItem,
  surveyItemError,
  isSurveyItemLoaded,
  resultItem,
  resultItemError,
  isResultItemLoaded,

  getResultItemAction,
  updateResultItemAction,
}) => {

  const [reRun,setReRun] = useState(false)
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

  const handleReRun = () => {
    setReRun(!reRun)
  }

  useEffect(() => {
    const getResult = async () => {
      const ip_address = await publicIp.v4();
      getResultItemAction({
        survey_id: surveyid,
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
            {isSurveyItemLoaded && (
            <h1>
              {surveyItem.name}
            </h1>
            )}

            <Breadcrumb match={match} />
            <SurveyTopPageTool handleRun={handleReRun} is_multi_responses={surveyItem ? surveyItem.is_multi_responses: null}/>
            
          </div>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          {isSurveyItemLoaded && isResultItemLoaded && surveyItem && resultItem ? (
            (surveyItem.is_multi_responses === false && surveyItem.myresponses > 0) ? (
              <div className='text-center'>
                <label className='h3'>
                  <IntlMessages id='run.already-posted' />
                </label>
              </div>
            ) : ((surveyItem.is_active === false) ? (
              <div className='text-center'>
                <label className='h3'>
                  <IntlMessages id='run.not-active' />
                </label>
              </div>
            ) : (
              <SurveyPage 
                surveyJson={surveyItem.json}
                resultJson={resultItem.json}
                timeSpent={resultItem.time_spent}
                handleOnUpdate={handleOnUpdate} />
          
            ))
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
  const isSurveyItemLoaded = survey.loading;

  const resultItem = result.resultItem;
  const resultItemError = result.error;
  const isResultItemLoaded = !result.loading;

  return {
    surveyItem,
    surveyItemError,
    isSurveyItemLoaded,
    resultItem,
    resultItemError,
    isResultItemLoaded,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    getResultItemAction: getResultItem,
    updateResultItemAction: updateResultItem
  })(RunSurvey)
);