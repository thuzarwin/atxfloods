import React, { Component } from 'react';
import {
  Route,
  Link,
} from 'react-router-dom';
import Login from './Login';
import Public from './Public';
import PrivateRoute from './PrivateRoute';
import AuthButton from './AuthButton';
import CreateUser from './CreateUser';
import CrossingList from './CrossingList';
import NewStatusUpdate from './NewStatusUpdate';
import auth from './services/gqlAuth';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

const Protected = () => <h3>Protected</h3>;

class FloodsAdminRoutes extends Component {
  render() {
    return (
        <div>
          <AuthButton/>
          <ul>
            <li><Link to="/public">Public Page</Link></li>
            <li><Link to="/crossinglist">List Crossings (Public)</Link></li>
            <li><Link to="/protected">Protected Page</Link></li>
            <li><Link to="/createuser">Create User (Protected)</Link></li>
            <li><Link to="/updatestatus">Update Crossing Status (Protected)</Link></li>
          </ul>
          <Route path="/public" component={Public}/>
          <Route path="/crossinglist" component={CrossingList}/>
          <Route path="/login" component={Login}/>
          <PrivateRoute path="/protected" component={Protected} authenticated={auth.isAuthenticated()}/>
          <PrivateRoute path="/updatestatus" component={NewStatusUpdate} authenticated={auth.isAuthenticated()}/>
          <PrivateRoute path="/createuser" component={CreateUser} authenticated={auth.isAuthenticated()}/>
        </div>
    );
  }
}

export default FloodsAdminRoutes;
