import {
  REPORT_LIST_GET_ITEM,
  REPORT_LIST_GET_ITEM_ERROR,
  REPORT_LIST_GET_ITEM_SUCCESS,
  REPORT_LIST_GET_LIST,
  REPORT_LIST_GET_LIST_ERROR,
  REPORT_LIST_GET_LIST_SUCCESS,
  REPORT_LIST_UPDATE_ITEM,
  REPORT_LIST_UPDATE_ITEM_ERROR,
  REPORT_LIST_UPDATE_ITEM_SUCCESS,
  REPORT_LIST_ADD_ITEM,
  REPORT_LIST_ADD_ITEM_ERROR,
  REPORT_LIST_ADD_ITEM_SUCCESS,
  REPORT_LIST_DELETE_ITEM,
  REPORT_LIST_DELETE_ITEM_SUCCESS,
  REPORT_LIST_DELETE_ITEM_ERROR,
  REPORT_LIST_ADD_SECTION,
  REPORT_LIST_CHANGE_SAVING,
  REPORT_LIST_UPDATE_SECTION,
  REPORT_LIST_RESET_SHARE_LINK,
  REPORT_LIST_RESET_SHARE_LINK_SUCCESS,
  REPORT_LIST_RESET_SHARE_LINK_ERROR,
  REPORT_LIST_GET_ITEM_SHARE,
} from '../actions';

const INIT_STATE = {
  reportItems: [],
  reportItem: null,
  loading: true,
  isSaved: false,
  error: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case REPORT_LIST_GET_LIST:
      return { ...state, loading: true, };
    case REPORT_LIST_GET_LIST_SUCCESS:
      return { ...state, loading: false, reportItems: action.payload, };
    case REPORT_LIST_GET_LIST_ERROR:
      return { ...state, loading: false, error: action.payload, };

    case REPORT_LIST_GET_ITEM:
      return { ...state, loading: true, };
    case REPORT_LIST_GET_ITEM_SHARE:
      return { ...state, loading: true, };
    case REPORT_LIST_GET_ITEM_SUCCESS:
      return { ...state, loading: false, reportItem: action.payload, };
    case REPORT_LIST_GET_ITEM_ERROR:
      return { ...state, loading: false, error: action.payload, };


    case REPORT_LIST_UPDATE_ITEM:
      return { ...state, isSaved: false };
    case REPORT_LIST_UPDATE_ITEM_SUCCESS:
      return { ...state, isSaved: true, reportItem: action.payload, };
    case REPORT_LIST_UPDATE_ITEM_ERROR:
      return { ...state, isSaved: true, error: action.payload };

    case REPORT_LIST_ADD_ITEM:
      return { ...state, isSaved: false, };
    case REPORT_LIST_ADD_ITEM_SUCCESS:
      return {
        ... state,
        isSaved: true,
        reportItems: [action.payload, ...state.reportItems],
      };
    case REPORT_LIST_ADD_ITEM_ERROR:
      return { ...state, isSaved: true, error: action.payload };

    case REPORT_LIST_DELETE_ITEM:
      return { ...state, };
    case REPORT_LIST_DELETE_ITEM_SUCCESS:
      return { 
        ...state, 
        reportItems: state.reportItems.filter(item => item.id !== action.payload.id),
      };
    case REPORT_LIST_DELETE_ITEM_ERROR:
      return { ...state, error: action.payload, };

    case REPORT_LIST_ADD_SECTION:
    {
      const reportItem = state.reportItem;
      const section = action.payload;
      if (reportItem.sections && reportItem.sections.length > 0) {
        section.id = reportItem.sections[reportItem.sections.length - 1].id + 1;
        reportItem.sections.push(section);
      } else {
        section.id = 1;
        reportItem.sections = [section];
      }

      return { ...state, reportItem: reportItem, };
    }

    case REPORT_LIST_UPDATE_SECTION:
    {
      const reportItem = {...state.reportItem};
      const section = action.payload;
      for (let item of reportItem.sections) {
        if (item.id === section.id) {
          item = section;
        }
      }
      return {...state, reportItem: reportItem, };
    }

    case REPORT_LIST_RESET_SHARE_LINK:
      return { ...state };
    case REPORT_LIST_RESET_SHARE_LINK_SUCCESS:
      return {
        ...state, 
        reportItem: {
          ...state.reportItem, 
          share_id: action.payload.share_id,
        }
      };
    case REPORT_LIST_RESET_SHARE_LINK_ERROR:
      return { ...state, errro: action.payload, };

    case REPORT_LIST_CHANGE_SAVING:
      return { ...state, isSaved: action.payload };

    default:
      return { ...state };
  }
};
