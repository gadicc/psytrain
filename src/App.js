import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from './Home';
import Tattva from './Tattva';

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
