import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { ProtectedRoute, UserRole } from '../../../helpers/authHelper';

const DashboardDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ './default')
);

const Dashboards = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/default`} />

      <ProtectedRoute
        path={`${match.url}/default`}
        component={DashboardDefault}
        roles={[UserRole.Admin, UserRole.Editor]}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Dashboards;
