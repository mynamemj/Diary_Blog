
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Write from '../components/Write'

import Mycard from './Card';
const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },

  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});

class Posts extends React.Component {

  constructor(props){
    super(props);
    this.state={
      cards:''
    }
  }
  componentDidMount(){
    this.callApi()
    .then(res=>{
      
      this.setState({cards:res});
      console.log("비동기"+this.state.cards);
    })
    .catch(err=>{
      console.log("비동기 처리 err= "+err);
    })
    
  }
  callApi=async ()=>{
      console.log("currentuser "+this.props.currentUser);
      const res=await fetch('/posts/get/'+this.props.currentUser);
      const body = await res.json();
      return body;
  }
  render() {
    const card_base = {
      image:'https://source.unsplash.com/category/nature/260x300',
      contents:'기본',
    };
    
    const { classes } = this.props;
    return (
      <div>

        <React.Fragment>
          <CssBaseline />
          {/* <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <CameraIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Album layout
          </Typography>
        </Toolbar>
      </AppBar> */}
          <main>
            {/* Hero unit */}
            <div className={classes.heroUnit}>
              <div className={classes.heroContent}>

                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                  <div>{this.props.isloggedIn ? this.props.id + "님 환영" : '초림이의 데일리룩'} </div>
                  
                </Typography>
                <Typography variant="h6" align="center" color="textSecondary" paragraph>
                  Something short and leading about the collection below—its contents, the creator, etc.
                  Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                  entirely.
                 </Typography>
                 {/* 이미지 잘뜨나 */}
                 {/* <img src={'https://source.unsplash.com/category/nature/260x300'}/> */}
                <div className={classes.heroButtons}>
                  <Grid container spacing={16} justify="center">
                    <Grid item>
                     {this.props.isLoggedIn? <Write userid={this.props.currentUser}/>:'로그인 해주세용'}
                    </Grid>
                    <Grid item>
                      <Button variant="text" color="secondary">
                        Secondary action
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
            <div className={classNames(classes.layout, classes.cardGrid)}>
              {/* End hero unit */}
              <Grid container spacing={40}>
              {this.props.isLoggedIn?
                this.state.cards?
                 this.state.cards.map((card) => {
                   return(<Grid item key={card.postid} sm={6} md={3} lg={3}>
                     <Mycard image={card.image} content={card.contents}/>
                   </Grid>);
                 }):
                 <Grid item key={1} sm={6} md={3} lg={3}>
                 <Mycard image={card_base.image} content={card_base.contents}/>
                 </Grid>
                  : 
                  <Grid item key={1} sm={6} md={3} lg={3}>
               <Mycard image={card_base.image} content={card_base.contents}/>
               </Grid>
             
              }
                

              </Grid>
            </div>
          </main>
          {/* Footer */}
          <footer className={classes.footer}>
            <Typography variant="h6" align="center" gutterBottom>
              Footer
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
              Something here to give the footer a purpose!
            </Typography>
          </footer>
          {/* End footer */}
        </React.Fragment>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.authentication.status.isLoggedIn,
    currentUser: state.authentication.status.currentUser
  };
};

Posts.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Posts));



