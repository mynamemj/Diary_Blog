import {
    IMAGE_POST,
    IMAGE_POST_FAILURE,
    IMAGE_POST_SUCCESS
} from './ActionTypes'

import axios from 'axios';

// 사진 post

export function PostRequest(formData){
    return(dispatch)=>{
        dispatch(Post());
        const url='/posts/upload';
        const config ={
            headers:{'content-type':'multipart/form-data'
            }
           };
        console.log("action posts data.content is:"+formData.get('content'));

        return axios.post(url,formData,config)
        .then((res)=>{
            dispatch(PostSuccess());
        }).catch((err)=>{
            dispatch(PostFailure(err.response.data.code));
        })
    }
}

export function Post(){
    return {
        type:IMAGE_POST
    };
}

export function PostSuccess(){
    return {
        type:IMAGE_POST_SUCCESS
    };
}
export function PostFailure(error){
    return {
        type:IMAGE_POST_FAILURE,
        error
    }
}