import axios from '../axiosConfig';

import { 
  CREATE_POST,
  GET_ALL,
  GET_POSTBYID,
  CHECK_VIEW,
  TOGGLE_LIKE,
  GET_VIEWS_LIKES,
  VALIDATE_POST,
  DELETE_POST,
  TRAIN_MODEL,
  GET_RECOMENDED,
  FAIL_GET_ALL
} from '../actionTypes/posts';


export const Createpost = (data) => (dispatch) => {
  axios.post("http://localhost:5000/Posts/CreatePost", data).then(
    (result) => {
      dispatch({type: CREATE_POST , payload: result.data})
    }
  ).catch(
    (error) => {
      console.log(error)
      dispatch({type: CREATE_POST , payload: error});
    }
  )
}
export const ValidatePost = (id) => (dispatch) => {
  axios.put(`http://localhost:5000/Posts/ValidatePost/${id}`).then(
    (result)=> {
      dispatch({type :VALIDATE_POST , payload : result.data})
    }).catch(
      (error) => {
        dispatch({type :VALIDATE_POST , payload: error});
      }
    )
}
export const DeletePost = (id) => (dispatch) => {
  axios.delete(`http://localhost:5000/Posts/DeletePost/${id}`).then(
    (result) => {
      dispatch({type: DELETE_POST , payload: result.data})
    }
  ).catch(
    (error) => {
      dispatch({type :DELETE_POST , payload: error});
    }
  )
}
export const GetAllPost = () => (dispatch) => {
  axios.get("http://localhost:5000/Posts/GetAll").then(
    (result) => { 
      dispatch({  type: GET_ALL, payload: result.data.data}); 
    }
  ).catch(
    error => {
      dispatch({ type: FAIL_GET_ALL, payload: error });
    }
  )
}
export const GetPostById = (id) => (dispatch) => {
  axios.get(`http://localhost:5000/Posts/getOne/${id}`).then(
    (result) => {dispatch({type: GET_POSTBYID, payload:result.data.data});}
  ).catch(
    error => {dispatch({type: GET_POSTBYID, payload: error});}
  )
}
export const CheckView = (data) => (dispatch) => {
  axios.post('http://localhost:5000/view/check_view', data).then(
    (result) => {dispatch({type: CHECK_VIEW , payload: result.data.data})}
  ).catch(
    () => {dispatch({type: CHECK_VIEW}); }
  )
}
export const ToggleLike = (data) => (dispatch) => {
  axios.post('http://localhost:5000/view/toggleLike', data).then(
    (result) => {dispatch({type: TOGGLE_LIKE, payload:result.data})}
  ).catch(
    (err) => {dispatch({type: TOGGLE_LIKE}); }
  )
}
export const GetViewsAndLikes = ()  => (dispatch) => {
  axios.get('http://localhost:5000/view/getviews').then(
    (result) => {dispatch({type: GET_VIEWS_LIKES , payload:result.data})}
  ).catch(
    (err) => {dispatch({type: TOGGLE_LIKE}); }
  )
}
export const TrainModel = () => (dispatch)  => {
  axios.get('http://localhost:5000/Posts/train').then(
    (result) => {dispatch({type:TRAIN_MODEL , payload:result.data})}
  ).catch(
    (err) => {dispatch({type: TRAIN_MODEL}); }
  )
}
export const GetRecomended =  (id) => (dispatch)  => {
  axios.get(`http://localhost:5000/Posts/getrecomended/${id}`).then(
    (result) => {dispatch({type: GET_RECOMENDED, payload: result.data.data })}
  ).catch(
    (err) => {dispatch({type: GET_RECOMENDED}); }
  )
}