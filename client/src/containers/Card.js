import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ExifOrientationImg from 'react-exif-orientation-img'

import Tooltip from '@material-ui/core/Tooltip';
const styles= theme =>({
    card: {
        height: '110%',
        display: 'flex',
        flexDirection: 'column',
      },
      cardMedia: {
        paddingTop: '8%', // 16:9
      },
      cardContent: {
        flexGrow: 1,
      },
      button: {
        margin: theme.spacing.unit,
      },
      customWidth: {
        maxWidth: 500,
      },
      noMaxWidth: {
        maxWidth: 'none',
      },
})
class Mycard extends React.Component {
  
    render() {
        const { classes } = this.props;
        return (
            <Tooltip title={this.props.content}>
                <Card className={classes.card}>
                    <ExifOrientationImg
                        className={classes.cardMedia}
                        src={this.props.image} // eslint-disable-line max-len
                        title="Image title"
                        width="260"
                        height="300"
                        
                    />
                    <CardActions>
                        <Button size="small" color="secondary">
                            View
                        </Button>
                        <Button size="small" color="secondary">
                            Edit
                        </Button>
                    </CardActions>
                </Card>
                </Tooltip>
           
        );
    }
}
export default withStyles(styles)(Mycard);