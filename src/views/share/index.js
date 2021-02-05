import React, { Suspense, useEffect } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ShareLayout from '../../layout/ShareLayout';
import { getOrganizationList, getPillarList } from '../../redux/actions';

const ReportPage = React.lazy(() => 
  import(/* webpackChunkName: "viwes-report" */ './report')
);

const EmailRunPage = React.lazy(() => 
  import(/* webpackChunkName: "viwes-run" */ './emailrun')
);

const WebRunPage = React.lazy(() => 
  import(/* webpackChunkName: "viwes-run" */ './webrun')
);

const ShareApp = ({ 
  match,

  getPillarListAction,
  getOrganizationListAction,
}) => {

  useEffect(() => {
    getPillarListAction();

    getOrganizationListAction();
  }, []);
  
  return (
    <ShareLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Route
              path={`${match.url}/report`}
              render={(props) => <ReportPage {...props} />}
            />
            <Route
              path={`${match.url}/e/run`}
              render={(props) => <EmailRunPage {...props} />}
            />
            <Route
              path={`${match.url}/w/run`}
              render={(props) => <WebRunPage {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </ShareLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {
  getPillarListAction: getPillarList,
  getOrganizationListAction: getOrganizationList,
})(ShareApp));
