import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  Row,
  Button,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  InputGroup,
  InputGroupAddon,
  CustomInput,
} from 'reactstrap';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import ReactQuill from 'react-quill';
import ReactExport from "react-data-export";

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

// Redux
import { addEmailLinkItem, updateEmailLinkItem } from '../../redux/actions';

// Helpers
import IntlMessages from '../../helpers/IntlMessages';
import { getRandomLinkId, getDefaultLinkContent } from '../../helpers/linkHelper';

// Component
import { Colxx } from '../../components/common/CustomBootstrap';

// Containers
import { FormikDatePicker } from '../form-validations/FormikFields';

import LinkPage from '../../views/app/surveys/links/linkPage';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const EmailLinkSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required!')
    .min(3, 'Name must be longer than 3 characters!'),
  closeQuota: Yup.string()
    .required('close quota is required!'),
});

const quillModules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
  ],
};

const quillFormats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];

const AddNewLinkModal = ({
  intl,
  mode,
  modalOpen,
  toggleModal,
  surveyid,
  SMSLink = null,

  addSMSLinkItemAction,
  updateSMSLinkItemAction,
}) => {

  useEffect(() => {
    setLinkedMembers([]);
  }, [modalOpen]);

  const { messages } = intl;
  const [detailContactStatus, setDetailContactStatus] = useState(false)
  const [linkedMembers, setLinkedMembers] = useState([])

  const addNewLinkMember = (values) => {
    let dup = [...linkedMembers, values]
    setLinkedMembers(dup)
  }

  const deleteNewLinkMember = (id) => {
    let dup = linkedMembers.filter((contact, i) => i != id)
    setLinkedMembers(dup)
  }

  const updateNewLinkMember = (id, values) => {
    let dup = linkedMembers.map((contact, i) =>
      i == id ? values : contact)
    setLinkedMembers(dup)
  }

  const addNewEmailLink = (values) => {
    if (SMSLink !== null) {
      updateSMSLinkItemAction(SMSLink.id, {
        mode: mode,
        name: values.name,
        sender_name: values.senderName,
        sender_email: values.senderEmail,
        email_content: values.emailContent,
        close_quota: values.closeQuota,
        close_date: values.closeDate
      });
    }
    else {
      if (values.contactsFile)
        addSMSLinkItemAction({
          mode: mode,
          survey_id: surveyid,
          name: values.name,
          link_id: values.link_id,
          contacts_file: values.contactsFile,
          sender_name: values.senderName,
          sender_email: values.senderEmail,
          email_content: values.emailContent,
          close_quota: values.closeQuota,
          close_date: values.closeDate,
        });
      else
        addSMSLinkItemAction({
          mode: mode,
          survey_id: surveyid,
          name: values.name,
          link_id: values.link_id,
          sender_name: values.senderName,
          sender_email: values.senderEmail,
          email_content: values.emailContent,
          close_quota: values.closeQuota,
          close_date: values.closeDate,
          contact_members: linkedMembers
        });
    }
    setLinkedMembers([]);
    toggleModal();
  };

  const downloadContactFile = () => {
    console.log("SMSLink-->>", SMSLink)
  }

  const displayEditTitle = (mode) => {
    if (mode == "sms") return 'link.edit-sms-title';
    else if (mode == "facebook") return 'link.edit-facebook-title';
    else if (mode == "twitter") return 'link.edit-twitter-title';
    else return 'link.edit-email-title';
  }

  const displayAddTitle = (mode) => {
    if (mode == "sms") return 'link.add-new-sms-title';
    else if (mode == "facebook") return 'link.add-new-facebook-title';
    else if (mode == "twitter") return 'link.add-new-twitter-title';
    else return 'link.add-new-email-title';
  }
  const link_id = getRandomLinkId();

  const initialValues = SMSLink !== null ?
    {
      name: SMSLink.name,
      link_id: SMSLink.link_id,
      contactsFile: null,
      senderName: SMSLink.sender_name,
      senderEmail: SMSLink.sender_email,
      emailContent: SMSLink.email_content,
      closeQuota: SMSLink.close_quota ?? '',
      closeDate: SMSLink.close_date ? new Date(SMSLink.close_date) : '',
    } :
    {
      name: '',
      link_id: link_id,
      contactsFile: null,
      senderName: '',
      senderEmail: '',
      emailContent: getDefaultLinkContent(link_id, mode),
      closeQuota: 100,
      closeDate: SMSLink?.close_date ? new Date('') : '',
    }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={EmailLinkSchema}
      onSubmit={addNewEmailLink}
    >
      {({
        handleSubmit,
        setFieldValue,
        setFieldTouched,
        values,
        errors,
        touched,
        isSubmitting
      }) => (
        <Modal
          isOpen={modalOpen}
          toggle={toggleModal}
          backdrop="static"
          size="lg"
        >
          <Form>
            <ModalHeader toggle={toggleModal}>
              {(SMSLink !== null) ? (
                <IntlMessages id={displayEditTitle(mode)} />
              ) : (
                <IntlMessages id={displayAddTitle(mode)} />
              )}
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label>
                  <IntlMessages id="forms.name" />{' '}<span className='luci-primary-color'>*</span>
                </Label>
                <Field
                  className='form-control'
                  name='name'
                />
                {errors.name && touched.name && (
                  <div className="invalid-feedback d-block">
                    {errors.name}
                  </div>
                )}
              </FormGroup>

              <FormGroup>
                <LinkPage link_id={SMSLink?.id || null}
                  setFieldValue={setFieldValue}
                  mode={mode}
                  linkedMembers={linkedMembers} addNewLinkMember={addNewLinkMember}
                  deleteNewLinkMember={deleteNewLinkMember}
                  updateNewLinkMember={updateNewLinkMember} />
              </FormGroup>
              <Row className="mb-3">
                <Colxx sm={6}>
                  <FormGroup>
                    <Label>
                      <IntlMessages id="link.sender-name" />
                    </Label>
                    <Field
                      className='form-control'
                      name='senderName'
                    />
                  </FormGroup>
                </Colxx>
                <Colxx sm={6}>
                  <FormGroup>
                    <Label>
                      <IntlMessages id="link.send-replies-to" />
                    </Label>
                    <Field
                      className='form-control'
                      name='senderEmail'
                    />
                  </FormGroup>
                </Colxx>
              </Row>

              <FormGroup>
                <Label>
                  <IntlMessages id='link.message-text' />
                </Label>
                <ReactQuill
                  theme="snow"
                  name="emailContent"
                  value={values.emailContent}
                  onChange={(val) => setFieldValue("emailContent", val)}
                  modules={quillModules}
                  formats={quillFormats}
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <IntlMessages id="link.close-quota" />
                </Label>
                <Field
                  type='number'
                  className='form-control'
                  name='closeQuota'
                />
                {errors.closeQuota && touched.closeQuota && (
                  <div className="invalid-feedback d-block">
                    {errors.closeQuota}
                  </div>
                )}
              </FormGroup>

              <FormGroup>
                <Label>
                  <IntlMessages id="link.close-date" />
                </Label>
                <FormikDatePicker
                  name="closeDate"
                  value={values.closeDate}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  popperModifiers={{
                    preventOverflow: {
                      enabled: true,
                    },
                  }}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" outline onClick={toggleModal}>
                <IntlMessages id="survey.cancel" />
              </Button>
              <Button type="submit" color="primary">
                {(SMSLink !== null) ? (
                  <IntlMessages id="menu.save" />
                ) : (
                  <IntlMessages id="survey.submit" />
                )}
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      )}
    </Formik>
  );
};

const mapStateToProps = ({ }) => {
  return {
  };
};

export default injectIntl(
  connect(mapStateToProps, {
    addSMSLinkItemAction: addEmailLinkItem,
    updateSMSLinkItemAction: updateEmailLinkItem,
  })(AddNewLinkModal)
);
