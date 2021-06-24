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

import { FormikReactSelect, FormikCustomRadioGroup } from '../../containers/form-validations/FormikFields';
import IntlMessages from '../../helpers/IntlMessages';
import { addUser } from '../../redux/user/actions';
import { getRoleName, UserRole } from '../../helpers/authHelper';

const UserSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required!')
    .min(3, 'Name must be longer than 3 characters!'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required!'),
  password: Yup.string()
    .required('Password is required!')
    .min(6, 'Password must be longer than 6 characters!'),
  role: Yup.string()
    .required('Role is required'),
});

const options = [
  { value: UserRole.Admin, label: getRoleName(UserRole.Admin), },
  { value: UserRole.OrgAdmin, label: getRoleName(UserRole.OrgAdmin), },
  { value: UserRole.User, label: getRoleName(UserRole.User), },
  { value: UserRole.Researcher, label: getRoleName(UserRole.Researcher), },
];

const AddNewModal = ({ 
  modalOpen, 
  toggleModal, 
  categories,

  addUserAction,
}) => {

  console.log(categories,"----")
  const addNewUser = (values, { setSubmitting}) => {
    addUserAction(values);
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
        validationSchema={UserSchema}
        onSubmit={addNewUser}
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
          <Form>
            <ModalHeader toggle={toggleModal}>
              <IntlMessages id="user.add-new-modal-title" />
            </ModalHeader>
            <ModalBody>
              <Label>
                <IntlMessages id="user.fullname" />{' '}<span className='luci-primary-color'>*</span>
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

              <Label className="mt-3">
                <IntlMessages id="user.email" />{' '}<span className='luci-primary-color'>*</span>
              </Label>
              <Field
                className='form-control'
                name='email'
              />
              {errors.email && touched.email && (
                <div className="invalid-feedback d-block">
                  {errors.email}
                </div>
              )}

              <Label className="mt-3">
                <IntlMessages id="user.password" />{' '}<span className='luci-primary-color'>*</span>
              </Label>
              <Field
                className='form-control'
                name='password'
                type='password'
              />
              {errors.password && touched.password && (
                <div className="invalid-feedback d-block">
                  {errors.password}
                </div>
              )}
              <Label className="mt-4">
                <IntlMessages id="user.organization" />
              </Label>
              <FormikReactSelect
                name="category"
                id="category"
                value={values.category}
                options={categories}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
              />
              {errors.category && touched.category ? (
                <div className="invalid-feedback d-block">
                  {errors.category}
                </div>
              ) : null}
              <Label className="mt-4">
                <IntlMessages id="user.role" />{' '}<span className='luci-primary-color'>*</span>
              </Label>
              <FormikCustomRadioGroup
                // inline
                name="role"
                id="role"
                // label="Which of these?"
                value={values.role}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                options={options}
              />
              {errors.role && touched.role ? (
                <div className="invalid-feedback d-block">
                  {errors.role}
                </div>
              ) : null}
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

const mapStateToProps = ({}) => { return {} };

export default connect(mapStateToProps, {
    addUserAction: addUser,
  })(AddNewModal);