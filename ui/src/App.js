import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route } from "react-router-dom";

import gongo from "gongo-client";
import { useGongoLive, useGongoSub } from "gongo-react";

import Home from './Home';
import Tattva from './Tattva';

gongo.connect(process.env.REACT_APP_GONGO_SERVER);

window.gongo = gongo;
window.sessions = gongo.collection('sessions');
gongo.subscribe('sessions');

class App extends Component {
  render() {
    return (
      <Router>
        <>
          <CssBaseline />
          <Route path="/" exact component={Home} />
          <Route path="/tattva" exact component={Tattva} />
        </>
      </Router>
    );
  }
}

export default App;
