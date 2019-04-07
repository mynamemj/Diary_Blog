import React,{Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

//import { Link } from 'react-router-dom';

class Authentication extends Component{

    constructor(props){
        super(props);
        this.state={
            userid:'',
            password:'',
            userName:'',
            open: false
        }
       
    }
   
    handleLogin=()=>{
        let id = this.state.userid;
        let pw = this.state.password;

        this.props.onLogin(id,pw)
        .then(
            (success) =>{
                if(!success){
                    this.setState({
                        password:''
                    });
                   
                }else{
                    this.setState({
                        open:false
                    });
                    
                   
                    
                }
            }
        );
    }
    handleRigister=()=>{
        let id = this.state.userid;
        let pw = this.state.password;
        let name = this.state.userName;

        this.props.onRegister(id,pw,name)
        .then((result)=>{
            if(!result){
                this.setState({
                    userid:'',
                    password:'',
                    userName:''
                });
            }else{
                this.setState({
                    open:false
                })
            }
        });
    }
    // 그리고 props로 전달받은 onLogin 을 실행하세요.

    // 이번엔 (success) => { .. } 가 있죠? 여기서 success 는 아까전에 Login 컴포넌트의 handleLogin 에서 리턴한 true/false 값입니다.
    
     
handleValueChange=(e)=>{
    let nextState={};
                //키       :   벨류
    nextState[e.target.name]=e.target.value;
    this.setState(nextState);
}


    handleClickOpen = () =>{
        this.setState({
            open: true
        })
    }
    handleClose = () => {
        this.setState({
            userid:'',
            password:'',
            userName:'',
            open:false
        })
    }
    render(){
        
        const registerView = (
        <div>
            <Button color='inherit' onClick={this.handleClickOpen}>
            회원가입
            </Button>
            <Dialog open={this.state.open} >
                <DialogTitle>회원가입</DialogTitle>
            <DialogContent>
                <TextField label='ID' type='text' name='userid' value={this.state.userid} onChange={this.handleValueChange}/> <br/>
                <TextField label='Password' type='text' name='password' value={this.state.password} onChange={this.handleValueChange}/> <br/>
                <TextField label='이름' type='text' name='userName' value={this.state.userName} onChange={this.handleValueChange}/> <br/>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' color='primary' onClick={this.handleRigister}>가입하기</Button>
                <Button variant='outlined' color='primary' onClick={this.handleClose}>닫기</Button>
            </DialogActions>
            </Dialog>
      </div>);
      const loginView = (<div>
        <Button  color='inherit' onClick={this.handleClickOpen}>
        로그인
        </Button>
        <Dialog open={this.state.open} >
            <DialogTitle>로그인</DialogTitle>
        <DialogContent>
            <TextField label='ID' type='text' name='userid' value={this.state.userid} onChange={this.handleValueChange}/> <br/>
            <TextField label='Password' type='text' name='password' value={this.state.password} onChange={this.handleValueChange}/> <br/>
        </DialogContent>
        <DialogActions>
            <Button variant='contained' color='primary' onClick={this.handleLogin}>로그인</Button>
            <Button variant='outlined' color='primary' onClick={this.handleClose}>닫기</Button>
        </DialogActions>
        </Dialog>
  </div>);

       return(
        <div>
           {this.props.mode? loginView : registerView}
        </div>
        ); 
    }
};

// Authentication.propTypes = {
//     mode: React.PropTypes.bool,
//     onLogin: React.PropTypes.func,
//     onRegister: React.PropTypes.func
// };

Authentication.defaultProps = {
    mode: true,
    onLogin: (id, pw) => { console.error("login function not defined"); },
    onRegister: (id, pw,name) => { console.error("register function not defined"); }
};

export default Authentication; 