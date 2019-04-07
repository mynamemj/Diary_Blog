import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState={
    post:{
        status:'INIT',
        error: -1
    }
};

export default function posts(state,action){
    if(typeof state==="undefined"){
        state=initialState;
    }


    switch(action.type){
        case types.IMAGE_POST:
            return update(state,{
                post:{
                    status:{$set:'WAITING'},
                    error : {$set:-1}
                }
            });
        case types.IMAGE_POST_SUCCESS:
            return update(state,{
                post:{
                    status:{$set:'SUCCESS'}
                }
            });
        case types.IMAGE_POST_FAILURE:
            return update(state,{
                post:{
                    status:{$set:'FAILURE'},
                    error:{$set:action.error}
                }
            });
        default:
            return state;
    }
}