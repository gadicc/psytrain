import React from 'react';
import { Link } from "react-router-dom";

import AppBar from './AppBar';

export default function() {
  return (
    <div>
      <AppBar title="PsyTrain" />
      <div>
        <Link to="/tattva">tattva</Link>
        <br />
        <Link to="/sessions">sessions</Link>
        <br />
        <Link to="/timer">timer</Link>
      </div>
    </div>
  )
}
