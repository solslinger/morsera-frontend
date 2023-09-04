import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { PropsOf } from '@emotion/react';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ClickableTableRow(props: PropsOf<typeof TableRow>) {
  return (
    <TableRow
      {...props}
      sx={{ '&:hover': { cursor: 'pointer' }, ...props.sx }}
    >
      {props.children}
    </TableRow>
  );
}

function displayStatus(status: Status) {
  switch (status) {
    case Status.Pending:
      return (
        <Tooltip arrow title="Pending" color='warning' placement='top'>
          <HourglassTopIcon />
        </Tooltip>
      )
    case Status.Executed:
      return (
        <Tooltip arrow title="Executed" placement='top'>
          <CheckIcon color='primary' />
        </Tooltip>
      )
    case Status.Ready:
      return (
        <Tooltip arrow title="Ready to Execute" placement='top'>
          <HourglassBottomIcon color='success' />
        </Tooltip>
      )
    case Status.Cancelled:
      return (
        <Tooltip arrow title="Cancelled" placement='top'>
          <CloseIcon color='error' />
        </Tooltip>
      )
  }
}

enum Status {
  Pending = 'Pending',
  Ready = 'Ready',
  Executed = 'Executed',
  Cancelled = 'Cancelled'
}

const rows = [
  {
    txHash: '0x525DFE70...02B1B83D',
    status: Status.Pending,
    triggerType: 'Timestamp',
    triggerTime: '2021-10-10 10:10:10',
    timeUntilTrigger: '3.6 days',
    // gelato: true
  },
  // {
  //   txHash: '0x525DFE70...02B1B83D',
  //   status: Status.Executed,
  //   triggerType: 'Timestamp',
  //   triggerTime: '2021-10-10 10:10:10',
  //   timeUntilTrigger: '-',
  //   // gelato: false
  // },
  // {
  //   txHash: '0x525DFE70...02B1B83D',
  //   status: Status.Ready,
  //   triggerType: 'Timestamp',
  //   triggerTime: '2021-10-10 10:10:10',
  //   timeUntilTrigger: 'READY',
  //   // gelato: false
  // },
  // {
  //   txHash: '0x525DFE70...02B1B83D',
  //   status: Status.Cancelled,
  //   triggerType: 'Timestamp',
  //   triggerTime: '-',
  //   timeUntilTrigger: '-',
  //   // gelato: true
  // }
];

function MainTxTable() {

  const navigate = useNavigate();

  const statusTooltip = <>
    The status of a transaction:
    <br />
    <strong>Pending:</strong> Transaction cannot be executed yet
    <br />
    <strong>Ready:</strong> Transaction can be executed
    <br />
    <strong>Executed:</strong> Transaction has been executed
    <br />
    <strong>Cancelled:</strong> Transaction has been cancelled
  </>;

  const triggerTypeTooltip = <>
    The type of trigger for a transaction:
    <br />
    <strong>Timestamp:</strong> Transaction will be executed at a certain time
    <br />
    <strong>Inactivity:</strong> Transaction will be executed after a period of inactivity on the Safe
  </>;

  const triggerTimeTooltip = <>
    The time at which a transaction becomes executable
    <br />
    <br />
    In case of an inactivity trigger, this time can be extended by making Safe transactions
  </>;

  const timeUntilTriggerTooltip = <>
    The time until a transaction becomes executable
    <br />
    <br />
    In case of an inactivity trigger, this duration can be extended by making Safe transactions
  </>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Hash</TableCell>
            <TableCell align="right">
              <Tooltip arrow title={statusTooltip} placement='top'>
                <span>Status</span>
              </Tooltip>
            </TableCell>
            <TableCell align="right">
              <Tooltip arrow title={triggerTypeTooltip} placement='top'>
                <span>Trigger Type</span>
              </Tooltip>
            </TableCell>
            <TableCell align="right">
              <Tooltip arrow title={triggerTimeTooltip} placement='top'>
                <span>Trigger Time</span>
              </Tooltip>
            </TableCell>
            <TableCell align="right">
              <Tooltip arrow title={timeUntilTriggerTooltip} placement='top'>
                <span>Time Until Trigger</span>
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <ClickableTableRow
              key={row.txHash}
              onClick={() => { navigate(`/inspect/${row.txHash}`) }}
            >
              <TableCell component="th" scope="row">{row.txHash}</TableCell>
              <TableCell align="right">{displayStatus(row.status)}</TableCell>
              <TableCell align="right">{row.triggerType}</TableCell>
              <TableCell align="right">{row.triggerTime}</TableCell>
              <TableCell align="right">{row.timeUntilTrigger}</TableCell>
            </ClickableTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MainTxTable;
