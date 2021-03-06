import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';

class Register extends Component {
    state = {
        username: "",
        password1: "",
        password2: "",
        email: ""
    };

    static propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    };

    onSubmit = e => {
        e.preventDefault();

        const { username, password1, password2, email } = this.state;
        
        const newUser = { username, password1, password2, email};

        this.props.register(newUser);
    }

    onChange = e => this.setState({
        [e.target.name] : e.target.value
    });

    render() {
        if(this.props.isAuthenticated){
            return <Redirect to="/" />
        }

        const { username, password1, password2, email } = this.state;

        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                <h2 className="text-center">Register</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        onChange={this.onChange}
                        value={username}
                    />
                    </div>

                    <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        onChange={this.onChange}
                        value={email}
                    />
                    </div>

                    <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password1"
                        onChange={this.onChange}
                        value={password1}
                    />
                    </div>

                    <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password2"
                        onChange={this.onChange}
                        value={password2}
                    />
                    </div>

                    <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Register
                    </button>
                    </div>

                    <p>
                    Already have an account? <Link to="/login">Login</Link>
                    </p>
                </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(Register);
