import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import Landing from './components/pages/Landing';
import Header from './components/layout/Header';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Profile from './components/pages/Profile';
import Dashboard from './components/pages/Dashboard';
import Todo from './components/pages/Todo';
import AddTodo from './components/pages/AddTodo';
import EditTodo from './components/pages/EditTodo';
import PrivateRoute from './components/common/PrivateRoute';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/todo-list" component={Todo} />
              <PrivateRoute exact path="/add-todo" component={AddTodo} />
              <PrivateRoute exact path="/edit-todo" component={EditTodo} />
            </Switch>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App;
