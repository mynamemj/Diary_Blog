import React from 'react';
import './App.css';
import  Header from './containers/Header'
import Home from './containers/Home';
import Posts from './containers/Posts';
import NoMatch from './containers/NoMatch';

import {connect} from 'react-redux';
import {getStatusRequest, logoutRequest} from './actions/authentication';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import MyPage from './routes/MyPage';
// import Login from './routes/Login';
import swal from 'sweetalert';


class App extends React.Component{  
   
    handleLogout=()=>{
        this.props.logoutRequest()
        .then(()=>{
            swal("로그아웃!", "info").then(()=>{
                window.location.reload();
            })
          
            //empty THE SESSION
            let loginData = {
                isLoggedIn:false,
                username:''
            };
            document.cookie = 'key=' + btoa(JSON.stringify(loginData));
        });
    }
    componentDidMount(){
        function getCookie(id){
            var value = "; "+document.cookie;
            console.log("cookie is:"+value);
            var parts = value.split("; "+ id + "=");
            console.log("parts is: "+parts);
            if(parts.length==2)return parts.pop().split(";").shift();
        }

        //get logintData from cookie
        let loginData = getCookie('key');
        //if loginData is undefined. do nothing
        if(typeof loginData==="undefined")return;
        //decode base64 & parse json
        loginData = JSON.parse(atob(loginData));
        console.log("loginData isLoggedIn :"+loginData.isLoggedIn);
        
        //if not logged in, do nothing
        if(!loginData.isLoggedIn) return;
        //page refreshed & has a session in cookie,
        //check wether this cookie is valid or not
        this.props.getStatusRequest()
        .then(()=>{
            console.log("로그인 상태"+this.props.status.valid+"로그"+loginData.isLoggedIn);
            // if session is not valid
            if(!this.props.status.valid){
                // logout the session
                loginData={
                    isLoggedIn:false,
                    userid:''
                };   
            console.log("로그수정"+loginData.isLoggedIn);
                
                
            document.cookie='key='+btoa(JSON.stringify(loginData));

            //and notify
            swal("세션 만료 로그인을 다시 해주세요!", "info");

            }
        });
    }
    
    render(){
        /* Check whether current route is login or register using regex */
        return (
           
            <Router>
                <div>
                    <Header handleLogout={this.handleLogout} isLoggedIn={this.props.status.isLoggedIn}/>
                    <div>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path='/post' component={Posts}/>
                            <Route component={NoMatch}/>
                        </Switch>
                    </div>
                </div>  
            </Router>  
           
        );
    }
}
const mapStateToProps = (state) =>{
    return {
            status:state.authentication.status
    }
};
const mapDispatchToProps=(dispatch)=>{
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        },
        logoutRequest: () =>{
            return dispatch(logoutRequest());
        }
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(App);