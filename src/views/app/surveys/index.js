import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const MySurveyList = React.lazy(() =>
  import(/* webpackChunkName: "mysurveys" */ './mysurveys')
);

const RunSurvey = React.lazy(() =>
  import(/* webpackChunkName: "run" */ './run')
);

const EditSurvey = React.lazy(() =>
  import(/* webpackChunkName: "edit" */ './edit')
);

const ResultsSurvey = React.lazy(() =>
  import(/* webpackChunkName: "results" */ './results')
);

const ReportsSurvey = React.lazy(() =>
  import(/* webpackChunkName: "reports" */ './reports')
);

const LinksSurvey = React.lazy(() =>
  import(/* webpackChunkName: "links" */ './links')
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
        path={`${match.url}/run/:surveyid`}
        render={(props) => <RunSurvey {...props} />}
        isExact
      />
      <Route
        path={`${match.url}/edit/:surveyid`}
        render={(props) => <EditSurvey {...props} />}
        isExact
      />
      <Route
        path={`${match.url}/results/:surveyid`}
        render={(props) => <ResultsSurvey {...props} />}
        isExact
      />
      <Route
        path={`${match.url}/reports/:surveyid`}
        render={(props) => <ReportsSurvey {...props} />}
        isExact
      />
      <Route
        path={`${match.url}/links/:surveyid`}
        render={(props) => <LinksSurvey {...props} />}
        isExact
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);

export default Surveys;
