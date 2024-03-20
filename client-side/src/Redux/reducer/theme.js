import {GET_THEME, UPDATE_THEME} from '../actionTypes/theme';

const initialState = {
    theme: {},
    errors: [],
    load: false,
};

const themereducer = (state = initialState ,{type, payload}) => {
    switch(type) {
        case GET_THEME:
            return { ...state, theme: payload };
        case UPDATE_THEME:
            return {
                ...state
            }
        default:
            return state;
    }
}
export default themereducer ;