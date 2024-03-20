import axios from "axios";

import {ADD_TAG, GET_TAGS ,GET_TAG , DELETE_TAG, GET_TAG_BY_ID} from '../actionTypes/tags';

export const addTag = (tag) => async (dispatch) => {
    try {
        const result = await axios.post('http://localhost:5000/tags/addtag', tag);
        dispatch({ type : ADD_TAG , payload: result.data }); 
    } catch (error) {
        dispatch({ type: ADD_TAG, payload: error.response.data.errors });
    }
}
export const getTags = () => async (dispatch) => {
    try {
        
        const result = await axios.get('http://localhost:5000/tags/getAllTags');
       
        dispatch({type : GET_TAGS, payload: result.data.allTags});
        
    } catch(error) {
        dispatch({ type: GET_TAGS, payload: error.response.data.errors });
    }
}
export const getTag = (tags) => async (dispatch) => {
    try {
        let tagsParam = tags.join(',');
        if( !tagsParam) {
            tagsParam = 'empty'
        }
        const result = await axios.get(`http://localhost:5000/tags/gettag/${tagsParam}`);
        dispatch({type : GET_TAG, payload: result.data.data});
    } catch(error) {
        dispatch({ type: GET_TAG, payload: error.response.data.errors });
    }
}
export const deleteTag = (name) => async (dispatch) => {
    try {
        const result = await axios.delete(`http://localhost:5000/tags/delete/${name}`);
        dispatch({type : DELETE_TAG , payload: result.data});
    } catch(error) {
        dispatch({ type: DELETE_TAG, payload: error.response.data.errors });
    }
}
export const getTagById = (id) => async (dispatch) => {
    try {
        const result = await axios.get(`http://localhost:5000/tags/GetTagById/${id}`);
        dispatch({type : GET_TAG_BY_ID, payload: result.data.tag});
    } catch(error) {
        dispatch({ type: GET_TAG_BY_ID, payload: error.response.data.errors });
    }
}
