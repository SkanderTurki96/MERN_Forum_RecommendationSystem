import {ADD_TAG , GET_TAG, GET_TAGS ,DELETE_TAG, GET_TAG_BY_ID} from '../actionTypes/tags'; 

const initialState = {
    tag: [],
    tags:[],
    errors: [],
    load: false,
  };

  const tagReducer = ( state = initialState ,{ type, payload }) => {
    switch (type) {
        case ADD_TAG: 
        return { ...state, tag: payload };
        case GET_TAG: 
        return {
            ...state,
            tag: payload,
          };
        case GET_TAGS: 
        return {
            ...state,
            tags: payload,
          };
        case DELETE_TAG:
          return {
            ...state,
            tag: payload,
          }
        case GET_TAG_BY_ID:
          return {
            ...state,
            tag: payload,
          };
        default:
            return state;
    }
  };
  export default tagReducer;