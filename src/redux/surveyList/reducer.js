import {
  SURVEY_LIST_GET_TOTAL,
  SURVEY_LIST_GET_TOTAL_SUCCESS,
  SURVEY_LIST_GET_TOTAL_ERROR,
  SURVEY_LIST_GET_LIST,
  SURVEY_LIST_GET_LIST_SUCCESS,
  SURVEY_LIST_GET_LIST_ERROR,
  SURVEY_LIST_GET_LIST_WITH_FILTER,
  SURVEY_LIST_GET_LIST_WITH_ORDER,
  SURVEY_LIST_GET_LIST_SEARCH,
  SURVEY_LIST_ADD_ITEM,
  SURVEY_LIST_ADD_ITEM_SUCCESS,
  SURVEY_LIST_ADD_ITEM_ERROR,
  SURVEY_LIST_SELECTED_ITEMS_CHANGE,
  SURVEY_LIST_DELETE_ITEMS,
  SURVEY_LIST_DELETE_ITEMS_SUCCESS,
  SURVEY_LIST_DELETE_ITEMS_ERROR,
  SURVEY_LIST_COPY_ITEMS,
  SURVEY_LIST_COPY_ITEMS_SUCCESS,
  SURVEY_LIST_COPY_ITEMS_ERROR,
  SURVEY_LIST_SHARE_ITEM,
  SURVEY_LIST_SHARE_ITEM_SUCCESS,
  SURVEY_LIST_SHARE_ITEM_ERROR,
  SURVEY_LIST_ACTIVE_ITEM,
  SURVEY_LIST_ACTIVE_ITEM_SUCCESS,
  SURVEY_LIST_ACTIVE_ITEM_ERROR,
  SURVEY_LIST_SET_MULTI_RESPONSES_ITEM,
  SURVEY_LIST_SET_MULTI_RESPONSES_ITEM_ERROR,
  SURVEY_LIST_SET_MULTI_RESPONSES_ITEM_SUCCESS,
  SURVEY_STYLE_UPDATE_ITEM,
  SURVEY_STYLE_UPDATE_ITEM_ERROR,
  SURVEY_STYLE_UPDATE_ITEM_SUCCESS,
} from '../actions';

const INIT_STATE = {
  totalSurveyItems: [],
  mySurveyItems: [],
  surveyItems: [],
  error: '',
  filter: null,
  searchKeyword: '',
  orderColumn: null,
  loading: false,
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
    case SURVEY_LIST_GET_TOTAL:
      return { ...state, loading: false };
    case SURVEY_LIST_GET_TOTAL_SUCCESS:
      return {
        ...state,
        loading: true,
        totalSurveyItems: action.payload
      };
    case SURVEY_LIST_GET_LIST_ERROR:
      return { ...state, loading: true, error: action.payload };

    case SURVEY_LIST_GET_LIST:
      return { ...state, loading: false };

    case SURVEY_LIST_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: true,
        mySurveyItems: action.payload,
        surveyItems: action.payload,
      };

    case SURVEY_LIST_GET_LIST_ERROR:
      return { ...state, loading: true, error: action.payload };

    case SURVEY_LIST_GET_LIST_WITH_FILTER:
      if (action.payload.column === '' || action.payload.value === '') {
        return {
          ...state,
          loading: true,
          surveyItems: state.mySurveyItems,
          filter: null,
        };
      }
      const filteredItems = state.mySurveyItems.filter(
        (item) => item[action.payload.column] === action.payload.value
      );
      return {
        ...state,
        loading: true,
        surveyItems: filteredItems,
        filter: {
          column: action.payload.column,
          value: action.payload.value,
        },
      };

    case SURVEY_LIST_GET_LIST_WITH_ORDER:
      if (action.payload === '') {
        return {
          ...state,
          loading: true,
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
        loading: true,
        surveyItems: sortedItems,
        orderColumn: state.orderColumns.find(
          (x) => x.column === action.payload
        ),
      };

    case SURVEY_LIST_GET_LIST_SEARCH:
      if (action.payload === '') {
        return { ...state, surveyItems: state.mySurveyItems };
      }
      const keyword = action.payload.toLowerCase();
      const searchItems = state.mySurveyItems.filter(
        (item) =>
          item.name.toLowerCase().indexOf(keyword) > -1 || item.id == keyword
        // ||
        // item.status.toLowerCase().indexOf(keyword) > -1 ||
        // item.category.toLowerCase().indexOf(keyword) > -1 ||
        // item.label.toLowerCase().indexOf(keyword) > -1
      );
      return {
        ...state,
        loading: true,
        surveyItems: searchItems,
        searchKeyword: action.payload,
      };

    case SURVEY_LIST_ADD_ITEM:
      return { ...state, loading: false };

    case SURVEY_LIST_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: true,
        mySurveyItems: [action.payload, ...state.mySurveyItems],
        surveyItems: [action.payload, ...state.surveyItems],
      };

    case SURVEY_LIST_ADD_ITEM_ERROR:
      return { ...state, loading: true, error: action.payload };

    case SURVEY_LIST_SELECTED_ITEMS_CHANGE:
      return { ...state, loading: true, selectedItems: action.payload };

    case SURVEY_LIST_DELETE_ITEMS:
      return { ...state, loading: false, };

    case SURVEY_LIST_DELETE_ITEMS_SUCCESS:
      return {
        ...state,
        loading: true,
        surveyItems: state.surveyItems.filter(item => !state.selectedItems.includes(item.id)),
        selectedItems: [],
      };

    case SURVEY_LIST_DELETE_ITEMS_ERROR:
      return {
        ...state,
        loading: true,
        error: action.payload,
        selectedItems: [],
      };

    case SURVEY_LIST_COPY_ITEMS:
      return { ...state, loading: false, };

    case SURVEY_LIST_COPY_ITEMS_SUCCESS:
      return {
        ...state,
        loading: true,
        surveyItems: [...action.payload, ...state.surveyItems],
        selectedItems: [],
      };

    case SURVEY_LIST_COPY_ITEMS_ERROR:
      return {
        ...state,
        loading: true,
        error: action.payload,
        selectedItems: [],
      };

    case SURVEY_LIST_SHARE_ITEM:
      return {
        ...state,
      };
    case SURVEY_LIST_SHARE_ITEM_SUCCESS:
      return {
        ...state,
        surveyItems: state.surveyItems.map(item => item.id === action.payload.id ? { ...item, is_share: !item.is_share } : item),
      };
    case SURVEY_LIST_SHARE_ITEM_ERROR:
      return {
        ...state,
        error: action.payload,
      };
      case SURVEY_STYLE_UPDATE_ITEM:
        return {
          ...state,
        };
      case SURVEY_STYLE_UPDATE_ITEM_SUCCESS:
        return {
          ...state,
          // surveyItems: state.surveyItems.map(item => item.id === action.payload.id ? { ...item, is_share: !item.is_share } : item),
        };
      case SURVEY_STYLE_UPDATE_ITEM_ERROR:
        return {
          ...state,
          // error: action.payload,
        };
    case SURVEY_LIST_ACTIVE_ITEM:
      return {
        ...state,
      };
    case SURVEY_LIST_ACTIVE_ITEM_SUCCESS:
      return {
        ...state,
        surveyItems: state.surveyItems.map(item => item.id === action.payload.id ? { ...item, is_active: !item.is_active } : item),
      };
    case SURVEY_LIST_ACTIVE_ITEM_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case SURVEY_LIST_SET_MULTI_RESPONSES_ITEM:
      return {
        ...state,
      };
    case SURVEY_LIST_SET_MULTI_RESPONSES_ITEM_SUCCESS:
      return {
        ...state,
        surveyItems: state.surveyItems.map(item => item.id === action.payload.id ? { ...item, is_multi_responses: !item.is_multi_responses } : item),
      };
    case SURVEY_LIST_SET_MULTI_RESPONSES_ITEM_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};
