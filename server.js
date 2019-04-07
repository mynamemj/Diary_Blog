
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT ||5000;
const account= require('./routes/account');
const posts = require('./routes/posts');
const connection =require('./mysql');
connection.connect();

const session =require('express-session');
app.use(session({
    secret: 'Mj1$2$3$4$',
    resave : false,
    saveUninitialized:true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/', express.static(__dirname + "/../public"));
const multer=require('multer');
//multer를 이용해 파일을 저장가능 ./upload에 저장
const upload=multer({dest:'./upload'});

app.use('/image',express.static('./upload'));

app.use('/account',account);
app.use('/posts',posts);


// app.use('/api',router);
/* handle error */
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });


// app.get('/api/customers',(req,res)=>{
//     connection.query("SELECT * FROM USER ",(err,rows,fields)=>{
//         res.send(rows); } 
//       );
// });
  
  //---------------------회원가입-----------------
  
//---------------------회원삭제----------------------------
// app.delete('/api/customers/:id',(req,res)=>{
//     let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?';
//     let params= [req.params.id];
//     connection.query(sql,params,(err,rows,fields)=>{
//         res.send(rows);
//     })
// });
app.listen(port,()=>{console.log(`Listening on port ${port}`);});
