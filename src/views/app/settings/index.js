import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Account = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './account')
);
const Settings = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/account`} />
      <Route
        path={`${match.url}/account`}
        render={(props) => <Account {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Settings;
