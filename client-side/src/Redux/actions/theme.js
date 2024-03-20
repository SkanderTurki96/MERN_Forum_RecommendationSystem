import axios from "axios";

import {GET_THEME, UPDATE_THEME} from '../actionTypes/theme';

export const getTheme = () => async (dispatch) => {
    axios.get("http://localhost:5000/theme/getTheme").then((result) => {
        dispatch({type:GET_THEME , payload: result.data})
    }).catch( (error) => {
        dispatch({ type: GET_THEME, payload: error.response.data.errors });
      })
}
export const UpdateTheme = (id, Newtheme) => async (dispatch) => {
    axios.put(`http://localhost:5000/theme/updateTheme/${id}` , Newtheme).then(() => {
        dispatch({type:UPDATE_THEME})
    }).catch((error) => {
        dispatch({type: UPDATE_THEME, payload: error.response.data.errors})
    })
}