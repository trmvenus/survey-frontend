import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const ProfileSettings = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './profile')
);
const Settings = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/profile`} />
      <Route
        path={`${match.url}/profile`}
        render={(props) => <ProfileSettings {...props} />}
      />
      <Redirect to="/surveys" />
    </Switch>
  </Suspense>
);
export default Settings;
