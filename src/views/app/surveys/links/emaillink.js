import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { 
  Row,
  Card,
  CardBody,
  CardTitle,
  Table,
  Tooltip ,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import { CircularProgressbar } from 'react-circular-progressbar';

// Components
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import { NotificationManager } from '../../../../components/common/react-notifications';
import { Button, Popover, PopoverBody } from 'reactstrap';
// Containers
import Breadcrumb from '../../../../containers/navs/Breadcrumb';

// Helpers
import IntlMessages from '../../../../helpers/IntlMessages';

// Redux
import { getEmailLinkItem, sendEmailContact,addContactItemError,deleteContact } from '../../../../redux/actions';
import AddNewContactModal from '../../../../containers/links/AddNewContactModal';


const EmailLinkPage = ({ 
  intl,
  match,
  surveyid,
  link_id,
  emailLinkItem,
  emailLinkError,
  isEmailLinkItemLoaded,
  isEmailSending,
  addContactItemErrorAction,
  getEmailLinkItemAction,
  sendEmailContactAction,
  deleteContactAction,
}) => {
  const [newContactModalOpen,setNewContactModalOpen] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(null);

  const toggle = (i) => {
   if(tooltipOpen!=null){
     setTooltipOpen(null)
   }else{
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
  const [deleteModalOpen,setDeleteModalOpen] = useState(false)
  const [sendId, setSendId] = useState(null);

  const { messages } = intl;

  // useEffect(() => {
  //   if (emailLinkError) {
  //     console.log(emailLinkError)
  //     NotificationManager.warning(emailLinkError.message??emailLinkError, 'Links Error', 3000, null, null, '');
  //   }
  // }, [emailLinkError]);

  useEffect(() => {
    getEmailLinkItemAction(link_id);
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
  const handleNewContact = () => {
   setSelectedContact(null)
   setNewContactModalOpen(!newContactModalOpen)
  }
  const handleDeleteContact = (contact) => {
    setSelectedContact(contact)
    setDeleteModalOpen(true)
  }
  const handleDeleteContactAcion = () => {
    setDeleteModalOpen(false)
    deleteContactAction(emailLinkItem?.id,emailLinkItem?.link_id, selectedContact?.email_address)
  }

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
    setNewContactModalOpen(!newContactModalOpen)
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
            
            {/* <Breadcrumb match={{...match, linkname: emailLinkItem ? emailLinkItem.name : ''}}/> */}
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

                <p className='align-items-center'><IntlMessages id='link.total' /> : <span className='h3 text-primary'>{total}</span></p>

                <p><IntlMessages id='link.sent' /> : <span className='h3 text-primary'>{sent}</span></p>

                <p><IntlMessages id='link.remaining' /> : <span className='h3 text-primary'>{remaining}</span></p>

                <p><IntlMessages id='link.opened' /> : <span className='h3 text-primary'>{opened}</span> </p>
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

                <p className='align-items-center'> <IntlMessages id='link.total' /> : <span className='h3 text-primary'>{responses}</span></p>

                <p className='align-items-center'><IntlMessages id='link.complete' /> : <span className='h3 text-primary'>{complete}</span></p>
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
                <div className="float-right">
                  <Button color='outline-primary' onClick={handleNewContact}>
                    <IntlMessages id='input-groups.add'/>
                  </Button>
                </div>
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
                      <td>{contact.is_responded ? contact.is_completed ? <IntlMessages id='link.complete' /> : <IntlMessages id='link.in-progress' /> : <IntlMessages id='modal.no' />}</td>
                      <td className='position-relative'>
                        {(isEmailSending && contact.id === sendId) ? (
                          <div className='luci-loading' />
                        ) : (
                          contact.status === 'sent' ? (
                            <>
                              <Tooltip placement="top" isOpen={tooltipOpen} autohide={false} target={"Tooltip-" + i} toggle={()=>toggle(i)}>
                                Resend 
                              </Tooltip>
                         
                              <a id={"Tooltip-" + i} className='luci-cursor-grabbing'  onClick={() => handleSendEmail(contact)}><i className='simple-icon-paper-plane mr-2' /></a>
                            </>
                          
                          ) : (
                            <> 
                              <Tooltip placement="bottom" isOpen={("s"+i)==tooltipOpen?true:false} autohide={false} target={"Tooltip-" + i} toggle={()=>toggle(("s"+i))}>
                                 Send 
                              </Tooltip>
                              <Tooltip placement="bottom" isOpen={("d"+i)==tooltipOpen?true:false} autohide={false} target={"TooltipDelete-" + i} toggle={()=>toggle(("d"+i))}>
                                 Delete 
                              </Tooltip>
                              <Tooltip placement="bottom" isOpen={("e"+i)==tooltipOpen?true:false} autohide={false} target={"TooltipEdit-" + i} toggle={()=>toggle(("e"+i))}>
                                 Edit 
                              </Tooltip>
                              {/* simple-icon-trash luci-delete-icon */}
                               <a id={"Tooltip-" + i} className='luci-cursor-grabbing'  onClick={() => handleSendEmail(contact)}><i className='simple-icon-paper-plane mr-2' /></a>
                               <a id={"TooltipDelete-" + i} className='luci-cursor-grabbing'  onClick={() => handleDeleteContact(contact)}><i className='simple-icon-trash luci-delete-icon  mr-2' /></a>
                               <a id={"TooltipEdit-" + i} className='luci-cursor-grabbing'  onClick={() => handleEditContact(contact)}><i className='iconsminds-pen  mr-2' /></a>

                            </>
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
      <AddNewContactModal
        toggleModal={() => setNewContactModalOpen(!newContactModalOpen)}
        modalOpen={newContactModalOpen}
        link_id={emailLinkItem?.link_id||null}
        emaillink_id={link_id||null}
        contact={selectedContact}
        contacts={emailLinkItem?.contacts||null}
      />
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
            onClick={() => handleDeleteContactAcion()}
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
    addContactItemErrorAction:addContactItemError,
    deleteContactAction: deleteContact,
  })(EmailLinkPage)
);