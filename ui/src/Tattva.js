import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Tone from "react-tone";

const tattvas = [
  {
    name: 'red triangle',
    style: {
      width: 0,
      height: 0,
      borderLeft: '50px solid transparent',
      borderRight: '50px solid transparent',
      borderBottom: '100px solid red'
    },
    freq: 194.18
  },
  {
    name: 'blue circle',
    style: {
      width: '100px',
      height: '100px',
      background: 'blue',
      borderRadius: '50%'
    },
    freq: 141.27
  },
  {
    name: 'silver crescent',
    style: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      boxShadow: '15px 15px 0 0 silver'
    },
    freq: 110 // white
  },
  {
    name: 'yellow square',
    style: {
      width: '100px',
      height: '100px',
      background: 'yellow'
    },
    freq: 126.22
  },

]

function Shape({ style }) {
  return (
    <div style={style} />
  )
}

export default function() {
  const [i, setI] = useState(0);
  const [audioContext] = useState(() => new AudioContext());
  const tattva = tattvas[i];

  const timeout = setTimeout(() => setI(i+1 < tattvas.length ? i+1 : 0), 1000);
  useEffect(() => () => clearTimeout(timeout), []);

  return (
    <div>
      <Link to="/">home</Link>
      <Shape style={tattva.style} />
      <Tone
        audioContext={audioContext}
        length={9999}
        frequency={tattva.freq}
        play={true}
      />
    </div>
  )
}
