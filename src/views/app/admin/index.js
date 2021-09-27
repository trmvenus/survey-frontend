import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ProtectedRoute, UserRole } from '../../../helpers/authHelper';

const Users = React.lazy(() =>
  import(/* webpackChunkName: "users" */ './users')
);
const Organizations = React.lazy(() => 
  import(/* webpackChunkName: "organizations" */ './organizations')
)
const Pillars = React.lazy(() => 
  import(/* webpackChunkName: "organizations" */ './pillars')
)
const AdminSettings = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/users`} />
      <ProtectedRoute
        path={`${match.url}/users`}
        component={Users}
        roles={[UserRole.Admin, UserRole.OrgAdmin]}
      />
      <ProtectedRoute
        path={`${match.url}/organizations`}
        component={Organizations}
        roles={[UserRole.Admin]}
      />
       <ProtectedRoute
        path={`${match.url}/pillars`}
        component={Pillars}
        roles={[UserRole.Admin]}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default AdminSettings;
