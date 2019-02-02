import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { gongo } from "gongo-react";

import Home from './Home';
import Sessions from './Sessions';
import Tattva from './Tattva';
import TimerSession from './TimerSession';

window.gongo = gongo;
gongo.connect(process.env.REACT_APP_GONGO_SERVER);

class App extends Component {
  render() {
    return (
      <Router>
        <>
          <CssBaseline />
          <Route path="/" exact component={Home} />
          <Route path="/tattva" exact component={Tattva} />
          <Route path="/sessions" exact component={Sessions} />
          <Route path="/timer" exact component={TimerSession} />
        </>
      </Router>
    );
  }
}

export default App;
