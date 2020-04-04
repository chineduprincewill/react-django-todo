import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser, updateUser } from '../../actions/auth';
 
class Profile extends Component {

    state = {
        username:this.props.auth.user.username,
        email : this.props.auth.user.email,
        first_name: this.props.auth.user.first_name,
        last_name: this.props.auth.user.last_name
    }
    
    static propTypes = {
        auth: PropTypes.object.isRequired,
        getUser: PropTypes.func.isRequired,
        updateUser: PropTypes.func.isRequired,
        message: PropTypes.object.isRequired
    }

    componentDidMount(){

        this.props.getUser();
    }

    onSubmit = e => {
        e.preventDefault();

        this.setState({ username: this.props.auth.username});

        const updateUser = {
            username: this.state.username,
            email:this.state.email,
            first_name:this.state.first_name,
            last_name:this.state.last_name
        }
        
        console.log(updateUser);

        this.props.updateUser(updateUser);
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {

        const { email, first_name, last_name } = this.state;

        return (

            <div>
                <div className="alert alert-primary">
                    <h5 className="text-primary text-sm">Profile</h5>
                </div>
                <div className="col-md-6 m-auto">
                    <div className="card card-body mt-5">
                    <h2 className="text-center">Profile</h2>
                    <p className="text text-success text-center">{this.props.message.updateUser}</p>
                    <form onSubmit={this.onSubmit}>

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
                        <label>First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="first_name"
                            onChange={this.onChange}
                            value={first_name}
                        />
                        </div>

                        <div className="form-group">
                        <label>Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="last_name"
                            onChange={this.onChange}
                            value={last_name}
                        />
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary mr-5">
                                Update Profile
                            </button>
                            <Link to="/dashboard" className="btn btn-success">Return to Dashboard</Link>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps =  state => ({
    auth: state.auth,
    message: state.messages
});

export default connect(mapStateToProps, { getUser, updateUser })(Profile);
