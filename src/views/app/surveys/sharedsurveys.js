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
  getSharedSurveyListWithOrder,
  getSharedSurveyListSearch,
  selectedSharedSurveyItemsChange,
  copySharedSurveyItems,
} from '../../../redux/actions';

import SharedSurveyListItem from '../../../components/applications/SharedSurveyListItem';
import CopySurveyModal from '../../../containers/applications/CopySurveyModal';

const getIndex = (value, arr, prop) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
};

const SharedSurveyList = ({ 
  match,
  intl,
  sharedSurveyItems,
  searchKeyword,
  isSharedSurveysLoaded,
  orderColumn,
  orderColumns,
  selectedItems,

  getSharedSurveyListWithOrderAction,
  getSharedSurveyListSearchAction,
  selectedSharedSurveyItemsChangeAction,
  copySharedSurveyItemsAction,
}) => {
  const [copyModalOpen, setCopyModalOpen] = useState(false);
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
  const [lastChecked, setLastChecked] = useState(null);
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);

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
    selectedSharedSurveyItemsChangeAction(selectedList);

    if (event.shiftKey) {
      let items = sharedSurveyItems;
      const start = getIndex(id, items, 'id');
      const end = getIndex(lastChecked, items, 'id');
      items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedList.push(
        ...items.map((item) => {
          return item.id;
        })
      );
      selectedList = Array.from(new Set(selectedList));
      selectedSharedSurveyItemsChangeAction(selectedList);
    }
  };

  const handleChangeSelectAll = () => {
    if (isSharedSurveysLoaded) {
      if (selectedItems.length >= sharedSurveyItems.length) {
        selectedSharedSurveyItemsChangeAction([]);
      } else {
        selectedSharedSurveyItemsChangeAction(sharedSurveyItems.map((x) => x.id));
      }
    }
  };

  const handleCopySelectedItems = (withResponses) => {
    if (isSharedSurveysLoaded) {
      copySharedSurveyItemsAction({ids: selectedItems, with: withResponses});
    }
  };

  const { messages } = intl;

  return (
    <>
      <Row className="survey-app">
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id="menu.sharedsurveys" />
            </h1>

            {(isSharedSurveysLoaded) && (
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
                      checked={selectedItems.length >= sharedSurveyItems.length}
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
                          onClick={() => getSharedSurveyListWithOrderAction(o.column)}
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
                        getSharedSurveyListSearchAction(e.target.value);
                      }
                    }}
                  />
                </div>
              </div>
            </Collapse>
          </div>

          <Separator className="mb-5" />

          <Row>
            {isSharedSurveysLoaded ? (
              sharedSurveyItems.map((item, index) => (
                <SharedSurveyListItem
                  key={`todo_item_${index}`}
                  item={item}
                  handleCheckChange={handleCheckChange}
                  isSelected={
                    isSharedSurveysLoaded ? selectedItems.includes(item.id) : false
                  }
                />
              ))
            ) : (
              <div className="isSharedSurveysLoaded" />
            )}
          </Row>
        </Colxx>
      </Row>

      <CopySurveyModal
        toggleModal={() => setCopyModalOpen(!copyModalOpen)}
        modalOpen={copyModalOpen}
        handleClickYes={() => handleCopySelectedItems(true)}
        handleClickNo={() => handleCopySelectedItems(false)}
      />
    </>
  )
};

const mapStateToProps = ({ sharedSurvey }) => {
  return {
    sharedSurveyItems: sharedSurvey.surveyItems,
    isSharedSurveysLoaded: sharedSurvey.isLoaded,
    // searchKeyword,
    orderColumn: sharedSurvey.orderColumn,
    orderColumns: sharedSurvey.orderColumns,
    selectedItems: sharedSurvey.selectedItems,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    getSharedSurveyListWithOrderAction: getSharedSurveyListWithOrder,
    getSharedSurveyListSearchAction: getSharedSurveyListSearch,
    selectedSharedSurveyItemsChangeAction: selectedSharedSurveyItemsChange,
    copySharedSurveyItemsAction: copySharedSurveyItems,
  })(SharedSurveyList)
);