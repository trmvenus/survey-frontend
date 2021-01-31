import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const MyDashboard = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ './mydashboard')
);

const WebsiteDashboard = React.lazy(() => 
  import(/* webpackChunkName: "dashboard-website" */ './websitedashboard')
);

const Dashboards = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/mydashboard`} />

      <Route
        path={`${match.url}/mydashboard`}
        render={(props) => <MyDashboard {...props} />}
      />
      <Route
        path={`${match.url}/websitedashboard`}
        render={(props) => <WebsiteDashboard {...props} />}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Dashboards;
