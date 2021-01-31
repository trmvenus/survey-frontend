import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const MySurveyList = React.lazy(() =>
  import(/* webpackChunkName: "mysurveys" */ './mysurveys')
);

const SharedSurveyList = React.lazy(() =>
  import(/* webpackChunkName: "sharedsurveys" */ './sharedsurveys')
);

const Survey = React.lazy(() =>
  import(/* webpackChunkName: "run" */ './survey')
);

const Surveys = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/mysurveys`} />
      <Route
        path={`${match.url}/mysurveys`}
        render={(props) => <MySurveyList {...props} />}
      />
      <Route
        path={`${match.url}/sharedsurveys`}
        render={(props) => <SharedSurveyList {...props} />}
      />
      <Route
        path={`${match.url}/:surveyid`}
        render={(props) => <Survey {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);

export default Surveys;
