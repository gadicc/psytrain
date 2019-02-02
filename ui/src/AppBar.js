import React from 'react';

import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    //flexGrow: 1,
    height: 62,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginTop: -3,
    marginLeft: -12,
    _marginRight: 20,
    color: 'white',
  },
  navPos: {
    color: 'white'
  },
  padding: {
    height: 10,
  }
};

const TitleLink = ({ navPos, classes }) => navPos.map(part =>
  <span key={part.to}><Link className={classes.navPos} to={part.to}><a href={part.to}>{part.text}</a></Link> &gt; </span>
);

const MyAppBar = ({ classes, title, navPos }) => (
  <>
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Link to="/">
            <IconButton className={classes.menuButton} color="inherit" aria-label="Home">
              <HomeIcon />
            </IconButton>
          </Link>
          <Typography variant="h6" color="inherit" className={classes.flex}>
            {navPos ? <TitleLink classes={classes} navPos={navPos} /> : null}
            {title}
          </Typography>
          {/*
          <Button color="inherit">Login</Button>
          */}
        </Toolbar>
      </AppBar>
    </div>
    <div className={classes.padding}>
    </div>
  </>
);

export default withStyles(styles)(MyAppBar);
