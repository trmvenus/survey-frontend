import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Footer from '../containers/navs/Footer';
import ShareTopnav from '../containers/navs/ShareTopnav';

const ShareLayout = ({ 
  containerClassnames, 
  children,
  history ,
}) => {

  return (
    <div id="app-container" className='luci-share-container'>
      <ShareTopnav history={history} />
      <main>
        <div className="container-fluid">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

const mapActionToProps = {
};

export default withRouter(
  connect(mapStateToProps, mapActionToProps)(ShareLayout)
);
