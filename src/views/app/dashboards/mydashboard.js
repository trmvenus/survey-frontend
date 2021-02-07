import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Row } from 'reactstrap';

// Helpers
import {client} from '../../../helpers/client';

// Components
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import GradientWithRadialProgressCard from '../../../components/cards/GradientWithRadialProgressCard';

// Containers
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import SurveyChartCard from '../../../containers/dashboards/SurveyChartCard';
import ResponsesChartCard from '../../../containers/dashboards/ResponsesChartCard';

import IntlMessages from '../../../helpers/IntlMessages';
import { getMyDashboardInfo } from '../../../redux/actions';

const DefaultDashboard = ({ 
  intl, 
  match,
  
  allMySurveyItems,
  isLoaded,
  myDashboardInfo,
  isMyDashboardInfoLoaded,
  myDashboardInfoError,

  getMyDashboardInfoAction,
}) => {

  useEffect(() => {
    getMyDashboardInfoAction();
  }, [])

  const { messages } = intl;

  const mySurveysCount = allMySurveyItems.length;
  const myActivatedSurveysCount = allMySurveyItems.filter(item => item.is_active).length;
  const totalResponses = myDashboardInfo ? myDashboardInfo.totalResponses : 0;
  const completedResponses = myDashboardInfo ? myDashboardInfo.completedResponses : 0;

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.mydashboard" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx lg="4" md="6" className="mb-5">
          <GradientWithRadialProgressCard
            icon="iconsminds-calculator"
            title={`${myActivatedSurveysCount} ${myActivatedSurveysCount > 1 ? messages['dashboards.surveys'] : messages['dashboards.survey']}`}
            detail={messages['dashboards.activated-surveys']}
            percent={(myActivatedSurveysCount * 100) / mySurveysCount}
            progressText={`${myActivatedSurveysCount}/${mySurveysCount}`}
          />
        </Colxx>
        <Colxx lg="4" md="6" className="mb-5">
          <GradientWithRadialProgressCard
            icon="iconsminds-mail-read"
            title={`${totalResponses} ${totalResponses > 1 ? messages['dashboards.responses'] : messages['dashboards.response']}`}
            detail={messages['dashboards.completed-responses']}
            percent={(completedResponses * 100) / totalResponses}
            progressText={`${completedResponses}/${totalResponses}`}
          />
        </Colxx>
      </Row>
      <Row>
        <Colxx lg="6" className="mb-5">
          <SurveyChartCard dates={myDashboardInfo ? myDashboardInfo.surveyDates : null} />
        </Colxx>
        <Colxx lg="6" className="mb-5">
          {(myDashboardInfo && myDashboardInfo.resultDates) && (
            <ResponsesChartCard dates={myDashboardInfo.resultDates} />
          )}
        </Colxx>
      </Row>
    </>
  );
};


const mapStateToProps = ({ surveyListApp, dashboard }) => {
  return {
    allMySurveyItems: surveyListApp.mySurveyItems,
    isLoaded: surveyListApp.loading,

    myDashboardInfo: dashboard.myInfo,
    isMyDashboardInfoLoaded: dashboard.isLoaded,
    myDashboardInfoError: dashboard.error,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    getMyDashboardInfoAction: getMyDashboardInfo,
  })(DefaultDashboard)
);
