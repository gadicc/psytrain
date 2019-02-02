import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from "react-router-dom";
import gongo from "gongo-client";

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

export default function Tattva() {
  const [i, setI] = useState(0);
  const [sound, setSound] = useState(true);
  const [length, setLength] = useState(false);
  const [rotateTime] = useState(2000);
  const [mode, setMode] = useState('rotate');

  const tattva = tattvas[i];

  const iRef = useRef();
  iRef.current = i;

  const startTimeRef = useRef();
  const intervalRef = useRef();

  const start = useCallback(
    () => {
      startTimeRef.current = Date.now();

      if (stateRef.current.mode === 'rotate')
        intervalRef.current = setInterval(
          () => setI(iRef.current+1 < tattvas.length ? iRef.current+1 : 0),
          rotateTime
        );
    },
    []
  );

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current) }, []);

  const stateRef = useRef();

  const stopAndSave = useCallback(
    () => {
      clearInterval(intervalRef.current);
      const { length, mode } = stateRef.current;
      const diff = Date.now() - startTimeRef.current;
      const minutes = Math.floor((diff>length+1000 || diff<length ? diff : length) / (1000*60));
      const doc = {
        exercise: 'tattva',
        date: new Date(startTimeRef.current),
        minutes,
        settings: { mode, rotateTime }
      };
      console.log(doc)

      // TODO, if minutes>0, save && redirect, otherwise don't save and stay.

      if (minutes > 0) {
        const result = gongo.collection('sessions').insert(doc);
        console.log(result);
      }

      setLength(false);
    }
  );

  stateRef.current = { length, mode };
  useEffect(() => () => {
    // if !saved then save
  });

  return (
    <div>
      <Link to="/">home</Link>

      <div style={{ height: '100px'}} />

      <div style={{ textAlign: 'center' }}>
        <div style={tattva.style}
          onClick={ () => setI( i+1 < tattvas.length ? i + 1:0 ) } />
      </div>

      <div style={{ height: '100px'}} />

      { length
        ?
          <div>
            <Tone
              length={9999}
              frequency={tattva.freq}
              play={sound}
            />
            <button onClick={() => stopAndSave()}>Stop and Save</button>
          </div>
        :
          <>
            <div>
              <button onClick={() => start() || setLength(5*1000)}>5s</button>
              <button onClick={() => start() || setLength(5*1000*60)}>5m</button>
              <button onClick={() => start() || setLength(10*1000*60)}>10m</button>
            </div>
            <div>
              <select value={mode} onChange={e => setMode(e.target.value)}>
                <option value="static">static</option>
                <option value="rotate">rotate</option>
              </select>
            </div>
          </>
      }

      <div>
        Sound: <input type="checkbox" checked={sound}
          onChange={ e => setSound(e.target.checked) } />
      </div>

      {
        length && <Timer length={length} />
      }
    </div>
  )
}
