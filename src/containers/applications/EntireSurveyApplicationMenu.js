/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/no-array-index-key */
import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { NavItem, } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import classnames from 'classnames';

import IntlMessages from '../../helpers/IntlMessages';
import ApplicationMenu from '../../components/common/ApplicationMenu';

import { 
  getEntireSurveyListWithFilter,
} from '../../redux/actions';

const SurveyApplicationMenu = ({
  filter,
  entireSurveyItems,
  isLoaded,

  getEntireSurveyListWithFilterAction,
}) => {
  const addFilter = (column, value) => {
    getEntireSurveyListWithFilterAction(column, value);
  };

  return (
    <ApplicationMenu>
      <PerfectScrollbar
        options={{ suppressScrollX: true, wheelPropagation: false }}
      >
        <div className="p-4">
          <p className="text-muted text-small">
            <IntlMessages id="survey.status" />
          </p>
          <ul className="list-unstyled mb-5">
            <NavItem className={classnames({ active: !filter })}>
              <NavLink to="#" onClick={() => addFilter('', '')} location={{}}>
                <i className="simple-icon-reload" />
                <IntlMessages id="survey.all-surveys" />
                <span className="float-right">
                  {isLoaded && entireSurveyItems.length}
                </span>
              </NavLink>
            </NavItem>
            <NavItem
              className={classnames({
                active:
                  filter &&
                  filter.column === 'is_active' &&
                  filter.value === true,
              })}
            >
              <NavLink
                to="#"
                location={{}}
                onClick={() => addFilter('is_active', true)}
              >
                <i className="simple-icon-refresh" />
                <IntlMessages id="survey.active-surveys" />
                <span className="float-right">
                  {isLoaded &&
                    entireSurveyItems.filter((x) => x.is_active === true).length}
                </span>
              </NavLink>
            </NavItem>
            <NavItem
              className={classnames({
                active:
                  filter &&
                  filter.column === 'is_share' &&
                  filter.value === true,
              })}
            >
              <NavLink
                to="#"
                location={{}}
                onClick={() => addFilter('is_share', true)}
              >
                <i className="simple-icon-check" />
                <IntlMessages id="survey.shared-surveys" />
                <span className="float-right">
                  {isLoaded &&
                    entireSurveyItems.filter((x) => x.is_share === true).length}
                </span>
              </NavLink>
            </NavItem>
          </ul>
        </div>
      </PerfectScrollbar>
    </ApplicationMenu>
  );
};

const mapStateToProps = ({ entireSurvey, }) => ({
  filter: entireSurvey.filter,
  entireSurveyItems: entireSurvey.entireSurveyItems,
  isLoaded: entireSurvey.isLoaded,
});

export default connect(mapStateToProps, {
  getEntireSurveyListWithFilterAction: getEntireSurveyListWithFilter,
})(SurveyApplicationMenu);
