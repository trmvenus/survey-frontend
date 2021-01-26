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
import { Colxx } from '../../components/common/CustomBootstrap';
import CustomSelectInput from '../../components/common/CustomSelectInput';
import { NotificationManager } from '../../components/common/react-notifications';

// Helpers
import IntlMessages from '../../helpers/IntlMessages';
import { getChoiceOptions, getCrossTabQuestionOptions, getOpenEndQuestionOptions, getQuestionOptions, getSummaryQuestions } from '../../helpers/surveyHelper';

// Redux
import { updateReportItem, updateReportSection, } from '../../redux/actions';
import { REPORT_TYPE } from '../../constants/surveyValues';

const CustomizeTab = ({
  intl,

  questions,
  surveyid,

  reportItem,
  pillarItems,

  updateReportItemAction,
  updateReportSectionAction,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const [listSummaryQuestion, setListSummaryQuestion] = useState([]);
  const [listPillarQuestion, setListPillarQuestion] = useState([]);

  const handleSaveSection = () => {
    updateReportItemAction({
      id: reportItem.id,
      sections: reportItem.sections,
    });
  }

  const ctQuestionOptions = getCrossTabQuestionOptions(questions);

  const oeQuestionOptions = getOpenEndQuestionOptions(questions);

  const pillarOptions = pillarItems ? pillarItems.map(item => ({value: item.id, label: item.name})) : [];

  const handleChangeInvisibles = (section, value) => {
    const index = section.content.invisibles.findIndex(item => item.value === value);
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

  const {messages} = intl;

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

const mapStateToProps = ({ report, pillar }) => {
  return {
    reportItem: report.reportItem,
    pillarItems: pillar.pillarItems,
  };
};

export default injectIntl(
  connect(mapStateToProps, {
    updateReportItemAction: updateReportItem,
    updateReportSectionAction: updateReportSection,
  })(CustomizeTab)
);