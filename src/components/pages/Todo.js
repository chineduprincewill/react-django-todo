import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getTodos, editTodo, deleteTodo } from '../../actions/todo';

class Todo extends Component {

    static propTypes = {
        todos: PropTypes.array.isRequired,
        getTodos: PropTypes.func.isRequired,
        deleteTodo: PropTypes.func.isRequired,
        message: PropTypes.object.isRequired,
        todoitem: PropTypes.object.isRequired
    }

    componentDidMount(){
        this.props.getTodos();
    }

    todoEdit = (todoid) =>{
        
        this.props.editTodo(todoid);
        this.props.history.push('/edit-todo');
    
    }


    render() {

        const data = Array.from(this.props.todos);
        return (
            <div>
                <div className="alert alert-primary">
                    <h5 className="text-primary text-sm">Todo</h5>
                </div>
                <div className="col-md-12 mb-3">
                    <Link to="/add-todo" className="btn btn-success mb-3 float-right">Add Todo</Link>
                </div>

                <p className="text text-success text-center mb-3">{this.props.message.deleteTodo}</p>
                <div>
                    <table className="table table-striped table-responsive">
                    <thead>
                        <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Tag</th>
                        <th>Date</th>
                        <th />
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(todo => (
                        <tr key={todo.id}>                      
                            <td>{todo.title}</td>
                            <td>{todo.description}</td>
                            <td>{todo.tag}</td>
                            <td>{todo.date_created}</td>
                            <td>
                            <button
                                className="btn btn-link btn-sm"
                                onClick={this.todoEdit.bind(this, todo.id)}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={this.props.deleteTodo.bind(this, todo.id)}
                            >
                                Delete
                            </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    todos: state.todo.todos,
    message: state.messages,
    todoitem: state.todo.todoitem
});

export default connect(mapStateToProps, { getTodos, editTodo, deleteTodo })(withRouter(Todo));
