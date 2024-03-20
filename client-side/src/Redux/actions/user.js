import axios from 'axios';

import { 
          CURRENT_USER, 
          LOGIN_USER, 
          LOGOUT_USER, 
          REGISTER_USER, 
          GET_IMAGE, 
          GET_IMAGES,
          UPLOAD_IMAGE,
          GET_USERS,
          DELETE_USER,
          ADD_USER,
          VALIDATE_USER,
          POPULAR_USER,
          FAIL_USER
        } from '../actionTypes/user';

export const currentUser = () => async (dispatch) => {
  try {
    const options = {
      headers: { authorization: localStorage.getItem('token') },
    };
    const result = await axios.get('http://localhost:5000/users/current', options);
    dispatch({ type: CURRENT_USER, payload: result.data });
  } catch (error) {
    dispatch({ type: CURRENT_USER, payload: error.response.data });
  }
};

export const login = (user) => async (dispatch) => {
  axios.post('http://localhost:5000/users/login', user).then((result) => {
    localStorage.setItem('token', result.data.token);
    dispatch({ type: LOGIN_USER, payload: result.data });  
  }).catch((error)=> {
    dispatch({ 
      type: FAIL_USER, payload: error.response});
  })

};
const circularSafeJsonStringify = (obj) => {
  const seen = new WeakSet();
  return JSON.stringify(obj, function (key, value) {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return '[Circular Reference]';
      }
      seen.add(value);
    }
    return value;
  });
};
export const register = (user) => async (dispatch) => {
  const circularSafeUser = JSON.parse(circularSafeJsonStringify(user));
    axios.post('http://localhost:5000/users/register', circularSafeUser).then((result) => { 
      dispatch({ type: REGISTER_USER, payload: result.data }); 
    }).catch((error) => { 
      console.log(error)
    dispatch({ type: REGISTER_USER, payload: error });
    })
};
export const AddUser = (user ) => async (dispatch) => {
  axios.post('http://localhost:5000/users/AddUser', user).then((result) => { 
    dispatch({ type: ADD_USER, payload: result.data }); 
  }).catch((error) => { 
  dispatch({ type: ADD_USER, payload: error });
  })
};
export const ValidateUser = (data, id) => (dispatch) => {
  axios.put(`http://localhost:5000/users/validateUser/${id}`, data).then((result) => { 
    dispatch({ type: VALIDATE_USER, payload: result.data }); 
  }).catch((error) => { 
  dispatch({ type: VALIDATE_USER, payload: error.response.data.errors });
  })
}

export const logout = () => ({
  type: LOGOUT_USER,
});

export const loadImages = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:5000/users/images');

    dispatch({ type: GET_IMAGES, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_IMAGES, payload: error.response.data.errors });
  }
};
export const uploadImage = (image) => async (dispatch) => {
 
    axios.post('http://localhost:5000/users/upload', image).then((result) => {
      dispatch({type: UPLOAD_IMAGE, payload: result.data.r});
    }).catch((result) => {
      return(result.error)
    })
    
  
    
};
export const GetAllUsers = () => (dispatch) => {
  axios.get("http://localhost:5000/users/getUsers").then(
    (result) => {
      dispatch({type: GET_USERS, payload: result.data.Users});
    }
  ).catch( (error) => {
    dispatch({ type: GET_USERS, payload: error.response.data.errors });
  })
}
export const Popular_Users = () => (dispatch) => {
  axios.get("http://localhost:5000/users/popular").then(
    (result) => {
      dispatch({type: POPULAR_USER, payload: result.data.popular});
    }
  ).catch( (error) => {
    dispatch({ type: POPULAR_USER, payload: error.response.data.errors });
  })
}
export const DeleteUser = (id) =>(dispatch) => {
  axios.delete(`http://localhost:5000/users/deleteUser/${id}`).then(
    (result) => 
      {
        dispatch({type: DELETE_USER, payload: result.data.status});
      }
    ).catch((result) => 
      {
        return(result.error)
      })
}