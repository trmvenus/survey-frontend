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
  getSurveyItemByEmailLink, 
  getResultItem,
  postResultItem, 
  updateResultItem,
  checkIfEmailIsInvited,
} from '../../redux/actions';

import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import { NotificationManager } from '../../components/common/react-notifications';
import IntlMessages from '../../helpers/IntlMessages';


const EmailRunSurvey = ({ 
  intl,
  match,
  location,
  history,

  surveyItem,
  surveyItemError,
  isSurveyItemLoaded,
  resultItem,
  resultItemError,
  isResultItemLoaded,
  emailContact,
  emailContactError,

  getSurveyItemByEmailLinkAction,
  postResultItemAction,
  getResultItemAction,
  updateResultItemAction,
  checkIfEmailIsInvitedAction,
}) => {
  const [shareId, setShareId] = useState(null);
  const [start, setStart] = useState(false);
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({name: null});

  const {messages} = intl;

  const handleStart = () => {
    if (email.length > 0) {
      setErrors({...errors, email: ''});
      setStart(false);
      history.push(`/share/e/run?id=${shareId}&email=${email}`);
    } else {
      setErrors({...errors, email: messages['forms.email-error']});
    }
  }

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

  const handlePostNewResult = async (contact) => {
    const ip_address = await publicIp.v4();

    postResultItemAction({
      survey_id: surveyItem.id,
      result: {},
      time_spent: 0,
      ip_address: ip_address,
      emaillink_link_id: shareId,
      emaillink_contact_id: contact.id,
      is_completed: false,
    })
  } 
  
  useEffect(() => {
    const query = queryString.parse(location.search);

    if (query && query.id) {
      setShareId(query.id);
    }
    if (query && query.email) {
      setEmail(query.email);
      setStart(true);
    }
  }, [location]);

  useEffect(() => {
    if (shareId) {
      getSurveyItemByEmailLinkAction({id: shareId});
    }
  }, [shareId]);

  useEffect(() => {
    if (start && shareId && email) {
      checkIfEmailIsInvitedAction(shareId, email);
    }
  }, [start]);

  useEffect(() => {
    if (emailContact && surveyItem) {
      if (emailContact.result_id) {
        if (emailContact.is_completed === false) {
          getResultItemAction({id: emailContact.result_id});
        }
      } else {
        handlePostNewResult(emailContact);
      }
    }
  }, [emailContact, surveyItem]);

  useEffect(() => {
    if (emailContactError) {
      NotificationManager.warning(emailContactError.message??emailContactError, 'Run Survey Error', 3000, null, null, '');
    }
  }, [emailContactError]);

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
              <Label for="email" sm={2} className="mb-2">
                <IntlMessages id="link.email-address" />{' :'}
              </Label>
              <Colxx sm={8} className="mb-2">
                <Input
                  name="email"
                  id="email"
                  placeholder={messages['link.email-address']}
                  readOnly={emailContact !== null}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className="invalid-feedback d-block">
                    {errors.email}
                  </div>
                )}
              </Colxx>
              <Colxx sm={2} className="mb-2">
                {(emailContact === null) && (
                <Button color="outline-primary float-right" onClick={handleStart}>
                  <IntlMessages id="form-components.start" />
                </Button>
                )}
              </Colxx>
            </FormGroup>
            {(start === true) && (
              (surveyItem && resultItem && emailContact && !(emailContact.is_completed)) ? (
                <SurveyPage 
                  surveyJson={surveyItem.json}
                  resultJson={resultItem.json}
                  timeSpent={resultItem.time_spent}
                  handleOnUpdate={handleOnUpdate} />
              ) : (emailContact && emailContact.is_completed) ? (
                <div className='text-center'>
                  <h1>You have already completed this survey.</h1>
                </div>
              ) : emailContactError === null && (
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
    isResultItemLoaded: !result.loading,

    emailContact: emaillink.emailContact,
    emailContactError: emaillink.error,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    getSurveyItemByEmailLinkAction: getSurveyItemByEmailLink,
    postResultItemAction: postResultItem,
    updateResultItemAction: updateResultItem,
    getResultItemAction: getResultItem,
    checkIfEmailIsInvitedAction: checkIfEmailIsInvited,
  })(EmailRunSurvey)
);