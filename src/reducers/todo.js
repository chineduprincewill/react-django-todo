import { GET_USER_TODOS, ADD_TODO, DELETE_TODO, GET_TODO, GET_ALL_TODOS } from '../actions/types';

const initialState = {
    alltodos:[],
    todos:[],
    todoitem:{}
}

export default function (state = initialState, action){
    switch(action.type){
        case GET_ALL_TODOS:
            return{
                ...state,
                alltodos: action.payload
            }
        case GET_USER_TODOS:
            return{
                ...state,
                todos: action.payload
            };
        case ADD_TODO:
            return{
                ...state,
                todos:action.payload
            }
        case GET_TODO:
            return{
                ...state,
                todoitem:action.payload
            };
        case DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            };
        default:
            return state;
    }
}