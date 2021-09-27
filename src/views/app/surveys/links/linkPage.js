import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  Table,
  Tooltip,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormGroup,
  Label,
  InputGroup,
  CustomInput,
  InputGroupAddon,
  Input
} from 'reactstrap';
import { CircularProgressbar } from 'react-circular-progressbar';

// Components
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import { NotificationManager } from '../../../../components/common/react-notifications';
import { Button, Popover, PopoverBody } from 'reactstrap';
import { Formik, Form, Field } from 'formik';
// Containers
import Breadcrumb from '../../../../containers/navs/Breadcrumb';

// Helpers
import IntlMessages from '../../../../helpers/IntlMessages';

// Redux
import { getEmailLinkItem, sendEmailContact, addContactItemError, deleteContact } from '../../../../redux/actions';
import AddNewContactModal from '../../../../containers/links/AddNewOtherContactModal';


const LinkPage = ({
  intl,
  match,
  surveyid,
  link_id = null,
  smsLinkItem,
  emailLinkError,
  isSmsLinkItemLoaded,
  isEmailSending,
  addContactItemErrorAction,
  getEmailLinkItemAction,
  sendEmailContactAction,
  deleteContactAction,
  linkedMembers,
  addNewLinkMember,
  deleteNewLinkMember,
  updateNewLinkMember,
  mode,
  setFieldValue
}) => {
  const [tooltipOpen, setTooltipOpen] = useState("");

  const toggle = (i) => {
    if (tooltipOpen != "") {
      setTooltipOpen("")
    } else {
      setTooltipOpen(i)
    }
  }

  const [total, setTotal] = useState('');
  const [sent, setSent] = useState('');
  const [remaining, setRemaining] = useState('');
  const [opened, setOpened] = useState('');
  const [responses, setResponses] = useState('');
  const [complete, setComplete] = useState('');
  const [selectedContact, setSelectedContact] = useState(null)
  const [selectedNewContact, setSelectedNewContact] = useState(-1)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [sendId, setSendId] = useState(null);
  const [detailShowStatus, setDetailShowStatus] = useState(false);
  const [isManualMode, setIsManualMode] = useState(false);
  const [address, setAddress] = useState("");
  const [lname, setLname] = useState("");
  const [fname, setFname] = useState("");

  const { messages } = intl;

  useEffect(() => {
    //console.log("hello:", link_id)
    if (link_id != null)
      getEmailLinkItemAction(link_id);
  }, [match]);

  useEffect(() => {
    if (smsLinkItem) {
      let s = 0, r = 0, o = 0, rs = 0, comp = 0;
      for (const contact of smsLinkItem.contacts) {
        if (contact.status === 'sent') {
          s++;
          if (contact.is_open === true) {
            o++;
          }
        } else {
          r++;
        }

        if (contact.is_responded) {
          rs++;
          if (contact.is_completed) {
            comp++;
          }
        }
      }

      setTotal(smsLinkItem.contacts.length);
      setSent(s);
      setRemaining(r);
      setOpened(o);
      setResponses(rs);
      setComplete(comp);
    }
  }, [smsLinkItem]);

  const handleSendEmail = (contact) => {
    setSendId(contact.id);
    sendEmailContactAction(smsLinkItem.id, contact.email_address);
  }
  const handleNewContact = () => {
    setSelectedContact(null)
  }
  const handleDeleteContact = (contact) => {
    setSelectedContact(contact)
    setDeleteModalOpen(true)
  }
  const handleDeleteNewContact = (i) => {
    setSelectedNewContact(i)
    setDeleteModalOpen(true)
  }

  const handleDeleteContactAcion = () => {
    setDeleteModalOpen(false)
    deleteContactAction(smsLinkItem?.id, smsLinkItem?.link_id, selectedContact?.email_address)
  }

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
  }
  const handleEditNewContact = (contact, i) => {
    setSelectedContact(contact);
    setSelectedNewContact(i);
  }

  const clearSelectedData = () => {
    console.log("clear:")
    setSelectedNewContact(-1);
    setSelectedContact(null);
  }

  const moreOrlessViewAction = () => {
    setDetailShowStatus(!detailShowStatus)
  }

  const toggleInputMode = () => {
    setIsManualMode(!isManualMode);
  }

  const displayMenuTitle = (mode = "") => {
    if (mode == "sms") return 'menu.smslink';
    else if (mode == "facebook") return 'menu.facebooklink';
    else if (mode == 'twitter') return 'menu.twitterlink';
    else return 'menu.emaillink';
  }

  const displayAddress = (mode = "") => {
    if (mode == "sms") return 'Phone Number';
    else if (mode == "facebook") return 'facebook-userid';
    else if (mode == 'twitter') return 'twitter-userid';
    else return 'email-address';
  }

  return (
    <>
      <a className="pl-1 text-primary" onClick={moreOrlessViewAction}>
        {!detailShowStatus ? <IntlMessages id='link.contact-detail-show' /> : <IntlMessages id='link.contact-detail-hide' />}
      </a>
      {detailShowStatus &&
        <>
          <Row>
            <Colxx xxs="12">
              <div className="mb-2">
                <h1>
                  <IntlMessages id={displayMenuTitle(mode)} />:&nbsp;
                  {isSmsLinkItemLoaded && link_id && smsLinkItem && (
                    <span className="text-primary">{smsLinkItem.name}</span>
                  )}
                </h1>
                {link_id == null &&
                  <Button color="success" style={{ float: "right", }} outline onClick={toggleInputMode}>
                    {isManualMode ?
                      <IntlMessages id="to-xlxs-mode" /> :
                      <IntlMessages id="to-manual-mode" />}
                  </Button>
                }
              </div>
              <Separator className="mb-5" />
            </Colxx>
          </Row>
          <Row>
            <Colxx xxs="12">
              {(!isManualMode && link_id == null) ?
                <FormGroup>
                  <Label>
                    <IntlMessages id="link.contacts-file" />
                  </Label>
                  <InputGroup className="mb-1">
                    <InputGroupAddon addonType="prepend">{messages['link.contacts']}</InputGroupAddon>
                    <CustomInput
                      type="file"
                      id="contactsFile"
                      name="contactsFile"
                      accept=".xls,.xlsx"
                      onChange={(e) => { setFieldValue("contactsFile", e.target.files[0]) }}
                    // disabled={emailLink !== null}
                    />
                  </InputGroup>
                </FormGroup> :
                <Card>
                  <CardBody>
                    <CardTitle>
                      Recipients
                      <div className="mt-1">
                        <AddNewContactModal
                          link_id={smsLinkItem?.link_id || null}
                          emaillink_id={link_id || null}
                          contact={selectedContact}
                          id={selectedNewContact}
                          contacts={smsLinkItem?.contacts || null}
                          linkedMembers={linkedMembers}
                          addNewLinkMember={addNewLinkMember}
                          updateNewLinkMember={updateNewLinkMember}
                          clearSelectedData={clearSelectedData}
                          mode={mode}
                        />
                      </div>
                    </CardTitle>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th><IntlMessages id={displayAddress(mode)} /></th>
                          <th><IntlMessages id='forms.firstname' /></th>
                          <th><IntlMessages id='forms.lastname' /></th>
                          <th><IntlMessages id='link.sent' /></th>
                          <th><IntlMessages id='link.responded' /></th>
                          <th><IntlMessages id='nav.action' /></th>
                        </tr>
                      </thead>
                      <tbody>
                        {smsLinkItem && link_id && smsLinkItem.contacts.map((contact, i) => (
                          <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td>{contact.email_address}</td>
                            <td>{contact.first_name}</td>
                            <td>{contact.last_name}</td>
                            <td>{contact.status === 'sent' ? <IntlMessages id='modal.yes' /> : contact.status === 'failed' ? <IntlMessages id='link.failed' /> : <IntlMessages id='modal.no' />}</td>
                            <td>{contact.is_responded ? contact.is_completed ? <IntlMessages id='link.complete' /> : <IntlMessages id='link.in-progress' /> : <IntlMessages id='modal.no' />}</td>
                            <td className='position-relative'>
                              {(isEmailSending && contact.id === sendId) ? (
                                <div className='luci-loading' />
                              ) : (
                                contact.status === 'sent' ? (
                                  <>
                                    <Tooltip placement="top" isOpen={tooltipOpen} autohide={false} target={"TooltipResend-" + i} toggle={() => toggle(i)}>
                                      Resend
                                    </Tooltip>

                                    <a id={"TooltipResend-" + i} className='luci-cursor-grabbing' onClick={() => handleSendEmail(contact)}><i className='simple-icon-paper-plane mr-2' /></a>
                                  </>

                                ) : (
                                  <>
                                    {/* <Tooltip placement="bottom" isOpen={("s"+i) == tooltipOpen ? true : false} autohide={false} target={"Tooltip" + i} toggle={() => toggle(("s"+i))}>
                                Send
                              </Tooltip>
                              <Tooltip placement="bottom" isOpen={("d" + i) == tooltipOpen ? true : false} autohide={false} target={"TooltipDelete-" + i} toggle={() => toggle(("d" + i))}>
                                Delete
                              </Tooltip>
                              <Tooltip placement="bottom" isOpen={("e" + i) == tooltipOpen ? true : false} autohide={false} target={"TooltipEdit-" + i} toggle={() => toggle(("e" + i))}>
                                Edit
                              </Tooltip> */}
                                    {/* simple-icon-trash luci-delete-icon */}
                                    <a id={"Tooltip" + i} className='luci-cursor-grabbing' onClick={() => handleSendEmail(contact)}><i className='simple-icon-paper-plane mr-2' /></a>
                                    <a id={"TooltipDelete-" + i} className='luci-cursor-grabbing' onClick={() => handleDeleteContact(contact)}><i className='simple-icon-trash luci-delete-icon  mr-2' /></a>
                                    <a id={"TooltipEdit-" + i} className='luci-cursor-grabbing' onClick={() => handleEditContact(contact)}><i className='iconsminds-pen  mr-2' /></a>

                                  </>
                                )
                              )}
                            </td>
                          </tr>
                        ))}

                        {linkedMembers && linkedMembers.map((contact, i) => (
                          <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td>{contact.email_address}</td>
                            <td>{contact.first_name}</td>
                            <td>{contact.last_name}</td>
                            <td>{contact.status === 'sent' ? <IntlMessages id='modal.yes' /> : contact.status === 'failed' ? <IntlMessages id='link.failed' /> : <IntlMessages id='modal.no' />}</td>
                            <td>{contact.is_responded ? contact.is_completed ? <IntlMessages id='link.complete' /> : <IntlMessages id='link.in-progress' /> : <IntlMessages id='modal.no' />}</td>
                            <td className='position-relative'>
                              {(isEmailSending && contact.id === sendId) ? (
                                <div className='luci-loading' />
                              ) : (
                                <>
                                  {/* <Tooltip placement="bottom" isOpen={("ss" + i) == tooltipOpen ? true : false} autohide={false} target={"ss" + i} toggle={() => toggle(("ss" + i))}>
                                Send
                              </Tooltip> */}
                                  <Tooltip placement="bottom" isOpen={("dd" + i) == tooltipOpen ? true : false} autohide={false} target={"dd" + i} toggle={() => toggle(("dd" + i))}>
                                    Delete
                                  </Tooltip>
                                  <Tooltip placement="bottom" isOpen={("ee" + i) == tooltipOpen ? true : false} autohide={false} target={"ee" + i} toggle={() => toggle(("ee" + i))}>
                                    Edit
                                  </Tooltip>
                                  {/* simple-icon-trash luci-delete-icon */}
                                  {/* <a id={"ss" + i} className='luci-cursor-grabbing' onClick={() => handleSendEmail(contact)}><i className='simple-icon-paper-plane mr-2' /></a> */}
                                  <a id={"dd" + i} className='luci-cursor-grabbing' onClick={() => handleDeleteNewContact(i)}><i className='simple-icon-trash luci-delete-icon  mr-2' /></a>
                                  <a id={"ee" + i} className='luci-cursor-grabbing' onClick={() => handleEditNewContact(contact, i)}><i className='iconsminds-pen  mr-2' /></a>

                                </>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>}
            </Colxx>
          </Row>
          <Modal
            isOpen={deleteModalOpen}
            toggle={() => setDeleteModalOpen(!deleteModalOpen)}
          >
            <ModalHeader>
              <IntlMessages id="modal.modal-title" />
            </ModalHeader>
            <ModalBody>
              Are you sure to delete this contact?
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={() => {
                  if (selectedNewContact != -1)
                    deleteNewLinkMember(selectedNewContact);
                  else
                    handleDeleteContactAcion();
                  setDeleteModalOpen(false);
                  clearSelectedData();
                }}
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
        </>}
    </>
  )
};

const mapStateToProps = ({ emaillink, }) => {
  return {
    smsLinkItem: emaillink.emailLinkItem,
    emailLinkError: emaillink.error,
    isSmsLinkItemLoaded: emaillink.isLoadedItem,
    isEmailSending: emaillink.isSending,
  };
};

export default injectIntl(
  connect(mapStateToProps, {
    getEmailLinkItemAction: getEmailLinkItem,
    sendEmailContactAction: sendEmailContact,
    addContactItemErrorAction: addContactItemError,
    deleteContactAction: deleteContact,
  })(LinkPage)
);