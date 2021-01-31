import {
  SHARED_SURVEY_LIST_GET_LIST,
  SHARED_SURVEY_LIST_GET_LIST_SUCCESS,
  SHARED_SURVEY_LIST_GET_LIST_ERROR,
  SHARED_SURVEY_LIST_GET_LIST_WITH_FILTER,
  SHARED_SURVEY_LIST_GET_LIST_WITH_ORDER,
  SHARED_SURVEY_LIST_GET_LIST_SEARCH,
  SHARED_SURVEY_LIST_ADD_ITEM,
  SHARED_SURVEY_LIST_ADD_ITEM_SUCCESS,
  SHARED_SURVEY_LIST_ADD_ITEM_ERROR,
  SHARED_SURVEY_LIST_SELECTED_ITEMS_CHANGE,
  SHARED_SURVEY_LIST_DELETE_ITEMS,
  SHARED_SURVEY_LIST_DELETE_ITEMS_SUCCESS,
  SHARED_SURVEY_LIST_DELETE_ITEMS_ERROR,
  SHARED_SURVEY_LIST_COPY_ITEMS,
  SHARED_SURVEY_LIST_COPY_ITEMS_SUCCESS,
  SHARED_SURVEY_LIST_COPY_ITEMS_ERROR,
  SHARED_SURVEY_LIST_SHARE_ITEM,
  SHARED_SURVEY_LIST_SHARE_ITEM_SUCCESS,
  SHARED_SURVEY_LIST_SHARE_ITEM_ERROR,
} from '../actions';

const INIT_STATE = {
  sharedSurveyItems: [],
  surveyItems: [],
  error: '',
  filter: null,
  searchKeyword: '',
  orderColumn: null,
  isLoaded: false,
  orderColumns: [
    { column: 'name', label: 'Survey Name' },
    { column: 'username', label: 'User Name' },
    { column: 'responses', label: 'Responses' },
  ],
  selectedItems: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SHARED_SURVEY_LIST_GET_LIST:
      return { ...state, isLoaded: false };

    case SHARED_SURVEY_LIST_GET_LIST_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        sharedSurveyItems: action.payload,
        surveyItems: action.payload,
      };

    case SHARED_SURVEY_LIST_GET_LIST_ERROR:
      return { ...state, isLoaded: true, error: action.payload };

    case SHARED_SURVEY_LIST_GET_LIST_WITH_FILTER:
      if (action.payload.column === '' || action.payload.value === '') {
        return {
          ...state,
          isLoaded: true,
          surveyItems: state.sharedSurveyItems,
          filter: null,
        };
      }
      const filteredItems = state.sharedSurveyItems.filter(
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

    case SHARED_SURVEY_LIST_GET_LIST_WITH_ORDER:
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

    case SHARED_SURVEY_LIST_GET_LIST_SEARCH:
      if (action.payload === '') {
        return { ...state, surveyItems: state.sharedSurveyItems };
      }
      const keyword = action.payload.toLowerCase();
      const searchItems = state.sharedSurveyItems.filter(
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

    case SHARED_SURVEY_LIST_ADD_ITEM:
      return { ...state, isLoaded: false };

    case SHARED_SURVEY_LIST_ADD_ITEM_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        sharedSurveyItems: [action.payload, ...state.sharedSurveyItems],
        surveyItems: [action.payload, ...state.surveyItems],
      };

    case SHARED_SURVEY_LIST_ADD_ITEM_ERROR:
      return { ...state, isLoaded: true, error: action.payload };

    case SHARED_SURVEY_LIST_SELECTED_ITEMS_CHANGE:
      return { ...state, isLoaded: true, selectedItems: action.payload };

    case SHARED_SURVEY_LIST_DELETE_ITEMS:
      return { ...state, isLoaded: false, };
    case SHARED_SURVEY_LIST_DELETE_ITEMS_SUCCESS:
      return { 
        ...state, 
        isLoaded: true, 
        surveyItems: state.surveyItems.filter(item => !state.selectedItems.includes(item.id)),
        selectedItems: [],
      };
    case SHARED_SURVEY_LIST_DELETE_ITEMS_ERROR:
      return { 
        ...state, 
        isLoaded: true, 
        error: action.payload,
        selectedItems: [],
      };

    case SHARED_SURVEY_LIST_COPY_ITEMS:
      return { ...state, isLoaded: false, };
    case SHARED_SURVEY_LIST_COPY_ITEMS_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        surveyItems: [...action.payload, ...state.surveyItems],
        selectedItems: [],
      };
    case SHARED_SURVEY_LIST_COPY_ITEMS_ERROR:
      return { 
        ...state, 
        isLoaded: true, 
        error: action.payload,
        selectedItems: [],
      };

    case SHARED_SURVEY_LIST_SHARE_ITEM:
      return {
        ...state,
      };
    case SHARED_SURVEY_LIST_SHARE_ITEM_SUCCESS:
      return {
        ...state,
        surveyItems: state.surveyItems.map(item => item.id === action.payload.id ? {...item, is_share: !item.is_share} : item),
      }
    case SHARED_SURVEY_LIST_SHARE_ITEM_ERROR:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return { ...state };
  }
};
