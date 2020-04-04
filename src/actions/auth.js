import axios from 'axios';
import { returnErrors, createMessage } from './messages';

import { REGISTER_SUCCESS,
         REGISTER_FAIL, 
         LOGOUT_FAIL, 
         LOGOUT_SUCCESS, 
         LOGIN_SUCCESS, 
         LOGIN_FAIL, 
         GET_USER, 
         GET_USER_FAILED 
        } from './types';

// REGISTER USER
export const register = (newUser) => dispatch => {
    // Headers
    const config = {
        headers: {
            "Content-Type":"application/json"
        }
    };

    const body = JSON.stringify(newUser);

    axios
    .post('https://todojwt.herokuapp.com/signup/', body, config)
    .then(res => {
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: REGISTER_FAIL,
            payload: err.response
        })
    })
}


// LOGOUT USER
export const logout = () => (dispatch, getState) => {
    axios
      .post("https://todojwt.herokuapp.com/profile/logout/", null, tokenConfig(getState))
      .then(res => {
        dispatch({
          type: LOGOUT_SUCCESS
        });
      })
      .catch(err => {
        dispatch({
            type: LOGOUT_FAIL,
            payload: err.response
        })
      });
  };


  // LOGIN USER
  export const login = (username, password) => dispatch => {

    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({username, password});

    axios
        .post('https://todojwt.herokuapp.com/profile/login/', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: LOGIN_FAIL
            })
        })

  }
  
// GET USER PROFILE
export const getUser = () => (dispatch) => {

    const token = localStorage.getItem("token");

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${token}`
        }
    };

    axios
        .get('https://todojwt.herokuapp.com/profile/user/', config)
        .then(res => {
            dispatch({
                type: GET_USER,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_USER_FAILED,
                payload:err.response
            });
        })
} 


// UPDATE USER PROFILE
export const updateUser = (userData) => (dispatch) => {

    const token = localStorage.getItem("token");

    const body = JSON.stringify(userData);

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${token}`
        }
    };

    axios
        .put('https://todojwt.herokuapp.com/profile/user/', body, config)
        .then(res => {
            dispatch(createMessage({ updateUser: "Profile Updated" }));
            dispatch({
                type: GET_USER,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_USER_FAILED,
                payload:err.response
            });
        })
} 


// Setup config with token - helper function
export const tokenConfig = getState => {
    // Get token from state
    const token = getState().auth.token;
  
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
  
    // If token, add to headers config
    if (token) {
      config.headers["Authorization"] = `JWT ${token}`;
    }
  
    return config;
  };
  
