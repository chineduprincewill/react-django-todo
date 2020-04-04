import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { editTodo, updateTodo } from '../../actions/todo'; 

class EditTodo extends Component {

    state = {
        id:"",
        title: "",
        description: "",
        tag: ""
    }

    static propTypes = {
        todoitem: PropTypes.object.isRequired,
        updateTodo: PropTypes.func.isRequired,
        editTodo: PropTypes.func.isRequired,
        message: PropTypes.object.isRequired
    }

    componentDidMount(){
        
        let item = {};

        if(localStorage && localStorage.getItem('itemtodo')){
            item = JSON.parse(localStorage.getItem('itemtodo'));
        }

        console.log(item);

        this.setState({
            id: item.id,
            title: item.title,
            description: item.description,
            tag: item.tag
        })
    }

    onChange = e =>{ 
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    onSubmit = (e) => {
        e.preventDefault();

        const todoData = {
            title: this.state.title,
            description: this.state.description,
            tag: this.state.tag
        }

        this.props.updateTodo(this.state.id, todoData);
    }

    render() {

        const { title, description, tag } = this.state;

        return (
            <div>
                <div className="alert alert-primary">
                    <h5 className="text-primary text-sm">Todo</h5>
                </div>
                <div className="col-md-12 mb-3">
                    <Link to="/todo-list" className="btn btn-success mb-3 float-right">Todo List</Link>
                </div>
                <div className="col-md-6 m-auto">
                    <div className="card card-body mt-5">
                        <h2 className="text-center">Edit Todo</h2>
                        <p className="text text-success text-center mb-3">{this.props.message.updateTodo}</p>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                onChange={this.onChange}
                                value={title}
                            />
                            </div>

                            <div className="form-group">
                            <label>Description</label>
                            <textarea 
                                className="form-control"
                                name="description"
                                onChange={this.onChange}
                                value={description}
                            >
                            </textarea>
                            </div>

                            <div className="form-group">
                            <label>Tag</label>
                            <select name="tag" className="form-control" onChange={this.onChange} value={tag}>
                                <option value={tag}>{tag}</option>
                                <option value="VERY_IMPORTANT">VERY IMPORTANT</option>
                                <option value="IMPORTANT">IMPORTANT</option>
                                <option value="LESS_IMPORTANT">LESS IMPORTANT</option>
                            </select>
                            </div>

                            <div className="form-group">
                            <button type="submit" className="btn btn-primary float-right">
                                Update
                            </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    todoitem: state.todo.todoitem,
    message: state.messages
});

export default connect(mapStateToProps, { editTodo, updateTodo })(EditTodo);
