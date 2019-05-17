import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import './StudentInfo.css';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

const StudentInfo = (props) => {
  const { classes } = props;
  return (
    <div className="student-info-box">
      <h2>User Name</h2>
      <h2>{props.firstName} {props.lastName}</h2>
      <Button variant="contained" color="primary" className={classes.button}>
        Change Name
      </Button>
      <h2>Contact Email</h2>
      <h2>{props.email}</h2>
      <Button variant="contained" color="primary" className={classes.button}>
        Edit Email
      </Button>
      <h2>Contact Phone Number</h2>
      <h2>{props.number}</h2>
      <Button variant="contained" color="primary" className={classes.button}>
        Edit Number
      </Button>
      <h2>Password</h2>
      <h2></h2>
      <Button variant="contained" color="primary" className={classes.button}>
        Edit Password
      </Button>
    </div>
  )
}

export default withStyles(styles)(StudentInfo);