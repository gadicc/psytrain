import React from 'react';
import { gongo, useGongoLive } from 'gongo-react';
import { DateTime } from 'luxon';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import AppBar from './AppBar';

const sessions = window.sessions = gongo.collection('sessions');
gongo.subscribe('sessions');

function Row({ row }) {
  return (
    <TableRow>
      <TableCell>{ DateTime.fromJSDate(row.date).toLocaleString() }</TableCell>
      <TableCell>{row.exercise}</TableCell>
      <TableCell align="right">{row.minutes}</TableCell>
      <TableCell align="right">{JSON.stringify(row.settings)}</TableCell>
    </TableRow>
  );
}

export default function Sessions(props) {
  //const { classes } = props;
  const classes = {};

  const rows = useGongoLive( () => sessions.find() );
  console.log(rows);

  return (
    <div>
      <AppBar title="Sessions" />

      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Exercise</TableCell>
              <TableCell align="right">Minutes</TableCell>
              <TableCell>Settings</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { rows.map(row => <Row key={row._id} row={row} />) }
          </TableBody>
        </Table>
      </Paper>
    </div>
  )
}
