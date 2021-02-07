/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import * as Yup from 'yup';
import { Formik, Form, Field, } from 'formik';
import {
  CardBody,
  FormGroup,
  Label,
} from 'reactstrap';

import { getCurrentUser } from '../../helpers/Utils';
import IntlMessages from '../../helpers/IntlMessages';
import {
  FormikReactSelect,
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
  formRef,

  additionalUserInfo,
}) => {
  const [currentUser] = useState(getCurrentUser());

  const { messages } = intl;

  const genderOptions = [
    { value: 'male', label: messages['forms.male'] },
    { value: 'female', label: messages['forms.female'] },
  ];

  const getGenderOption = (gender) => {
    if (gender === 'male') return genderOptions[0];
    else if (gender === 'female') return genderOptions[1];
    else return '';
  }

  return (
    <CardBody>
      {(!('location' in additionalUserInfo)) ? (
        <div className='loading' />
      ) : (
      <Formik
        initialValues={{
          name: currentUser.name,
          email: currentUser.email,
          location: additionalUserInfo.location ?? '',
          birthday: additionalUserInfo.birthday ? new Date(additionalUserInfo.birthday) : '',
          gender: getGenderOption(additionalUserInfo.gender),
          linkedin: '',
          facebook: '',
          instagram: '',
        }}
        validationSchema={ProfileSchema}
        innerRef={formRef}
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
          <Form className="av-tooltip tooltip-label-bottom edit-profile">
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
              <Field className="form-control" name="email" disabled />
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

            <FormGroup className="form-group has-top-label">
              <Label>
                <IntlMessages id="forms.gender" />
              </Label>
              <FormikReactSelect
                name="gender"
                id="gender"
                value={values.gender}
                options={genderOptions}
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
      )}
    </CardBody>
  );
};

const mapStateToProps = ({ authUser }) => ({
  additionalUserInfo: authUser.additionalInfo,
});

export default injectIntl(
  connect(mapStateToProps, {
  })(EditProfile)
);