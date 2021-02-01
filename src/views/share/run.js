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
  getSurveyItemShare, postResultItem,
} from '../../redux/actions';

import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import { NotificationManager } from '../../components/common/react-notifications';


const RunSurvey = ({ 
  match,
  location,

  surveyItem,
  surveyItemError,
  isSurveyItemLoaded,
  resultItemError,

  getSurveyItemShareAction,
  postResultItemAction,
}) => {
  const [shareId, setShareId] = useState(null);

  const handleOnUpdate = async (result, timeSpent, completed=false) => {
    const ip_address = await publicIp.v4();

    if (completed) {
      postResultItemAction({
        survey_id: surveyItem.id,
        result,
        time_spent: timeSpent,
        ip_address,
        link_id: shareId,
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
    if (surveyItemError && !('success' in surveyItemError)) {
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
            {isSurveyItemLoaded && surveyItem && (
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
          {isSurveyItemLoaded && surveyItem ? (
            <SurveyPage 
              surveyJson={surveyItem.json}
              resultJson={{}}
              timeSpent={0}
              handleOnUpdate={handleOnUpdate} />
          ) : (
            <div className='text-center'>
            {(surveyItemError.code === 'survey/over-deadline') ? (
              <h1>The Deadline Has Passed.</h1>
            ) : (surveyItemError.code === 'survey/inactivate-survey') ? (
              <h1>This Survey Is Not Active Yet.</h1>
            ) : (surveyItemError.code === 'survey/not-found-link') ? (
              <h1>There Is No Such Survey.</h1>
            ) : (surveyItemError.code === 'survey/deleted-survey') ? (
              <h1>This Survey Has Already Been Deleted.</h1>
            ) : (
              <div className="loading" />
            )}
            </div>
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

  const resultItemError = result.error;
  
  return {
    surveyItem,
    surveyItemError,
    isSurveyItemLoaded,
    resultItemError,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    getSurveyItemShareAction: getSurveyItemShare,
    postResultItemAction: postResultItem,
  })(RunSurvey)
);