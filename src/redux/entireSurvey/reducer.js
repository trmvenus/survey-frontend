import {
  ENTIRE_SURVEY_LIST_GET_LIST,
  ENTIRE_SURVEY_LIST_GET_LIST_SUCCESS,
  ENTIRE_SURVEY_LIST_GET_LIST_ERROR,
  ENTIRE_SURVEY_LIST_GET_LIST_WITH_FILTER,
  ENTIRE_SURVEY_LIST_GET_LIST_WITH_ORDER,
  ENTIRE_SURVEY_LIST_GET_LIST_SEARCH,
  ENTIRE_SURVEY_LIST_SELECTED_ITEMS_CHANGE,
  ENTIRE_SURVEY_LIST_DELETE_ITEMS,
  ENTIRE_SURVEY_LIST_DELETE_ITEMS_SUCCESS,
  ENTIRE_SURVEY_LIST_DELETE_ITEMS_ERROR,
  ENTIRE_SURVEY_LIST_COPY_ITEMS,
  ENTIRE_SURVEY_LIST_COPY_ITEMS_SUCCESS,
  ENTIRE_SURVEY_LIST_COPY_ITEMS_ERROR,
  ENTIRE_SURVEY_LIST_SHARE_ITEM,
  ENTIRE_SURVEY_LIST_SHARE_ITEM_SUCCESS,
  ENTIRE_SURVEY_LIST_SHARE_ITEM_ERROR,
  ENTIRE_SURVEY_LIST_ACTIVE_ITEM,
  ENTIRE_SURVEY_LIST_ACTIVE_ITEM_SUCCESS,
  ENTIRE_SURVEY_LIST_ACTIVE_ITEM_ERROR,
  ENTIRE_SURVEY_LIST_SET_MULTI_RESPONSES_ITEM,
  ENTIRE_SURVEY_LIST_SET_MULTI_RESPONSES_ITEM_ERROR,
  ENTIRE_SURVEY_LIST_SET_MULTI_RESPONSES_ITEM_SUCCESS,
} from '../actions';

const INIT_STATE = {
  entireSurveyItems: [],
  surveyItems: [],
  error: '',
  filter: null,
  searchKeyword: '',
  orderColumn: null,
  isLoaded: false,
  labels: [
    { label: 'EDUCATION', color: 'secondary' },
    { label: 'NEW FRAMEWORK', color: 'primary' },
    { label: 'PERSONAL', color: 'info' },
  ],
  orderColumns: [
    { column: 'name', label: 'Name' },
    { column: 'category', label: 'Category' },
    { column: 'responses', label: 'Responses' },
  ],
  selectedItems: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ENTIRE_SURVEY_LIST_GET_LIST:
      return { ...state, isLoaded: false };
    case ENTIRE_SURVEY_LIST_GET_LIST_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        entireSurveyItems: action.payload,
        surveyItems: action.payload,
      };
    case ENTIRE_SURVEY_LIST_GET_LIST_ERROR:
      return { ...state, isLoaded: true, error: action.payload };
    case ENTIRE_SURVEY_LIST_GET_LIST_WITH_FILTER:
      if (action.payload.column === '' || action.payload.value === '') {
        return {
          ...state,
          isLoaded: true,
          surveyItems: state.entireSurveyItems,
          filter: null,
        };
      }
      const filteredItems = state.entireSurveyItems.filter(
        (item) => item[action.payload.column] === action.payload.value
      );
      return {
        ...state,
        isLoaded: true,
        surveyItems: filteredItems,
        filter: {
          column: action.payload.column,
          value: action.payload.value,
        },
      };
    case ENTIRE_SURVEY_LIST_GET_LIST_WITH_ORDER:
      if (action.payload === '') {
        return {
          ...state,
          isLoaded: true,
          surveyItems: state.surveyItems,
          orderColumn: null,
        };
      }
      const sortedItems = state.surveyItems.sort((a, b) => {
        if (a[action.payload] < b[action.payload]) return -1;
        if (a[action.payload] > b[action.payload]) return 1;
        return 0;
      });
      return {
        ...state,
        isLoaded: true,
        surveyItems: sortedItems,
        orderColumn: state.orderColumns.find(
          (x) => x.column === action.payload
        ),
      };
    case ENTIRE_SURVEY_LIST_GET_LIST_SEARCH:
      if (action.payload === '') {
        return { ...state, surveyItems: state.entireSurveyItems };
      }
      const keyword = action.payload.toLowerCase();
      const searchItems = state.entireSurveyItems.filter(
        (item) =>
          item.name.toLowerCase().indexOf(keyword) > -1 // ||
          // item.status.toLowerCase().indexOf(keyword) > -1 ||
          // item.category.toLowerCase().indexOf(keyword) > -1 ||
          // item.label.toLowerCase().indexOf(keyword) > -1
      );
      return {
        ...state,
        isLoaded: true,
        surveyItems: searchItems,
        searchKeyword: action.payload,
      };

    case ENTIRE_SURVEY_LIST_SELECTED_ITEMS_CHANGE:
      return { ...state, isLoaded: true, selectedItems: action.payload };

    case ENTIRE_SURVEY_LIST_DELETE_ITEMS:
      return { ...state, isLoaded: false, };

    case ENTIRE_SURVEY_LIST_DELETE_ITEMS_SUCCESS:
      return { 
        ...state, 
        isLoaded: true, 
        surveyItems: state.surveyItems.filter(item => !state.selectedItems.includes(item.id)),
        selectedItems: [],
      };

    case ENTIRE_SURVEY_LIST_DELETE_ITEMS_ERROR:
      return { 
        ...state, 
        isLoaded: true, 
        error: action.payload,
        selectedItems: [],
      };

    case ENTIRE_SURVEY_LIST_COPY_ITEMS:
      return { ...state, isLoaded: false, };

    case ENTIRE_SURVEY_LIST_COPY_ITEMS_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        surveyItems: [...action.payload, ...state.surveyItems],
        selectedItems: [],
      };

    case ENTIRE_SURVEY_LIST_COPY_ITEMS_ERROR:
      return { 
        ...state, 
        isLoaded: true, 
        error: action.payload,
        selectedItems: [],
      };

    case ENTIRE_SURVEY_LIST_SHARE_ITEM:
      return {
        ...state,
      };
    case ENTIRE_SURVEY_LIST_SHARE_ITEM_SUCCESS:
      return {
        ...state,
        surveyItems: state.surveyItems.map(item => item.id === action.payload.id ? {...item, is_share: !item.is_share} : item),
      };
    case ENTIRE_SURVEY_LIST_SHARE_ITEM_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case ENTIRE_SURVEY_LIST_ACTIVE_ITEM:
      return {
        ...state,
      };
    case ENTIRE_SURVEY_LIST_ACTIVE_ITEM_SUCCESS:
      return {
        ...state,
        surveyItems: state.surveyItems.map(item => item.id === action.payload.id ? {...item, is_active: !item.is_active} : item),
      };
    case ENTIRE_SURVEY_LIST_ACTIVE_ITEM_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case ENTIRE_SURVEY_LIST_SET_MULTI_RESPONSES_ITEM:
      return {
        ...state,
      };
    case ENTIRE_SURVEY_LIST_SET_MULTI_RESPONSES_ITEM_SUCCESS:
      return {
        ...state,
        surveyItems: state.surveyItems.map(item => item.id === action.payload.id ? {...item, is_multi_responses: !item.is_multi_responses} : item),
      };
    case ENTIRE_SURVEY_LIST_SET_MULTI_RESPONSES_ITEM_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};
