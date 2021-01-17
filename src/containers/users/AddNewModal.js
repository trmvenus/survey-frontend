import React from 'react';
import {
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from 'reactstrap';
import Select from 'react-select';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

import { FormikReactSelect, } from '../../containers/form-validations/FormikFields';
import CustomSelectInput from '../../components/common/CustomSelectInput';
import IntlMessages from '../../helpers/IntlMessages';

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
});

const AddNewModal = ({ modalOpen, toggleModal, categories }) => {

  const addNewUser = (values, { setSubmitting}) => {

  }

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        category: '',

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
          <Modal
            isOpen={modalOpen}
            toggle={toggleModal}
            wrapClassName="modal-right"
            backdrop="static"
          >
            <ModalHeader toggle={toggleModal}>
              <IntlMessages id="pages.add-new-modal-title" />
            </ModalHeader>
            <ModalBody>
              <Label>
                <IntlMessages id="user.fullname" />
              </Label>
              <Input />

              <Label>
                <IntlMessages id="user.email" />
              </Label>
              <Input />

              <Label className="mt-4">
                <IntlMessages id="user.password" />
              </Label>
              <Field
                className='form-control'
                name='name'
                type='password'
              />
              {errors.name && touched.name && (
                <div className="invalid-feedback d-block">
                  {errors.name}
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
              {errors.gender && touched.gender ? (
                <div className="invalid-feedback d-block">
                  {errors.gender}
                </div>
              ) : null}
              <Label className="mt-4">
                <IntlMessages id="user.role" />
              </Label>
              <CustomInput
                type="radio"
                id="exCustomRadio"
                name="customRadio"
                label="Super Manager"
              />
              <CustomInput
                type="radio"
                id="exCustomRadio2"
                name="customRadio"
                label="University Manager"
              />
              <CustomInput
                type="radio"
                id="exCustomRadio3"
                name="customRadio"
                label="User"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" outline onClick={toggleModal}>
                <IntlMessages id="pages.cancel" />
              </Button>
              <Button color="primary" type="submit">
                <IntlMessages id="pages.submit" />
              </Button>{' '}
            </ModalFooter>
          </Modal>
        </Form>
      )}
      </Formik>
  );
};

export default AddNewModal;
