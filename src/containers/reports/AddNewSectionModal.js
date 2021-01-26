import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  Button,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from 'reactstrap';
import * as Yup from 'yup';
import { Formik, Form, } from 'formik';

// Redux
import { addReportSection } from '../../redux/actions';

// Helpers
import IntlMessages from '../../helpers/IntlMessages';
import { getCrossTabQuestionOptions, getOpenEndQuestionOptions, } from '../../helpers/surveyHelper';

// Component
import { NotificationManager } from '../../components/common/react-notifications';

// Containers
import { FormikReactSelect } from '../../containers/form-validations/FormikFields';

// Constants
import { REPORT_TYPE } from '../../constants/surveyValues';

const ReportSchema = Yup.object().shape({
  type: Yup.object()
    .required('Report type is required!'),
  horizontalQuestion: Yup.string()
    .when('type', {
      is: val => val && val.value === REPORT_TYPE.CROSS_TAB,
      then: Yup.string().required('Horizontal question is required!'),
    }),
  verticalQuestion: Yup.string()
    .when('type', {
      is: val => val && val.value === REPORT_TYPE.CROSS_TAB,
      then: Yup.string().required('Vertical question is required!'),
    }),
  openEndQuestion: Yup.string()
    .when('type', {
      is: val => val && val.value === REPORT_TYPE.OPEN_END,
      then: Yup.string().required('Open-End question is required!'),
    }),
  pillar: Yup.string()
    .when('type', {
      is: val => val && val.value === REPORT_TYPE.PILLAR,
      then: Yup.string().required('Pillar is required!'),
    }),
});

const AddNewSectionModal = ({
  intl,

  modalOpen,
  toggleModal,
  questions = [],

  pillarItems,
  pillarError,

  addReportSectionAction,
}) => {

  const { messages } = intl;

  const types = [
    { value: REPORT_TYPE.SUMMARY, label: messages['report.summary'], },
    { value: REPORT_TYPE.CROSS_TAB, label: messages['report.cross-tab'], },
    { value: REPORT_TYPE.OPEN_END, label: messages['report.open-end'], },
    { value: REPORT_TYPE.PILLAR, label: messages['report.pillar'], },
    { value: REPORT_TYPE.QUESTION_SCORE, label: messages['report.question-score'], },
  ];

  useEffect(() => {
    if (pillarError) {
      NotificationManager.warning(pillarError.message??pillarError, 'Get Pillar Error', 3000, null, null, '');
    }
  }, [pillarError]);

  const addNewSection = (values, {setValues}) => {
    const section = {
      type: values.type.value,
      content: {},
    }
    switch(values.type.value) {
      case REPORT_TYPE.SUMMARY:
        section.content = {
          invisibles: [],
        };
        break;
  
      case REPORT_TYPE.CROSS_TAB:
        section.content = {
          horizontal: values.horizontalQuestion.value,
          vertical: values.verticalQuestion.value,
        };
        break;
  
      case REPORT_TYPE.OPEN_END:
        section.content = {
          openend: values.openEndQuestion.value,
        };
        break;
  
      case REPORT_TYPE.PILLAR:
        section.content = {
          invisibles: [],
          pillar: values.pillar.value,
        };
        break;
    }

    addReportSectionAction(section);

    setValues({
      type: '',
      horizontalQuestion: '',
      verticalQuestion: '',
      openEndQuestion: '',
      pillar: '',
    })

    toggleModal();
  };

  const ctQuestionOptions = getCrossTabQuestionOptions(questions);

  const oeQuestionOptions = getOpenEndQuestionOptions(questions);

  return (
    <Formik
      initialValues={{
        type: '',
        horizontalQuestion: '',
        verticalQuestion: '',
        openEndQuestion: '',
        pillar: '',
      }}
      validationSchema={ReportSchema}
      onSubmit={addNewSection}
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
          wrapClassName="modal-right"
          backdrop="static" 
        >
          <Form>
            <ModalHeader toggle={toggleModal}>
              <IntlMessages id="report.add-new-section" />
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label>
                  <IntlMessages id="report.report-type" />{' '}<span className='luci-primary-color'>*</span>
                </Label>
                <FormikReactSelect
                  name="type"
                  id="type"
                  value={values.type}
                  options={types}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                />
                {errors.type && touched.type ? (
                  <div className="invalid-feedback d-block">
                    {errors.type}
                  </div>
                ) : null}
              </FormGroup>

              {(values.type.value == REPORT_TYPE.SUMMARY) && (
                <>
                </>
              )}
              {(values.type.value == REPORT_TYPE.CROSS_TAB) && (
                <>
                <FormGroup>
                  <Label>
                    <IntlMessages id="report.horizontal-question" />{' '}<span className='luci-primary-color'>*</span>
                  </Label>
                  <FormikReactSelect
                    name="horizontalQuestion"
                    id="horizontalQuestion"
                    value={values.horizontalQuestion}
                    options={ctQuestionOptions}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                  />
                  {errors.horizontalQuestion && touched.horizontalQuestion ? (
                    <div className="invalid-feedback d-block">
                      {errors.horizontalQuestion}
                    </div>
                  ) : null}
                </FormGroup>
                <FormGroup>
                  <Label>
                    <IntlMessages id="report.vertical-question" />{' '}<span className='luci-primary-color'>*</span>
                  </Label>
                  <FormikReactSelect
                    name="verticalQuestion"
                    id="verticalQuestion"
                    value={values.verticalQuestion}
                    options={ctQuestionOptions}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                  />
                  {errors.verticalQuestion && touched.verticalQuestion ? (
                    <div className="invalid-feedback d-block">
                      {errors.verticalQuestion}
                    </div>
                  ) : null}
                </FormGroup>
                </>
              )}
              {(values.type.value == REPORT_TYPE.OPEN_END) && (
                <>
                <FormGroup>
                  <Label>
                    <IntlMessages id="report.open-end-question" />{' '}<span className='luci-primary-color'>*</span>
                  </Label>
                  <FormikReactSelect
                    name="openEndQuestion"
                    id="openEndQuestion"
                    value={values.openEndQuestion}
                    options={oeQuestionOptions}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                  />
                  {errors.openEndQuestion && touched.openEndQuestion ? (
                    <div className="invalid-feedback d-block">
                      {errors.openEndQuestion}
                    </div>
                  ) : null}
                </FormGroup>
                </>
              )}
              {(values.type.value == REPORT_TYPE.PILLAR) && (
                <FormGroup>
                  <Label>
                    <IntlMessages id="report.pillar" />{' '}<span className='luci-primary-color'>*</span>
                  </Label>
                  <FormikReactSelect
                    name="pillar"
                    id="pillar"
                    value={values.pillar}
                    options={pillarItems.map(item => ({value: item.id, label: item.name}))}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                  />
                  {errors.pillar && touched.pillar ? (
                    <div className="invalid-feedback d-block">
                      {errors.pillar}
                    </div>
                  ) : null}
                </FormGroup>
              )}
              {(values.type.value == REPORT_TYPE.QUESTION_SCORE) && (
                <>
                </>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" outline onClick={toggleModal}>
                <IntlMessages id="survey.cancel" />
              </Button>
              <Button type="submit" color="primary">
                <IntlMessages id="input-groups.add" />
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      )}
    </Formik>
  );
};

const mapStateToProps = ({ pillar, }) => {
  return {
    pillarItems: pillar.pillarItems,
    pillarError: pillar.error,
    isPillarsLoaded: pillar.loading,
  };
};

export default injectIntl(
  connect(mapStateToProps, {
    addReportSectionAction: addReportSection,
  })(AddNewSectionModal)
);
