import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';

class Login extends Component {

    state = {
        username: "",
        password: "",
        errors:{}
    }


    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        errors: PropTypes.object.isRequired
    }

    onChange = e => this.setState({
        [e.target.name] : e.target.value
    });


    onSubmit = e => {
        e.preventDefault();
        const { username, password } = this.state;

        this.props.login(username, password);
    }


    render() {

        if(this.props.isAuthenticated){
            return <Redirect to="/" />
        }

        const { username, password } = this.state;

        return (
            <div className="col-md-6 m-auto">
                <p className="text text-danger text-center">
                    {this.props.errors.msg.password}
                    {this.props.errors.msg.non_field_errors}
                </p>
                <div className="card card-body mt-5">
                    <h2 className="text-center">Login</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input 
                                type="text"
                                name="username" 
                                className="form-control" 
                                onChange={this.onChange} 
                                value={username} 
                            />
                            <small className="text text-danger">{this.state.usrnmErr}</small>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input 
                                type="password"
                                name="password" 
                                className="form-control" 
                                onChange={this.onChange} 
                                value={password} 
                            />
                            <small className="text text-danger">{this.state.pwdErr}</small>
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>

                        <p>
                            Don't have an account? <Link to="/register">Register</Link>
                        </p>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    errors: state.errors
});

export default connect(mapStateToProps, { login })(Login);
