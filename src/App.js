import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './App.scss';
import FetchData from './Components/FetchData';
import { Switch, Route } from 'react-router-dom';
import UserDetails from './Components/UserDetails';


function App() {
  return (
    <>
      <Container  className='container-lg mt-3'>
        My App
      </Container>
      <Switch>
        <Route exact path='/' component={FetchData} />
        <Route path='/userDetails/:id' component={UserDetails} />
      </Switch>
      <footer>
        Copyright
      </footer>
    </>
  );
}

export default App;
