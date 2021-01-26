/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-use-before-define */
import React from 'react';
import { NavLink } from 'react-router-dom';

import {
  adminRoot,
} from '../../constants/defaultValues';

const ShareTopNav = ({
}) => {
  return (
    <nav className="navbar fixed-top">
      <NavLink className="navbar-logo" to={adminRoot}>
        <span className="logo d-none d-xs-block" />
        <span className="logo-mobile d-block d-xs-none" />
      </NavLink>
    </nav>
  );
};

export default ShareTopNav;
