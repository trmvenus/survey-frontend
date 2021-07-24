import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { 
  Row,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
// Redux
import {
  getResultList,
} from '../../../../redux/actions';

// Components
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import { NotificationManager } from '../../../../components/common/react-notifications';

// Containers
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import SurveyResultTable from '../../../../containers/results/SurveyResultTable';

// Helpers
import IntlMessages from '../../../../helpers/IntlMessages';

const ResultsSurvey = ({ 
  match,
  surveyid,
  resultItems,
  surveyItem,
  surveyItemError,
  resultItemError,
  
  getResultListAction,
}) => {

  useEffect(() => {
    if (resultItemError) {
      NotificationManager.warning(resultItemError.message??resultItemError, 'Get Results Error', 3000, null, null, '');
    }
  }, [resultItemError]);
  
  useEffect(() => {
    if (surveyItemError) {
      NotificationManager.warning(surveyItemError.message??surveyItemError, 'Links Error', 3000, null, null, '');
    }
  }, [surveyItemError]);

  useEffect(() => {
    getResultListAction({id: surveyid});
  }, [getResultListAction]);

  const handleExprotExcel = () => {
    console.log("handleExprotExcel===>>",resultItems)
    const result={}
    resultItems.forEach(element => {
      
    });
  }

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id="survey.results" />:&nbsp;
              {surveyItem && (
                <span className="text-primary">{surveyItem.name}</span>
              )}
            </h1>
            
            <Breadcrumb match={match} />
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
                  <DropdownItem onClick={handleExprotExcel}>
                    <IntlMessages id="summary.excel" />
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </div>
          <Separator className="mb-5" />
         

        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
					<SurveyResultTable />
        </Colxx>
      </Row>
    </>
  )
};

const mapStateToProps = ({ survey, result }) => {
  return {
    surveyItem: survey.surveyItem,
    surveyItemError : survey.error,
    isSurveyItemLoaded: survey.loading,

    resultItemError : result.error,
    resultItems: result.resultItems
  };
};

export default injectIntl(
  connect(mapStateToProps, {
    getResultListAction: getResultList
  })(ResultsSurvey)
);