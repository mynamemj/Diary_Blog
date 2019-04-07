import React from 'react';
import {connect} from 'react-redux';
import Authentication from '../containers/Authentication';
import {loginRequest} from '../actions/authentication';
//import {browserHisroty} from 'react-router'

import swal from 'sweetalert';
class Login extends React.Component{
  constructor(props){
      super(props);
  } 
    
    handleLogin=(id,pw)=>{
        return this.props.loginRequest(id,pw)
        .then(()=>{
            //console.log("Login this.props.status "+this.props.status);
            if(this.props.status==='SUCCESS'){
                //세션 데이터 만들기
                let loginData = {
                    isLoggedIn: true,
                    userid: id
                };
                //쿠키값 생성
                document.cookie='key=' + btoa(JSON.stringify(loginData));
                //BrowserRouter.push('/');
               //alert("Welcome, "+id + '!'+this.props.status,2000);
               swal("환영합니다. "+id+"님!", "success").then(()=>{window.location.replace('/');});
               //window.location.replace('/');

                return true;
            }else{
                console.log("실패하기전 로그인 상태 "+this.props.status);
                // let $toastContent = $('<span style="color: #FFB4BA>Incorrect userid or password</span>');
                // Materialize.toast($toastContent,2000);
               swal("로그인실패!", "error");
               
                return false;
            }
        });
    }
    render(){
        return (
        <div>
           
            <Authentication mode={true}
            onLogin={this.handleLogin}/>
        </div>
        );
    }    
}
const mapStateToProps = (state) =>{
    return {
        status : state.authentication.login.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (id, pw) => { 
            return dispatch(loginRequest(id,pw)); 
            
        }
    };
};
// 뒤에 .then() 은, AJAX 요청이 끝난다음에 할 작업인데요, 이건 axios 가 Promise 를 사용하기 떄문에 사용 가능한거랍니다

// * Promise 는 JavaScript ES6 에 생긴 비동기 처리를 할 때 사용하는 기술입니다.

// 그리고, 맨 앞에 return이 들어갔죠? 이렇게 함으로서, handleLogin 메소드를 실행한 실행자에서, handleLogin.then() 방식으로 또 다음 할 작업을 설정 할 수 있게 해줍니다.

 

// 로그인이 성공하면, 세션 데이터를 쿠키에 저장합니다. btoa는 JavaScript의 base64 인코딩 함수입니다.

// Material.toast 는 Materializecss 프레임워크의 알림 기능입니다.
export default connect(mapStateToProps, mapDispatchToProps)(Login);
