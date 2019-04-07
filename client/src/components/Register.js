import React from 'react';
import Authentication from '../containers/Authentication';
import {connect} from 'react-redux';
import {registerRequest} from '../actions/authentication';

import swal from 'sweetalert';

//import {browserHistory} from 'react-router';
class Register extends React.Component{
  
    handleRegister=(id,pw,name)=>{
        return this.props.registerRequest(id,pw,name)
                .then(()=>{
                    if(this.props.status==='SUCCESS'){
                      //  Materialize.toast('Success! Please log in.',2000);
                        //Router.push('/login');
                        swal("회원가입 성공!!", "success");
                        return true;
                    }else{
                        /*  ERROR CODES:
                            1: BAD USERNAME
                            2: BAD PASSWORD
                            3: USERNAME EXISTS
                        */
                        let errorMessage=[
                            'Invalid Username',
                            'Password is too short',
                            'Username already exists'
                        ];
                        // let $toastContent=$('<span sytle="color:#FFB4BA">'+errorMessage[this.props.errorCode-1]+'</span>');
                        // Materialize.TransformStream($toastContent,2000);
                        swal("회원가입 실패!!"+errorMessage[this.props.errorCode-1], "error");
                        return false;
                    }
                });
    }
    render(){
        return (<div><Authentication mode={false} onRegister={this.handleRegister}/></div>);
    }
}
const mapStateToProps = (state)=>{
    return {
        status:state.authentication.register.status,
        errorCode : state.authentication.register.error
    };
};
const mapDispatchToProps  = (dispatch) =>{
    return {
        registerRequest: (id,pw,name)=>{
            return dispatch(registerRequest(id,pw,name));
        }
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(Register);