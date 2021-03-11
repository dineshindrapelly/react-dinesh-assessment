import React from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  flGrow: {
    flexGrow: 1,
  },
});

export default () => {
  
  const allClasses = useStyles();

   return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" className={allClasses.flGrow}>
          Dinesh's Visualization Assessment
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
