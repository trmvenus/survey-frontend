import React, { useEffect } from 'react';
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
import { getQuestionOptions, getCrossTabQuestionOptions, getOpenEndQuestionOptions, getChoiceOptions } from '../../helpers/surveyHelper';

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
});

const AddNewReportModal = ({
  intl,

  modalOpen,
  toggleModal,
  questions = [],
  surveyid,

  pillarItems,
  pillarError,
  isPillarsLoaded,

  addReportItemAction,
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

  const addNewItem = (values) => {
    addReportItemAction({
      ...values,
      type: values.type.value ?? null,
      conditionQuestion: values.conditionQuestion.value ?? null,
      conditionOperator: values.conditionOperator.value ?? null,
      conditionOption: values.conditionOption.value ?? null,
      horizontalQuestion: values.horizontalQuestion.value ?? null,
      verticalQuestion: values.verticalQuestion.value ?? null,
      openEndQuestion: values.openEndQuestion.value ?? null,
      pillar: values.pillar.value ?? null,
      survey: surveyid,
    });

    toggleModal();
  };

  const questionOptions = getQuestionOptions(questions);

  const ctQuestionOptions = getCrossTabQuestionOptions(questions);

  const oeQuestionOptions = getOpenEndQuestionOptions(questions);

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

const mapStateToProps = ({ pillar, }) => {
  return {
    pillarItems: pillar.pillarItems,
    pillarError: pillar.error,
    isPillarsLoaded: pillar.loading,
  };
};

export default injectIntl(
  connect(mapStateToProps, {
    addReportItemAction: addReportItem,
  })(AddNewReportModal)
);
