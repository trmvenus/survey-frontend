import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const ProfileSettings = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './profile')
);
const SecuritySettings = React.lazy(() => 
  import(/* webpackChunkName: "second" */ './security')
);

const Settings = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/profile`} />
      <Route
        path={`${match.url}/profile`}
        render={(props) => <ProfileSettings {...props} />}
      />
      <Route
        path={`${match.url}/security`}
        render={(props) => <SecuritySettings {...props} />}
      />
     
      <Route
        path={`${match.url}/pillar`}
        render={(props) => <SecuritySettings {...props} />}
      />
      <Redirect to="/surveys" />
    </Switch>
  </Suspense>
);
export default Settings;
