import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {injectIntl} from 'react-intl';
import {
  Row,
  Button,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from 'reactstrap';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

// Redux
import { addReportItem } from '../../redux/actions';

// Helpers
import IntlMessages from '../../helpers/IntlMessages';
import { getQuestionOptions, getCrossTabQuestionOptions, getOpenEndQuestionOptions, getChoiceOptions, getScorableQuestionOptions } from '../../helpers/surveyHelper';

// Component
import { Colxx } from '../../components/common/CustomBootstrap';
import { NotificationManager } from '../../components/common/react-notifications';

// Containers
import { FormikReactSelect, FormikCustomCheckbox, FormikDatePicker } from '../../containers/form-validations/FormikFields';

// Constants
import { REPORT_TYPE } from '../../constants/surveyValues';

const ReportSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required!')
    .min(3, 'Name must be longer than 3 characters!'),
  type: Yup.object()
    .required('Report type is required!'),
  conditionFilter: Yup.boolean(),
  conditionQuestion: Yup.string()
    .when('conditionFilter', {
      is: true,
      then: Yup.string().required('Question is required!'),
    }),
  conditionOperator: Yup.string()
    .when('conditionFilter', {
      is: true,
      then: Yup.string().required('Operator is required!'),
    }),
  conditionOption: Yup.string()
    .when('conditionFilter', {
      is: true,
      then: Yup.string().required('Option is required!'),
    }),
  dateFilter: Yup.boolean(),
  startDate: Yup.string()
    .when('dateFilter', {
      is: true,
      then: Yup.string().required('Start date is required!'),
    }),
  endDate: Yup.string()
    .when('dateFilter', {
      is: true,
      then: Yup.string().required('End date is required!'),
    }),
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

const AddNewReportModal = ({
  intl,

  modalOpen,
  toggleModal,
  questions = [],
  surveyid,

  surveyItem,
  surveyItems,
  pillarItems,
  pillarError,
  locale,

  addReportItemAction,
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
      NotificationManager.warning(pillarError.message??pillarError, 'Get Pillar Error', 3000, null, null, '');
    }
  }, [pillarError]);

  useEffect(() => {
    if (surveyItem && surveyItems) {
      setSurveys(surveyItems.map(item => ({ value: item.id, label: item.name })));
    }
  }, [surveyItem, surveyItems]);

  const addNewItem = (values, { setValues }) => {

    const section = {
      id: 1,
      type: values.type.value,
      content: {},
    };
  
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

    var filter = {
      dateFilter: values.dateFilter,
      conditionFilter: values.conditionFilter,
    }
  
    if (values.dateFilter) {
      filter.startDate = values.startDate;
      filter.endDate = values.endDate;
    }
    if (values.conditionFilter) {
      filter.conditions = [{
        question: values.conditionQuestion.value,
        operator: values.conditionOperator.value,
        option: values.conditionOption.value,
      }]
    }

    addReportItemAction({
      name: values.name,
      type: values.type.value ?? null,
      section,
      filter,
      survey: surveyid,
    });

    toggleModal();

    setValues({
      name: '',
      type: '',
      conditionQuestion: '',
      conditionOperator: '',
      conditionOption: '',
      conditionFilter: false,
      dateFilter: false,
      startDate: '',
      endDate: '',
      horizontalQuestion: '',
      verticalQuestion: '',
      openEndQuestion: '',
      pillar: '',
      survey1: '',
      element1: '',
      survey2: '',
      durationType: '',
    });
  };

  const questionOptions = getQuestionOptions(questions);

  const ctQuestionOptions = getCrossTabQuestionOptions(questions);

  const oeQuestionOptions = getOpenEndQuestionOptions(questions);

  const scorableQuestionOptions = getScorableQuestionOptions(surveyItem.json, locale);

  const getSecondScorableQuestionOptions = (survey2_id) => {
    const surveyItem2 = surveyItems.find(item => item.id === survey2_id);

    if (surveyItem2) {
      return getScorableQuestionOptions(surveyItem2.json, locale);
    } else {
      return [];
    }
  }

  const durationOptions = [
    { value: "monthly", label: messages['report.monthly'] },
    { value: "quarterly", label: messages['report.quarterly'] },
    { value: "semi-annually", label: messages['report.semi-annually'] },
    { value: "annually", label: messages['report.annually'] },
  ];

  const operatorOptions = [
    { value: 'equal', label: 'Is Equal To' },
    { value: 'notequal', label: 'Is Not Equal To' },
  ];

  return (
    <Formik
      initialValues={{
        name: '',
        type: '',
        conditionFilter: false,
        conditionQuestion: '',
        conditionOperator: '',
        conditionOption: '',
        dateFilter: false,
        startDate: '',
        endDate: '',
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
      onSubmit={addNewItem}
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
              <IntlMessages id="report.add-new-title" />
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label>
                  <IntlMessages id="report.name" />{' '}<span className='luci-primary-color'>*</span>
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
              {(values.type.value == REPORT_TYPE.BENCHMARKING) && (
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

              <FormGroup>
                <FormikCustomCheckbox
                  name="conditionFilter"
                  value={values.conditionFilter}
                  label={messages['report.condition-filter']}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                />
                {errors.conditionFilter && touched.conditionFilter ? (
                  <div className="invalid-feedback d-block">
                    {errors.conditionFilter}
                  </div>
                ) : null}
              </FormGroup>

              {(values.conditionFilter) && (
              <>
              <FormGroup>
                <Label>
                  <IntlMessages id="report.question" />{' '}<span className='luci-primary-color'>*</span>
                </Label>
                <FormikReactSelect
                  name="conditionQuestion"
                  id="conditionQuestion"
                  value={values.conditionQuestion}
                  options={questionOptions}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                />
                {errors.conditionQuestion && touched.conditionQuestion ? (
                  <div className="invalid-feedback d-block">
                    {errors.conditionQuestion}
                  </div>
                ) : null}
              </FormGroup>
              {(values.conditionQuestion.value) && (
              <>
                <FormGroup>
                  <Label>
                    <IntlMessages id="report.operator" />{' '}<span className='luci-primary-color'>*</span>
                  </Label>
                  <FormikReactSelect
                    name="conditionOperator"
                    id="conditionOperator"
                    value={values.conditionOperator}
                    options={operatorOptions}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                  />
                  {errors.conditionOperator && touched.conditionOperator ? (
                    <div className="invalid-feedback d-block">
                      {errors.conditionOperator}
                    </div>
                  ) : null}
                </FormGroup>
                {(values.conditionOperator.value) && (
                <>
                  <FormGroup>
                    <Label>
                      <IntlMessages id="report.option" />{' '}<span className='luci-primary-color'>*</span>
                    </Label>
                    <FormikReactSelect
                      name="conditionOption"
                      id="conditionOption"
                      value={values.conditionOption}
                      options={getChoiceOptions(questions, values.conditionQuestion.value)}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                    />
                    {errors.conditionOption && touched.conditionOption ? (
                      <div className="invalid-feedback d-block">
                        {errors.conditionOption}
                      </div>
                    ) : null}
                  </FormGroup>
                </>
                )}
              </>
                )}
                </>
              )}

              <FormGroup>
                <FormikCustomCheckbox
                  name="dateFilter"
                  value={values.dateFilter}
                  label={messages['report.date-filter']}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                />
                {errors.dateFilter && touched.dateFilter ? (
                  <div className="invalid-feedback d-block">
                    {errors.dateFilter}
                  </div>
                ) : null}
              </FormGroup>

              {(values.dateFilter) && (
              <>
              <FormGroup>
                <Label>
                  <IntlMessages id="report.date-range"/>{' '}<span className='luci-primary-color'>*</span>
                </Label>
                <Row>
                  <Colxx xxs='6'>
                    <FormikDatePicker
                      name="startDate"
                      value={values.startDate}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                      placeholderText={messages['form-components.start']}
                      popperModifiers={{
                        preventOverflow: {
                          enabled: true,
                        },
                      }}
                    />
                    {errors.startDate && touched.startDate ? (
                      <div className="invalid-feedback d-block">
                        {errors.startDate}
                      </div>
                    ) : null}
                  </Colxx>
                  <Colxx xxs='6'>
                    <FormikDatePicker
                      name="endDate"
                      value={values.endDate}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                      placeholderText={messages['form-components.end']}
                      popperModifiers={{
                        preventOverflow: {
                          enabled: true,
                        },
                      }}
                    />
                    {errors.endDate && touched.endDate ? (
                      <div className="invalid-feedback d-block">
                        {errors.endDate}
                      </div>
                    ) : null}
                  </Colxx>
                </Row>
              </FormGroup>
              </>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" outline onClick={toggleModal}>
                <IntlMessages id="survey.cancel" />
              </Button>
              <Button type="submit" color="primary">
                <IntlMessages id="survey.submit" />
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      )}
    </Formik>
  );
};

const mapStateToProps = ({ pillar, survey, surveyListApp, settings, }) => {
  return {
    surveyItem: survey.surveyItem,
    surveyItems: surveyListApp.allSurveyItems,
    pillarItems: pillar.pillarItems,
    pillarError: pillar.error,
    locale: settings.locale,
  };
};

export default injectIntl(
  connect(mapStateToProps, {
    addReportItemAction: addReportItem,
  })(AddNewReportModal)
);
