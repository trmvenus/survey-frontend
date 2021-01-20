/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import IntlMessages from '../../helpers/IntlMessages';
import { adminRoot } from '../../constants/defaultValues';

const getMenuTitle = (sub) => {
  if('/'+sub===adminRoot) return <IntlMessages id="menu.home" />;
  else if (+sub>0) return <>{sub}</>;
  return <IntlMessages id={`menu.${sub}`} />;
};

const getUrl = (path, sub, index) => {
  return path.split(sub)[0] + sub;
};

const BreadcrumbContainer = ({ heading, match }) => {
  return (
    <>
      {heading && (
        <h1>
          <IntlMessages id={heading} />
        </h1>
      )}
      <BreadcrumbItems match={match} />
    </>
  );
};

const BreadcrumbItems = ({ match }) => {
  let path = match.path.substr(1);
  let paths = path.split('/');
  // if (paths[paths.length - 1].indexOf(':') > -1) {
  //   paths = paths.filter((x) => x.indexOf(':') === -1);
  // }
  if (paths.length > 1 && paths[paths.length - 2] == ':surveyid') {
    paths[paths.length-2] = match.params.surveyid;
    path = path.replace(':surveyid', match.params.surveyid);
  }
  if (paths[paths.length - 1] == ':resultid') {
    paths[paths.length-1] = match.params.resultid;
    path = path.replace(':resultid', match.params.resultid);
  }

  return (
    <>
      <Breadcrumb className="pt-0 breadcrumb-container d-none d-sm-block d-lg-inline-block">
        {paths.map((sub, index) => {
          return (
            <BreadcrumbItem key={index} active={paths.length === index + 1}>
              {paths.length !== index + 1 ? (
                <NavLink to={`/${getUrl(path, sub, index)}`}>
                  {getMenuTitle(sub)}
                </NavLink>
              ) : (
                getMenuTitle(sub)
              )}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </>
  );
};

export default BreadcrumbContainer;
