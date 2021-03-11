import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  mainLayout: {
    height: '100vh',
  },
});

const MainLayout: React.FC = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.mainLayout}>{children}</div>;
};

export default MainLayout;
