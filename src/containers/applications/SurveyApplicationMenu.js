/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/no-array-index-key */
import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { NavItem, Badge, Button, Input, InputGroup, InputGroupAddon, } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import classnames from 'classnames';

import IntlMessages from '../../helpers/IntlMessages';
import ApplicationMenu from '../../components/common/ApplicationMenu';

import { 
  getSurveyListWithFilter,
  getCategoryList,
  addCategoryItem,
} from '../../redux/actions';

const SurveyApplicationMenu = ({
  surveyItems,
  filter,
  allSurveyItems,
  loading,
  labels,
  categoryItems,
  categoryLoading,
  getSurveyListWithFilterAction,
  getCategoryListAction,
  addCategoryItemAction,
}) => {
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    getCategoryListAction();
  }, [getCategoryListAction]);

  const addFilter = (column, value) => {
    getSurveyListWithFilterAction(column, value);
  };

  const addCategoryItem = () => {
    addCategoryItemAction({name: newCategoryName});
    setNewCategoryName('');
  }

  return (
    <ApplicationMenu>
      <PerfectScrollbar
        options={{ suppressScrollX: true, wheelPropagation: false }}
      >
        <div className="p-4">
          <p className="text-muted text-small">
            <IntlMessages id="survey.status" />
          </p>
          <ul className="list-unstyled mb-5">
            <NavItem className={classnames({ active: !filter })}>
              <NavLink to="#" onClick={() => addFilter('', '')} location={{}}>
                <i className="simple-icon-reload" />
                <IntlMessages id="survey.all-surveys" />
                <span className="float-right">
                  {loading && allSurveyItems.length}
                </span>
              </NavLink>
            </NavItem>
            <NavItem
              className={classnames({
                active:
                  filter &&
                  filter.column === 'status' &&
                  filter.value === 'ACTIVE',
              })}
            >
              <NavLink
                to="#"
                location={{}}
                onClick={() => addFilter('status', 'ACTIVE')}
              >
                <i className="simple-icon-refresh" />
                <IntlMessages id="survey.active-surveys" />
                <span className="float-right">
                  {loading &&
                    surveyItems.filter((x) => x.status === 'ACTIVE').length}
                </span>
              </NavLink>
            </NavItem>
            <NavItem
              className={classnames({
                active:
                  filter &&
                  filter.column === 'status' &&
                  filter.value === 'COMPLETED',
              })}
            >
              <NavLink
                to="#"
                location={{}}
                onClick={() => addFilter('status', 'COMPLETED')}
              >
                <i className="simple-icon-check" />
                <IntlMessages id="survey.completed-surveys" />
                <span className="float-right">
                  {loading &&
                    surveyItems.filter((x) => x.status === 'COMPLETED').length}
                </span>
              </NavLink>
            </NavItem>
          </ul>
          <p className="text-muted text-small">
            <IntlMessages id="survey.categories" />
          </p>
          <ul className="list-unstyled mb-5">
            {categoryLoading && categoryItems.map((c, index) => {
              return (
                <NavItem key={index}>
                  <div onClick={() => addFilter('category_id', c.id)}>
                    <div className="custom-control custom-radio">
                      <Input
                        type="radio"
                        className="custom-control-input"
                        checked={
                          filter !== null && filter.column === 'category_id' && filter.value === c.id
                        }
                        onChange={()=>{}}
                      />
                      <label className="custom-control-label">{c.name}</label>
                    </div>
                  </div>
                </NavItem>
              );
            })}
            <InputGroup className="mt-3 mb-3 pr-3">
              <Input 
                className="pt-1 pr-2 pb-1 pl-2"
                defaultValue={newCategoryName}
                onChange={(event) =>
                  setNewCategoryName(event.target.value)
                }
              />
              <InputGroupAddon addonType="append">
                <Button
                  className="pt-1 pr-2 pb-1 pl-2" 
                  outline color="secondary" size="xs"
                  onClick={() => addCategoryItem()}
                >
                  <IntlMessages id="input-groups.add" />
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </ul>
          {/* <p className="text-muted text-small">
            <IntlMessages id="survey.labels" />
          </p>
          <div>
            {labels.map((l, index) => {
              return (
                <p className="d-sm-inline-block mb-1" key={index}>
                  <NavLink
                    to="#"
                    location={{}}
                    onClick={() => addFilter('label', l.label)}
                  >
                    <Badge
                      className="mb-1"
                      color={`${
                        filter &&
                        filter.column === 'label' &&
                        filter.value === l.label
                          ? l.color
                          : `outline-${l.color}`
                      }`}
                      pill
                    >
                      {l.label}
                    </Badge>
                  </NavLink>
                </p>
              );
            })}
          </div> */}
        </div>
      </PerfectScrollbar>
    </ApplicationMenu>
  );
};
const mapStateToProps = ({ surveyListApp, categoryList }) => {
  const {
    surveyItems,
    filter,
    allSurveyItems,
    loading,
    labels,
  } = surveyListApp;

  const {
    categoryItems,
  } = categoryList;

  return {
    surveyItems,
    filter,
    allSurveyItems,
    loading,
    labels,
    categoryItems,
    categoryLoading: categoryList.loading,
  };
};
export default connect(mapStateToProps, {
  getSurveyListWithFilterAction: getSurveyListWithFilter,
  getCategoryListAction: getCategoryList,
  addCategoryItemAction: addCategoryItem,
})(SurveyApplicationMenu);
