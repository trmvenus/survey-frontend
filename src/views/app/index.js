import React, { Suspense, useEffect, useState } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';
import { ProtectedRoute, UserRole } from '../../helpers/authHelper';
import { getCurrentUser as getCurrentUserFromLocalStorage } from '../../helpers/Utils';
import { 
  getCurrentUser, 
  getOrganizationList, 
  getPillarList, 
  getSurveyList,
  getSharedSurveyList,
  getEntireSurveyList,
} from '../../redux/actions';

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
  getEntireSurveyListAction,
  getMySurveyListAction,
  getSharedSurveyListAction,
}) => {
  const [currentUser] = useState(getCurrentUserFromLocalStorage());

  useEffect(() => {
    getCurrentUserAction();

    getMySurveyListAction();

    getSharedSurveyListAction();

    getPillarListAction();

    getOrganizationListAction();

    if (currentUser.role == UserRole.Admin) {
      getEntireSurveyListAction();
    }
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
  getEntireSurveyListAction: getEntireSurveyList,
  getMySurveyListAction: getSurveyList,
  getSharedSurveyListAction: getSharedSurveyList,
})(App));
