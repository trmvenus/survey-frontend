import React, { Suspense, useEffect } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';
import { ProtectedRoute, UserRole } from '../../helpers/authHelper';
import { getCurrentUser, getOrganizationList, getPillarList, getSurveyList } from '../../redux/actions';

const Dashboards = React.lazy(() => 
  import(/* webpackChunkName: "viwes-dashboard" */ './dashboards')
);
const Surveys = React.lazy(() =>
  import(/* webpackChunkName: "viwes-surveys" */ './surveys')
);
const Settings = React.lazy(() =>
  import(/* webpackChunkName: "viwes-settings" */ './settings')
);
const AdminSettings = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './admin')
);
const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './blank-page')
);

const App = ({ 
  match,
  getCurrentUserAction,
  getPillarListAction,
  getOrganizationListAction,
  getSurveyListAction,
}) => {

  useEffect(() => {
    getCurrentUserAction();

    getSurveyListAction();

    getPillarListAction();

    getOrganizationListAction();
  }, []);
  
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/dashboards`} />
            <Route
              path={`${match.url}/dashboards`}
              render={(props) => <Dashboards {...props} />}
            />
            <Route
              path={`${match.url}/surveys`}
              render={(props) => <Surveys {...props} />}
            />
            <Route
              path={`${match.url}/settings`}
              render={(props) => <Settings {...props} />}
            />
            <ProtectedRoute
              path={`${match.url}/admin`}
              component={AdminSettings}
              roles={[UserRole.Admin]}
            />
            <Route
              path={`${match.url}/blank-page`}
              render={(props) => <BlankPage {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {
  getCurrentUserAction: getCurrentUser,
  getPillarListAction: getPillarList,
  getOrganizationListAction: getOrganizationList,
  getSurveyListAction: getSurveyList,
})(App));
