import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { 
  Row,
  UncontrolledDropdown,
  Card,
  CardBody,
  CardTitle,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  NavItem,
} from 'reactstrap';
import Moment from 'react-moment';
import { NavLink } from 'react-router-dom';

import { adminRoot } from '../../../constants/defaultValues';
import IntlMessages from '../../../helpers/IntlMessages';

import Breadcrumb from '../../../containers/navs/Breadcrumb';
import IconCardsCarousel from '../../../containers/summary/IconCardsCarousel';

import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import { NotificationManager } from '../../../components/common/react-notifications';
import { getPagesCount, getQuestionsCount } from '../../../helpers/surveyHelper';
import ResponsesChartCard from '../../../containers/summary/ResponsesChartCard';
import { savePDF } from '../../../helpers/export';


const SummarySurvey = ({ 
  match,
  intl,

  surveyItem,
  error,
  isLoaded,
 }) => {

  const { messages } = intl;

  const exportToPDF = () => {
    if (isLoaded) {
      savePDF(surveyItem.name, surveyItem.json);
    }
  }

  useEffect(() => {
    if (error) {
      NotificationManager.warning(error.message??error, 'Survey Error', 3000, null, null, '');
    }
  }, [error]);

  let pages = 1;
  let questions = 0;

  if (isLoaded) {
    pages = getPagesCount(surveyItem.json);
    questions = getQuestionsCount(surveyItem.json);
  }

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              {surveyItem.name}
            </h1>
            <div className="text-zero top-right-button-container">
              <UncontrolledDropdown>
                <DropdownToggle
                  caret
                  color="primary"
                  size="lg"
                  outline
                  className="top-right-button top-right-button-single"
                >
                  <IntlMessages id="summary.export" />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={exportToPDF}>
                    <IntlMessages id="summary.pdf" />
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
            <Breadcrumb match={match} />
          </div>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xl="4" md="6" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>
                {surveyItem.name}
              </CardTitle>
              <IntlMessages id="pages.createdon" /> {' '}
              <Moment format="YYYY-MM-DD">
                {surveyItem.created_at}
              </Moment>
              <Row className='mt-4'>
                <Colxx xl="6" md="12" className='icon-cards-row text-center'>
                  <i className="simple-icon-doc" />
                  <p className="card-text font-weight-semibold mb-0">
                    <IntlMessages id="pages.pages" />
                  </p>
                  <p className="lead text-center">{pages}</p>
                </Colxx>
                <Colxx xl="6" md="12" className='icon-cards-row text-center'>
                  <i className="simple-icon-question" />
                  <p className="card-text font-weight-semibold mb-0">
                    <IntlMessages id="pages.questions" />
                  </p>
                  <p className="lead text-center">{questions}</p>
                </Colxx>
              </Row>
            </CardBody>
          </Card>

          <Card>
            <CardBody >
              <ul className="list-unstyled list-group flex-column">
                <NavItem className="text-one p-2">
                  <NavLink to={`${adminRoot}/surveys/${surveyItem.id}/run`} onClick={() => {}} location={{}}>
                    <i className="simple-icon-control-play mr-3" />  
                    <span className="text-one"><IntlMessages id="survey.run"/></span>
                  </NavLink>
                </NavItem>
                <Separator class="mb-3"/>
                <NavItem className="text-one p-2">
                  <NavLink to={`${adminRoot}/surveys/${surveyItem.id}/edit`} onClick={() => {}} location={{}}>
                    <i className="simple-icon-pencil mr-3" />  
                    <span className="text-one"><IntlMessages id="survey.edit"/></span>
                  </NavLink>
                </NavItem>
                <Separator class="mb-3"/>
                <NavItem className="text-one p-2">
                  <NavLink to={`${adminRoot}/surveys/${surveyItem.id}/results`} onClick={() => {}} location={{}}>
                    <i className="simple-icon-list mr-3" />  
                    <span className="text-one"><IntlMessages id="survey.results"/></span>
                  </NavLink>
                </NavItem>
                <Separator class="mb-3"/>
                <NavItem className="text-one p-2">
                  <NavLink to={`${adminRoot}/surveys/${surveyItem.id}/reports`} onClick={() => {}} location={{}}>
                    <i className="simple-icon-chart mr-3" />  
                    <span className="text-one"><IntlMessages id="survey.reports"/></span>
                  </NavLink>
                </NavItem>
                <Separator class="mb-3"/>
                <NavItem className="text-one p-2">
                  <NavLink to={`${adminRoot}/surveys/${surveyItem.id}/links`} onClick={() => {}} location={{}}>
                    <i className="simple-icon-link mr-3" />  
                    <span className="text-one"><IntlMessages id="survey.links"/></span>
                  </NavLink>
                </NavItem>
                <Separator class="mb-3"/>
                <NavItem className="text-one p-2">
                  <NavLink to={`#`} onClick={() => {}} location={{}}>
                    <i className="simple-icon-settings mr-3" />  
                    <span className="text-one"><IntlMessages id="survey.settings"/></span>
                  </NavLink>
                </NavItem>
              </ul>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx xl="8" md="6" className="mb-4">
          <IconCardsCarousel 
            totalResponses = {surveyItem.responses}
            surveyStatus = {surveyItem.is_active ? messages['summary.active'] : messages['summary.inactive']}
            averageTime = {new Date(Math.floor(surveyItem.average_time) * 1000).toISOString().substr(14, 5)}
            sharing = {surveyItem.is_share ? messages['summary.yes'] : messages['summary.no']}
          />
          <ResponsesChartCard dates={surveyItem.results.map(item => item.created_at)}/>
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
    isLoaded: loading,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
  })(SummarySurvey)
);