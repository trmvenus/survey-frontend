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
import { addContactItem, updateContactItem, updateEmailLinkItem, addContactItemError } from '../../redux/actions';

// Helpers
import IntlMessages from '../../helpers/IntlMessages';
import { getDefaultEmailLinkContent, getRandomLinkId } from '../../helpers/linkHelper';

// Component
import { Colxx } from '../../components/common/CustomBootstrap';

// Containers
import { FormikDatePicker } from '../form-validations/FormikFields';

import EmailLinkPage from '../../views/app/surveys/links/emaillink';
import { NotificationManager } from '../../components/common/react-notifications';

const displayAddressPlaceholder = (mode = "") => {
  if (mode == "sms") return 'Phone Number';
  else if (mode == "facebook") return 'Facebook userId';
  else if (mode == 'twitter') return 'Twitter userId';
  else return 'Email address';
}

const AddNewContactModal = ({
  intl,
  contactError,
  link_id = null,
  contacts = null,
  contact = null,
  emaillink_id = null,
  addContactItemAction,
  updateContactItemAction,
  addContactItemErrorAction,
  addNewLinkMember,
  updateNewLinkMember,
  id,
  clearSelectedData,
  linkedMembers,
  mode
}) => {
  const { messages } = intl;
  const [initialValues, setInitialValues] = useState(null);
  const [email, setEmail] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [errors, setErrors] = useState("")
  const [isAdd, setIsAdd] = useState(true)

  const emptyValue = {
    email: "",
    firstname: "",
    lastname: ""
  }

  useEffect(() => {
    if (contact !== null) setIsAdd(false);
  }, [contact])

  useEffect(() => {
    if (contactError) {
      NotificationManager.warning(contactError.message ?? contactError, 'Contact Error', 3000, null, null, '');
    }
  }, [contactError]);

  useEffect(() => {
    setEmail(contact !== null ? contact.email_address : "")
    setFirstname(contact !== null ? contact.first_name : "")
    setLastname(contact !== null ? contact.last_name : "")
  }, [contact])

  const clearInputData = () => {
    setEmail("");
    setFirstname("");
    setLastname("");
    setErrors("");
    setIsAdd(true);
  }
  const validateAddress = (address) => {
    if (address == "") return "required";
    switch(mode) {
      case "sms":
        var phoneno = /^\d+$/;
        if (!address.match(phoneno)) return 'not validate phone number';
        break;
      case "facebook": break;
      case "twitter": break;
      default: break;
    }
      
  }

  const addNewContact = (values) => {
    console.log("link_id->>", emaillink_id)
    var err = validateAddress(values.email)
    if (err) {
      setErrors(err)
      setEmail("");
    }
    else {
      if (id == -1 && contact != null) {
        const dublicate = contacts?.filter(contact => contact.email_address == values.email)
        if (dublicate?.length == 0 || contact?.email_address == values.email) {
          updateContactItemAction({ id: contact.id }, {
            emaillink_id: emaillink_id,
            link_id: link_id,
            email: values.email,
            firstname: values.firstname,
            lastname: values.lastname
          });
          setInitialValues(emptyValue)
          addContactItemErrorAction('')
          clearInputData()
        } else {
          addContactItemErrorAction({
            code: "emaillink_contacts/add-contact",
            message: "This email already exist.",
          })
        }
      }
      if (id == -1 && contact == null) {
        const dublicate = contacts?.filter(contact => contact.email_address == values.email)
        const tem_dup = linkedMembers?.filter(contact => contact.email_address == values.email)
        //console.log("addd:",dublicate.length, tem_dup.length)
        if (dublicate?.length > 0 || tem_dup?.length > 0)
          addContactItemErrorAction({
            code: "emaillink_contacts/add-contact",
            message: "This email already exist.",
          })
        else {
          if (emaillink_id == null)
            addNewLinkMember({
              emaillink_id: emaillink_id,
              link_id: link_id,
              email_address: values.email,
              first_name: values.firstname,
              last_name: values.lastname
            })
          else
            addContactItemAction({
              emaillink_id: emaillink_id,
              link_id: link_id,
              email: values.email,
              firstname: values.firstname,
              lastname: values.lastname
            })
          setInitialValues(emptyValue)
          clearSelectedData();
          clearInputData()
        }
      }
      if (id != -1) {
        const dublicate = contacts?.filter(contact => contact.email_address == values.email)
        const tem_dup = linkedMembers?.filter(contact => contact.email_address == values.email)
        if (dublicate?.length > 0)
          addContactItemErrorAction({
            code: "emaillink_contacts/add-contact",
            message: "This email already exist.",
          })
        else if (tem_dup?.length > 0 && linkedMembers[id].email_address != values.email)
          addContactItemErrorAction({
            code: "emaillink_contacts/add-contact",
            message: "This email already exist.",
          })
        else {
          updateNewLinkMember(id, {
            emaillink_id: emaillink_id,
            link_id: link_id,
            email_address: values.email,
            first_name: values.firstname,
            last_name: values.lastname
          })
          setInitialValues(emptyValue)
          clearSelectedData();
          clearInputData()
        }
      }
    }
  }

  return (
    <Row>
      <Colxx sm={4} >
        <FormGroup>
          <Field
            value={email}
            className='form-control'
            name='email'
            placeholder={displayAddressPlaceholder(mode)}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors &&
            <div className="invalid-feedback d-block">
              {errors}
            </div>
          }
        </FormGroup>
      </Colxx>
      <Colxx sm={3} >
        <FormGroup>
          <Field
            value={firstname}
            className='form-control'
            name='firstname'
            placeholder="First Name"
            onChange={(e) => setFirstname(e.target.value)}
          />
        </FormGroup>
      </Colxx>
      <Colxx sm={3} >
        <FormGroup>
          <Field
            value={lastname}
            className='form-control'
            name='lastname'
            placeholder="Last Name"
            onChange={(e) => setLastname(e.target.value)}
          />
        </FormGroup>
      </Colxx>
      <Colxx sm={2} >
        <Button color="primary" className="float-right"
          onClick={() => addNewContact({ email: email, firstname: firstname, lastname: lastname })} >
          {(!isAdd) ? (
            <IntlMessages id="menu.save" />
          ) : (
            <IntlMessages id="input-groups.add" />
          )}
        </Button>
      </Colxx>
    </Row>
  );
};

const mapStateToProps = ({ emaillink }) => {
  return {
    contactError: emaillink.contactError
  };
};

export default injectIntl(
  connect(mapStateToProps, {
    addContactItemAction: addContactItem,
    updateContactItemAction: updateContactItem,
    addContactItemErrorAction: addContactItemError,
  })(AddNewContactModal)
)
