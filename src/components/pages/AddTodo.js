import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addTodo } from '../../actions/todo';
import PropTypes from 'prop-types';

class AddTodo extends Component {
    state = {
        title: "",
        description: "",
        tag: ""
    }

    static propTypes = {
        addTodo: PropTypes.func.isRequired
    }

    onChange = e => this.setState({
        [e.target.name]: e.target.value
    });


    onSubmit = e => {
        e.preventDefault();

        const todoData = {
            title: this.state.title,
            description: this.state.description,
            tag: this.state.tag
        }

        this.props.addTodo(todoData);

        this.setState({
            title: "",
            description: "",
            tag: ""
        });
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
                        <h2 className="text-center">Add Todo</h2>
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
                                <option value="">Select Tag</option>
                                <option value="VERY_IMPORTANT">VERY IMPORTANT</option>
                                <option value="IMPORTANT">IMPORTANT</option>
                                <option value="LESS_IMPORTANT">LESS IMPORTANT</option>
                            </select>
                            </div>

                            <div className="form-group">
                            <button type="submit" className="btn btn-primary float-right">
                                Add Todo
                            </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}


export default connect(null, { addTodo })(AddTodo);
