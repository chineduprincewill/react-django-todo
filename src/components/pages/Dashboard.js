import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Dashboard extends Component {
    render() {
        return (
            <div>
                <div className="alert alert-primary">
                    <h5 className="text-primary text-sm">Dashboard</h5>
                </div>

                <div className="row mt-5">
                    <div className="col-sm-4">
                        <div className="card text-white bg-info mt-3">
                            <div className="card-body">
                                <h5 className="card-title">Profile</h5>
                                <p className="card-text">Manage and update your profile information.</p>
                                <Link to="/profile" className="btn btn-light">...continue</Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-4">
                        <div className="card text-white bg-success mt-3">
                            <div className="card-body">
                                <h5 className="card-title">Manage To-Do(s)</h5>
                                <p className="card-text">Add, view, update and delete your To Do list.</p>
                                <Link to="/todo-list" className="btn btn-light">...continue</Link>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
}

export default Dashboard;
