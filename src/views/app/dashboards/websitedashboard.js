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
import SurveyResponsedChartCard from '../../../containers/dashboards/SurveyResponsedChartCard'

import IntlMessages from '../../../helpers/IntlMessages';
import { getTotalDashboardInfo, getSurveyTotalList } from '../../../redux/actions';

const DefaultDashboard = ({ 
  intl, 
  match,
  
  allSurveyItems,
  isLoaded,
  totalDashboardInfo,
  isMyDashboardInfoLoaded,
  totalDashboardInfoError,

  getTotalDashboardInfoAction,
  getSurveyTotalListAction
}) => {

  useEffect(() => {
    getTotalDashboardInfoAction();
    getSurveyTotalListAction();
  }, [])

  const { messages } = intl;

  const totalSurveysCount = allSurveyItems.length;
  const totalActivatedSurveysCount = allSurveyItems.filter(item => item.is_active).length;
  const totalResponses = totalDashboardInfo ? totalDashboardInfo.totalResponses : 0;
  const completedResponses = totalDashboardInfo ? totalDashboardInfo.completedResponses : 0;

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.websitedashboard" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row> 
      <Row>
        <Colxx lg="4" md="6" className="mb-5">
          <GradientWithRadialProgressCard
            icon="iconsminds-calculator"
            title={`${totalActivatedSurveysCount} ${totalActivatedSurveysCount > 1 ? messages['dashboards.surveys'] : messages['dashboards.survey']}`}
            detail={messages['dashboards.activated-surveys']}
            percent={(totalActivatedSurveysCount * 100) / totalSurveysCount}
            progressText={`${totalActivatedSurveysCount}/${totalSurveysCount}`}
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
          <SurveyChartCard dates={totalDashboardInfo ? totalDashboardInfo.surveyDates : null} />
        </Colxx>
        <Colxx lg="6" className="mb-5">
          {(totalDashboardInfo && totalDashboardInfo.resultDates) && (
            <ResponsesChartCard dates={totalDashboardInfo.resultDates} />
          )}
        </Colxx>
      </Row>
    </>
  );
};


const mapStateToProps = ({ surveyListApp, dashboard }) => {
  return {
    allSurveyItems: surveyListApp.totalSurveyItems,
    isLoaded: surveyListApp.loading,

    totalDashboardInfo: dashboard.totalInfo,
    isTotalDashboardInfoLoaded: dashboard.isLoaded,
    totalDashboardInfoError: dashboard.error,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    getTotalDashboardInfoAction: getTotalDashboardInfo,
    getSurveyTotalListAction: getSurveyTotalList
  })(DefaultDashboard)
);


      