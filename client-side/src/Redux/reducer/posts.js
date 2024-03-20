/* eslint-disable default-param-last */
import { 
          GET_ALL,
          GET_POSTBYID,
          CREATE_POST,
          CHECK_VIEW,
          TOGGLE_LIKE,
          GET_VIEWS_LIKES,
          DELETE_POST,
          VALIDATE_POST,
          TRAIN_MODEL,
          GET_RECOMENDED,
          FAIL_GET_ALL
        } from '../actionTypes/posts';

// initialstate
const initialState = {
  post: {},
  post_created: {},
  AllPost: [],
  is_liked: {},
  view_data: {},
  viewsAndLikes: {},
  status : {},
  trainingResult : {},
  Recomended : [],
  errors: []
};

const postReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_POST : 
    return {
      ...state,
      post_created: payload
    }
    case VALIDATE_POST :
      return{
        ...state,
        post: payload
      }
    case DELETE_POST : 
    return{
      ...state, 
      status : payload
    }
    case GET_ALL:
      return {
        ...state,
        AllPost: payload
      };
    case FAIL_GET_ALL:
      return {
        ...state,
        errors:payload
      };
    case GET_POSTBYID:
      return {
        ...state,
        post: payload
      };
      case CHECK_VIEW:
        return {
          ...state,
          view_data: payload
        };
      case TOGGLE_LIKE:
        return {
          ...state,
          is_liked: payload
        };
      case GET_VIEWS_LIKES:
        return {
          ...state,
          viewsAndLikes : payload
        };
      case TRAIN_MODEL:
          return {
            ...state,
            trainingResult : payload
          }
      case GET_RECOMENDED :
        return {
          ...state,
          Recomended : payload
        }
    case 'VIDE_ERRORS':
      return { ...state, errors: [] };
    default:
      return state;
  }
};

export default postReducer;
