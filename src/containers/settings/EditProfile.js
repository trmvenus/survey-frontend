/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import {
  Card,
  CardBody,
  FormGroup,
  Label,
} from 'reactstrap';

import { getCurrentUser } from '../../helpers/Utils';
import IntlMessages from '../../helpers/IntlMessages';
import DatatablePagination from '../../components/DatatablePagination';
import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from '../form-validations/FormikFields';

const ProfileSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required!'),
  name: Yup.string()
    .required('Name is required!')
    .min(3, 'Name must be longer than 3 characters!')
});

const EditProfile = ({
  intl,
  
  editingMode,

  resultItems,
  loading,
  error,
}) => {
  const [currentUser] = useState(getCurrentUser());

  const { messages } = intl;

  const options = [
    { value: 'male', label: messages['forms.male'] },
    { value: 'female', label: messages['forms.female'] },
  ];
  
  const onSubmit = (values, { setSubmitting}) => {

  }

  return (
    <Card>
      <CardBody>
        <Formik
          initialValues={{
            name: currentUser.name,
            email: currentUser.email,
            location: '',
            birthday: '',
            gender: '',
            linkedin: '',
            facebook: '',
            instagram: '',
          }}
          validationSchema={ProfileSchema}
          onSubmit={onSubmit}
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
            <Form className="av-tooltip tooltip-label-bottom">
              <FormGroup className="form-group has-top-label">
                <Label>
                  <IntlMessages id="forms.name" />
                </Label>
                <Field className="form-control" name="name" disabled={!editingMode} />
                {errors.name && touched.name ? (
                  <div className="invalid-feedback d-block">
                    {errors.name}
                  </div>
                ) : null}
              </FormGroup>
              
              <FormGroup className="form-group has-top-label">
                <Label>
                  <IntlMessages id="forms.email" />
                </Label>
                <Field className="form-control" name="email" disabled={!editingMode} />
                {errors.email && touched.email ? (
                  <div className="invalid-feedback d-block">
                    {errors.email}
                  </div>
                ) : null}
              </FormGroup>
              
              <FormGroup className="form-group has-top-label">
                <Label>
                  <IntlMessages id="pages.location" />
                </Label>
                <Field className="form-control" name="location" disabled={!editingMode} />
                {errors.location && touched.location ? (
                  <div className="invalid-feedback d-block">
                    {errors.location}
                  </div>
                ) : null}
              </FormGroup>

              <FormGroup className="form-group has-top-label">
                <Label className="d-block">
                  <IntlMessages id="forms.birthday" />
                </Label>
                <FormikDatePicker
                  name="birthday"
                  value={values.birthday}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  disabled={!editingMode}
                />
                {errors.birthday && touched.birthday ? (
                  <div className="invalid-feedback d-block">
                    {errors.birthday}
                  </div>
                ) : null}
              </FormGroup>

              <FormGroup className="form-group has-float-label">
                <Label>
                  <IntlMessages id="forms.gender" />
                </Label>
                <FormikReactSelect
                  name="gender"
                  id="gender"
                  value={values.gender}
                  options={options}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  disabled={!editingMode}
                />
                {errors.gender && touched.gender ? (
                  <div className="invalid-feedback d-block">
                    {errors.gender}
                  </div>
                ) : null}
              </FormGroup>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};

const mapStateToProps = ({ result }) => {
  const {
    resultItems, 
    loading,
    error
  } = result;

  return {
    resultItems,
    loading,
    error,
  };
};

export default injectIntl(
  connect(mapStateToProps, {
  })(EditProfile)
);