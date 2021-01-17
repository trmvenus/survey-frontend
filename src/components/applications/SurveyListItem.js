import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, Badge, CustomInput, NavItem, Collapse } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import TimeAgo from 'react-timeago';

import IntlMessages from '../../helpers/IntlMessages';
import { Colxx } from '../common/CustomBootstrap';
import { adminRoot } from '../../constants/defaultValues';
import { shareSurveyItem } from '../../redux/actions';

const SurveyListItem = ({ 
  item, 
  handleCheckChange, 
  isSelected,

  shareSurveyItemAction,
}) => {
  const [collapse, setCollapse] = useState(false);

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
              <NavItem>
                <NavLink to={`${adminRoot}/surveys/run/${item.id}`} location={{}}>
                  <i className="simple-icon-control-play" />
                  <IntlMessages id="survey.run" />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={`${adminRoot}/surveys/edit/${item.id}`} location={{}}>
                  <i className="simple-icon-pencil" />
                  <IntlMessages id="survey.edit" />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={`${adminRoot}/surveys/results/${item.id}`} onClick={() => {}} location={{}}>
                  <i className="simple-icon-list" />
                  <IntlMessages id="survey.results" />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={`${adminRoot}/surveys/reports/${item.id}`} onClick={() => {}} location={{}}>
                  <i className="simple-icon-chart" />
                  <IntlMessages id="survey.reports" />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={`${adminRoot}/surveys/links/${item.id}`} onClick={() => {}} location={{}}>
                  <i className="simple-icon-link" />
                  <IntlMessages id="survey.links" />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="#" onClick={() => {handleShareSurvey()}} location={{}}>
                  <i className="simple-icon-share" />
                  {item.is_share ? (
                    <IntlMessages id="survey.unshare" />
                  ) : (
                    <IntlMessages id="survey.share" />
                  )}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="#" onClick={() => {}} location={{}}>
                  <i className="simple-icon-settings" />
                  <IntlMessages id="survey.settings" />
                </NavLink>
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

export default 
  connect(mapStateToProps, {
    shareSurveyItemAction: shareSurveyItem
  })(React.memo(SurveyListItem));

