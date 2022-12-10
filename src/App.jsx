import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Preview from './pages/Preview';

// Todo: UI changes

// Todo: Homepage changes:
// Todo: ✅ 1. Add Tabs to generate Transcription, Translation or TTS.
// Todo: ✅ 2. Add what choose a file button do.

// Todo: Preview Page changes:
// Todo: ✅ 1. Add Upload Button right next to download button.
// Todo: ✅ 2. Add Another column for TTS.
// Todo: ✅ 3. Add one more column for Modified Date.

export default function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/preview'>
          <Preview />
        </Route>
      </Switch>
    </Router>
  );
}
