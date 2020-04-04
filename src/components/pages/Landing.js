import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import '../../App.css';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { allTodos } from '../../actions/todo';


class Landing extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired,
        alltodos: PropTypes.array.isRequired,
        allTodos: PropTypes.func.isRequired
    }

    componentDidMount(){
        this.props.allTodos();
    }

    render() {

        const { isAuthenticated } = this.props.auth;
        const data = Array.from(this.props.alltodos);

        const authhome = (
            <div className="btn-div">
                <Link to="/profile" className="btn btn-primary btn-block mt-7">Click to Manager your Profile</Link>
                <Link to="/dashboard" className="btn btn-success btn-block mt-5">Go to Dashboard</Link>
            </div>
        );

        const guesthome = (
            <div className="btn-div">
                <Link to="/register" className="btn btn-primary btn-block mt-7">Sign up</Link>
                <Link to="/login" className="btn btn-success btn-block mt-5">Login</Link>
            </div>
        );

        return (
                <div className="container">
                    <h1 className="text-center">TO-DO APP</h1>
                    <h5 className="text text-danger text-center">THIS APP IS BUILT TO MANAGE YOUR ACTIVITIES SO AS TO MEET UP WITH YOUR SCHEDULES</h5>
                    <div className="container row">
                        <div className="col-md-8 mt-5 mx-auto">
                            <h5 className="alert alert-info mb-2">List of all our Todos</h5>
                            <div className="container">
                            {data.map(alltodo => (
                                <div className="mb-3" key={alltodo.id}>                      
                                    <span className="text text-primary text-lg mr-3">{alltodo.title}</span>
                                    <span><sub>Created on {alltodo.date_created}</sub>
                                    <sub> by {alltodo.user}</sub></span>
                                    <hr/>
                                </div>
                            ))}
                            </div>
                        </div>
                        <div className="col-md-3 mt-5 mx-auto">
                        {isAuthenticated ? authhome : guesthome }
                        </div>   
                    </div>
                    
                </div>
            )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    alltodos: state.todo.alltodos
});

export default connect(mapStateToProps, { allTodos })(Landing);
