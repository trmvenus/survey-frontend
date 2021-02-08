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
  getEntireSurveyListWithOrder,
  getEntireSurveyListSearch,
  selectedSurveyItemsChange,
  deleteSurveyItems,
  copySurveyItems,
} from '../../../redux/actions';

import SurveyListItem from '../../../components/applications/SurveyListItem';
import DeleteSurveyModal from '../../../containers/applications/DeleteSurveyModal';
import CopySurveyModal from '../../../containers/applications/CopySurveyModal';
import EntireSurveyApplicationMenu from '../../../containers/applications/EntireSurveyApplicationMenu';

const getIndex = (value, arr, prop) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
};

const AllSurveyList = ({ 
  match,
  intl,
  surveyItems,
  searchKeyword,
  isLoaded,
  orderColumn, 
  orderColumns,
  selectedItems,

  getEntireSurveyListWithOrderAction,
  getEntireSurveyListSearchAction,
  selectedEntireSurveyItemsChangeAction,
  deleteEntireSurveyItemsAction,
  copyEntireSurveyItemsAction,
}) => {
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
    selectedEntireSurveyItemsChangeAction(selectedList);

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
      selectedEntireSurveyItemsChangeAction(selectedList);
    }
  };

  const handleChangeSelectAll = () => {
    if (isLoaded) {
      if (selectedItems.length >= surveyItems.length) {
        selectedEntireSurveyItemsChangeAction([]);
      } else {
        selectedEntireSurveyItemsChangeAction(surveyItems.map((x) => x.id));
      }
    }
  };

  const handleDeleteSelectedItems = () => {
    if (isLoaded) {
      deleteEntireSurveyItemsAction({ids: selectedItems});
    }
  };

  const handleCopySelectedItems = (withResponses) => {
    if (isLoaded) {
      copyEntireSurveyItemsAction({ids: selectedItems, with: withResponses});
    }
  };

  const { messages } = intl;

  return (
    <>
      <Row className="app-row survey-app">
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id="menu.allsurveys" />
            </h1>

            {(isLoaded) && (
              <div className="text-zero top-right-button-container">
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
                          onClick={() => getEntireSurveyListWithOrderAction(o.column)}
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
                        getEntireSurveyListSearchAction(e.target.value);
                      }
                    }}
                  />
                </div>
              </div>
            </Collapse>
          </div>

          <Separator className="mb-5" />

          <Row>
            {isLoaded ? (
              surveyItems.map((item, index) => (
                <SurveyListItem
                  key={`todo_item_${index}`}
                  item={item}
                  handleCheckChange={handleCheckChange}
                  isSelected={
                    isLoaded ? selectedItems.includes(item.id) : false
                  }
                  isNameDisplayed={true}
                />
              ))
            ) : (
              <div className="isLoaded" />
            )}
          </Row>
        </Colxx>
      </Row>
      
      {isLoaded && <EntireSurveyApplicationMenu />}

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

const mapStateToProps = ({ entireSurvey }) => ({
  surveyItems: entireSurvey.surveyItems,
  searchKeyword: entireSurvey.searchKeyword,
  isLoaded: entireSurvey.isLoaded,
  orderColumn: entireSurvey.orderColumn,
  orderColumns: entireSurvey.orderColumns,
  selectedItems: entireSurvey.selectedItems,
})

export default injectIntl(
  connect(mapStateToProps, {
    getEntireSurveyListWithOrderAction: getEntireSurveyListWithOrder,
    getEntireSurveyListSearchAction: getEntireSurveyListSearch,
    selectedEntireSurveyItemsChangeAction: selectedSurveyItemsChange,
    deleteEntireSurveyItemsAction: deleteSurveyItems,
    copyEntireSurveyItemsAction: copySurveyItems,
  })(AllSurveyList)
);