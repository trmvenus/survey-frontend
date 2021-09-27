import React, { useEffect, useState } from 'react';
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
  Tooltip,
} from 'reactstrap';
import { CircularProgressbar } from 'react-circular-progressbar';

import { NavLink } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
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
import { adminRoot, shareWebSurveyPath, shareEmailSurveyPath } from '../../../../constants/defaultValues';
import AddNewEmailLinkModal from '../../../../containers/links/AddNewEmailLinkModal';
import AddNewLinkModal from '../../../../containers/links/AddNewLinkModal';

import GradientWithRadialProgressCard from '../../../../components/cards/GradientWithRadialProgressCard'

const LinksSurvey = ({
  intl,
  match,
  surveyid,

  surveyItem,
  surveyItemError,
  isSurveyItemLoaded,
  webLinkItems,
  webLinksTotalResponses,
  weblinksCompletedResponse,
  webLinkError,
  isWebLinkItemsLoaded,
  emailLinkItems,
  emailLinksCompletedResponse,
  emailLinksTotalResponses,
  emailLinkError,
  isEmailLinkItemLoaded,
  sendingEmailSuccess,

  getWebLinkListAction,
  deleteWebLinkItemAction,
  getEmailLinkListAction,
  deleteEmailLinkItemAction,
  sendEmailLinkAction,
  isEmailSending
}) => {
  const { messages } = intl;

  // declare state variables
  const [webLinkModalOpen, setWebLinkModalOpen] = useState(false);
  const [emailLinkModalOpen, setEmailLinkModalOpen] = useState(false);
  const [smsLinkModalOpen, setSmsLinkModalOpen] = useState(false);
  const [facebookLinkModalOpen, setFacebookLinkModalOpen] = useState(false);
  const [twitterLinkModalOpen, setTwitterLinkModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedWebLink, setSelectedWebLink] = useState(null);
  const [selectedEmailLink, setSelectedEmailLink] = useState(null);
  const [selectedSMSLink, setSelectedSMSLink] = useState(null);
  const [tooltipOpen, setTooltipOpen] = useState("");
  const [modalMode, setModalMode] = useState("");
  const [isDisplayError, setIsDisplayError] = useState(false);
  //const [notificationDisplay, setNotificationDisplay] = useState(false);

  const toggle = (selString) => {
    if (tooltipOpen != "") {
      setTooltipOpen("")
    } else {
      setTooltipOpen(selString)
    }
  }

  // useEffect(() => console.log("isEmailSending->>", isEmailSending))

  useEffect(() => {
    if (surveyItemError && isDisplayError) {
      NotificationManager.warning(surveyItemError.message ?? surveyItemError, 'Links Error', 3000, null, null, '');
    }
  }, [surveyItemError]);

  useEffect(() => {
    if (webLinkError && isDisplayError) {
      NotificationManager.warning(webLinkError.message ?? webLinkError, 'Links Error', 3000, null, null, '');
    }
  }, [webLinkError]);

  useEffect(() => {
    if (emailLinkError && isDisplayError) {
      NotificationManager.warning(emailLinkError.message ?? emailLinkError, 'Links Error', 3000, null, null, '');
    }
  }, [emailLinkError]);

  useEffect(() => {
    if (sendingEmailSuccess && isDisplayError) {
      NotificationManager.success(messages['link.email-sending-success-message'], 'Send Email', 3000, null, null, '');
    }
  }, [sendingEmailSuccess]);

  useEffect(() => {
    setTimeout(()=>setIsDisplayError(true), 3000)
    getWebLinkListAction({ id: surveyid });
    getEmailLinkListAction({ id: surveyid });
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
    setSelectedEmailLink(emailLink);
    sendEmailLinkAction({ id: emailLink.id });
  }

  const handleEditEmailLink = (emailLink, contacts_file) => {
    if (contacts_file == "sms" || contacts_file == "twitter" || contacts_file == "facebook") {
      //console.log("emailLink:", emailLink)
      setModalMode(contacts_file);
      setSelectedEmailLink(emailLink);
      setSmsLinkModalOpen(true)
    }
    else {
      setSelectedEmailLink(emailLink);
      setEmailLinkModalOpen(true);
    }
  }

  const handleDeleteEmailLink = (emailLink) => {
    setSelectedEmailLink(emailLink);
    setSelectedWebLink(null);
    setDeleteModalOpen(true);
  }

  const handleDeleteLink = () => {
    if (selectedWebLink) {
      deleteWebLinkItemAction({ id: selectedWebLink.id });
    } else if (selectedEmailLink) {
      deleteEmailLinkItemAction({ id: selectedEmailLink.id });
    }
    setDeleteModalOpen(false);
  }

  const handleAddLink = (mode = "") => {
    setSelectedEmailLink(null);
    setModalMode(mode);
    setSmsLinkModalOpen(true);
  }

  const handleAddFacebookLink = () => {
    setSelectedEmailLink(null);
    setFacebookLinkModalOpen(true);
  }

  const handleAddTwitterLink = () => {
    setSelectedEmailLink(null);
    setTwitterLinkModalOpen(true);
  }

  const createUrl = (contacts_file) => {
    switch(contacts_file) {
      case "sms": return '&mode=sms';
      case "facebook": return '&mode=facebook';
      case "twitter": return '&mode=twitter';
      default: return '';
    }
  }

  const getIconName = (contacts_file) => {
    switch(contacts_file) {
      case "sms": return 'simple-icon-screen-smartphone';
      case "facebook": return 'simple-icon-social-facebook';
      case "twitter": return 'iconsminds-twitter';
      default: return 'iconsminds-mail';
    }
  } 

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id="survey.links" />:&nbsp;
              {surveyItem && (
                <span className="text-primary">{surveyItem.name}</span>
              )}
            </h1>
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
                  <div className="position-absolute card-top-buttons d-flex">
                    <CopyToClipboard
                      text={shareWebSurveyPath + webLink.link_id}
                    >
                      <Button color="outline-primary" className="pl-1 pl-sm-3 pr-2 pr-sm-3 pt-1 pt-sm-2 pb-0 pb-sm-2 mr-1 mr-md-3 d-flex">
                        <i className="iconsminds-file-clipboard d-none d-sm-block" />&nbsp;&nbsp;
                        <span className="d-none d-sm-block">
                          <IntlMessages id="report.copy-url" />
                        </span>
                        <span className="d-block d-sm-none">
                          <IntlMessages id="survey.copy" />
                        </span>
                      </Button>
                    </CopyToClipboard>

                    <Button color="outline-success" className="pl-1 pl-sm-3 pr-2 pr-sm-3 pt-1 pt-sm-2 pb-0 pb-sm-2 mr-1 mr-md-3 d-flex" onClick={() => handleEditWebLink(webLink)}>
                      <i className="iconsminds-pen d-none d-sm-block" />&nbsp;&nbsp;
                      <span>
                        <IntlMessages id="menu.edit" />
                      </span>
                    </Button>

                    <Button color="outline-danger" className="pl-1 pl-sm-3 pr-2 pr-sm-3 pt-1 pt-sm-2 pb-0 pb-sm-2 d-flex" onClick={() => handleDeleteWebLink(webLink)}>
                      <i className="iconsminds-trash-with-men d-none d-sm-block" />&nbsp;&nbsp;
                      <span>
                        <IntlMessages id="pages.delete" />
                      </span>
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
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <a
                        className='text-primary text-one text-bold'
                        href={shareWebSurveyPath + webLink.link_id}
                        target="_blank"
                      >
                        {shareWebSurveyPath + webLink.link_id}
                      </a>
                      <div className="progress-bar-circle1 progress-bar-banner position-relative">
                        <CircularProgressbar
                          strokeWidth={4}
                          value={((weblinksCompletedResponse[webLink.link_id] ? weblinksCompletedResponse[webLink.link_id] : 0) * 100) / (webLink.close_quota ? webLink.close_quota : 0)}

                          text={`${weblinksCompletedResponse[webLink.link_id] ? weblinksCompletedResponse[webLink.link_id] : "0"}/${webLink.close_quota ? webLink.close_quota : "0"}`}
                        />
                      </div>
                    </div>

                  </CardBody>
                </Card>
              ))}
            </>
          ) : (
            <div className="loading" />
          )}


          {isEmailLinkItemLoaded && emailLinkItems ? (
            <>
              {emailLinkItems && emailLinkItems.map((emailLink, i) => (
                <Card className="mb-3" key={i}>
                  <div className="position-absolute card-top-buttons d-flex">
                    {emailLink.is_sent ? (
                      <Button color="outline-primary" className="pl-1 pl-sm-3 pr-2 pr-sm-3 pt-1 pt-sm-2 pb-0 pb-sm-2 mr-1 mr-md-3 d-flex" disabled>
                        <i className={emailLink.contacts_file == "sms" ? "simple-icon-screen-smartphone" : "iconsminds-mail-send d-none d-sm-block"} />&nbsp;&nbsp;
                        <span className="d-none d-sm-block">
                          <IntlMessages id="link.already-sent" />
                        </span>
                        <span className="d-block d-sm-none">
                          <IntlMessages id="link.sent" />
                        </span>
                      </Button>
                    ) : (
                      (isEmailSending && emailLink.link_id == selectedEmailLink.link_id) ?
                        (<div className='luci-loading m-5' />) :
                        (
                          <Button
                            color="outline-primary"
                            className="pl-1 pl-sm-3 pr-2 pr-sm-3 pt-1 pt-sm-2 pb-0 pb-sm-2 mr-1 mr-md-3 d-flex"
                            onClick={() => handleSendEmail(emailLink)}
                          >
                            <i className={getIconName(emailLink.contacts_file)} />&nbsp;&nbsp;
                            <span className="d-none d-sm-block">
                              <IntlMessages id={emailLink.contacts_file == "sms" ? "link.send-SMSMessage" : "link.send-emails"} />
                            </span>
                            <span className="d-block d-sm-none">
                              <IntlMessages id="pages.send" />
                            </span>
                          </Button>)
                    )}

                    <Button
                      color="outline-success"
                      className="pl-1 pl-sm-3 pr-2 pr-sm-3 pt-1 pt-sm-2 pb-0 pb-sm-2 mr-1 mr-md-3 d-flex"
                      onClick={() => handleEditEmailLink(emailLink, emailLink.contacts_file)}
                    >
                      <i className="iconsminds-pen d-none d-sm-block" />&nbsp;&nbsp;
                      <IntlMessages id="menu.edit" />
                    </Button>

                    <Button
                      color="outline-danger"
                      className="pl-1 pl-sm-3 pr-2 pr-sm-3 pt-1 pt-sm-2 pb-0 pb-sm-2 d-flex"
                      onClick={() => handleDeleteEmailLink(emailLink)}>
                      <i className="iconsminds-trash-with-men d-none d-sm-block" />&nbsp;&nbsp;
                      <span>
                        <IntlMessages id="pages.delete" />
                      </span>
                    </Button>
                  </div>
                  <CardBody>
                    <CardTitle>
                      <a className="text-bold" href={`./links/${emailLink.id}`}>
                        <i className={getIconName(emailLink.contacts_file)} />&nbsp;&nbsp;&nbsp;{emailLink.name}
                        {/* <i className="iconsminds-mail" /> */}
                      </a>
                    </CardTitle>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <a className='text-primary text-one text-bold' target="_blank"
                        href={shareEmailSurveyPath+emailLink.link_id+createUrl(emailLink.contacts_file)}>
                          {shareEmailSurveyPath+emailLink.link_id+createUrl(emailLink.contacts_file)}
                      </a>
                      <div className="progress-bar-circle1 progress-bar-banner position-relative">
                        <CircularProgressbar
                          strokeWidth={4}
                          value={((emailLinksCompletedResponse[emailLink.link_id] ? emailLinksCompletedResponse[emailLink.link_id] : 0) * 100) / (emailLink.close_quota ? emailLink.close_quota : 0)}
                          text={`${emailLinksCompletedResponse[emailLink.link_id] ? emailLinksCompletedResponse[emailLink.link_id] : "0"}/${emailLink.close_quota ? emailLink.close_quota : "0"}`}
                        />
                      </div>
                    </div>

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
                <Colxx md={2} sm={3}>
                  <Button id="webLink" color="outline-primary" block size="xs" className="mb-2" onClick={handleAddWebLink}>
                    <i className="simple-icon-link" style={{ fontSize: "18px" }} />
                    {/* <IntlMessages id='link.web-link' /> */}
                  </Button>
                  <Tooltip placement="bottom" isOpen={"webLink" == tooltipOpen ? true : false} autohide={false} target="webLink" toggle={() => toggle("webLink")}>
                    webLink
                  </Tooltip>
                </Colxx>
                <Colxx md={2} sm={3}>
                  <Button id="emailLink" color="outline-primary" block size="xs" className="mb-2" onClick={() => handleAddLink("email")}>
                    <i className="iconsminds-mail" style={{ fontSize: "18px" }} />
                    {/* <IntlMessages id='link.email-link' /> */}
                  </Button>
                  <Tooltip placement="bottom" isOpen={"emailLink" == tooltipOpen ? true : false} autohide={false} target="emailLink" toggle={() => toggle("emailLink")}>
                    emailLink
                  </Tooltip>
                </Colxx>
                <Colxx md={2} sm={3}>
                  <NavLink to={`${adminRoot}/surveys/${surveyid}/manual`} location={{}}>
                    <Button id="manual" color="outline-primary" block size="xs" className="mb-2">
                      <i className="iconsminds-pen" style={{ fontSize: "18px" }} />
                      {/* <IntlMessages id='link.manual-entry' /> */}
                    </Button>
                  </NavLink>
                  <Tooltip placement="bottom" isOpen={"manual" == tooltipOpen ? true : false} autohide={false} target="manual" toggle={() => toggle("manual")}>
                    manual
                  </Tooltip>
                </Colxx>
                <Colxx md={2} sm={3}>
                  <Button id="SMSLink" color="outline-primary" block size="xs" className="mb-2" onClick={() => handleAddLink("sms")}>
                    <i className="simple-icon-screen-smartphone" style={{ fontSize: "18px" }} />
                    {/* <IntlMessages id='link.sms' /> */}
                  </Button>
                  <Tooltip placement="bottom" isOpen={"SMSLink" == tooltipOpen ? true : false} autohide={false} target="SMSLink" toggle={() => toggle("SMSLink")}>
                    SMSLink
                  </Tooltip>
                </Colxx>
                <Colxx md={2} sm={3}>
                  <Button id="facebook" color="outline-primary" block size="xs" className="mb-2" onClick={() => handleAddLink("facebook")}>
                    <i className="simple-icon-social-facebook" style={{ fontSize: "18px" }} />
                    {/* <IntlMessages id='link.facebook' /> */}
                  </Button>
                  <Tooltip placement="bottom" isOpen={"facebook" == tooltipOpen ? true : false} autohide={false} target="facebook" toggle={() => toggle("facebook")}>
                    facebook
                  </Tooltip>
                </Colxx>
                <Colxx md={2} sm={3}>
                  <Button id="twitter" color="outline-primary" block size="xs" className="mb-2" onClick={() => handleAddLink("twitter")}>
                    <i className="iconsminds-twitter" style={{ fontSize: "18px" }} />
                    {/* <IntlMessages id='link.twitter' /> */}
                  </Button>
                  <Tooltip placement="bottom" isOpen={"twitter" == tooltipOpen ? true : false} autohide={false} target="twitter" toggle={() => toggle("twitter")}>
                    twitter
                  </Tooltip>
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      {/* add modal parts */}
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
      <AddNewLinkModal
        mode={modalMode}
        toggleModal={() => setSmsLinkModalOpen(!smsLinkModalOpen)}
        modalOpen={smsLinkModalOpen}
        SMSLink={selectedEmailLink}
        link_id={selectedEmailLink && selectedEmailLink.link_id}
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
    surveyItemError: survey.error,
    isSurveyItemLoaded: survey.loading,

    webLinkItems: weblink.webLinkItems,
    weblinksCompletedResponse: weblink.weblinksCompletedResponse,
    webLinksTotalResponses: weblink.webLinksTotalResponses,
    webLinkError: weblink.error,
    isWebLinkItemsLoaded: weblink.isLoaded,

    emailLinkItems: emaillink.emailLinkItems,
    emailLinksTotalResponses: emaillink.emailLinksTotalResponses,
    emailLinksCompletedResponse: emaillink.emailLinksCompletedResponse,
    emailLinkError: emaillink.error,
    isEmailLinkItemLoaded: emaillink.isLoaded,
    sendingEmailSuccess: emaillink.sendingSuccess,
    isEmailSending: emaillink.isSending
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