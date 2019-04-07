import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
//import Image from 'react-image-resizer';
import ExifOrientationImg from 'react-exif-orientation-img'
import swal from 'sweetalert';
import {connect} from 'react-redux';
import {PostRequest} from '../actions/posts';
const styles = theme => ({
    hidden:{display:'none'},
    image: {
        border: '1px solid #ccc',
        background: '#fefefe',
      },
})

class Write extends React.Component{
   
    constructor(props){
        super(props);
        this.state={
            file:null,
            file_url:'',
            //리듀서에서 받아올건가?
            content:'',
            fileName:'',
            open:false,
        }
    }
    handleFormSubmit = (e) =>{
        e.preventDefault();
        //image, userid, contnets
       
        const formData = new FormData();
        formData.append('image',this.state.file);
        formData.append('userid',this.props.userid);
        formData.append('content',this.state.content);
      
        console.log("wirte data is "+ this.props.userid);
        this.props.PostRequest(formData)
        .then(()=>{
            if(this.props.status==='SUCCESS'){//리로드 말고 비동기로 갱신
                this.setState({
                    file:null,
                    file_url:'',
                    content:'',
                    fileName:'',
                    open:false,
                })
                swal("포스트 성공", "success").then(()=>{this.handleClose();window.location.replace('/');});
                
            }
            else{
                switch(this.props.error){
                    //로그인 상태가 아니라면 알리고 새로고침
                    case 1:
                        swal("로그인 상태가 아닙니다!",'warning').then(()=>{setTimeout(()=>{window.location.reload(false);},2000)});
                        break;
                    case 2:
                        swal("content를 쓰세요",'warning');
                        break;
                    default:
                        swal("원인 모를 실패",'warning');
                        break;
                    }
            }
        }
        
        )

    }
    handleFileChange=(e)=>{
        let url;
        console.log("e.target.files[0]"+e.target.files[0])
        if(e.target.files[0]===undefined){
            url=''
        }else{url=URL.createObjectURL(e.target.files[0])}
        this.setState({
            //파일
            file:e.target.files[0],
            file_url:url,
            //파일 경로,이름
            fileName:e.target.value
        });
    }
    handleValueChange=(e)=>{
        let nextState={};
        nextState[e.target.name]=e.target.value;
        this.setState(nextState);
        
    }
    handleClose=(e)=>{
        this.setState({
            file:null,
            file_url:'',
            content:'',
            fileName:'',
            open:false,
           
        })
    }
    
    handleClickOpen=(e)=>{
        this.setState({
            open:true
        })
        console.log("posts리듀서에서 넘어옴: "+this.props.status);
    }
    render(){
        const {classes} = this.props;
        return (
            <div>
                <Button variant='contained' color='primary' onClick={this.handleClickOpen}>
                POST
                </Button>
                <Dialog open={this.state.open} >
                    <DialogTitle>룩 추가</DialogTitle>
                <DialogContent>
                <label htmlFor='raised-button-file'>
                        <Button variant='contained' color='primary' name='file'component='span'>
                        {this.state.fileName===''?'프로필 이미지 선택':this.state.fileName}</Button>
                    </label>
                <input className={classes.hidden} id='raised-button-file'  accept='image/*'type ="file"  file={this.state.file} value={this.state.fileName}
                    onChange={this.handleFileChange}/>
                    <br/>
                    <ExifOrientationImg src={this.state.file_url}  width={ 230 } height={ 230 } className={classes.image}/>
                    <br/>
                    <TextField placehold="내용" label='Content' type='text' name='content' value={this.state.content} onChange={this.handleValueChange}/> <br/>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='primary' onClick={this.handleFormSubmit}>추가</Button>
                    <Button variant='contained' color='secondary' onClick={this.handleClose}>닫기</Button>
                </DialogActions>
                </Dialog>

            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        status : state.posts.post.status,
        error:state.posts.post.error
       
    };
  };
const mapDispatchToProps = (dispatch)=>{
    return{
      PostRequest: (formData)=>{
        return dispatch(PostRequest(formData));
      }
    }
  }
export default  connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Write));