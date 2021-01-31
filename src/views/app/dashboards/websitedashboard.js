import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Row } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import GradientWithRadialProgressCard from '../../../components/cards/GradientWithRadialProgressCard';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import IntlMessages from '../../../helpers/IntlMessages';

const DefaultDashboard = ({ 
  intl, 
  match,
  
}) => {
  const { messages } = intl;

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.websitedashboard" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
      </Row>
    </>
  );
};


const mapStateToProps = ({  }) => {
  return {
  };
};
export default injectIntl(
  connect(mapStateToProps, {
  })(DefaultDashboard)
);
