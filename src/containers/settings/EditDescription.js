/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Formik, Form, Field, } from 'formik';
import {
  CardBody,
  FormGroup,
  Label,
} from 'reactstrap';

import IntlMessages from '../../helpers/IntlMessages';

const EditDescription = ({
  intl,

  formRef,
  editingMode,

  additionalUserInfo,

}) => {

  const { messages } = intl;

  return (
    <CardBody>
      <Formik
        enableReinitialize
        initialValues={{
          shortDesc: additionalUserInfo.short_description ?? '',
          longDesc: additionalUserInfo.long_description ?? '',
        }}
        innerRef={formRef}
      >
        {({
          values
        }) => (
          <Form className="av-tooltip tooltip-label-bottom edit-profile">
            <FormGroup className="form-group has-top-label">
              <Label>
                <IntlMessages id="profile.short-description" />
              </Label>
              <Field className="form-control" name="shortDesc" disabled={!editingMode} />
            </FormGroup>
            
            <FormGroup className="form-group has-top-label">
              <Label>
                <IntlMessages id="profile.long-description" />
              </Label>
              <Field
                className="form-control"
                name="longDesc"
                component="textarea"
                rows="8"
                disabled={!editingMode}
              />
            </FormGroup>
          </Form>
        )}
      </Formik>
    </CardBody>
  );
};

const mapStateToProps = ({ authUser }) => ({
  additionalUserInfo: authUser.additionalInfo,
});

export default injectIntl(
  connect(mapStateToProps, {
  })(EditDescription)
);