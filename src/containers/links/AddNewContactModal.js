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
import { addContactItem,updateContactItem, updateEmailLinkItem ,addContactItemError} from '../../redux/actions';

// Helpers
import IntlMessages from '../../helpers/IntlMessages';
import { getDefaultEmailLinkContent, getRandomLinkId } from '../../helpers/linkHelper';

// Component
import { Colxx } from '../../components/common/CustomBootstrap';

// Containers
import { FormikDatePicker } from '../../containers/form-validations/FormikFields';

import EmailLinkPage  from '../../views/app/surveys/links/emaillink';
import { NotificationManager } from '../../components/common/react-notifications';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ContactSchema = Yup.object().shape({
  email: Yup.string()
    .required('phone number is required!')
    .min(3, 'Name must be longer than 3 characters!'),
});


const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Please enter  email address';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};

const AddNewContactModal = ({
  intl,
  contactError,
  modalOpen,
  toggleModal,
  link_id = null,
  contacts = null,
  contact,
  emaillink_id = null,
  addContactItemAction,
  updateContactItemAction,
  addContactItemErrorAction,
}) => {
  const { messages } = intl;
  useEffect(() => {
    if (contactError) {
      NotificationManager.warning(contactError.message??contactError, 'Contact Error', 3000, null, null, '');
    }
  }, [contactError]);
  const addNewContact = (values) => {
    console.log("Hello:", values)
    const dublicate = contacts.filter(contact=>contact.email_address==values.email)
    if(dublicate.length==0 || contact?.email_address==values.email){
      if (contact !== null) {

        updateContactItemAction ( {id:contact.id},{
          emaillink_id:emaillink_id,
          link_id: link_id,
          email:values.email,
          firstname: values.firstname,
          lastname: values.lastname
        });
      } else {
        addContactItemAction({
          emaillink_id:emaillink_id,
          link_id: link_id,
          email:values.email,
          firstname:values.firstname,
          lastname:values.lastname
      })
     
    }
    addContactItemErrorAction('')
    toggleModal();
  }else{
    addContactItemErrorAction({
      code: "emaillink_contacts/add-contact",
      message: "This email already exist.",
    })
  }
}

 const handleCancel = () =>{
  addContactItemErrorAction('')
  toggleModal();
 }

  const initialValues = contact !== null ?
      {
        email: contact.email_address,
        firstname: contact.first_name,
        lastname: contact.last_name
      } :
      {
        email:'',
        firstname:'',
        lastname:''
      }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={ContactSchema}
      onSubmit={addNewContact}
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
             {(contact !== null) ? (
                  <IntlMessages id="link.edit-contact-title" />
                ) : (
                  <IntlMessages id="link.add-new-contact-title" />
              )}
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label>
                  <IntlMessages id="forms.email" />{' '}<span className='luci-primary-color'>*</span>
                </Label>
                <Field
                  className='form-control'
                  name='email'
                  validate={validateEmail}
                />
                {errors.email && touched.email && (
                  <div className="invalid-feedback d-block">
                    {errors.email}
                  </div>
                )}
              </FormGroup>
              
             
             
              <Row className="mb-3">
                <Colxx sm={6}>
                  <FormGroup>
                    <Label>
                      <IntlMessages id="forms.firstname" />
                    </Label>
                    <Field
                      className='form-control'
                      name='firstname'
                    />
                  </FormGroup>
                </Colxx>
                <Colxx sm={6}>
                  <FormGroup>
                    <Label>
                      <IntlMessages id="forms.lastname" />
                    </Label>
                    <Field
                      className='form-control'
                      name='lastname'
                    />
                  </FormGroup>
                </Colxx>
              </Row>

            </ModalBody>
            <ModalFooter>
              <Button color="secondary" outline onClick={handleCancel}>
                <IntlMessages id="survey.cancel" />
              </Button>
              <Button type="submit" color="primary">
                {(contact !== null) ? (
                  <IntlMessages id="menu.save" />
                ) : (
                  <IntlMessages id="input-groups.add" />
                )}
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      )}
    </Formik>
  );
};

const mapStateToProps = ({ emaillink }) => {
  return {
    contactError:emaillink.contactError
  };
};

export default injectIntl(
  connect(mapStateToProps, {
    addContactItemAction:addContactItem,
    updateContactItemAction:updateContactItem,
    addContactItemErrorAction:addContactItemError,
  })(AddNewContactModal)
)
