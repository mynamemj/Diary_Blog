import {
    AUTH_LOGIN,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGIN_SUCCESS,
    AUTH_REGISTER,
    AUTH_REGISTER_FAILURE,
    AUTH_REGISTER_SUCCESS,
    AUTH_GET_STATUS,
    AUTH_GET_STATUS_FAILURE,
    AUTH_GET_STATUS_SUCCESS,
    AUTH_LOGOUT
} from './ActionTypes';
import axios from 'axios';
/*============================================================================
    authentication
==============================================================================*/

/* LOGIN */
// 근데 thunk 가 뭔가요?

// thunk 는 특정 작업의 처리를 미루기위해서 함수로 wrapping 하는것을 의미해요
// 이런식으로 말이죠, 그리고 나중에 컴포넌트에서 dispatch(loginRequest(username, pssword)) 를 하게 되면,
// 미들웨어를 통하여 loginRequest 가 반환한 thunk 를 처리하게 돼요.
export function loginRequest(userid,password){
    // 구현 
    return (dispatch) => {
        // 어떤 함수를 리턴해서 디스패치 될때 함수 실행
        // Inform Login API is starting
      //  console.log(userid,password);
        dispatch(login());
        const url='/account/signin';
        const config ={
                     headers:{'content-type':'application/json' }
                    };
        //API REQUEST
        return axios.post(url,{userid,password},config)
            .then((res)=>{
                //SUCCESS 
                console.log("res가 액션함수로 넘어옴"+res.data.success);
                dispatch(loginSuccess(userid));
            }).catch((error)=>{
                //FAILED
                console.log("err가 액션함수로 넘어옴"+error.response.data);
                dispatch(loginFailure());
            });
            // 이런식으로 thunk 내부에서 다른 action 을 dispatch 할 수 있어요.
    };
}

export function login(){
    return {
        type: AUTH_LOGIN
    };
}

export function loginSuccess(userid){
    return{
        type:AUTH_LOGIN_SUCCESS,
        userid
    };
}

export function loginFailure(){
    return {
        type:AUTH_LOGIN_FAILURE
    };
}
/*회원가입*/
export function registerRequest(userid,password,username){
    return (dispatch) => {
        //Inform Register API is starting
        dispatch(register());
        const url='/account/signup';
        const config ={
                     headers:{'content-type':'application/json' }
                    }
        return axios.post(url,{userid,password,username},config)
        .then(res=>{
            console.log("res가 액션함수로 넘어옴"+res.data.success);
            dispatch(registerSuccess());
        }).catch((error)=>{
            console.log("에러가 액션함수로 넘어옴"+error.response.data.code);
            dispatch(registerFailure(error.response.data.code));
        });
    }
} 
export function register(){
    return{
        type:AUTH_REGISTER
    };
}
export function registerSuccess(){
    return{
        type:AUTH_REGISTER_SUCCESS
    };
}
export function registerFailure(error){
    return{
        type:AUTH_REGISTER_FAILURE,
        //Register는 오류 종류가 3개니까, resgisterFailure 에 error 값
        error
    };
}
export function getStatusRequest(){
    return (dispatch) => {
        //inform Get Status API is starting
        dispatch(getStatus());
        const url='/account/getInfo';
        const config ={
                     headers:{'content-type':'application/json' }
                    }
        return axios.get(url,config)
        .then(res=>{
            console.log("res.data.info.userid "+res.data.info);
            dispatch(getStatusSucess(res.data.info));
        }).catch(err=>{
            dispatch(getStatusFailure());
        });
    }
}
export function getStatus(){
    return{
        type:AUTH_GET_STATUS
    }
}
export function getStatusSucess(userid){
    return {
        type:AUTH_GET_STATUS_SUCCESS,
        userid
    }
}
export function getStatusFailure(){
    return {
        type:AUTH_GET_STATUS_FAILURE
    };
}

export function logoutRequest(){
    return((dispatch)=>{
        const url='/account/logout';
        const config ={
            headers:{'content-type':'application/json' }
           }
        return axios.post(url,null,config)
        .then(res=>{
            dispatch(logout());
        });
    });
}

export function logout(){
    return{
        type:AUTH_LOGOUT
    };
}