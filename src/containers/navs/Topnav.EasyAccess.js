import React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import IntlMessages from '../../helpers/IntlMessages';

const TopnavEasyAccess = () => {
  return (
    <div className="position-relative d-none d-sm-inline-block">
      <UncontrolledDropdown className="dropdown-menu-right">
        <DropdownToggle className="header-icon" color="empty">
          <i className="simple-icon-grid" />
        </DropdownToggle>
        <DropdownMenu
          className="position-absolute mt-3"
          right
          id="iconMenuDropdown"
        >
          <NavLink to="/app/dashboards" className="icon-menu-item">
            <i className="iconsminds-shop-4 d-block" />{' '}
            <IntlMessages id="menu.dashboards" />
          </NavLink>
          <NavLink to="/app/settings/profile" className="icon-menu-item">
            <i className="simple-icon-user d-block" />{' '}
            <IntlMessages id="menu.profile" />
          </NavLink>
          <NavLink to="/app/surveys/mysurveys" className="icon-menu-item">
            <i className="simple-icon-calculator d-block" />{' '}
            <IntlMessages id="menu.mysurveys" />
          </NavLink>
          <NavLink to="/app/surveys/sharedsurveys" className="icon-menu-item">
            <i className="simple-icon-share-alt d-block" />{' '}
            <IntlMessages id="menu.sharedsurveys" />
          </NavLink>
          <NavLink to="#" className="icon-menu-item">
            <i className="iconsminds-speach-bubble d-block" />{' '}
            <IntlMessages id="menu.chat" />
          </NavLink>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};

export default TopnavEasyAccess;
