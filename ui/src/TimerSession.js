import React, { useState, useEffect, useRef, useCallback } from 'react';
import gongo from "gongo-client";

import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import AppBar from './AppBar';
import Timer from './Timer';

const s = {
  button: {
    margin: '10px 5px 10px 5px'
  }
}

export default function Tattva() {
  const [length, setLength] = useState(false);
  const [label, setLabel] = useState('aura');

  const startTimeRef = useRef();

  const start = useCallback(
    length => {
      startTimeRef.current = Date.now();
      setLength(length);
    },
    []
  );

  const stateRef = useRef();

  const stopAndSave = useCallback(
    () => {
      const { length, label } = stateRef.current;
      const diff = Date.now() - startTimeRef.current;
      const minutes = Math.floor((diff>length+1000 || diff<length ? diff : length) / (1000*60));
      const doc = {
        exercise: label,
        date: new Date(startTimeRef.current),
        minutes,
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

  stateRef.current = { length, label };
  useEffect(() => () => {
    // if !saved then save
  });

  return (
    <div>
      <AppBar title="Timer" />

      <div style={{ height: '100px'}} />

      <div style={{ textAlign: 'center' }}>
      </div>

      <div style={{ height: '100px'}} />

      { length
        ?
          <div>
            <Timer length={length} />
            <Button variant="contained"
              onClick={() => stopAndSave()}>Stop and Save</Button>
          </div>
        :
          <div>
            <Select value={label} onChange={e => setLabel(e.target.value)}>
              <MenuItem value="aura">Aura</MenuItem>
            </Select>
            <Button style={s.button} variant="contained"
              onClick={() => start() || setLength(5*1000*60)}>5m</Button>
            <Button style={s.button} variant="contained"
              onClick={() => start() || setLength(10*1000*60)}>10m</Button>
          </div>
      }
    </div>
  )
}
