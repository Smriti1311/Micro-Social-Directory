import React from 'react';
import './App.scss';
import ListUsers from './Components/ListUsers';
import { Switch, Route } from 'react-router-dom';
import UserDetails from './Components/UserDetails';


function App() {
  return (
    <>
      <header  className='Container mt-3'>
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

export default App;
