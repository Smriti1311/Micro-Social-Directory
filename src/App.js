import React, { Component } from 'react';
import './App.scss';
import ListUsers from './Components/ListUsers';
import { Switch, Route, withRouter } from 'react-router-dom';
import UserDetails from './Components/UserDetails';

class App extends Component {

 
  render(){
  return (
    <>
      <header className='Container mt-3 pl-2'>
        My App
      </header>
      <Switch>
        <Route exact path='/' component={ListUsers} />
        <Route path='/userDetails/:phoneNum' component={UserDetails} />
      </Switch>
      <footer className='Footer mt-3' >
        Copyright
      </footer>
    </>
  );
}
}

export default withRouter(App);
