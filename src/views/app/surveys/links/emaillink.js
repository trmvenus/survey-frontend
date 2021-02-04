import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { 
  Row,
  Card,
  CardBody,
  CardTitle,
  Table,
} from 'reactstrap';
import { CircularProgressbar } from 'react-circular-progressbar';

// Components
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import { NotificationManager } from '../../../../components/common/react-notifications';

// Containers
import Breadcrumb from '../../../../containers/navs/Breadcrumb';

// Helpers
import IntlMessages from '../../../../helpers/IntlMessages';

// Redux
import { getEmailLinkItem, sendEmailContact } from '../../../../redux/actions';


const EmailLinkPage = ({ 
  intl,
  match,
  surveyid,
  
  emailLinkItem,
  emailLinkError,
  isEmailLinkItemLoaded,
  isEmailSending,

  getEmailLinkItemAction,
  sendEmailContactAction,
}) => {
  const [total, setTotal] = useState('');
  const [sent, setSent] = useState('');
  const [remaining, setRemaining] = useState('');
  const [opened, setOpened] = useState('');
  const [responses, setResponses] = useState('');
  const [complete, setComplete] = useState('');

  const [sendId, setSendId] = useState(null);

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
      let s = 0, r = 0, o = 0, rs = 0, comp = 0;
      for (const contact of emailLinkItem.contacts) {
        if (contact.status === 'sent') {
          s ++;
          if (contact.is_open === true) {
            o ++;
          }
        } else {
          r ++;
        }

        if (contact.is_responded) {
          rs ++;
          if (contact.is_completed) {
            comp ++;
          }
        }
      }

      setTotal(emailLinkItem.contacts.length);
      setSent(s);
      setRemaining(r);
      setOpened(o);
      setResponses(rs);
      setComplete(comp);
    }
  }, [emailLinkItem]);

  const handleSendEmail = (contact) => {
    setSendId(contact.id);
    sendEmailContactAction(emailLinkItem.id, contact.email_address);
  }

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id="menu.emaillink" />:&nbsp;
              {isEmailLinkItemLoaded && emailLinkItem && (
                <span className="text-primary">{emailLinkItem.name}</span>
              )}
            </h1>
            <Breadcrumb match={{...match, linkname: emailLinkItem ? emailLinkItem.name : ''}}/>
          </div>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx md="6" className="mb-4">
          <Card className="h-100">
            <CardBody className="justify-content-between d-flex flex-row">
              <div>
                <CardTitle>
                  <h2><IntlMessages id='link.invitations' /></h2>
                </CardTitle>

                <p className='align-items-center'><span className='h4 text-primary'>{total}</span> : <IntlMessages id='link.total' /></p>

                <p><span className='h4 text-primary'>{sent}</span> : <IntlMessages id='link.sent' /></p>

                <p><span className='h4 text-primary'>{remaining}</span> : <IntlMessages id='link.remaining' /></p>

                <p><span className='h4 text-primary'>{opened}</span> : <IntlMessages id='link.opened' /></p>
              </div>

              <div className="luci-emaillink-progress-bar position-relative">
                <CircularProgressbar
                  strokeWidth={4}
                  value={100 * sent / total}
                  text={`${sent} / ${total}`}
                />
              </div>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx md="6" className="mb-4">
          <Card className="h-100">
            <CardBody className="justify-content-between d-flex flex-row">
              <div>
                <CardTitle>
                  <h2><IntlMessages id='link.responses' /></h2>
                </CardTitle>

                <p className='align-items-center'><span className='h4 text-primary'>{responses}</span> : <IntlMessages id='link.total' /></p>

                <p className='align-items-center'><span className='h4 text-primary'>{complete}</span> : <IntlMessages id='link.complete' /></p>
              </div>

              <div className="luci-emaillink-progress-bar position-relative">
                <CircularProgressbar
                  strokeWidth={4}
                  value={100 * complete / responses}
                  text={`${complete} / ${responses}`}
                />
              </div>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <CardTitle>
                Recipients
              </CardTitle>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th><IntlMessages id='link.email-address' /></th>
                    <th><IntlMessages id='forms.firstname' /></th>
                    <th><IntlMessages id='forms.lastname' /></th>
                    <th><IntlMessages id='link.sent' /></th>
                    <th><IntlMessages id='link.responded' /></th>
                    <th><IntlMessages id='nav.action' /></th>
                  </tr>
                </thead>
                <tbody>
                  {emailLinkItem && emailLinkItem.contacts.map((contact, i) => (
                    <tr key={i}>
                      <th scope="row">{i+1}</th>
                      <td>{contact.email_address}</td>
                      <td>{contact.first_name}</td>
                      <td>{contact.last_name}</td>
                      <td>{contact.status === 'sent' ? <IntlMessages id='modal.yes' /> : contact.status === 'failed' ? <IntlMessages id='link.failed' /> : <IntlMessages id='modal.no' />}</td>
                      <td>{contact.is_responded ? contact.is_completed ? <IntlMessages id='link.complete' /> : <IntlMessages id='modal.yes' /> : <IntlMessages id='modal.no' />}</td>
                      <td className='position-relative'>
                        {(isEmailSending && contact.id === sendId) ? (
                          <div className='luci-loading' />
                        ) : (
                          contact.status === 'sent' ? (
                            <span><IntlMessages id='link.sent' /></span>
                          ) : (
                            <a className='luci-cursor-grabbing' onClick={() => handleSendEmail(contact)}><i className='simple-icon-paper-plane mr-2' /><IntlMessages id='pages.send' /></a>
                          )
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
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
    isEmailSending: emaillink.isSending,
  };
};

export default injectIntl(
  connect(mapStateToProps, {
    getEmailLinkItemAction: getEmailLinkItem,
    sendEmailContactAction: sendEmailContact,
  })(EmailLinkPage)
);