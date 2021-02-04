import React, { Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import {
  getSurvey,
} from '../../../redux/actions';

const RunSurvey = React.lazy(() =>
  import(/* webpackChunkName: "run" */ './run')
);

const EditSurvey = React.lazy(() =>
  import(/* webpackChunkName: "edit" */ './edit')
);

const SurveyResults = React.lazy(() =>
  import(/* webpackChunkName: "results" */ './results')
);

const ResultPage = React.lazy(() =>
  import(/* webpackChunkName: "results" */ './results/result')
);

const SurveyReports = React.lazy(() =>
  import(/* webpackChunkName: "reports" */ './reports')
);

const ReportPage = React.lazy(() =>
  import(/* webpackChunkName: "results" */ './reports/report')
);

const SurveyLinks = React.lazy(() =>
  import(/* webpackChunkName: "links" */ './links')
);

const EmailLinkPage = React.lazy(() => 
import(/* webpackChunkName: "emaillink" */ './links/emaillink')
);

const ManualRunSurvey = React.lazy(() =>
  import(/* webpackChunkName: "manual" */ './manual')
);

const SurveySettings = React.lazy(() =>
  import(/* webpackChunkName: "settings" */ './settings')
);

const SurveySummary = React.lazy(() => 
  import(/* webpackChunkName: "summary" */ './summary')
);

const Survey = ({ match, getSurveyItemAction }) => {

  const survey_id = match.params.surveyid;

  useEffect(() => {
    getSurveyItemAction({id: survey_id});
  }, [getSurveyItemAction, survey_id]);

  return (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}`}
        render={(props) => <SurveySummary surveyid={survey_id} {...props} />}
        exact
      />
      <Route
        path={`${match.url}/run`}
        render={(props) => <RunSurvey surveyid={survey_id} {...props} />}
        exact
      />
      <Route
        path={`${match.url}/edit`}
        render={(props) => <EditSurvey surveyid={survey_id} {...props} />}
        exact
      />
      <Route
        path={`${match.url}/results`}
        render={(props) => <SurveyResults surveyid={survey_id} {...props} />}
        exact
      />
      <Route
        path={`${match.url}/results/:resultid`}
        render={(props) => <ResultPage surveyid={survey_id} {...props} />}
        exact
      />
      <Route
        path={`${match.url}/reports`}
        render={(props) => <SurveyReports surveyid={survey_id} {...props} />}
        exact
      />
      <Route
        path={`${match.url}/reports/:reportid`}
        render={(props) => <ReportPage surveyid={survey_id} {...props} />}
        exact
      />
      <Route
        path={`${match.url}/links`}
        render={(props) => <SurveyLinks surveyid={survey_id} {...props} />}
        exact
      />
      <Route
        path={`${match.url}/links/:linkid`}
        render={(props) => <EmailLinkPage surveyid={survey_id} {...props} />}
        exact
      />
      <Route
        path={`${match.url}/manual`}
        render={(props) => <ManualRunSurvey surveyid={survey_id} {...props} />}
        exact
      />
      <Route
        path={`${match.url}/settings`}
        render={(props) => <SurveySettings surveyid={survey_id} {...props} />}
        exact
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
  );
}

const mapStateToProps = ({ }) => {
  return {
  };
};

export default connect(mapStateToProps, {
    getSurveyItemAction: getSurvey,
  })(Survey);