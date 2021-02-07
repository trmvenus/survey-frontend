import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Card, CardBody, CardTitle, FormGroup, Label, CustomInput, } from 'reactstrap';
import { ReactSortable } from 'react-sortablejs';
import Switch from 'rc-switch';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import {Button} from 'reactstrap';

import 'react-datepicker/dist/react-datepicker.css';
import 'rc-switch/assets/index.css';

// Containers
import AddNewSectionModal from './AddNewSectionModal';

// Components
import CustomSelectInput from '../../components/common/CustomSelectInput';
import { NotificationManager } from '../../components/common/react-notifications';

// Helpers
import IntlMessages from '../../helpers/IntlMessages';
import { getChoiceOptions, getCrossTabQuestionOptions, getOpenEndQuestionOptions, getQuestionOptions, getScorableQuestionOptions, getSummaryQuestions } from '../../helpers/surveyHelper';

// Redux
import { updateReportItem, updateReportSection, } from '../../redux/actions';
import { REPORT_TYPE } from '../../constants/surveyValues';

const CustomizeTab = ({
  intl,

  questions,
  surveyid,

  surveyItem,
  surveyItems,
  reportItem,
  pillarItems,
  locale,

  updateReportItemAction,
  updateReportSectionAction,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [surveys, setSurveys] = useState([]);

  const [listSummaryQuestion, setListSummaryQuestion] = useState([]);
  const [listPillarQuestion, setListPillarQuestion] = useState([]);

  const { messages } = intl;

  const handleSaveSection = () => {
    updateReportItemAction({
      id: reportItem.id,
      sections: reportItem.sections,
    });
  }

  const ctQuestionOptions = getCrossTabQuestionOptions(questions);

  const oeQuestionOptions = getOpenEndQuestionOptions(questions);

  const pillarOptions = pillarItems ? pillarItems.map(item => ({value: item.id, label: item.name})) : [];

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

  const handleChangeInvisibles = (section, value) => {
    const index = section.content.invisibles.findIndex(item => item === value);
    if (index === -1) {
      section.content.invisibles.push(value);
    } else {
      section.content.invisibles = section.content.invisibles.filter((item, id) => id !== index);
    }
    updateReportSectionAction(section);
  }

  useEffect(() => {
    setListSummaryQuestion(
      getSummaryQuestions(questions).map((question, i) => ({id: i+1, value: question.name, label: question.title}))
    );

    setListPillarQuestion(
      getSummaryQuestions(questions).map((question, i) => ({id: i+1, value: question.name, label: question.title}))
    );
  }, [questions]);

  useEffect(() => {
    if (surveyItem && surveyItems) {
      setSurveys(surveyItems.map(item => ({value: item.id, label: item.name})));
    }
  }, [surveyItem, surveyItems]);

  const getOption = (options, value) => {
    for (let page of options) {
      if (page.options) {
        for (let option of page.options) {
          if (option.value === value) {
            return option;
          }
        }
      } else if (page.value === value){
        return page;
      }
    }
    return '';
  };

  return (
    <>
      <Card className="mb-3">
        <CardBody>
          <div className="float-right">
            <Button color='outline-primary mr-3' onClick={() => setModalOpen(true)}>
              <IntlMessages id='report.add-section'/>
            </Button>
            <Button color='outline-primary' onClick={handleSaveSection}>
              <IntlMessages id='menu.save'/>
            </Button>
          </div>

          <p className="lead">
            {reportItem.name}
          </p>
        </CardBody>
      </Card>

      {reportItem.sections.map((section, i) => {
        return (
          <Card className="mb-3" key={i}>
            <CardBody>
              <CardTitle>
                <IntlMessages id='report.section-type'/>{' : '}
                <span className='text-primary'><IntlMessages id={`report.${section.type}`}/></span>
              </CardTitle>
              {(section.type === REPORT_TYPE.SUMMARY) && (
                <>
                <ReactSortable
                  list={listSummaryQuestion}
                  setList={(list) => setListSummaryQuestion(list)}
                  tag="ul"
                  className="list-unstyled luci-sortable"
                >
                  {listSummaryQuestion.map((item) => (
                    <li className='luci-sortable-row' key={`basic_${item.id}`}>
                      <p className='luci-cursor-grabbing'>
                        {item.id}. {item.label}
                      </p>

                      <CustomInput
                        type="checkbox"
                        id={`sortable_${item.id}`}
                        label={messages['report.show']}
                        checked={!section.content.invisibles.includes(item.value)}
                        onChange={() => handleChangeInvisibles(section, item.value)}
                      />
                    </li>
                  ))}
                </ReactSortable>
                </>
              )}
              {(section.type === REPORT_TYPE.CROSS_TAB) && (
                <>
                <FormGroup>
                  <Label>
                    <IntlMessages id="report.horizontal-question" />{' '}<span className='luci-primary-color'>*</span>
                  </Label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="horizontalQuestion"
                    id="horizontalQuestion"
                    value={getOption(ctQuestionOptions, section.content.horizontal)}
                    options={ctQuestionOptions}
                    onChange={(option) => {section.content.horizontal = option.value; updateReportSectionAction(section)}}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>
                    <IntlMessages id="report.vertical-question" />{' '}<span className='luci-primary-color'>*</span>
                  </Label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    value={getOption(ctQuestionOptions, section.content.vertical)}
                    options={ctQuestionOptions}
                    onChange={(option) => {section.content.vertical = option.value; updateReportSectionAction(section)}}
                  />
                </FormGroup>
                </>
              )}
              {(section.type === REPORT_TYPE.OPEN_END) && (
                <>
                <FormGroup>
                  <Label>
                    <IntlMessages id="report.open-end-question" />{' '}<span className='luci-primary-color'>*</span>
                  </Label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    value={getOption(oeQuestionOptions, section.content.openend)}
                    options={oeQuestionOptions}
                    onChange={(option) => {section.content.openend = option.value; updateReportSectionAction(section)}}
                  />
                </FormGroup>
                </>
              )}
              {(section.type === REPORT_TYPE.QUESTION_SCORE) && (
                <></>
              )}
              {(section.type === REPORT_TYPE.PILLAR) && (
                <>
                <FormGroup className="mb-4">
                  <Label>
                    <IntlMessages id="report.pillar" />{' '}<span className='luci-primary-color'>*</span>
                  </Label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    value={getOption(pillarOptions, section.content.pillar)}
                    options={pillarOptions}
                    onChange={(option) => {section.content.pillar = option.value; updateReportSectionAction(section)}}
                  />
                </FormGroup>
                <ReactSortable
                  list={listPillarQuestion}
                  setList={(list) => setListPillarQuestion(list)}
                  tag="ul"
                  className="list-unstyled luci-sortable"
                >
                  {listPillarQuestion.map((item) => (
                    <li className='luci-sortable-row' key={`basic_${item.id}`}>
                      <p className='luci-cursor-grabbing'>
                        {item.id}. {item.label}
                      </p>

                      <CustomInput
                        type="checkbox"
                        id={`sortable_${item.id}`}
                        label={messages['report.show']}
                        checked={!section.content.invisibles.includes(item.value)}
                        onChange={() => handleChangeInvisibles(section, item.value)}
                      />
                    </li>
                  ))}
                </ReactSortable>
                </>
              )}
              {(section.type === REPORT_TYPE.BENCHMARKING) && (
                <>
                <FormGroup>
                  <Label>
                    <IntlMessages id="report.survey1" />{' '}<span className='luci-primary-color'>*</span>
                  </Label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    value={{value: surveyItem.id, label: surveyItem.name}}
                    options={[{value: surveyItem.id, label: surveyItem.name}]}
                    isDisabled={true}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>
                    <IntlMessages id="report.element1" />{' '}<span className='luci-primary-color'>*</span>
                  </Label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    value={getOption(scorableQuestionOptions, section.content.element1)}
                    options={scorableQuestionOptions}
                    onChange={(option) => {section.content.element1 = option.value; updateReportSectionAction(section)}}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>
                    <IntlMessages id="report.survey2" />{' '}<span className='luci-primary-color'>*</span>
                  </Label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    value={getOption(surveys, section.content.survey2)}
                    options={surveys}
                    onChange={(option) => {section.content.survey2 = option.value; updateReportSectionAction(section)}}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>
                    <IntlMessages id="report.element2" />{' '}<span className='luci-primary-color'>*</span>
                  </Label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    value={getOption(getSecondScorableQuestionOptions(section.content.survey2), section.content.element2)}
                    options={getSecondScorableQuestionOptions(section.content.survey2)}
                    onChange={(option) => {section.content.element2 = option.value; updateReportSectionAction(section)}}
                  />
                </FormGroup>
                </>
              )}
              {(section.type === REPORT_TYPE.TREND) && (
                <>
                <FormGroup>
                  <Label>
                    <IntlMessages id="report.duration" />{' '}<span className='luci-primary-color'>*</span>
                  </Label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    value={getOption(durationOptions, section.content.durationType)}
                    options={durationOptions}
                    onChange={(option) => {section.content.durationType = option.value; updateReportSectionAction(section)}}
                  />
                </FormGroup>
                </>
              )}
            </CardBody>
          </Card>
        )
      })}

      <AddNewSectionModal
        toggleModal={() => setModalOpen(!modalOpen)}
        modalOpen={modalOpen}
        questions={questions}
        surveyid={surveyid}
      />
    </>
  )
}

const mapStateToProps = ({ survey, surveyListApp, report, pillar, settings }) => {
  return {
    surveyItem: survey.surveyItem,
    surveyItems: surveyListApp.mySurveyItems,
    reportItem: report.reportItem,
    pillarItems: pillar.pillarItems,
    locale: settings.locale,
  };
};

export default injectIntl(
  connect(mapStateToProps, {
    updateReportItemAction: updateReportItem,
    updateReportSectionAction: updateReportSection,
  })(CustomizeTab)
);