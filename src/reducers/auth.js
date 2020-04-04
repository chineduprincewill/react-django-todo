import { REGISTER_FAIL, REGISTER_SUCCESS, LOGOUT_SUCCESS, LOGIN_SUCCESS, GET_USER } from '../actions/types';

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    user: null
};

export default function (state=initialState, action){
    switch(action.type){
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.token);
            return{
                ...state,
                ...action.payload,
                isAuthenticated: true
            }
        case REGISTER_FAIL:
        case LOGOUT_SUCCESS:
            localStorage.removeItem("token");
            return{
                ...state,
                token: null,
                user: null,
                isAuthenticated: false
            }
        case GET_USER:
            return{
                ...state,
                isAuthenticated: true,
                user: action.payload
            }
        default: 
            return state;
    }
}