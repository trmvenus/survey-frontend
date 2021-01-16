import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { 
  Row,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Collapse,
  ButtonDropdown, 
  CustomInput,
} from 'reactstrap';

// Redux
import {
  getResultList,
  getSurvey, updateSurvey,
} from '../../../../redux/actions';

// Components
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import { NotificationManager } from '../../../../components/common/react-notifications';

// Containers
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import SurveyResultTable from '../../../../containers/ui/ReactTableCards';

// Helpers
import IntlMessages from '../../../../helpers/IntlMessages';


const ResultsSurvey = ({ 
  match, 
  error,
  getResultListAction,
}) => {

  useEffect(() => {
    if (error) {
      NotificationManager.warning(error.message??error, 'Get Results Error', 3000, null, null, '');
    }
  }, [error]);
  
  useEffect(() => {
    getResultListAction({id: match.params.surveyid});
  }, [getResultListAction]);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <Breadcrumb heading="menu.results" match={match} />
          </div>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
					<SurveyResultTable />{' '}
        </Colxx>
      </Row>
    </>
  )
};

const mapStateToProps = ({ result }) => {
  const {
    resultItems, 
    loading,
    error
  } = result;

  return {
    resultItems,
    loading,
    error,
  };
};

export default injectIntl(
  connect(mapStateToProps, {
    getResultListAction: getResultList
  })(ResultsSurvey)
);