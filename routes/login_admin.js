const express =require('express');
const bodyparser=require('body-parser');
const cors = require('cors');
const mysql=require('mysql2');
const router = express.Router();
const app=express();
module.exports = router;

app.use(cors());
app.use(bodyparser.json());

const database=require('./database');


router.get('/admin',(req,res)=>{

    

    console.log(req.body,'createdata');

    //instatiating user variables


    let Admin_id =req.body.Admin_id;
    let Password=req.body.Password;
   

//sending the variables to the database



let qr=`select * from user where Admin_id ='${Admin_id}' and Password='${Password}' limit 1 `;

database.query(qr,(err,result)=>{

    if(err){console.log(err);}
  // console.log(result,'result')

 if(result.length>0)  
   {
    res.send({
        message:'user found',
        data:result
        
    });
   }
   else 
   {
        res.send({
         message:'no user'
    })
  }

});

/*const render = res.render;
    const send = res.send;
    res.render = function renderWrapper(...args) {
        Error.captureStackTrace(this);
        return render.apply(this, args);

    };

    res.send = function sendWrapper(...args) {
        try {
            send.apply(this, args);
        } catch (err) {
            console.error(`Error in res.send | ${err.code} | ${err.message} | ${res.stack}`);
        }
    };
    

});
*/