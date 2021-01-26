import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Row, Card, CardBody, CardTitle, } from 'reactstrap';
import {Button} from 'reactstrap';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import 'react-datepicker/dist/react-datepicker.css';
import 'rc-switch/assets/index.css';

// Components
import { Colxx } from '../../components/common/CustomBootstrap';

// Helpers
import IntlMessages from '../../helpers/IntlMessages';

// Redux
import { resetReportShareLink, } from '../../redux/actions';
import { shareReportPath } from '../../constants/defaultValues';

const CustomizeTab = ({
  reportItem,

  resetReportShareLinkAction,
}) => {

  const [shareReportFullPath, setShareReportFullPath] = useState('');

  const handleResetLink = () => {
    resetReportShareLinkAction({id: reportItem.id});
  }

  useEffect(() => {
    if (reportItem) {
      setShareReportFullPath(shareReportPath+reportItem.share_id);
    }
  }, [reportItem]);

  return (
    <Row>
      <Colxx xxs={12}>
        <Card>
          <div className="position-absolute card-top-buttons">
            <CopyToClipboard 
              text={shareReportFullPath}
            >
              <Button className="outline-primary mr-3">
                <IntlMessages id="report.copy-url" />
              </Button>
            </CopyToClipboard>
            
            <Button className="outline-primary" onClick={handleResetLink}>
              <IntlMessages id="report.reset-link" />
            </Button>
          </div>
          <CardBody>
            <CardTitle>
              <IntlMessages id="report.share-tab-title" />
            </CardTitle>

            <p>
              <IntlMessages id="report.share-tab-comment" />
            </p>

            <h5 className="mb-3">
              <a href={shareReportFullPath} target="_blank">
                {shareReportFullPath}
              </a>
            </h5>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  )
}

const mapStateToProps = ({ report, }) => {
  return {
    reportItem: report.reportItem,
  };
};

export default connect(mapStateToProps, {
    resetReportShareLinkAction: resetReportShareLink,
  })(CustomizeTab);