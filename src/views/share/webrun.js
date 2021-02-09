import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { 
  Row,
  FormGroup,
  Label,
  Button,
  Input,
} from 'reactstrap';
import queryString from 'query-string';
import publicIp from 'public-ip';

import SurveyPage from '../../containers/surveyjs/SurveyRun';

import {
  getSurveyItemByWebLink, 
  getResultItemByWebLinkAndName,
  updateResultItem,
} from '../../redux/actions';

import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import { NotificationManager } from '../../components/common/react-notifications';
import IntlMessages from '../../helpers/IntlMessages';


const WebRunSurvey = ({ 
  intl,
  match,
  location,
  history,

  surveyItem,
  surveyItemError,
  isSurveyItemLoaded,
  resultItem,
  resultItemError,

  getSurveyItemByWebLinkAction,
  getResultItemByWebLinkAndNameAction,
  updateResultItemAction,
}) => {
  const [ipAddress, setIpAddress] = useState(null);
  const [shareId, setShareId] = useState(null);
  const [start, setStart] = useState(false);
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({name: null});

  const {messages} = intl;

  const handleStart = () => {
    if (name.length > 0) {
      setErrors({...errors, name: ''});
      setStart(false);
      history.push(`/share/w/run?id=${shareId}&name=${name}`);
    } else {
      setErrors({...errors, name: messages['manual.name-error']});
    }
  }

  const handleGetIpAddress = async () => {
    const ip_address = await publicIp.v4();
    setIpAddress(ip_address);
  }

  const handleOnUpdate = async (result, timeSpent, completed=false) => {
    if (resultItem && resultItem.id) {
      updateResultItemAction({
        id: resultItem.id,
        result,
        time_spent: timeSpent,
        ip_address: ipAddress,
        completed,
      });
    }
  }

  useEffect(() => {
    handleGetIpAddress();
  }, []);
  
  useEffect(() => {
    const query = queryString.parse(location.search);

    if (query && query.id) {
      setShareId(query.id);
    }
    if (query && query.name) {
      setName(query.name);
      setStart(true);
    }
  }, [location]);

  useEffect(() => {
    if (shareId) {
      getSurveyItemByWebLinkAction({id: shareId});
    }
  }, [shareId]);

  useEffect(() => {
    if (start && shareId && surveyItem && name && ipAddress) {
      getResultItemByWebLinkAndNameAction(surveyItem.id, shareId, name, ipAddress);
    }
  }, [start, surveyItem, ipAddress]);

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
            <>
            <FormGroup row className="pl-3 pr-3">
              <Label for="name" sm={2} className="mb-2">
                <IntlMessages id="forms.name" />{' :'}
              </Label>
              <Colxx sm={8} className="mb-2">
                <Input
                  name="name"
                  id="name"
                  placeholder={messages['forms.name']}
                  readOnly={resultItem !== null}
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
                {(resultItem === null) && (
                <Button color="outline-primary float-right" onClick={handleStart}>
                  <IntlMessages id="form-components.start" />
                </Button>
                )}
              </Colxx>
            </FormGroup>
            {(start === true) && (
              (surveyItem && resultItem && !resultItem.is_completed) ? (
                <SurveyPage 
                  surveyJson={surveyItem.json}
                  resultJson={resultItem.json}
                  timeSpent={resultItem.time_spent}
                  handleOnUpdate={handleOnUpdate} />
              ) : (resultItem && resultItem.is_completed) ? (
                <div className='text-center'>
                  <h1>You have already completed this survey.</h1>
                </div>
              ) : (
                <div className="loading" />
              )
            )}
            </>
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

const mapStateToProps = ({ survey, result, emaillink }) => {
  return {
    surveyItem: survey.surveyItem,
    surveyItemError: survey.error,
    isSurveyItemLoaded: survey.loading,

    resultItem: result.resultItem,
    resultItemError: result.error,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    getSurveyItemByWebLinkAction: getSurveyItemByWebLink,
    getResultItemByWebLinkAndNameAction: getResultItemByWebLinkAndName,
    updateResultItemAction: updateResultItem,
  })(WebRunSurvey)
);