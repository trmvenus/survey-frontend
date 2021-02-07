import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';
import { 
  Row,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  TabContent,
  TabPane,
} from 'reactstrap';
import classnames from 'classnames';

// Redux
import {
  getReportItem, getResultList, getPillarList,
} from '../../../../redux/actions';

// Helpers
import IntlMessages from '../../../../helpers/IntlMessages';
import { 
  filterResults, 
  genSummaryReport, 
  genCrossTabReport, 
  genOpenEndReport, 
  genQuestionScoreReport, 
  getQuestions, 
  genBenchmarkingReport,
  genTrendReport
} from '../../../../helpers/surveyHelper';
import { client } from '../../../../helpers/client';

// Containers
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import FilterTab from '../../../../containers/reports/FilterTab';
import CustomizeTab from '../../../../containers/reports/CustomizeTab';
import ShareTab from '../../../../containers/reports/ShareTab';
import SummaryCard from '../../../../containers/reports/SummaryCard';
import CrossTabCard from '../../../../containers/reports/CrossTabCard';
import OpenEndCard from '../../../../containers/reports/OpenEndCard';
import QuestionScoreCard from '../../../../containers/reports/QuestionScoreCard';
import BenchmarkingCard from '../../../../containers/reports/BenchmarkingCard';
import TrendCard from '../../../../containers/reports/TrendCard';

// Components
import { Colxx } from '../../../../components/common/CustomBootstrap';
import { NotificationManager } from '../../../../components/common/react-notifications';

// Constants
import { REPORT_TYPE } from '../../../../constants/surveyValues';

const ReportPage = ({ 
  match,
  location,
  surveyid,

  surveyItem,
  surveyItemError,
  isSurveyItemLoaded,
  surveyItems,
  surveyItemsError,
  isSurveyItemsLoaded,
  reportItem,
  reportItemError,
  isReportItemLoaded,
  resultItems,
  resultItemsError,
  isResultItemsLoaded,
  pillarItems,
  pillarItemsError,
  isPillarItemsLoaded,
  locale,

  getReportItemAction,
  getResultItemsAction,
  getPillarItemsAction,
}) => {

  const [activeTab, setActiveTab] = useState('view');
  const [reportResults, setReportResults] = useState([]);
  const [questions, setQuestions] = useState([]);

  const report_id = match.params.reportid;

  const exportToPDF = () => {
    
  }

  useEffect(() => {
    if (location.hash.length > 1) {
      const tabName = location.hash.substring(1);
      if (['view', 'filter', 'customize', 'share'].includes(tabName)) {
        setActiveTab(tabName);
      }
    }
  }, [location]);

  useEffect(() => {
    if (surveyItemError) {
      NotificationManager.warning(surveyItemError.message??surveyItemError, 'Run Survey Error', 3000, null, null, '');
    }
  }, [surveyItemError]);

  useEffect(() => {
    if (surveyItemsError) {
      NotificationManager.warning(surveyItemsError.message??surveyItemsError, 'Run Survey Error', 3000, null, null, '');
    }
  }, [surveyItemsError]);

  useEffect(() => {
    if (reportItemError) {
      NotificationManager.warning(reportItemError.message??reportItemError, 'Run Survey Error', 3000, null, null, '');
    }
  }, [reportItemError]);

  useEffect(() => {
    if (resultItemsError) {
      NotificationManager.warning(resultItemsError.message??resultItemsError, 'Run Survey Error', 3000, null, null, '');
    }
  }, [resultItemsError]);

  useEffect(() => {
    if (pillarItemsError) {
      NotificationManager.warning(pillarItemsError.message??pillarItemsError, 'Run Survey Error', 3000, null, null, '');
    }
  }, [pillarItemsError]);

  useEffect(() => {
    getReportItemAction({id: report_id});

    getResultItemsAction({id: surveyid});

    getPillarItemsAction();
  }, [report_id, surveyid, getReportItemAction, getResultItemsAction, getPillarItemsAction]);

  useEffect(() => {
    const generateReport = async () => {
      if (isSurveyItemLoaded && isSurveyItemsLoaded && isReportItemLoaded && isResultItemsLoaded && isPillarItemsLoaded
        && surveyItem && surveyItems && reportItem && resultItems && pillarItems) {
  
        const surveyJson = {...surveyItem.json};
  
        const filter = reportItem.filter;
        const sections = reportItem.sections;
  
        const results = (filter.conditionFilter === true || filter.dateFilter === true) ? 
                          filterResults(resultItems, filter) :
                          resultItems;
  
        const reportRes = [];
  
        for (let section of sections) {
          const type = section.type;
          const content = section.content;
          
          let reportData = {};
  
          if (type === REPORT_TYPE.SUMMARY || type === REPORT_TYPE.PILLAR) {
            reportData = genSummaryReport(surveyJson, results, content, locale);
          } else if(type === REPORT_TYPE.CROSS_TAB) {
            reportData = genCrossTabReport(surveyJson, results, content, locale);
          } else if (type === REPORT_TYPE.OPEN_END) {
            reportData = genOpenEndReport(surveyJson, results, content, locale);
          } else if (type === REPORT_TYPE.QUESTION_SCORE) {
            reportData = genQuestionScoreReport(surveyJson, results, content, locale);
          } else if (type === REPORT_TYPE.BENCHMARKING) {
            const surveyItem2 = surveyItems.find(item => item.id === content.survey2);
            if (surveyItem2) {
              const resultItems2 = await client.get(`/result/list?survey=${content.survey2}`)
                .then(res => res.data)
                .catch(err => null);
  
              if (resultItems2) {
                const results2 = (filter.conditionFilter === true || filter.dateFilter === true) ? 
                  filterResults(resultItems2, filter) :
                  resultItems2;
  
                reportData = genBenchmarkingReport(surveyJson, results, {... surveyItem2.json}, results2, content, locale);
              }
            }
          } else if (type === REPORT_TYPE.TREND) {
            reportData = genTrendReport(surveyJson, results, content, locale);
          }
  
          if (reportData.result === 'success') {
            reportRes.push({
              type,
              reportData
            });
          } else if (reportData.result === 'error') {
            console.error(reportData.message);
          }
        }
  
        setReportResults(reportRes);
      }
    }

    generateReport();
  }, [isSurveyItemLoaded, isReportItemLoaded, isResultItemsLoaded, isPillarItemsLoaded]);

  useEffect(() => {
    if (surveyItem) {
      setQuestions(getQuestions(surveyItem.json, locale));
    }
  }, [surveyItem]);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            {isReportItemLoaded && reportItem && (
            <h1>
              {reportItem.name}
            </h1>
            )}

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
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Nav tabs className="separator-tabs ml-0 mb-5">
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === 'view',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('view')}
                to="#view"
                location={{}}
              >
                <IntlMessages id="report.view" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === 'filter',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('filter')}
                to="#filter"
                location={{}}
              >
                <IntlMessages id="report.filter" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === 'customize',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('customize')}
                to="#customize"
                location={{}}
              >
                <IntlMessages id="report.customize" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === 'share',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('share')}
                to="#share"
                location={{}}
              >
                <IntlMessages id="report.share" />
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activeTab}>
            <TabPane tabId='view'>
              {reportResults.map((reportResult, i) => (
                <React.Fragment key={i}>
                {(reportResult.type === REPORT_TYPE.SUMMARY || reportResult.type === REPORT_TYPE.PILLAR) && (
                  <SummaryCard reportData={reportResult.reportData} />
                )}
                {(reportResult.type === REPORT_TYPE.CROSS_TAB) && (
                  <CrossTabCard reportData={reportResult.reportData} />
                )}
                {(reportResult.type === REPORT_TYPE.OPEN_END) && (
                  <OpenEndCard reportData={reportResult.reportData} />
                )}
                {(reportResult.type === REPORT_TYPE.QUESTION_SCORE) && (
                  <QuestionScoreCard reportData={reportResult.reportData} />
                )}
                {(reportResult.type === REPORT_TYPE.BENCHMARKING) && (
                  <BenchmarkingCard reportData={reportResult.reportData} />
                )}
                {(reportResult.type === REPORT_TYPE.TREND) && (
                  <TrendCard reportData={reportResult.reportData} />
                )}
                </React.Fragment>
              ))}
            </TabPane>
            <TabPane tabId='filter'>
              {(isReportItemLoaded && reportItem) && (
              <FilterTab 
                questions={questions}
                />
              )}
            </TabPane>
            <TabPane tabId='customize'>
              {(isReportItemLoaded && reportItem) && (
                <CustomizeTab 
                  questions={questions}
                  surveyid={surveyid}
                  />
              )}
            </TabPane>
            <TabPane tabId='share'>
              <ShareTab />
            </TabPane>
          </TabContent>
        </Colxx>
      </Row>
    </>
  )
};

const mapStateToProps = ({ survey, surveyListApp, report, result, pillar, settings }) => {
  return {
    surveyItem: survey.surveyItem,
    surveyItemError : survey.error,
    isSurveyItemLoaded: survey.loading,

    surveyItems: surveyListApp.mySurveyItems,
    surveyItemsError: surveyListApp.error,
    isSurveyItemsLoaded: survey.loading,

    reportItem : report.reportItem,
    reportItemError: report.error,
    isReportItemLoaded: !report.loading,

    resultItems: result.resultItems,
    resultItemsError: result.error,
    isResultItemsLoaded: !result.loading,

    pillarItems: pillar.pillarItems,
    pillarItemsError: pillar.error,
    isPillarItemsLoaded: pillar.loading,

    locale: settings.locale,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    getReportItemAction: getReportItem,
    getResultItemsAction: getResultList,
    getPillarItemsAction: getPillarList,
  })(ReportPage)
);