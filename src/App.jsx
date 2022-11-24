import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ThemeSwitch from './components/ThemeSwitch';
import Home from './pages/Home';
import Login from './pages/Login';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/'></Route>
      </Switch>
    </Router>
  );
}
