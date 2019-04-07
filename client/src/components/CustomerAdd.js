import React from 'react';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

const styles = theme=>({
    hidden:{display:'none'}
})

class CustomerAdd extends React.Component{

    constructor(props){
        super(props);
        this.state={
            file:null,
            userid:'',
            password:'',
            userName:'',
            fileName:'',
            open: false
        }
    }

handleFileChange= (e) =>{
    this.setState({
        file:e.target.files[0],
        fileName:e.target.value
    });
}

handleValueChange=(e)=>{
    let nextState={};
                //키       :   벨류
    nextState[e.target.name]=e.target.value;
    this.setState(nextState);
}

    handleFormSubmit = (e) =>{
       //데이터가 서버로 전달됨에 있어서 오류를 방지
        e.preventDefault();
        this.addCustomer()
            .then(response=>{
                console.log(response.data);
                this.props.stateRefresh();
            })
            this.setState({
                file:null,
                userid:'',
                password:'',
                userName:'',
                fileName:'',
                open: false
            })
            
    }
    addCustomer = () => {
        const url='api/customerss';
        const formData = new FormData();
        formData.append('image',this.state.file);
        formData.append('userid',this.state.userid);
        formData.append('password',this.state.password);
        formData.append('name',this.state.userName);
        formData.append('birthday',this.state.birthday);
        formData.append('gender',this.state.gender);
        formData.append('job',this.state.job);
        const config ={
            headers:{'content-type':'multpart/form-data'
            }
        }
        return post(url,formData,config);
    }

    handleClickOpen = () =>{
        this.setState({
            open: true
        })
    }
    handleClose = () => {
        this.setState({
            file:null,
            userid:'',
            password:'',
            userName:'',
            fileName:'',
            open:false
        })
    }
    render(){
        const {classes} = this.props;
        return(
            <div>
                <Button variant='contained' color='primary' onClick={this.handleClickOpen}>
                고객 추가
                </Button>
                <Dialog open={this.state.open} >
                    <DialogTitle>고객 추가</DialogTitle>
                <DialogContent>
                    <input className={classes.hidden} id='raised-button-file'  accept='image/*'type ="file"  file={this.state.file} value={this.state.fileName}
                    onChange={this.handleFileChange}/>
                    <label htmlFor='raised-button-file'>
                        <Button variant='contained' color='primary' name='file'component='span'>
                        {this.state.fileName===''?'프로필 이미지 선택':this.state.fileName}</Button>
                    </label>
                    <br/>
                    <TextField label='ID' type='text' name='userid' value={this.state.userid} onChange={this.handleValueChange}/> <br/>
                    <TextField label='Password' type='text' name='password' value={this.state.password} onChange={this.handleValueChange}/> <br/>
                    <TextField label='이름' type='text' name='userName' value={this.state.userName} onChange={this.handleValueChange}/> <br/>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='primary' onClick={this.handleFormSubmit}>추가</Button>
                    <Button variant='outlined' color='primary' onClick={this.handleClose}>닫기</Button>

                </DialogActions>
                </Dialog>

          </div>
        );
    }
}

export default withStyles(styles)(CustomerAdd); 