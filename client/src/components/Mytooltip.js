import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  customWidth: {
    maxWidth: 500,
  },
  noMaxWidth: {
    maxWidth: 'none',
  },
});


class Mytooltip extends React.Component{
  
  render(){
    
    return (
      <div>
        <Tooltip title={this.props.content}>
         
        </Tooltip>
      </div>
    )
  };
}

Mytooltip.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Mytooltip);