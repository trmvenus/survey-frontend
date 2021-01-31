import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Card, CardBody, CustomInput, } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import TimeAgo from 'react-timeago';

import { Colxx } from '../common/CustomBootstrap';
import { NotificationManager } from '../common/react-notifications';
import { adminRoot } from '../../constants/defaultValues';

const SharedSurveyListItem = ({ 
  intl, 

  item, 
  handleCheckChange, 
  isSelected,
}) => {

  const {messages} = intl;

  const handleClickRun = (event) => {
    if (item && item.is_active) {
      NotificationManager.info(messages['run.not-active'], 'Cannot Run Survey', 3000, null, null, '');
      event.preventDefault();
    } else if (item.is_multi_responses === false && item.myresponses > 0) {
      NotificationManager.info(messages['run.already-posted'], 'Cannot Run Survey', 3000, null, null, '');
      event.preventDefault();
    }
  }

  return (
    <Colxx className="survey-list-item" xxs="12">
      <Card className="card d-flex mb-3">
        <div className="d-flex flex-grow-1 min-width-zero">
          <CardBody
            className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center"
          >
            <NavLink
              to={`${adminRoot}/surveys/${item.id}/run`}
              onClick={handleClickRun}
              className="list-item-heading mb-0 w-40 w-xs-100 mb-1 mt-1"
            >
              <i className="mr-2 simple-icon-share" />
              <span className="align-middle d-inline-block truncate luci-survey-name">{item.name}</span>
            </NavLink>
            <div className="w-10 text-muted w-xs-100">
                {item.username}
            </div>
            <p className="mb-1 text-muted text-small w-15 w-xs-100">
              {item.category}
            </p>
            <div className="w-10 text-muted w-xs-100">
                {item.responses}
            </div>
            <p className="mb-1 text-muted text-small w-15 w-xs-100">
              <TimeAgo date={item.created_at}/>
            </p>
          </CardBody>
          <div className="custom-control custom-checkbox pl-1 align-self-center mr-4">
            <CustomInput
              className="itemCheck mb-0"
              type="checkbox"
              id={`check_${item.id}`}
              checked={isSelected}
              onChange={(event) => handleCheckChange(event, item.id)}
              label=""
            />
          </div>
        </div>
      </Card>
    </Colxx>
  );
};

const mapStateToProps = ({  }) => {
  return {
  };
};

export default injectIntl(
  connect(mapStateToProps, {
  })(React.memo(SharedSurveyListItem))
);