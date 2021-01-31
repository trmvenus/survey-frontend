import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { 
  Row,
  Card,
  CardBody,
  CardTitle,
  FormGroup,
} from 'reactstrap';
import Switch from 'rc-switch';

// Redux
import {
  shareSurveyItem,
  activeSurveyItem,
  setMultiResponsesSurveyItem,
} from '../../../redux/actions';

// Components
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import { NotificationManager } from '../../../components/common/react-notifications';

// Containers
import Breadcrumb from '../../../containers/navs/Breadcrumb';

// Helpers
import IntlMessages from '../../../helpers/IntlMessages';

// CSS
import 'rc-switch/assets/index.css';

const SurveySettings = ({ 
  match,
  surveyid,

  surveyItem,
  error,
  loading,

  shareSurveyItemAction,
  activeSurveyItemAction,
  setMultiResponsesSurveyItemAction,
 }) => {
  const [active, setActive] = useState(false);  
  const [share, setShare] = useState(false);
  const [multiResponses, setMultiResponses] = useState(false);

  const handleActiveSurvey = (checked) => {
    setActive(checked);
    activeSurveyItemAction({id: surveyid});
  }

  const handleShareSurvey = (checked) => {
    setShare(checked);
    shareSurveyItemAction({id: surveyid});
  }

  const handleSetMultiResponsesSurvey = (checked) => {
    setMultiResponses(checked);
    setMultiResponsesSurveyItemAction({id: surveyid});
  }

  useEffect(() => {
    if (surveyItem) {
      setActive(surveyItem.is_active);
      setShare(surveyItem.is_share);
      setMultiResponses(surveyItem.is_multi_responses);
    }
  }, [surveyItem]);

  useEffect(() => {
    if (error) {
      NotificationManager.warning(error.message??error, 'Edit Survey Error', 3000, null, null, '');
    }
  }, [error]);
  
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
        <Colxx lg="6" className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>
                <IntlMessages id='survey.settings' />
              </CardTitle>
              <FormGroup className="mb-4">
                <label className="h6">
                  <IntlMessages id="settings.active" />
                </label>
                <Switch
                  className="custom-switch custom-switch-primary mb-2"
                  checked={active}
                  onChange={handleActiveSurvey}
                />
                <label>
                  <IntlMessages id="settings.active-description" />
                </label>
              </FormGroup>
              <FormGroup className="mb-4">
                <label className="h6">
                  <IntlMessages id="settings.share" />
                </label>
                <Switch
                  className="custom-switch custom-switch-primary mb-2"
                  checked={share}
                  onChange={handleShareSurvey}
                />
                <label>
                  <IntlMessages id="settings.share-description" />
                </label>
              </FormGroup>
              <FormGroup className="mb-4">
                <label className="h6">
                  <IntlMessages id="settings.multi-responses" />
                </label>
                <Switch
                  className="custom-switch custom-switch-primary mb-2"
                  checked={multiResponses}
                  onChange={handleSetMultiResponsesSurvey}
                />
                <label>
                  <IntlMessages id="settings.multi-responses-description" />
                </label>
              </FormGroup>
            </CardBody>
          </Card>
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
    shareSurveyItemAction: shareSurveyItem,
    activeSurveyItemAction: activeSurveyItem,
    setMultiResponsesSurveyItemAction: setMultiResponsesSurveyItem,
  })(SurveySettings)
);