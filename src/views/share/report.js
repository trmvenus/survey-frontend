  import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { 
  Row,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import queryString from 'query-string';

// Redux
import {
  getReportItemShare, getResultList, getSurvey, 
} from '../../redux/actions';

// Helpers
import IntlMessages from '../../helpers/IntlMessages';
import { 
  filterResults, 
  genSummaryReport, 
  genCrossTabReport, 
  genOpenEndReport, 
  genQuestionScoreReport, 
} from '../../helpers/surveyHelper';

// Containers
import SummaryCard from '../../containers/reports/SummaryCard';
import CrossTabCard from '../../containers/reports/CrossTabCard';
import OpenEndCard from '../../containers/reports/OpenEndCard';
import QuestionScoreCard from '../../containers/reports/QuestionScoreCard';
import { REPORT_TYPE } from '../../constants/surveyValues';

// Components
import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import { NotificationManager } from '../../components/common/react-notifications';

const ReportPage = ({ 
  match,
  location,

  surveyItem,
  surveyItemError,
  isSurveyItemLoaded,
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

  getReportItemShareAction,
  getResultItemsAction,
  getSurveyItemAction,
}) => {

  const [shareId, setShareId] = useState(null);
  const [reportResults, setReportResults] = useState([]);

  useEffect(() => {
    const query = queryString.parse(location.search);
    
    if (query && query.id) {
      setShareId(query.id);
    }
  }, [location]);

  useEffect(() => {
    if (surveyItemError) {
      NotificationManager.warning(surveyItemError.message??surveyItemError, 'Run Survey Error', 3000, null, null, '');
    }
  }, [surveyItemError]);

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
    if (shareId) {
      getReportItemShareAction({id: shareId});
    }
  }, [shareId]);

  useEffect(() => {
    if (isReportItemLoaded && reportItem) {
      getResultItemsAction({id: reportItem.survey_id});
      getSurveyItemAction({id: reportItem.survey_id});
    }
  }, [isReportItemLoaded, reportItem]);

  useEffect(() => {
    if (isSurveyItemLoaded && isReportItemLoaded && isResultItemsLoaded && isPillarItemsLoaded
      && surveyItem && reportItem && resultItems && pillarItems) {

      const surveyJson = surveyItem.json;

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
        }

        if (reportData.result === 'success') {
          reportRes.push({
            type,
            reportData
          });
        } else {
          console.log(reportData.message);
        }
      }

      setReportResults(reportRes);
    }
  }, [isSurveyItemLoaded, isReportItemLoaded, isResultItemsLoaded, isPillarItemsLoaded]);

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
                  <DropdownItem>
                    <IntlMessages id="summary.pdf" />
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>

            <Separator className="mb-5" />
          </div>
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
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
          </React.Fragment>
        ))}
        </Colxx>
      </Row>
    </>
  )
};

const mapStateToProps = ({ survey, report, result, pillar, settings }) => {
  return {
    surveyItem: survey.surveyItem,
    surveyItemError : survey.error,
    isSurveyItemLoaded: survey.loading,

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
    getReportItemShareAction: getReportItemShare,
    getResultItemsAction: getResultList,
    getSurveyItemAction: getSurvey,
  })(ReportPage)
);