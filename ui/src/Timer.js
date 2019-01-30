import React, { useState, useEffect } from 'react';
import playChime from './bell';

// https://stackoverflow.com/a/33909506/1839099
function parseMsToUnits(milliseconds) {
  if (milliseconds < 0)
    milliseconds = Math.abs(milliseconds);

  //Get hours from milliseconds
  var hours = milliseconds / (1000*60*60);
  var absoluteHours = Math.floor(hours);
  var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

  //Get remainder from hours and convert to minutes
  var minutes = (hours - absoluteHours) * 60;
  var absoluteMinutes = Math.floor(minutes);
  var m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;

  //Get remainder from minutes and convert to seconds
  var seconds = (minutes - absoluteMinutes) * 60;
  var absoluteSeconds = Math.floor(seconds);
  var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;

  return { h, m, s };
}

function Timer({ length, chime, onDone }) {
  const [ now, setNow ] = useState( () => Date.now() );
  const [ end ] = useState( () => now + length );
  const [ finished, setFinished ] = useState(false);

  const diff = end - now;
  if (!finished && diff <= 0) {
    setFinished(true);

    if (chime !== false)
      playChime();
  }

  useEffect(() => {
    const handle = setInterval(() => setNow(Date.now()), 100);
    return () => clearInterval(handle);
  }, []);

  const parsed = parseMsToUnits(diff);

  return (
    <div>{parsed.h}:{parsed.m}:{parsed.s}</div>
  )
}

export default Timer;
