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

const ResultsSurvey = React.lazy(() =>
  import(/* webpackChunkName: "results" */ './results')
);

const ResultPage = React.lazy(() =>
  import(/* webpackChunkName: "results" */ './results/result')
);

const ReportsSurvey = React.lazy(() =>
  import(/* webpackChunkName: "reports" */ './reports')
);

const LinksSurvey = React.lazy(() =>
  import(/* webpackChunkName: "links" */ './links')
);

const SummarySurvey = React.lazy(() => 
  import(/* webpackChunkName: "links" */ './summary')
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
        render={(props) => <SummarySurvey surveyid={survey_id} {...props} />}
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
        render={(props) => <ResultsSurvey surveyid={survey_id} {...props} />}
        exact
      />
      <Route
        path={`${match.url}/results/:resultid`}
        render={(props) => <ResultPage surveyid={survey_id} {...props} />}
        exact
      />
      <Route
        path={`${match.url}/reports`}
        render={(props) => <ReportsSurvey surveyid={survey_id} {...props} />}
        exact
      />
      <Route
        path={`${match.url}/links`}
        render={(props) => <LinksSurvey surveyid={survey_id} {...props} />}
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