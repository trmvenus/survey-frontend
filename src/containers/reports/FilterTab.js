import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Card, CardBody, CardTitle, FormGroup, Label, Row } from 'reactstrap';
import Switch from 'rc-switch';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import {Table, Button} from 'reactstrap';

import 'react-datepicker/dist/react-datepicker.css';
import 'rc-switch/assets/index.css';

// Components
import { Colxx } from '../../components/common/CustomBootstrap';
import CustomSelectInput from '../../components/common/CustomSelectInput';
import { NotificationManager } from '../../components/common/react-notifications';

// Helpers
import IntlMessages from '../../helpers/IntlMessages';
import { getChoiceOptions, getQuestionOptions } from '../../helpers/surveyHelper';

// Redux
import { updateReportItem, changeReportItemSavingStatus } from '../../redux/actions';

const FilterTab = ({
  intl,

  questions = [],

  reportItem,
  isReportItemSaved,

  updateReportItemAction,
  changeReportItemSavingStatusAction
}) => {

  const [filter, setFilter] =  useState({});
  const [dateFilter, setDateFilter] = useState(false);
  const [conditionFilter, setConditionFilter] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [conditionQuestion, setConditionQuestion] = useState('');
  const [conditionOperator, setConditionOperator] = useState('');
  const [conditionOption, setConditionOption] = useState('');

  const {messages} = intl;

  const handleAddCondition = () => {
    const conditions = filter.conditions ?? [];
    conditions.push({
      question: conditionQuestion.value,
      operator: conditionOperator.value,
      option: conditionOption.value,
    })

    setFilter({
      ...filter,
      conditions
    });

    setConditionQuestion('');
    setConditionOperator('');
    setConditionOption('');
  }

  const handleRemoveCondition = (index) => {
    setFilter({
      ...filter,
      conditions: filter.conditions.splice(index, 1)
    })
  }

  const handleSaveFilter = () => {
    const newFilter = filter;

    newFilter.dateFilter = dateFilter;
    newFilter.conditionFilter = conditionFilter;
    if (dateFilter) {
      newFilter.startDate = startDate;
      newFilter.endDate = endDate;
    }

    updateReportItemAction({
      id: reportItem.id, 
      filter
    });
  }

  useState(() => {
    if (reportItem.filter) {
      const filter = reportItem.filter;
      setFilter(filter);
      setDateFilter(filter.dateFilter??false);
      setConditionFilter(filter.conditionFilter??false);
      if (filter.dateFilter) {
        setStartDate(new Date(filter.startDate));
        setEndDate(new Date(filter.endDate));
      }
    }
  }, [reportItem]);

  useEffect(() => {
    setConditionOption('');
  }, [conditionQuestion]);

  useEffect(() => {
    if (isReportItemSaved) {
      NotificationManager.success("This report has been saved successfully.", 'Saved Report', 3000, null, null, '');
      changeReportItemSavingStatusAction(false);
    }
  }, [isReportItemSaved, changeReportItemSavingStatusAction]);

  const questionOptions = getQuestionOptions(questions);

  const operatorOptions = [
    { value: 'equal', label: 'Is Equal To' },
    { value: 'notequal', label: 'Is Not Equal To' },
  ];

  return (
    <Card>
      <CardBody>
        <div className="float-right">
          <Button color='outline-primary' onClick={handleSaveFilter}>
            <IntlMessages id='menu.save'/>
          </Button>
        </div>

        <CardTitle>
          <IntlMessages id='report.filter-options' />
        </CardTitle>

        <Row className="mb-5">
          <Colxx lg={6} md={12}>
            <div className="d-flex flex-row mb-3">
              <Switch
                className="custom-switch custom-switch-primary-inverse"
                checked={dateFilter}
                onChange={setDateFilter}
              />
              <h3 className='text-secondary ml-3'>
                <IntlMessages id='report.date-filter' />
              </h3>
            </div>

            <FormGroup>
              <Row>
                <Colxx xxs='6'>
                  <DatePicker
                    selected={startDate}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    onChange={setStartDate}
                    placeholderText={messages['form-components.start']}
                    disabled={!dateFilter}
                  />
                </Colxx>
                <Colxx xxs='6'>
                <DatePicker
                    selected={endDate}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    onChange={setEndDate}
                    placeholderText={messages['form-components.end']}
                    disabled={!dateFilter}
                  />
                </Colxx>
              </Row>
            </FormGroup>
          </Colxx>
        
          <Colxx lg={6} md={12}>
            <div className="d-flex flex-row mb-3">
              <Switch
                className="custom-switch custom-switch-primary-inverse"
                checked={conditionFilter}
                onChange={setConditionFilter}
              />
              <h3 className='text-secondary ml-3'>
                <IntlMessages id='report.condition-filter' />
              </h3>
            </div>

            <Table striped className='mb-5'>
              <thead>
                <tr>
                  <th width='30%'>
                    <IntlMessages id='report.question' />
                  </th>
                  <th width='30%'>
                    <IntlMessages id='report.operator' />
                  </th>
                  <th width='30%'>
                    <IntlMessages id='report.option' />
                  </th>
                  <th>
                    <IntlMessages id='dropdowns.action' />
                  </th>
                </tr>
              </thead>
              <tbody>
                {(filter.conditions) && (
                  <>
                  {filter.conditions.map((cond, i) => {
                    var cho = null;
                    var ques = null;
                    for (let page of questions) {
                      for (let question of page.questions) {
                        if (question.name == cond.question) {
                          for (let choice of question.choices) {
                            if (choice.value === cond.option) {
                              cho = choice;
                              ques = question;
                              break;
                            }
                          }
                          break;
                        }
                      }
                      if (ques && cho) break;
                    }

                    return (
                    <React.Fragment key={i}>
                    {(ques !== null && cho !== null) ? (
                      <tr>
                        <td>{ques.title}</td>
                        <td>{cond.operator}</td>
                        <td>{cho.text}</td>
                        <td>
                          <i className="simple-icon-trash luci-delete-icon" onClick={handleRemoveCondition}/>
                        </td>
                      </tr>
                    ): null}
                    </React.Fragment>
                    )
                  })}
                  </>
                )}
              </tbody>
            </Table>

            {(conditionFilter) && (
              <>
              <FormGroup>
                <Label>
                  <IntlMessages id="report.question" />{' '}<span className='luci-primary-color'>*</span>
                </Label>
                <Select
                  components={{ Input: CustomSelectInput }}
                  className="react-select"
                  classNamePrefix="react-select"
                  name="conditionQuestion"
                  id="conditionQuestion"
                  value={conditionQuestion}
                  options={questionOptions}
                  onChange={setConditionQuestion}
                />
              </FormGroup>
              {(conditionQuestion.value) && (
              <>
                <FormGroup>
                  <Label>
                    <IntlMessages id="report.operator" />{' '}<span className='luci-primary-color'>*</span>
                  </Label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="conditionOperator"
                    id="conditionOperator"
                    value={conditionOperator}
                    options={operatorOptions}
                    onChange={setConditionOperator}
                  />
                </FormGroup>
                {(conditionOperator.value) && (
                <>
                  <FormGroup>
                    <Label>
                      <IntlMessages id="report.option" />{' '}<span className='luci-primary-color'>*</span>
                    </Label>
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="conditionOption"
                      id="conditionOption"
                      value={conditionOption}
                      options={getChoiceOptions(questions, conditionQuestion.value)}
                      onChange={setConditionOption}
                    />
                  </FormGroup>
                  {(conditionOption.value) && (
                    <Button color='info' onClick={handleAddCondition}>
                      <IntlMessages id='report.add-condition' />
                    </Button>
                  )}
                </>
                )}
              </>
                )}
                </>
              )}
          </Colxx>
        </Row>
      </CardBody>
    </Card>
  )
}

const mapStateToProps = ({ report }) => {
  return {
    reportItem: report.reportItem,
    isReportItemSaved: report.isSaved,
  };
};

export default injectIntl(
  connect(mapStateToProps, {
    updateReportItemAction: updateReportItem,
    changeReportItemSavingStatusAction: changeReportItemSavingStatus,
  })(FilterTab)
);