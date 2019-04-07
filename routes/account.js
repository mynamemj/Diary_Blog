
/*  

    bcrypt 사용할 때 문제점 : 에로우 함수와 function의 차이점 때문에 해슁할때 다른값 생겻음

    ACCOUNT SIGNUP: POST /api/account/signup
    BODY SAMPLE: { "username": "test", "password": "test" }
    ERROR CODES:
        1: BAD USERNAME
        2: BAD PASSWORD
        3: USERNAM EXISTS
*/

const express =require('express');
const router = express.Router();

const connection =require('../mysql');
// const fs = require('fs');
// const data = fs.readFileSync('./database.json');
// const conf = JSON.parse(data);
// const mysql = require('mysql');
// console.log(conf[1].host,conf[1].database)
// const connection = mysql.createConnection({
//     host:conf[1].host,
//     user:conf[1].user,
//     password:conf[1].password,
//     port:conf[1].port, 
//     database:conf[1].database
// });
// connection.connect();




const bcrypt =require('bcrypt');
const salt=bcrypt.genSaltSync(10,'b');
// generates hash
router.get('/hello',(req,res)=> {
    res.send({message : 'Hello Express!'});
});
function generateHash(password){
    return bcrypt.hashSync(password,salt);
    }

function validateHash (password,hash){    return bcrypt.compareSync(password,hash);}
router.post('/signup',(req,res) => {
    let userid=req.body.userid;
    let password=req.body.password;
    let name=req.body.username;   
    console.log("req=="+req.body.userid);
    let usernameRegex = /^[a-z0-9]+$/;
    if(!usernameRegex.test(userid)) {
        return res.status(400).send({
            error: "BAD USER ID:알파벳과 숫자로만...",
            code: 1
        });
    }
 //패스워드 길이 검사해야되는데 password.length가 안됨
    if(  typeof password !== "string") {
        return res.status(400).send({
            error: "BAD PASSWORD: 4자리 이상 ",
            code: 2
        });
    }
    const sql="SELECT * FROM USER WHERE userid=?";
    const param=[userid];
    connection.query(sql,param,(err,rows,fields)=>{
        if(err) throw err;
      
        if(rows[0]!==undefined){
            console.log("아이디 중복임!!")
            const err={
                error:"아이디 중복",
                code:3
            };
            return res.status(409).json(err);
        }
        else{
            const sql_in="INSERT INTO USER VALUES (?,?,?,now())";
            password=generateHash(password);
            let params=[userid,password,name];
            connection.query(sql_in,params,(err,rows,fields)=>{
                console.log(err);
                return res.json({success:true});
                });
             }
    });

    
});
/*
    ACCOUNT SIGNIN: POST /api/account/signin
    BODY SAMPLE: { "username": "test", "password": "test" }
    ERROR CODES:
        1: LOGIN FAILED
*/
// 

// })
router.post('/signin',(req,res) => {
    // compares the password
    console.log("로그인 시도");
    let id=req.body.userid;
    let pw=req.body.password;
    if(typeof pw !=="string"){
        return res.status(401).json({
            error:"LOGIN FAILED",
            code:1
        });
    }
    const param=[id];
    const sql="SELECT * FROM USER WHERE userid=?";

    console.log('post sign in userid: '+id);

    connection.query(sql,param,(err,rows,fields)=>{
        if(err) throw err;
        console.log("post singin rows:",rows[0]);
        
        if(rows[0]===undefined){
            console.log("---실패--");

            return res.status(401).json({
                error:"LOGIN 실패",
                code:1
            });
        }else{
            console.log("---검사--");
            
        //패스워드가 valid한지 췤
        const hash=rows[0].password;
        console.log("---해쉬값 대입--");

        if(!validateHash(pw,hash)){
            console.log("-----해슁이랑 안맞음---");
            console.log(rows[0].password);
            console.log(bcrypt.hashSync(pw,salt));
            
            return res.status(401).json({
                error:"LOGIN FAILED",
                code:1
            });
        }else{
             //세션 정보 수정할 필요가 있는데
            let session = req.session;
       
            session.loginInfo={
                _id:rows[0].userid,
            }
            console.log('-------성공-------'+session.loginInfo);
            return res.json({
                success:true
                
             });
        }
   
        }
    });

});
/*
    GET CURRENT USER INFO GET /api/account/getInfo
*/
 
router.get('/getinfo',(req,res)=> {
    if(typeof req.session.loginInfo==='undefined'){
        return res.status(401).json({
            error:1
        });
    }
    console.log("세션 정보 요청"+req.session.loginInfo)
    res.json({
        info:req.session.loginInfo._id
    });
});
/*
    LOGOUT: POST /api/account/logout
*/

router.post('/logout',(req,res)=>{
    req.session.destroy(err=>{if(err) throw err;});
    return res.json({sucess:true});
});


module.exports = router;


