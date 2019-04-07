
/* 
    WRITE MEMO: POST /api/memo
    BODY SAMPLE: { contents: "sample "}
    ERROR CODES
        1: NOT LOGGED IN
        2: EMPTY CONTENTS
*/
//쓰기
const express =require('express');
const router = express.Router();
const connection =require('../mysql');


//upload 미들웨어upload.single('image') 가 image(filename)를 ./upload에 저장하고 req.file로 넘김
router.post('/upload',upload.single('image'),(req,res)=>{
    //로그인 상태 확인
    console.log('post요청');
    console.log('req.session.loginInfo '+req.session.loginInfo );
    console.log('req.body.content '+req.body.content );
    
    if(typeof req.session.loginInfo==='undefined'){
        return res.status(403).json({
            error:"NOT LOGGED IN",
            code:1
        });
    }
    if(typeof req.file.filename==='undefined'){
        return res.status(400).json({
            error:"EMPTY FILE",
            code:2
        });
    }
    if(typeof req.body.content!=='string'){
        return res.status(400).json({
            error:"EMPTY CONTENTS",
            code:2
        });
    }
    let sql="INSERT INTO POSTS VALUES (null,?,?,?,now(),now(),false,NULL)";
    let id = req.body.userid;    
    let content =req.body.content;
    console.log(req.file);
    let image='/image/' +req.file.filename;
    let params= [id,content,image];
    connection.query(sql,params,(err,rows,fields)=>{
        if(err) throw err;
        return res.json({succes:true});
    })

});
/*
    READ MEMO: GET /api/memo
*/

router.get('/get',(req,res)=>{//최신거만 반대는 ASC
    const sql="SELECT TOP 5* FROM POSTS ORDER BY edited DESC";
    const param=[req.body.userid];
    
    connection.query(sql,param,(err,rows,fields)=>{
        if(err) throw err;
        return res.json(rows);
    });
});
router.get('/p',(req,res)=>{//최신거만 반대는 ASC
        console.log(req.session.loginInfo);
        return res.json({massge:req.session.loginInfo});
   
});
router.get('/get/:id',(req,res)=>{//최신거만 반대는 ASC
    const sql="SELECT * FROM POSTS  WHERE userid=? ORDER BY edited DESC";
    console.log("get param id is "+req.params.id)
    const param=[req.params.id];
    connection.query(sql,param,(err,rows,fields)=>{
        if(err) throw err;
        console.log(rows)
        return res.send(rows);
    });
});
router.get('/p',(req,res)=>{//최신거만 반대는 ASC
        console.log(req.session.loginInfo);
        return res.json({massge:req.session.loginInfo});
   
});

// app.post('/api/customerss',(req,res)=>{
//     let sql="INSERT INTO CUSTOMER VALUES (null,?,?,?,?,?,now(),0)";
//     let image='/image/'+req.file.filename
//     let name=req.body.name;
//     let birthday=req.body.birthday;
//     let gender=req.body.gender;
//     let job=req.body.job;
//     let params=[image,name,birthday,gender,job];
//     connection.query(sql,params,(err,rows,fields)=>{
//         console.log(err);
//         console.log(rows);
//         res.send(rows);
//     })
// })

    

//수정
/*
    MODIFY MEMO: PUT /api/memo/:id
    BODY SAMPLE: { contents: "sample "}
    ERROR CODES
        1: INVALID ID,
        2: EMPTY CONTENTS
        3: NOT LOGGED IN
        4: NO RESOURCE
        5: PERMISSION FAILURE
*/           //postid
router.put('/:id',(req,res)=>{

    //postid가 있는지
    let sql = "SELECT* FROM WHERE postid=?"
    let param=[req.params.postid];
    connection.query(sql,param,(err,rows,fields)=>{
        if(err) throw err;
        if(rows[0]===undefined){
            return res.status(400).json({
                error:"해당 포스트가 없음",
                code:1
            });
        }
        else{
            //수정할 postid가 있다면? 수정할 내용이 valid?
            if(typeof req.body.contents !=='string'){
                return res.status(400).json({
                    error: "내용이 글이 아님!",
                    code:2
                });
            }
            if(req.session.loginInfo==='undefined'){
                return res.status(403).json({
                    error: "로그인 안됨",
                    code:3
                });
            }
            if(req.body.contents ===''){
                return res.status(400).json({
                    error:"내용 빔",
                    code:4
                });
            }
            //로그인 유저 check
            if(rows[0].userid!=req.session.loginInfo.userid){
                return res.statu(403).json({
                    error:"PERMISSION DENIED",
                    code:5
                });
            }
            let sql = 'UPDATE POSTS SET contents=?,image=?  WHERE postid = ?';
            let contents=req.body.contents;
            let image='/image/' +req.file.filename;
            let params=[contents,image,rows[0].postid];
            connection.query(sql,params,(err,rows,fields)=>{
                 if(err) throw err;
                 return res.json({
                     success:true,
                     rows
                 });
            });
        }

    })

});
//삭제
/*
    DELETE MEMO: DELETE /api/memo/:id
    ERROR CODES
        1: INVALID ID
        2: NOT LOGGED IN
        3: NO RESOURCE
        4: PERMISSION FAILURE
*/
router.delete('/:id',(req,res)=>{
    //CHECK 로그인 상태
    if(typeof req.session.loginInfo==='undefined'){
        return res.status(403).json({
            error:"로그인 안됨",
            code:1
        });
    }
  //postid가 있는지
    let sql="SELECT * FROM POSTS WHERE postid=?"
    let param = [req.param.postid];
    connection.query(sql,param,(err,rows,fields)=>{
        if(err) throw err;
      
        if(rows[0]===undefined){
            console.log("해당 포스트 없음")
            const err={
                error:"해당 포스트 없음",
                code:2
                };
            return res.status(400).json(err);
        }
        if(rows[0].userid!=req.session.loginInfo.userid){
            return res,status(403).json({
                error:"권한 거부",
                code:3
            });
        }
        //제거
        let sql = 'DELETE FROM POSTS  WHERE postid = ?';
        //한 아이디로 여러개 posts 만들엇는데 어캐 특정을 지움?
        connection.query(sql,params,(err,rows,fields)=>{
            if(err) throw err;
            res.json({success:true});
        })

    });
});

module.exports = router;