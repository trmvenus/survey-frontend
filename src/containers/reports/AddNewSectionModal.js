import React, { useEffect, useState } from 'react';
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
import { getCrossTabQuestionOptions, getOpenEndQuestionOptions, getScorableQuestionOptions, } from '../../helpers/surveyHelper';

// Component
import { NotificationManager } from '../../components/common/react-notifications';

// Containers
import { FormikReactSelect } from '../../containers/form-validations/FormikFields';

// Constants
import { REPORT_TYPE } from '../../constants/surveyValues';
import { setDirection } from '../../helpers/Utils';

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
  // openEndQuestion: Yup.string()
  //   .when('type', {
  //     is: val => val && val.value === REPORT_TYPE.OPEN_END,
  //     then: Yup.string().required('Open-End question is required!'),
  //   }),
  pillar: Yup.string()
    .when('type', {
      is: val => val && val.value === REPORT_TYPE.PILLAR,
      then: Yup.string().required('Pillar is required!'),
    }),
  survey2: Yup.string()
    .when('type', {
      is: val => val && val.value === REPORT_TYPE.BENCHMARKING,
      then: Yup.string().required('Survey 2 is required!'),
    }),
  element1: Yup.string()
    .when('type', {
      is: val => val && val.value === REPORT_TYPE.BENCHMARKING,
      then: Yup.string().required('Element 1 is required!'),
    }),
  element2: Yup.string()
    .when('type', {
      is: val => val && val.value === REPORT_TYPE.BENCHMARKING,
      then: Yup.string().required('Element 2 is required!'),
    }),
  durationType: Yup.string()
    .when('type', {
      is: val => val && val.value === REPORT_TYPE.TREND,
      then: Yup.string().required('Duration is required!'),
    }),
});

const AddNewSectionModal = ({
  intl,

  modalOpen,
  toggleModal,
  questions = [],

  surveyItem,
  isSurveyItemLoaded,
  surveyItems,
  isSurveyItemsLoaded,
  pillarItems,
  pillarError,
  locale,

  addReportSectionAction,
}) => {

  const [surveys, setSurveys] = useState([]);

  const { messages } = intl;

  const types = [
    { value: REPORT_TYPE.SUMMARY, label: messages['report.summary'], },
    { value: REPORT_TYPE.CROSS_TAB, label: messages['report.cross-tab'], },
    { value: REPORT_TYPE.OPEN_END, label: messages['report.open-end'], },
    { value: REPORT_TYPE.PILLAR, label: messages['report.pillar'], },
    { value: REPORT_TYPE.QUESTION_SCORE, label: messages['report.question-score'], },
    { value: REPORT_TYPE.BENCHMARKING, label: messages['report.benchmarking'], },
    { value: REPORT_TYPE.TREND, label: messages['report.trend'], },
  ];

  useEffect(() => {
    if (pillarError) {
      NotificationManager.warning(pillarError.message ?? pillarError, 'Get Pillar Error', 3000, null, null, '');
    }
  }, [pillarError]);

  useEffect(() => {
    if (surveyItem && surveyItems) {
      setSurveys(surveyItems.map(item => ({ value: item.id, label: item.name })));
    }
  }, [isSurveyItemLoaded, isSurveyItemsLoaded, surveyItem, surveyItems]);

  const addNewSection = (values, { setValues }) => {
    const section = {
      type: values.type.value,
      content: {},
    }

    switch (values.type.value) {
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
          openend: "openend",
        };
        break;

      case REPORT_TYPE.PILLAR:
        section.content = {
          invisibles: [],
          pillar: values.pillar.value,
        };
        break;

      case REPORT_TYPE.BENCHMARKING:
        section.content = {
          survey1: values.survey1.value,
          element1: values.element1.value,
          survey2: values.survey2.value,
          element2: values.element2.value,
        };
        break;

      case REPORT_TYPE.TREND:
        section.content = {
          durationType: values.durationType.value,
        }
        break;
    }

    addReportSectionAction(section);

    setValues({
      type: '',
      horizontalQuestion: '',
      verticalQuestion: '',
      openEndQuestion: '',
      pillar: '',
      survey1: '',
      element1: '',
      survey2: '',
      element2: '',
      durationType: '',
    })

    toggleModal();
  };

  const ctQuestionOptions = getCrossTabQuestionOptions(questions);

  const oeQuestionOptions = getOpenEndQuestionOptions(questions);

  const scorableQuestionOptions = getScorableQuestionOptions(surveyItem.json, locale);

  const durationOptions = [
    { value: "monthly", label: messages['report.monthly'] },
    { value: "quarterly", label: messages['report.quarterly'] },
    { value: "semi-annually", label: messages['report.semi-annually'] },
    { value: "annually", label: messages['report.annually'] },
  ];

  const getSecondScorableQuestionOptions = (survey2_id) => {
    const surveyItem2 = surveyItems.find(item => item.id === survey2_id);

    if (surveyItem2) {
      return getScorableQuestionOptions(surveyItem2.json, locale);
    } else {
      return [];
    }
  }

  return (
    <Formik
      initialValues={{
        type: '',
        horizontalQuestion: '',
        verticalQuestion: '',
        openEndQuestion: '',
        pillar: '',
        survey1: '',
        element1: '',
        survey2: '',
        element2: '',
        durationType: '',
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

              {(values.type.value === REPORT_TYPE.SUMMARY) && (
                <>
                </>
              )}
              {(values.type.value === REPORT_TYPE.CROSS_TAB) && (
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
              {/* {(values.type.value === REPORT_TYPE.OPEN_END) && (
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
              )} */}
              {(values.type.value === REPORT_TYPE.PILLAR) && (
                <FormGroup>
                  <Label>
                    <IntlMessages id="report.pillar" />{' '}<span className='luci-primary-color'>*</span>
                  </Label>
                  <FormikReactSelect
                    name="pillar"
                    id="pillar"
                    value={values.pillar}
                    options={pillarItems.map(item => ({ value: item.id, label: item.name }))}
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
              {(values.type.value === REPORT_TYPE.QUESTION_SCORE) && (
                <>
                </>
              )}
              {(values.type.value === REPORT_TYPE.BENCHMARKING) && (
                <>
                  <FormGroup>
                    <Label>
                      <IntlMessages id="report.survey1" />{' '}<span className='luci-primary-color'>*</span>
                    </Label>
                    <FormikReactSelect
                      name="survey1"
                      id="survey1"
                      value={{ value: surveyItem.id, label: surveyItem.name }}
                      options={[{ value: surveyItem.id, label: surveyItem.name }]}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                      disabled
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>
                      <IntlMessages id="report.element1" />{' '}<span className='luci-primary-color'>*</span>
                    </Label>
                    <FormikReactSelect
                      name="element1"
                      id="element1"
                      value={values.element1}
                      options={scorableQuestionOptions}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                    />
                    {errors.element1 && touched.element1 ? (
                      <div className="invaligetSecondScorableQuestionOptionsd-feedback d-block">
                        {errors.element1}
                      </div>
                    ) : null}
                  </FormGroup>
                  <FormGroup>
                    <Label>
                      <IntlMessages id="report.survey2" />{' '}<span className='luci-primary-color'>*</span>
                    </Label>
                    <FormikReactSelect
                      name="survey2"
                      id="survey2"
                      value={values.survey2}
                      options={surveys}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                    />
                    {errors.survey2 && touched.survey2 ? (
                      <div className="invalid-feedback d-block">
                        {errors.survey2}
                      </div>
                    ) : null}
                  </FormGroup>
                  <FormGroup>
                    <Label>
                      <IntlMessages id="report.element2" />{' '}<span className='luci-primary-color'>*</span>
                    </Label>
                    <FormikReactSelect
                      name="element2"
                      id="element2"
                      value={values.element2}
                      options={getSecondScorableQuestionOptions(values.survey2.value)}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                    />
                    {errors.element2 && touched.element2 ? (
                      <div className="invalid-feedback d-block">
                        {errors.element2}
                      </div>
                    ) : null}
                  </FormGroup>
                </>
              )}
              {(values.type.value === REPORT_TYPE.TREND) && (
                <>
                <FormGroup>
                  <Label>
                    <IntlMessages id="report.duration" />{' '}<span className='luci-primary-color'>*</span>
                  </Label>
                  <FormikReactSelect
                    name="durationType"
                    id="durationType"
                    value={values.durationType}
                    options={durationOptions}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                  />
                </FormGroup>
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

const mapStateToProps = ({ survey, surveyListApp, pillar, settings, }) => {
  return {
    surveyItem: survey.surveyItem,
    isSurveyItemLoaded: survey.loading,

    surveyItems: surveyListApp.mySurveyItems,
    isSurveyItemsLoaded: survey.loading,

    pillarItems: pillar.pillarItems,
    pillarError: pillar.error,
    isPillarsLoaded: pillar.loading,

    locale: settings.locale,
  };
};

export default injectIntl(
  connect(mapStateToProps, {
    addReportSectionAction: addReportSection,
  })(AddNewSectionModal)
);
