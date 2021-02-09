import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { 
  Row, 
  Button, 
  Card, 
  CardBody, 
  FormGroup,
  Label,
} from 'reactstrap';
import { Formik, Form, Field, } from 'formik';
import * as Yup from 'yup'; 

// Redux

// Components
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import { NotificationManager } from '../../../components/common/react-notifications';

// Containers
import Breadcrumb from '../../../containers/navs/Breadcrumb';

// Helpers
import { getCurrentUser } from '../../../helpers/Utils';
import IntlMessages from '../../../helpers/IntlMessages';
import CardTitle from 'reactstrap/lib/CardTitle';
import { updatePassword } from '../../../redux/actions';

const SecuritySchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required('Current Password is required.'),

  newPassword: Yup.string()
      .required('New Password is required.')
      .max(100, 'Password cannot exceed 100 characters.')
      .min(8, 'Password should be longer than 8 characters.')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Password should be over 8 characters, contain one uppercase, one lowercase, one number and one special character."),

  confirmPassword: Yup.string()
      .required('Confirm Password is required.')
      .max(100, 'Password cannot exceed 100 characters.')
      .min(8, 'Password should be longer than 8 characters.')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Password should be over 8 characters, contain one uppercase, one lowercase, one number and one special character.")
      .oneOf([Yup.ref('newPassword'), null], 'Passwords do not match.',),
});

const SecuritySettings = ({ 
  match,

  authUserError,
  isAuthUserUpdated,

  updatePasswordAction,
}) => {
  const [currentUser] = useState(getCurrentUser());

  const handleChangePassword = ( values, {setErrors} ) => {
    if (values.currentPassword !== currentUser.password) {
      setErrors({
        currentPassword: "Current Password is wrong.",
      });
    } else {
      updatePasswordAction(values.newPassword);
    }
  }

  useEffect(() => {
    if (authUserError) {
      NotificationManager.warning(authUserError.message??authUserError, 'Security Page Error', 3000, null, null, '');
    }
  }, [authUserError]);

  useEffect(() => {
    if (isAuthUserUpdated && !authUserError) {
      NotificationManager.success("Password is changed successfully.", 'Security Page', 3000, null, null, '');
    }
  }, [isAuthUserUpdated]);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.security" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx lg="6" className="mb-5">
          <Card>
            <CardBody>
              <CardTitle>
                <IntlMessages id='settings.change-password' />
              </CardTitle>
              <Formik
                initialValues={{
                  currentPassword: '',
                  newPassword: '',
                  confirmPassword: '',
                }}
                validationSchema={SecuritySchema}
                onSubmit={handleChangePassword}
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
                  <FormGroup className="form-group has-top-label tooltip-left-bottom">
                    <Label>
                      <IntlMessages id="forms.current-password" />
                    </Label>
                    <Field className="form-control" type="password" name="currentPassword" />
                    {errors.currentPassword && touched.currentPassword ? (
                      <div className="invalid-feedback d-block">
                        {errors.currentPassword}
                      </div>
                    ) : null}
                  </FormGroup>
                  <FormGroup className="form-group has-top-label tooltip-left-bottom">
                    <Label>
                      <IntlMessages id="forms.new-password" />
                    </Label>
                    <Field className="form-control" type="password" name="newPassword" />
                    {errors.newPassword && touched.newPassword ? (
                      <div className="invalid-feedback d-block">
                        {errors.newPassword}
                      </div>
                    ) : null}
                  </FormGroup>
                  <FormGroup className="form-group has-top-label tooltip-left-bottom">
                    <Label>
                      <IntlMessages id="forms.confirm-password" />
                    </Label>
                    <Field className="form-control" type="password" name="confirmPassword" />
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <div className="invalid-feedback d-block">
                        {errors.confirmPassword}
                      </div>
                    ) : null}
                  </FormGroup>

                  <div className="text-zero text-center">
                    <Button
                      color="outline-primary"
                      size="lg"
                      type="submit"
                    >
                      <IntlMessages id="settings.change" />
                    </Button>
                  </div>
                </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    
    </>
  )
};

const mapStateToProps = ({ authUser }) => ({
  authUserError: authUser.error,
  isAuthUserUpdated: authUser.isUpdated,
});

export default connect(mapStateToProps, {
  updatePasswordAction: updatePassword,
})(SecuritySettings);
