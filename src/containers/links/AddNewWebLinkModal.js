import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {injectIntl} from 'react-intl';
import {
  Button,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

// Redux
import { addWebLinkItem, updateWebLinkItem } from '../../redux/actions';

// Helpers
import IntlMessages from '../../helpers/IntlMessages';

// Component
import { Colxx } from '../../components/common/CustomBootstrap';
import { NotificationManager } from '../../components/common/react-notifications';

// Containers
import { FormikCustomCheckbox, FormikDatePicker } from '../../containers/form-validations/FormikFields';
import { shareWebSurveyPath } from '../../constants/defaultValues';
import { getRandomLinkId } from '../../helpers/linkHelper';

const WebLinkSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required!')
    .min(3, 'Name must be longer than 3 characters!'),
  url: Yup.string()
    .required('Survey Url is required!')
    .matches('^[a-z]+$', 'Survey Url can contain only lowercase letters!'),
});

const AddNewWebLinkModal = ({
  intl,

  modalOpen,
  toggleModal,
  surveyid,
  webLink = null,

  addWebLinkItemAction,
  updateWebLinkItemAction,
}) => {

  const { messages } = intl;

  const addNewWebLink = (values, {setValues}) => {
    if (webLink !== null) {
      updateWebLinkItemAction(webLink.id, {
        name: values.name,
        close_quota: values.closeQuota,
        close_date: values.closeDate,
        is_active: values.isActive,
      });
    } else {
      addWebLinkItemAction({
        survey_id: surveyid,
        name: values.name,
        link_id: values.url,
        close_quota: values.closeQuota,
        close_date: values.closeDate,
        is_active: values.isActive,
      });
    }

    toggleModal();
  };

  const initialValues = webLink !== null ?
      {
        name: webLink.name,
        url: webLink.link_id,
        closeQuota: webLink.close_quota??'',
        closeDate: new Date(webLink.close_date),
        isActive: webLink.is_active,
      } :
      {
        name: '',
        url: getRandomLinkId(),
        closeQuota: '',
        closeDate: '',
        isActive: false,
      }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={WebLinkSchema}
      onSubmit={addNewWebLink}
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
        >
          <Form>
            <ModalHeader toggle={toggleModal}>
              <IntlMessages id="link.add-new-web-title" />
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
                  <IntlMessages id="link.survey-url" />{' '}<span className='luci-primary-color'>*</span>
                </Label>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    {shareWebSurveyPath}
                  </InputGroupAddon>
                  <Field
                    className='form-control'
                    name='url'
                    disabled={webLink !== null}
                  />
                </InputGroup>
                {errors.url && touched.url ? (
                  <div className="invalid-feedback d-block">
                    {errors.url}
                  </div>
                ) : null}
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
                {errors.closeQuota && touched.closeQuota && (
                  <div className="invalid-feedback d-block">
                    {errors.closeQuota}
                  </div>
                )}
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

              <FormGroup>
                <FormikCustomCheckbox
                  name="isActive"
                  value={values.isActive}
                  label={messages['link.is-active']}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" outline onClick={toggleModal}>
                <IntlMessages id="survey.cancel" />
              </Button>
              <Button type="submit" color="primary">
                {(webLink !== null) ? (
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
    addWebLinkItemAction: addWebLinkItem,
    updateWebLinkItemAction: updateWebLinkItem,
  })(AddNewWebLinkModal)
);
