import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import './Header.css';

import {Link} from  'react-router-dom';

import Login from '../components/Login'
import Register from '../components/Register'

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
  },
  rightButton:{
    flexDirection:'row',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function Header(props) {
  const { classes } = props;
  const loginButton=(<Login/>);
  const registerButton=(<Register/>);
  const logoutButton=(<Button onClick={props.handleLogout} color="inherit">Logout</Button>);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            초림's Diary
          </Typography>
          <Link className="menu-item" type="Button"  to ='/'>Home</Link>
          <Link className="menu-item"   to ='/post'>Posts</Link>
          
          {props.isLoggedIn?logoutButton:loginButton}
          {props.isLoggedIn?'':registerButton}
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  
};

Header.defaultProps= {
  isLoggedIn: false,
  onLogout: ()=> {console.error("logout function not defined!");}
};

export default withStyles(styles)(Header);