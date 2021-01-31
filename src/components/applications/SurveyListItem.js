import React, {useState} from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Card, CardBody, CustomInput, NavItem, Collapse } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import classnames from 'classnames';

import IntlMessages from '../../helpers/IntlMessages';
import { NotificationManager } from '../common/react-notifications';
import { Colxx } from '../common/CustomBootstrap';
import { adminRoot } from '../../constants/defaultValues';
import { shareSurveyItem } from '../../redux/actions';
import { getCurrentUser } from '../../helpers/Utils';

const SurveyListItem = ({ 
  intl, 

  item, 
  handleCheckChange, 
  isSelected,

  shareSurveyItemAction,  
}) => {
  const [currentUser] = useState(getCurrentUser());
  const [collapse, setCollapse] = useState(false);

  const { messages } = intl;

  const handleClickRun = (event) => {
    if (item && item.is_active) {
      NotificationManager.info(messages['run.not-active'], 'Cannot Run Survey', 3000, null, null, '');
      event.preventDefault();
    } else if (item.is_multi_responses === false && item.myresponses > 0) {
      NotificationManager.info(messages['run.already-posted'], 'Cannot Run Survey', 3000, null, null, '');
      event.preventDefault();
    }
  }

  const handleShareSurvey = () => {
    shareSurveyItemAction({id: item.id})
  }

  return (
    <Colxx className="survey-list-item" xxs="12">
      <Card className="card d-flex mb-3">
        <div className="d-flex flex-grow-1 min-width-zero">
          <CardBody
            className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center"
          >
            <NavLink
              to='#'
              onClick={() => setCollapse(!collapse)}
              className="list-item-heading mb-0 w-50 w-xs-100 mb-1 mt-1"
            >
              <i
                className={`${
                  item.status === 'COMPLETED'
                    ? 'simple-icon-check heading-icon'
                    : 'simple-icon-refresh heading-icon'
                  }`}
              />
              <span className="align-middle d-inline-block truncate luci-survey-name">{item.name}</span>
            </NavLink>
            <div className="w-10 text-muted w-xs-100">
                {item.responses}
            </div>
            <p className="mb-1 text-muted text-small w-15 w-xs-100">
              {item.category}
            </p>
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

        <Collapse isOpen={collapse}>
          <div className="card-body pt-1">
            <ul className="list-unstyled list-group flex-sm-row flex-column">
              <NavItem className={classnames({'text-muted luci-cursor-not-allowed': !currentUser.p_view})}>
                {(currentUser.p_view) ? (
                <NavLink to={`${adminRoot}/surveys/${item.id}/run`} onClick={handleClickRun} location={{}}>
                  <i className="simple-icon-control-play" />
                  <IntlMessages id="survey.run" />
                </NavLink>
                ) : (
                <>
                  <i className="simple-icon-control-play" />
                  <IntlMessages id="survey.run" />
                </>
                )}
              </NavItem>
              <NavItem className={classnames({'text-muted luci-cursor-not-allowed': !currentUser.p_edit})}>
                {(currentUser.p_edit) ? (
                <NavLink to={`${adminRoot}/surveys/${item.id}/edit`} location={{}}>
                  <i className="simple-icon-pencil" />
                  <IntlMessages id="survey.edit" />
                </NavLink>
                ) : (
                <>
                  <i className="simple-icon-pencil" />
                  <IntlMessages id="survey.edit" />
                </>
                )}
              </NavItem>
              <NavItem className={classnames({'text-muted luci-cursor-not-allowed': !currentUser.p_view})}>
                {(currentUser.p_view) ? (
                <NavLink to={`${adminRoot}/surveys/${item.id}/results`} onClick={() => {}} location={{}}>
                  <i className="simple-icon-list" />
                  <IntlMessages id="survey.results" />
                </NavLink>
                ) : (
                <>
                  <i className="simple-icon-list" />
                  <IntlMessages id="survey.results" />
                </>
                )}
              </NavItem>
              <NavItem className={classnames({'text-muted luci-cursor-not-allowed': !currentUser.p_view})}>
                {(currentUser.p_view) ? (
                <NavLink to={`${adminRoot}/surveys/${item.id}/reports`} onClick={() => {}} location={{}}>
                  <i className="simple-icon-chart" />
                  <IntlMessages id="survey.reports" />
                </NavLink>
                ) : (
                <>
                  <i className="simple-icon-chart" />
                  <IntlMessages id="survey.reports" />
                </>
                )}
              </NavItem>
              <NavItem className={classnames({'text-muted luci-cursor-not-allowed': !currentUser.p_view})}>
                {(currentUser.p_view) ? (
                <NavLink to={`${adminRoot}/surveys/${item.id}/links`} onClick={() => {}} location={{}}>
                  <i className="simple-icon-link" />
                  <IntlMessages id="survey.links" />
                </NavLink>
                ) : (
                <>
                  <i className="simple-icon-link" />
                  <IntlMessages id="survey.links" />
                </>
                )}
              </NavItem>
              <NavItem className={classnames({'text-muted luci-cursor-not-allowed': !currentUser.p_edit})}>
                {(currentUser.p_edit) ? (
                <NavLink to="#" onClick={() => {handleShareSurvey()}} location={{}}>
                  <i className="simple-icon-share" />
                  {item.is_share ? (
                    <IntlMessages id="survey.unshare" />
                  ) : (
                    <IntlMessages id="survey.share" />
                  )}
                </NavLink>
                ) : (
                <>
                  <i className="simple-icon-share" />
                  {item.is_share ? (
                    <IntlMessages id="survey.unshare" />
                  ) : (
                    <IntlMessages id="survey.share" />
                  )}
                </>
                )}
              </NavItem>
              <NavItem className={classnames({'text-muted luci-cursor-not-allowed': !currentUser.p_edit})}>
                {(currentUser.p_edit) ? (
                <NavLink to={`${adminRoot}/surveys/${item.id}/settings`} onClick={() => {}} location={{}}>
                  <i className="simple-icon-settings" />
                  <IntlMessages id="survey.settings" />
                </NavLink>
                ) : (
                <>
                  <i className="simple-icon-settings" />
                  <IntlMessages id="survey.settings" />
                </>
                )}
              </NavItem>
            </ul>
          </div>
        </Collapse>
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
    shareSurveyItemAction: shareSurveyItem
  })(React.memo(SurveyListItem))
);

