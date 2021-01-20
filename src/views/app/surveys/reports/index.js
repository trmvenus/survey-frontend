import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { 
  Row,
  Button,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  ButtonDropdown, 
  CustomInput,
} from 'reactstrap';

// Redux
import {
  getReportList,
} from '../../../../redux/actions';

// Components
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import { NotificationManager } from '../../../../components/common/react-notifications';

// Containers
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import AddNewReportModal from '../../../../containers/reports/AddNewReportModal';
import SurveyReportTable from '../../../../containers/reports/SurveyReportTable';

// Helpers
import IntlMessages from '../../../../helpers/IntlMessages';
import {getQuestions} from '../../../../helpers/surveyHelper';


const ReportsSurvey = ({ 
  match,
  surveyid,
  
  locale,
  surveyItem,
  surveyError,
  isSurveyLoaded,
  
  getReportListAction,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [copyModalOpen, setCopyModalOpen] = useState(false);

  const [selectedItems, setSelectedItems] = useState([]);
  const [questions, setQuestions] = useState([]);


  const handleChangeSelectAll = () => {
    if (isSurveyLoaded) {
      // if (selectedItems.length >= surveyItems.length) {
        // selectedSurveyItemsChangeAction([]);
      // } else {
        // selectedSurveyItemsChangeAction(surveyItems.map((x) => x.id));
      // }
    }
  };

  useEffect(() => {
    if (isSurveyLoaded) {
      const questions = getQuestions(surveyItem.json, locale);
      setQuestions(questions);
    }
  }, [isSurveyLoaded]);

  useEffect(() => {
    if (surveyError) {
      NotificationManager.warning(surveyError.message??surveyError, 'Get Survey Error', 3000, null, null, '');
    }
  }, [surveyError]);
  
  useEffect(() => {
    getReportListAction({id: surveyid});
  }, [getReportListAction]);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id="survey.reports" />
            </h1>
          {(isSurveyLoaded) && (
            <div className="text-zero top-right-button-container">
              <Button
                color="primary"
                size="lg"
                className="top-right-button mr-1"
                onClick={() => setModalOpen(true)}
              >
                <IntlMessages id="survey.add-new" />
              </Button>
              <ButtonDropdown
                isOpen={dropdownSplitOpen}
                toggle={() => setDropdownSplitOpen(!dropdownSplitOpen)}
              >
                <div className="btn btn-primary btn-lg pl-4 pr-0 check-button check-all">
                  <CustomInput
                    className="custom-checkbox mb-0 d-inline-block"
                    type="checkbox"
                    id="checkAll"
                    // checked={selectedItems.length >= surveyItems.length}
                    onClick={() => handleChangeSelectAll()}
                    onChange={() => handleChangeSelectAll()}
                    label={
                      <span
                        className={`custom-control-label`}
                      />
                    }
                  />
                </div>
                <DropdownToggle
                  caret
                  color="primary"
                  className="dropdown-toggle-split btn-lg"
                />
                <DropdownMenu right>
                  <DropdownItem onClick={() => selectedItems.length > 0 ? setDeleteModalOpen(true) : {}}>
                    <IntlMessages id="survey.delete" />
                  </DropdownItem>
                  <DropdownItem onClick={() => selectedItems.length > 0 ? setCopyModalOpen(true) : {}}>
                    <IntlMessages id="survey.copy" />
                  </DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </div>
          )}
            <Breadcrumb match={match} />
          </div>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <SurveyReportTable />
        </Colxx>
      </Row>

      <AddNewReportModal
        toggleModal={() => setModalOpen(!modalOpen)}
        modalOpen={modalOpen}
        questions={questions}
        surveyid={surveyid}
      />
    </>
  )
};

const mapStateToProps = ({ settings, survey, }) => {

  return {
    locale: settings.locale,

    surveyItem: survey.surveyItem,
    surveyError: survey.error,
    isSurveyLoaded: survey.loading,
  };
};

export default injectIntl(
  connect(mapStateToProps, {
    getReportListAction: getReportList
  })(ReportsSurvey)
);