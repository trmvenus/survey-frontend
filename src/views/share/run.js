import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { 
  Row,
} from 'reactstrap';
import queryString from 'query-string';
import publicIp from 'public-ip';

import SurveyPage from '../../containers/surveyjs/SurveyRun';

import {
  getResultItem, updateResultItem, getSurveyItemShare,
} from '../../redux/actions';

import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import { NotificationManager } from '../../components/common/react-notifications';


const RunSurvey = ({ 
  match,
  location,

  surveyItem,
  surveyItemError,
  isSurveyItemLoaded,
  resultItem,
  resultItemError,
  isResultItemLoaded,

  getResultItemAction,
  updateResultItemAction,
  getSurveyItemShareAction,
}) => {
  const [shareId, setShareId] = useState(null);

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
    const query = queryString.parse(location.search);
    
    if (query && query.id) {
      setShareId(query.id);
    }
  }, [location]);

  useEffect(() => {
    if (shareId) {
      getSurveyItemShareAction({id: shareId});
    }
  }, [shareId]);

  useEffect(() => {
    const getResult = async () => {
      const ip_address = await publicIp.v4();
      getResultItemAction({
        survey_id: surveyItem.survey_id,
        ip_address,
      })
    };

    if (isSurveyItemLoaded && surveyItem) {
      getResult();
    }
  }, [isSurveyItemLoaded, surveyItem]);

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
          </div>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          {isSurveyItemLoaded && isResultItemLoaded && !surveyItemError && !resultItemError ? (
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
    updateResultItemAction: updateResultItem,
    getSurveyItemShareAction: getSurveyItemShare,
  })(RunSurvey)
);