import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Preview from './pages/Preview';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/home'>
          <Home />
        </Route>
        <Route exact path='/'>
          <Preview />
        </Route>
      </Switch>
    </Router>
  );
}
