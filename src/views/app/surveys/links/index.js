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
import { NavLink } from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import classnames from 'classnames';

// Components
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import { NotificationManager } from '../../../../components/common/react-notifications';

// Containers
import Breadcrumb from '../../../../containers/navs/Breadcrumb';

// Helpers
import IntlMessages from '../../../../helpers/IntlMessages';
import Button from 'reactstrap/lib/Button';
import AddNewWebLinkModal from '../../../../containers/links/AddNewWebLinkModal';
import { getWebLinkList, deleteWebLinkItem, getEmailLinkList, deleteEmailLinkItem, sendEmailLink, } from '../../../../redux/actions';
import { adminRoot, shareSurveyPath } from '../../../../constants/defaultValues';
import AddNewEmailLinkModal from '../../../../containers/links/AddNewEmailLinkModal';


const LinksSurvey = ({ 
  intl,
  match,
  surveyid,
  
  surveyItem,
  surveyItemError,
  isSurveyItemLoaded,
  webLinkItems,
  webLinkError,
  isWebLinkItemsLoaded,
  emailLinkItems,
  emailLinkError,
  isEmailLinkItemLoaded,
  sendingEmailSuccess,

  getWebLinkListAction,
  deleteWebLinkItemAction,
  getEmailLinkListAction,
  deleteEmailLinkItemAction,
  sendEmailLinkAction,
}) => {
  const { messages } = intl;

  const [webLinkModalOpen, setWebLinkModalOpen] = useState(false);
  const [emailLinkModalOpen, setEmailLinkModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedWebLink, setSelectedWebLink] = useState(null);
  const [selectedEmailLink, setSelectedEmailLink] = useState(null);

  useEffect(() => {
    if (surveyItemError) {
      NotificationManager.warning(surveyItemError.message??surveyItemError, 'Links Error', 3000, null, null, '');
    }
  }, [surveyItemError]);

  useEffect(() => {
    if (webLinkError) {
      NotificationManager.warning(webLinkError.message??webLinkError, 'Links Error', 3000, null, null, '');
    }
  }, [webLinkError]);

  useEffect(() => {
    if (emailLinkError) {
      NotificationManager.warning(emailLinkError.message??emailLinkError, 'Links Error', 3000, null, null, '');
    }
  }, [emailLinkError]);

  useEffect(() => {
    if (sendingEmailSuccess) {
      NotificationManager.success(messages['link.email-sending-success-message'], 'Send Email', 3000, null, null, '');
    }
  }, [sendingEmailSuccess]);

  useEffect(() => {
    getWebLinkListAction({id: surveyid});
    getEmailLinkListAction({id: surveyid});
  }, [surveyid]);

  const handleAddWebLink = () => {
    setSelectedWebLink(null);
    setWebLinkModalOpen(true);
  }

  const handleEditWebLink = (webLink) => {
    setSelectedWebLink(webLink);
    setWebLinkModalOpen(true);
  }

  const handleDeleteWebLink = (webLink) => {
    setSelectedWebLink(webLink);
    setSelectedEmailLink(null);
    setDeleteModalOpen(true);
  }

  const handleAddEmailLink = () => {
    setSelectedEmailLink(null);
    setEmailLinkModalOpen(true);
  }

  const handleSendEmail = (emailLink) => {
    sendEmailLinkAction({id: emailLink.id});
  }

  const handleEditEmailLink = (emailLink) => {
    setSelectedEmailLink(emailLink);
    setEmailLinkModalOpen(true);
  }

  const handleDeleteEmailLink = (emailLink) => {
    setSelectedEmailLink(emailLink);
    setSelectedWebLink(null);
    setDeleteModalOpen(true);
  }

  const handleAddManualData = () => {

  }

  const handleDeleteLink = () => {
    if (selectedWebLink) {
      deleteWebLinkItemAction({id: selectedWebLink.id});
    } else if (selectedEmailLink) {
      deleteEmailLinkItemAction({id: selectedEmailLink.id});
    }
    setDeleteModalOpen(false);
  }

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            {surveyItem && (
            <h1>
              <IntlMessages id="survey.links" />:&nbsp;<span className="text-primary">{surveyItem.name}</span>
            </h1>
            )}
            <Breadcrumb match={match} />
          </div>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          {isWebLinkItemsLoaded ? (
            <>
            {webLinkItems && webLinkItems.map((webLink, i) => (
              <Card className="mb-3" key={i}>
                <div className="position-absolute card-top-buttons">
                  <CopyToClipboard 
                    text={shareSurveyPath+webLink.link_id}
                  >
                    <Button color="outline-primary" className="mr-3">
                      <i className="iconsminds-file-clipboard"/>&nbsp;&nbsp;
                      <IntlMessages id="report.copy-url" />
                    </Button>
                  </CopyToClipboard>
                  
                  <Button color="outline-success" className="mr-3" onClick={() => handleEditWebLink(webLink)}>
                      <i className="simple-icon-pencil"/>&nbsp;&nbsp;
                    <IntlMessages id="menu.edit" />
                  </Button>

                  <Button color="outline-danger" onClick={() => handleDeleteWebLink(webLink)}>
                      <i className="simple-icon-trash"/>&nbsp;&nbsp;
                    <IntlMessages id="pages.delete" />
                  </Button>
                </div>
                <CardBody>
                  <CardTitle>
                    <a className={classnames({
                      "text-bold": true,
                      "text-muted": !webLink.is_active
                    })}>
                      <i className="simple-icon-link" />&nbsp;&nbsp;&nbsp;{webLink.name}
                    </a>
                  </CardTitle>
                  <a 
                    className='text-primary text-one text-bold' 
                    href={shareSurveyPath+webLink.link_id}
                    target="_blank"
                    >
                    {shareSurveyPath+webLink.link_id}
                  </a>
                </CardBody>
              </Card>
            ))}
            </>
          ) : (
            <div className="loading" />
          )}


          {isEmailLinkItemLoaded ? (
            <>
            {emailLinkItems && emailLinkItems.map((emailLink, i) => (
              <Card className="mb-3" key={i}>
                <div className="position-absolute card-top-buttons">
                  {emailLink.is_sent ? (
                  <Button color="outline-primary" className="mr-3" disabled >
                    <i className="iconsminds-mail-send"/>&nbsp;&nbsp;
                    <IntlMessages id="link.already-sent" />
                  </Button>
                  ) : (
                  <Button color="outline-primary" className="mr-3" onClick={() => handleSendEmail(emailLink)}>
                    <i className="iconsminds-mail-send"/>&nbsp;&nbsp;
                    <IntlMessages id="link.send-emails" />
                  </Button>
                  )}
                  
                  <Button color="outline-success" className="mr-3" onClick={() => handleEditEmailLink(emailLink)}>
                      <i className="simple-icon-pencil"/>&nbsp;&nbsp;
                    <IntlMessages id="menu.edit" />
                  </Button>

                  <Button color="outline-danger" onClick={() => handleDeleteEmailLink(emailLink)}>
                      <i className="simple-icon-trash"/>&nbsp;&nbsp;
                    <IntlMessages id="pages.delete" />
                  </Button>
                </div>
                <CardBody>
                  <CardTitle>
                    <a className="text-bold">
                      <i className="iconsminds-mail" />&nbsp;&nbsp;&nbsp;{emailLink.name}
                    </a>
                  </CardTitle>
                  <a className='text-primary text-one text-bold'  href="#" onClick={() => handleEditEmailLink(emailLink)}>
                    {emailLink.name}
                  </a>
                </CardBody>
              </Card>
            ))}
            </>
          ) : (
            <div className="loading" />
          )}

          <Card>
            <CardBody className="mb-3">
              <CardTitle>
                <IntlMessages id='link.add-title' />
              </CardTitle>
              <Row>
                <Colxx md={4} sm={6}>
                  <Button color="outline-primary" block size="lg" className="mb-2" onClick={handleAddWebLink}>
                    <i className="simple-icon-link" />&nbsp;&nbsp;&nbsp;
                    <IntlMessages id='link.web-link' />
                  </Button>
                </Colxx>
                <Colxx md={4} sm={6}>
                  <Button color="outline-primary" block size="lg" className="mb-2" onClick={handleAddEmailLink}>
                    <i className="iconsminds-mail" />&nbsp;&nbsp;&nbsp;
                    <IntlMessages id='link.email-link' />
                  </Button>
                </Colxx>
                <Colxx md={4} sm={6}>
                  <NavLink to={`${adminRoot}/surveys/${surveyid}/manual`} location={{}}>
                    <Button color="outline-primary" block size="lg" className="mb-2" onClick={handleAddManualData}>
                      <i className="iconsminds-pen" />&nbsp;&nbsp;&nbsp;
                      <IntlMessages id='link.manual-data-entry' />
                    </Button>
                  </NavLink>
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      <AddNewWebLinkModal
        toggleModal={() => setWebLinkModalOpen(!webLinkModalOpen)}
        modalOpen={webLinkModalOpen}
        webLink={selectedWebLink}
        surveyid={surveyid}
        />

      <AddNewEmailLinkModal
        toggleModal={() => setEmailLinkModalOpen(!emailLinkModalOpen)}
        modalOpen={emailLinkModalOpen}
        emailLink={selectedEmailLink}
        surveyid={surveyid}
        />

      <Modal
        isOpen={deleteModalOpen}
        toggle={() => setDeleteModalOpen(!deleteModalOpen)}
      >
        <ModalHeader>
          <IntlMessages id="modal.modal-title" />
        </ModalHeader>
        <ModalBody>
          Are you sure to delete this link?
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => handleDeleteLink()}
          >
            <IntlMessages id="modal.yes" />
          </Button>{' '}
          <Button
            color="secondary"
            onClick={() => setDeleteModalOpen(false)}
          >
            <IntlMessages id="modal.no" />
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
};

const mapStateToProps = ({ survey, weblink, emaillink, }) => {
  return {
    surveyItem: survey.surveyItem,
    surveyItemError : survey.error,
    isSurveyItemLoaded: survey.loading,

    webLinkItems: weblink.webLinkItems,
    webLinkError: weblink.error,
    isWebLinkItemsLoaded: weblink.isLoaded,

    emailLinkItems: emaillink.emailLinkItems,
    emailLinkError: emaillink.error,
    isEmailLinkItemLoaded: emaillink.isLoaded,
    sendingEmailSuccess: emaillink.sendingSuccess,
  };
};

export default injectIntl(
  connect(mapStateToProps, {
    getWebLinkListAction: getWebLinkList,
    deleteWebLinkItemAction: deleteWebLinkItem,
    getEmailLinkListAction: getEmailLinkList,
    deleteEmailLinkItemAction: deleteEmailLinkItem,
    sendEmailLinkAction: sendEmailLink,
  })(LinksSurvey)
);