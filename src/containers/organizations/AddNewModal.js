import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from 'reactstrap';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

import IntlMessages from '../../helpers/IntlMessages';
import { addOrganizationItem } from '../../redux/actions';

const OrganizationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required!')
    .min(3, 'Name must be longer than 3 characters!'),
});

const AddNewModal = ({ 
  modalOpen, 
  toggleModal, 

  addOrganizationItemAction,
}) => {

  const addNewOrganization = (values, { setSubmitting}) => {
    addOrganizationItemAction(values);
    toggleModal();
  }

  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          category: '',
          role: 1,
        }}
        validationSchema={OrganizationSchema}
        onSubmit={addNewOrganization}
      >
        {({
          errors,
          touched,
        }) => (
          <Form>
            <ModalHeader toggle={toggleModal}>
              <IntlMessages id="organization.add-new-modal-title" />
            </ModalHeader>
            <ModalBody>
              <Label>
                <IntlMessages id="organization.name" />{' '}<span className='luci-primary-color'>*</span>
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
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" outline onClick={toggleModal}>
                <IntlMessages id="pages.cancel" />
              </Button>
              <Button color="primary" type="submit">
                <IntlMessages id="pages.submit" />
              </Button>{' '}
            </ModalFooter>
          </Form>
        )}
        </Formik>
      </Modal>
  );
};

const mapStateToProps = ({  }) => {
  return {
  };
};

export default connect(mapStateToProps, {
    addOrganizationItemAction: addOrganizationItem,
})(AddNewModal);