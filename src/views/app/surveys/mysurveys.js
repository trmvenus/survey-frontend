import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { 
  Row,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Collapse,
  ButtonDropdown, 
  CustomInput,
} from 'reactstrap';

import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';

import {
  getSurveyList,
  getSurveyListWithOrder,
  getSurveyListSearch,
  selectedSurveyItemsChange,
  deleteSurveyItems,
  copySurveyItems,
} from '../../../redux/actions';

import SurveyListItem from '../../../components/applications/SurveyListItem';
import AddNewSurveyModal from '../../../containers/applications/AddNewSurveyModal';
import DeleteSurveyModal from '../../../containers/applications/DeleteSurveyModal';
import CopySurveyModal from '../../../containers/applications/CopySurveyModal';
import SurveyApplicationMenu from '../../../containers/applications/SurveyApplicationMenu';

const getIndex = (value, arr, prop) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
};

const MySurveyList = ({ 
  match,
  intl,
  surveyItems,
  searchKeyword,
  loading,
  orderColumn,
  orderColumns,
  selectedItems,

  getSurveyListWithOrderAction,
  getSurveyListSearchAction,
  selectedSurveyItemsChangeAction,
  deleteSurveyItemsAction,
  copySurveyItemsAction,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [copyModalOpen, setCopyModalOpen] = useState(false);
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
  const [lastChecked, setLastChecked] = useState(null);
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add('right-menu');

    return () => {
      document.body.classList.remove('right-menu');
    };
  }, []);

  const handleCheckChange = (event, id) => {
    if (lastChecked == null) {
      setLastChecked(id);
    }

    let selectedList = Object.assign([], selectedItems);
    if (selectedList.includes(id)) {
      selectedList = selectedList.filter((x) => x !== id);
    } else {
      selectedList.push(id);
    }
    selectedSurveyItemsChangeAction(selectedList);

    if (event.shiftKey) {
      let items = surveyItems;
      const start = getIndex(id, items, 'id');
      const end = getIndex(lastChecked, items, 'id');
      items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedList.push(
        ...items.map((item) => {
          return item.id;
        })
      );
      selectedList = Array.from(new Set(selectedList));
      selectedSurveyItemsChangeAction(selectedList);
    }
  };

  const handleChangeSelectAll = () => {
    if (loading) {
      if (selectedItems.length >= surveyItems.length) {
        selectedSurveyItemsChangeAction([]);
      } else {
        selectedSurveyItemsChangeAction(surveyItems.map((x) => x.id));
      }
    }
  };

  const handleDeleteSelectedItems = () => {
    if (loading) {
      deleteSurveyItemsAction({ids: selectedItems});
    }
  };

  const handleCopySelectedItems = (withResponses) => {
    if (loading) {
      copySurveyItemsAction({ids: selectedItems, with: withResponses});
    }
  };

  const { messages } = intl;

  return (
    <>
      <Row className="app-row survey-app">
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id="menu.mysurveys" />
            </h1>

            {(loading) && (
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
                      checked={selectedItems.length >= surveyItems.length}
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

          <div className="mb-2">
            <Button
              color="empty"
              className="pt-0 pl-0 d-inline-block d-md-none"
              onClick={() => {
                setDisplayOptionsIsOpen(!displayOptionsIsOpen);
              }}
            >
              <IntlMessages id="survey.display-options" />{' '}
              <i className="simple-icon-arrow-down align-middle" />
            </Button>

            <Collapse
              id="displayOptions"
              className="d-md-block mb-2"
              isOpen={displayOptionsIsOpen}
            >
              <div className="d-block d-md-inline-block">
                <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                  <DropdownToggle caret color="outline-dark" size="xs">
                    <IntlMessages id="survey.orderby" />
                    {orderColumn ? orderColumn.label : ''}
                  </DropdownToggle>
                  <DropdownMenu>
                    {orderColumns.map((o, index) => {
                      return (
                        <DropdownItem
                          key={index}
                          onClick={() => getSurveyListWithOrderAction(o.column)}
                        >
                          {o.label}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown>
                <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                  <input
                    type="text"
                    name="keyword"
                    id="search"
                    placeholder={messages['menu.search']}
                    defaultValue={searchKeyword}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        getSurveyListSearchAction(e.target.value);
                      }
                    }}
                  />
                </div>
              </div>
            </Collapse>
          </div>

          <Separator className="mb-5" />

          <Row>
            {loading ? (
              surveyItems.map((item, index) => (
                <SurveyListItem
                  key={`todo_item_${index}`}
                  item={item}
                  handleCheckChange={handleCheckChange}
                  isSelected={
                    loading ? selectedItems.includes(item.id) : false
                  }
                />
              ))
            ) : (
              <div className="loading" />
            )}
          </Row>
        </Colxx>
      </Row>
      
      {loading && <SurveyApplicationMenu />}

      <AddNewSurveyModal
        toggleModal={() => setModalOpen(!modalOpen)}
        modalOpen={modalOpen}
      />

      <DeleteSurveyModal
        toggleModal={() => setDeleteModalOpen(!deleteModalOpen)}
        modalOpen={deleteModalOpen}
        handleClickYes={handleDeleteSelectedItems}
      />

      <CopySurveyModal
        toggleModal={() => setCopyModalOpen(!copyModalOpen)}
        modalOpen={copyModalOpen}
        handleClickYes={() => handleCopySelectedItems(true)}
        handleClickNo={() => handleCopySelectedItems(false)}
      />
    </>
  )
};

const mapStateToProps = ({ surveyListApp }) => {
  const {
    surveyItems,
    searchKeyword,
    loading,
    orderColumn,
    orderColumns,
    selectedItems,
  } = surveyListApp;

  return {
    surveyItems,
    searchKeyword,
    loading,
    orderColumn,
    orderColumns,
    selectedItems,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    getSurveyListWithOrderAction: getSurveyListWithOrder,
    getSurveyListSearchAction: getSurveyListSearch,
    selectedSurveyItemsChangeAction: selectedSurveyItemsChange,
    deleteSurveyItemsAction: deleteSurveyItems,
    copySurveyItemsAction: copySurveyItems,
  })(MySurveyList)
);