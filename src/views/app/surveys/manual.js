import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { 
  Row,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';

import publicIp from 'public-ip';

import Breadcrumb from '../../../containers/navs/Breadcrumb';
import SurveyPage from '../../../containers/surveyjs/SurveyRun';

import {
  postManualResultItem,
} from '../../../redux/actions';

import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import { NotificationManager } from '../../../components/common/react-notifications';
import IntlMessages from '../../../helpers/IntlMessages';


const RunSurvey = ({ 
  match,
  surveyid,

  intl,
  surveyItem,
  surveyItemError,
  isSurveyItemLoaded,

  postManualResultItemAction,
}) => {

  const [start, setStart] = useState(false);
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({name: null})

  const { messages } = intl;
  
  const handleStart = () => {
    if (name.length > 0) {
      setErrors({...errors, name: ''});
      setStart(true);
    } else {
      setErrors({...errors, name: messages['manual.name-error']});
    }
  }

  const handleOnUpdate = async (result, timeSpent, completed=false) => {
    if (completed === true) {
      const ip_address = await publicIp.v4();

      postManualResultItemAction({
        result, 
        survey_id: surveyid, 
        time_spent: timeSpent, 
        ip_address,
        respondent_name: name,
      });
    }
  }

  useEffect(() => {
    if (surveyItemError) {
      NotificationManager.warning(surveyItemError.message??surveyItemError, 'Run Survey Error', 3000, null, null, '');
    }
  }, [surveyItemError]);

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
          </div>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          {isSurveyItemLoaded && surveyItem ? (
            <>
              <FormGroup row className="pl-3 pr-3">
                <Label for="respondentName" sm={2} className="mb-2">
                  <IntlMessages id="forms.respondent-name" />{' :'}
                </Label>
                <Colxx sm={8} className="mb-2">
                  <Input
                    name="respondentName"
                    id="respondentName"
                    placeholder={messages['forms.respondent-name']}
                    readOnly={start === true}
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                  {errors.name && (
                    <div className="invalid-feedback d-block">
                      {errors.name}
                    </div>
                  )}
                </Colxx>
                <Colxx sm={2} className="mb-2">
                  {(start === false) && (
                  <Button color="outline-primary float-right" onClick={handleStart}>
                    <IntlMessages id="form-components.start" />
                  </Button>
                  )}
                </Colxx>
              </FormGroup>
              {(start === true) && (
              <SurveyPage 
                surveyJson={surveyItem.json}
                timeSpent={0}
                handleOnUpdate={handleOnUpdate} />
              )}
            </>
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
    postManualResultItemAction: postManualResultItem,
  })(RunSurvey)
);