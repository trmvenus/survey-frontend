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
import queryString from 'query-string';
import publicIp from 'public-ip';

import IntlMessages from '../../../../helpers/IntlMessages';

import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import SurveyPage from '../../../../containers/surveyjs/SurveyRun';

import {
  getResultItem, updateResultItem,
} from '../../../../redux/actions';

import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import { NotificationManager } from '../../../../components/common/react-notifications';
import { savePDF } from '../../../../helpers/export';

const ResultPage = ({ 
  match,
  location,
  surveyid,

  surveyItem,
  surveyItemError,
  isSurveyItemLoaded,
  resultItem,
  resultItemError,
  isResultItemLoaded,

  getResultItemAction,
  updateResultItemAction,
}) => {

  const result_id = match.params.resultid;
  const query = queryString.parse(location.search);

  const handleOnUpdate = async (result, timeSpent, completed=false) => {
    const ip_address = await publicIp.v4();

    updateResultItemAction({
      id: result_id,
      result,
      time_spent: timeSpent,
      ip_address,
      completed,
    });
  }

  const exportToPDF = () => {
    if (isSurveyItemLoaded && isResultItemLoaded) {
      savePDF(`${surveyItem.name}_${resultItem.id}`, surveyItem.json, resultItem.json);
    }
  }

  useEffect(() => {
    getResultItemAction({
      id: result_id,
    })
  }, [getResultItemAction]);

  useEffect(() => {
    if (surveyItemError) {
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
            {isSurveyItemLoaded && (
            <h1>
              {surveyItem.name}
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
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          {isSurveyItemLoaded && isResultItemLoaded && resultItem && surveyItem ? (
            <SurveyPage 
              surveyJson={surveyItem.json}
              resultJson={resultItem.json}
              timeSpent={resultItem.time_spent}
              handleOnUpdate={handleOnUpdate}
              mode={query.mode=='edit'?'edit':'display'} />
          ) : (
            <div className="loading" />
          )}
          
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
    resultItem : result.resultItem,
    resultItemError: result.error,
    isResultItemLoaded: !result.loading,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    getResultItemAction: getResultItem,
    updateResultItemAction: updateResultItem,
  })(ResultPage)
);