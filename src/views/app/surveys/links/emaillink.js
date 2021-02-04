import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { 
  Row,
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import { CircularProgressbar } from 'react-circular-progressbar';

// Components
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import { NotificationManager } from '../../../../components/common/react-notifications';

// Containers
import Breadcrumb from '../../../../containers/navs/Breadcrumb';

// Helpers
import IntlMessages from '../../../../helpers/IntlMessages';
import Button from 'reactstrap/lib/Button';
import { getEmailLinkItem, } from '../../../../redux/actions';
import { adminRoot, shareSurveyPath } from '../../../../constants/defaultValues';
import Col from 'reactstrap/lib/Col';


const EmailLinkPage = ({ 
  intl,
  match,
  surveyid,
  
  emailLinkItem,
  emailLinkError,
  isEmailLinkItemLoaded,

  getEmailLinkItemAction,
}) => {
  const [total, setTotal] = useState('');
  const [sent, setSent] = useState('');
  const [remaining, setRemaining] = useState('');
  const [opened, setOpened] = useState('');

  const { messages } = intl;

  useEffect(() => {
    if (emailLinkError) {
      NotificationManager.warning(emailLinkError.message??emailLinkError, 'Links Error', 3000, null, null, '');
    }
  }, [emailLinkError]);

  useEffect(() => {
    getEmailLinkItemAction(match.params.linkid);
  }, [match]);

  useEffect(() => {
    if (emailLinkItem) {
      let s = 0, r = 0, o = 0;
      for (const contact of emailLinkItem.contacts) {
        if (contact.status === 'sent') {
          s ++;
          if (contact.is_open === true) {
            o ++;
          }
        } else {
          r ++;
        }
      }

      setTotal(emailLinkItem.contacts.length);
      setSent(s);
      setRemaining(r);
      setOpened(o);
    }
  }, emailLinkItem)

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id="menu.emaillink" />:&nbsp;
              {emailLinkItem && (
                <span className="text-primary">{emailLinkItem.name}</span>
              )}
            </h1>
            <Breadcrumb match={{...match, linkname: emailLinkItem ? emailLinkItem.name : ''}}/>
          </div>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="6" className="mb-4">
          <Card>
            <CardBody className="justify-content-between d-flex flex-row">
              <div>
                <CardTitle>
                  <h2><IntlMessages id='link.invitations' /></h2>
                </CardTitle>

                <p><IntlMessages id='link.total' />: {total}</p>

                <p><IntlMessages id='link.sent' />: {sent}</p>

                <p><IntlMessages id='link.remaining' />: {remaining}</p>

                <p><IntlMessages id='link.opened' />: {opened}</p>
              </div>

              <div className="luci-emaillink-progress-bar position-relative">
                <CircularProgressbar
                  strokeWidth={4}
                  value={100 * sent / total}
                  text={`${sent}/${total}`}
                />
              </div>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx xxs="6" className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>
                <IntlMessages id='link.responses' />
              </CardTitle>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  )
};

const mapStateToProps = ({ emaillink, }) => {
  return {
    emailLinkItem: emaillink.emailLinkItem,
    emailLinkError: emaillink.error,
    isEmailLinkItemLoaded: emaillink.isLoadedItem,
  };
};

export default injectIntl(
  connect(mapStateToProps, {
    getEmailLinkItemAction: getEmailLinkItem,
  })(EmailLinkPage)
);