import * as types from '../actions/ActionTypes'
import update from 'react-addons-update';
//스토어의 state를 바꿔주는 함수를 리듀서라 함.
const initialState= {
    login:{
        status:'INIT',
    },
    register:{
        status:'INIT',
        error:-1
    },
    status:{
        valid:false,
        isLoggedIn:false,
        currentUser:''
    }
};
export default function authentication(state, action) {
    if(typeof state === 'undefined'){
        console.log("초기값");
        state = initialState;
    }
    switch(action.type){
        
        case types.AUTH_LOGIN:
            return update(state,{
                login:{
                    status:{ $set:"WAITING"}
                }
            });
        case types.AUTH_LOGIN_SUCCESS:
            console.log("LOGIN_SUCCESS 여기까진 들어옴");
            return update(state, {
                login: {
                    status: { $set: 'SUCCESS' },
                }
                // ,status: {
                //     valid:{ $set: true },
                //     isLoggedIn: { $set: true },
                //     currentUser: { $set: action.userid },
                // }
            });
        
        case types.AUTH_LOGIN_FAILURE:
            return update(state,{
                login:{
                    status:{$set:'FAILURE'}
                }
            });
        case types.AUTH_REGISTER:
            return update(state,{
                register:{
                    status:{$set:'WAITING'},
                    error:{$set:-1}
                }
            });
        case types.AUTH_REGISTER_SUCCESS:
            return update(state,{
                register:{
                    status:{$set:'SUCCESS'},
                }
            });
        case types.AUTH_REGISTER_FAILURE:
            return update(state,{
                register:{
                    status:{$set:'FAILURE'},
                    error:{$set:action.error}
                }
            });
        case types.AUTH_GET_STATUS:
                console.log("AUTH_GET_STATUS"+state.status.isLoggedIn);
                return update(state,{
                status:{
                    isLoggedIn:{$set:true}
                }
            });
        case types.AUTH_GET_STATUS_SUCCESS:
            return update(state,{
                status:{
                    valid:{$set:true},
                    currentUser:{$set:action.userid}             }
            });
        case types.AUTH_GET_STATUS_FAILURE:
            return update(state,{
                status:{
                    valid:{$set:false},
                    isLoggedIn:{$set:false}
                }
            });
        case types.AUTH_LOGOUT:
            return update(state,{
                isLoggedIn:{$set:false},
                currentUser:{$set:''}
            });
        default:
            return state;
    }
}

