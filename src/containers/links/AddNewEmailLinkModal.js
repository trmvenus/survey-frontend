import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {injectIntl} from 'react-intl';
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
import { getDefaultEmailLinkContent, getRandomLinkId } from '../../helpers/linkHelper';

// Component
import { Colxx } from '../../components/common/CustomBootstrap';

// Containers
import { FormikDatePicker } from '../../containers/form-validations/FormikFields';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const EmailLinkSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required!')
    .min(3, 'Name must be longer than 3 characters!'),
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

const AddNewEmailLinkModal = ({
  intl,

  modalOpen,
  toggleModal,
  surveyid,
  emailLink = null,

  addEmailLinkItemAction,
  updateEmailLinkItemAction,
}) => {

  const { messages } = intl;

  const addNewEmailLink = (values) => {
    if (emailLink !== null) {
      updateEmailLinkItemAction(emailLink.id, {
        name: values.name,
        sender_name: values.senderName,
        sender_email: values.senderEmail,
        email_content: values.emailContent,
        close_quota: values.closeQuota,
        close_date: values.closeDate,
      });
    } else {
      addEmailLinkItemAction({
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
    }

    toggleModal();
  };

  const link_id = getRandomLinkId();

  const initialValues = emailLink !== null ?
      {
        name: emailLink.name,
        link_id: emailLink.link_id,
        contactsFile: null,
        senderName: emailLink.sender_name,
        senderEmail: emailLink.sender_email,
        emailContent: emailLink.email_content,
        closeQuota: emailLink.close_quota ?? '',
        closeDate: emailLink.close_date ? new Date(emailLink.close_date) : '',
      } :
      {
        name: '',
        link_id: link_id,
        contactsFile: '',
        senderName: '',
        senderEmail: '',
        emailContent: getDefaultEmailLinkContent(link_id),
        closeQuota: '',
        closeDate: '',
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
              <IntlMessages id="link.add-new-email-title" />
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
                    onChange={(e)=>{setFieldValue("contactsFile", e.target.files[0])}}
                    disabled={emailLink !== null}
                  />
                </InputGroup>

                
                <ExcelFile 
                  filename='contacts-template'
                  element={<a className="pl-1 text-primary" href='#'><IntlMessages id='link.download-template' /></a>}
                >
                  <ExcelSheet data={[]} name="Emails">
                    <ExcelColumn label="Email Address" value="email_address"/>
                    <ExcelColumn label="First Name" value="first_name"/>
                    <ExcelColumn label="Last Name" value="last_name"/>
                  </ExcelSheet>
                </ExcelFile>
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
                {(emailLink !== null) ? (
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

const mapStateToProps = ({  }) => {
  return {
  };
};

export default injectIntl(
  connect(mapStateToProps, {
    addEmailLinkItemAction: addEmailLinkItem,
    updateEmailLinkItemAction: updateEmailLinkItem,
  })(AddNewEmailLinkModal)
);
