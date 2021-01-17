import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ProtectedRoute, UserRole } from '../../../helpers/authHelper';

const Users = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './users')
);
const AdminSettings = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/users`} />
      <ProtectedRoute
        path={`${match.url}/users`}
        component={Users}
        roles={[UserRole.Admin]}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default AdminSettings;
