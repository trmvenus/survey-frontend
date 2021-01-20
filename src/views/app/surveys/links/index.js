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


// Components
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import { NotificationManager } from '../../../../components/common/react-notifications';

// Containers
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import SurveyResultTable from '../../../../containers/ui/ReactTableCards';

// Helpers
import IntlMessages from '../../../../helpers/IntlMessages';


const LinksSurvey = ({ 
  match, 
  error,
}) => {

  useEffect(() => {
    if (error) {
      NotificationManager.warning(error.message??error, 'Links Error', 3000, null, null, '');
    }
  }, [error]);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <Breadcrumb heading="survey.links" match={match} />
          </div>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
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
  })(LinksSurvey)
);