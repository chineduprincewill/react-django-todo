import axios from 'axios';
import { createMessage } from './messages';
import { GET_USER_TODOS,
         GET_TODO_FAIL, 
         GET_TODO, 
         DELETE_TODO, 
         ADD_TODO_FAIL,
         GET_ALL_TODOS
       } from './types';


// GET ALL TODOS
export const allTodos = () => (dispatch) => {

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    axios
        .get('https://todojwt.herokuapp.com/latest-todo/', config)
        .then(res => {
            dispatch({
                type: GET_ALL_TODOS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_TODO_FAIL,
                payload: err.json()
            });
        })
}



// GET USER TODOS
export const getTodos = () => (dispatch) => {

    const token = localStorage.getItem("token");

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${token}`
        }
    };

    axios
        .get('https://todojwt.herokuapp.com/todo/', config)
        .then(res => {
            dispatch({
                type: GET_USER_TODOS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_TODO_FAIL,
                payload: err.response
            });
        })
}


// ADD TODO
export const addTodo = (todoData) => (dispatch) => {
    
    const token = localStorage.getItem("token");

    const body = JSON.stringify(todoData);

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${token}`
        }
    };

    axios
        .post('https://todojwt.herokuapp.com/add-todo/', body, config)
        .then(res => {
            dispatch({
                type: GET_USER_TODOS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: ADD_TODO_FAIL,
                payload: err.response
            });
        })
}


// DELETE TODO

export const deleteTodo = id => (dispatch) => {

    const token = localStorage.getItem("token");
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${token}`
        }
    };

    axios
      .delete(`https://todojwt.herokuapp.com/delete-todo/${id}/`, config)
      .then(res => {
        dispatch(createMessage({ deleteTodo: "Todo Deleted" }));
        dispatch({
          type: DELETE_TODO,
          payload: id
        });
      })
      .catch(err => console.log(err));
  };


// GET TODO

export const editTodo = id => (dispatch) => {

    const token = localStorage.getItem("token");
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${token}`
        }
    };

    axios
      .get(`https://todojwt.herokuapp.com/detail-todo/${id}/`, config)
      .then(res => {
        
        console.log(res.data);

        localStorage.setItem('itemtodo', JSON.stringify(res.data));
            
        dispatch({
          type: GET_TODO,
          payload: res.data
        });

      })
      .catch(err => console.log(err));
  };


  // UPDATE TODO

  export const updateTodo = (id, todoData) => (dispatch) => {

    const token = localStorage.getItem("token");
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${token}`
        }
    };

    const body = JSON.stringify(todoData);

    axios
      .put(`https://todojwt.herokuapp.com/update-todo/${id}/`, body, config)
      .then(res => {
        
        dispatch(createMessage({ updateTodo: "Todo Updated" }));
        dispatch({
            type: GET_TODO,
            payload: id
          });

        localStorage.removeItem('itemtodo');

      })
      .catch(err => console.log(err));
  };







































