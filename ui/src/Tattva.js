import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from "react-router-dom";
import Tone from "./Tone";
import Timer from './Timer';

const tattvas = [
  {
    name: 'red triangle',
    style: {
      width: 0,
      height: 0,
      borderLeft: '150px solid transparent',
      borderRight: '150px solid transparent',
      borderBottom: '300px solid red',
      display: 'inline-block',
    },
    freq: 194.18
  },
  {
    name: 'blue circle',
    style: {
      width: '300px',
      height: '300px',
      background: 'blue',
      borderRadius: '50%',
      display: 'inline-block',
    },
    freq: 141.27
  },
  {
    name: 'silver crescent',
    style: {
      width: '255px',
      height: '255px',
      borderRadius: '50%',
      boxShadow: '45px 45px 0 0 silver',
      marginBottom: '45px',
      display: 'inline-block',
    },
    freq: 110 // white
  },
  {
    name: 'yellow square',
    style: {
      width: '300px',
      height: '300px',
      background: 'yellow',
      display: 'inline-block',
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
  const [sound, setSound] = useState(false);
  const [length, setLength] = useState(false);

  const tattva = tattvas[i];

  const iRef = useRef();
  iRef.current = i;

  const intervalRef = useRef();

  const start = useCallback(
    () => {
      intervalRef.current = setInterval(
        () => setI(iRef.current+1 < tattvas.length ? iRef.current+1 : 0),
        2000
      );
    },
    []
  );

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current) }, []);

  return (
    <div>
      <Link to="/">home</Link>

      <div style={{ height: '100px'}} />

      <div style={{ textAlign: 'center' }}>
        <Shape style={tattva.style} />
      </div>

      <div style={{ height: '100px'}} />

      { !length &&
        <div>
          <button onClick={() => start() || setLength(5*1000*60)}>5m</button>
          <button onClick={() => start() || setLength(10*1000*60)}>10m</button>
        </div>
      }

      <div>
        Sound: <input type="checkbox" checked={sound}
          onChange={ e => setSound(e.target.checked) } />
      </div>

      <Tone
        audioContext={audioContext}
        length={9999}
        frequency={tattva.freq}
        play={sound}
      />
      {
        length && <Timer length={length} />
      }
    </div>
  )
}
