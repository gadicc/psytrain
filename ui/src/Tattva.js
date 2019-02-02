import React, { useState, useEffect, useRef, useCallback } from 'react';
import gongo from "gongo-client";

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import AppBar from './AppBar';
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

];

const s = {
  button: {
    margin: '10px 5px 10px 5px'
  }
}

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
      <AppBar title="Tattvas" />

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
            <Timer length={length} />
            <Button variant="contained"
              onClick={() => stopAndSave()}>Stop and Save</Button>
          </div>
        :
          <div>
            <Select value={mode} onChange={e => setMode(e.target.value)}>
              <MenuItem value="rotate">Rotate</MenuItem>
              <MenuItem value="static">Static</MenuItem>
            </Select>
            <Button style={s.button} variant="contained"
              onClick={() => start() || setLength(5*1000*60)}>5m</Button>
            <Button style={s.button} variant="contained"
              onClick={() => start() || setLength(10*1000*60)}>10m</Button>
          </div>
      }

      <div>
        <FormControlLabel label="Sound" control={
          <Checkbox checked={sound} color="primary" onChange={ e => setSound(e.target.checked) } />
        }/>
      </div>
    </div>
  )
}
