const express=require('express')
const routes=express.Router();
const pool=require('./Databaseconfig')
const jwt=require('jsonwebtoken')
require('dotenv').config()
//let userData;
pool.getConnection((error,connection)=>{
    if (error) throw error

    //execute queries here

    routes.post('/',(req,res)=>{
        const {userName,password}=req.body
        {
           let sql="SELECT * FROM clients_information WHERE (firstName =" + "'" + userName + "' OR lastName = " + "'" + userName + "') AND password = " + "'" + password + "'";
           pool.execute(sql,(error,result)=>{
            if (error) throw error
            if(result[0]===undefined){
           {
            //console.log('here it is')
            //console.log(userName)
            {
                //check employees table
                let sql="SELECT * FROM employees_information WHERE Employee_ID = " + "'" + userName + "' AND password = " + "'" + password + "'"
                pool.execute(sql,(error,result)=>{
                    if(error) throw error
                    if(result[0]===undefined){
                        res.status(400).json({message:'login error'})   
                    }
                    else{
                        if(result[0].password===password){
                            const id=result[0].Employee_ID
                            const dataPassed={status:'employee',id}
                            const token=jwt.sign(dataPassed,process.env.ACCESS_TOKEN_SECRET)
                            let returnedata={
                                userStatus:'employee',
                                token
                            }
                            res.status(200).json(returnedata)
                        }
                    }
                })
            }
            //check employees table
            let sql="SELECT * FROM employees_information WHERE Employee_ID =" + "'" + userName + "'AND password = " + "'" + password + "'";
   
            pool.execute(sql,(error,result)=>{
                if(error) throw error
                if(result[0]===undefined){
                    res.status(400).json({message:'login error'})
                }
                else{
        
                }
            })
           }
            }
            else{
            if(result[0].password===password){
                const id=result[0].Client_ID
                const dataPassed={status:'untasked',id}
                const token=jwt.sign(dataPassed,process.env.ACCESS_TOKEN_SECRET)
                let returnedata={
                    userStatus:'client',
                    token
                }
                res.status(200).json(returnedata)
            }
        }
           })
        }
    })
    const Authenticateuser=(req,res,next)=>{
        const authToken=req.headers['authorization']
        const token=authToken && authToken.split(' ')[1]
        if(token == null) res.sendStatus(400)
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
              console.error('JWT Verification Error:', err.message);
              // Handle error as needed
            } else {
              // Token is valid, proceed with decoding
              console.log('Decoded JWT:', decoded);
              req.user=decoded.id
              next();
        }
          });
        
     }
routes.get('/',Authenticateuser,(req,res)=>{
{
    let sql="SELECT * FROM client_display_view WHERE Client_ID =" + "'" + req.user + "'"
    pool.execute(sql,(error,result)=>{
        if(error) throw error

        if(result[0]===undefined){
        {
            //check whether is in client table
            let sql="SELECT * FROM clients_information WHERE Client_ID = " + "'" + req.user + "'";
            pool.execute(sql,(error,result)=>{
             if (error) throw error
             if(result[0]===undefined){
                ConversationListInstance.log('check here')
                {
                    //check employees table
                   // console.log('check here')
                    let sql="SELECT * FROM employees_information WHERE Employee_ID = " + "'" + req.user + "'";
                    pool.execute(sql,(error,result)=>{
                        if(error){
                            console.log(error)
                        }
                        else{
                            console.log(result)
                        }
                    })
                }
             }
             else{
               let info={
                task:'untasked',
                result:result[0]
               } 
                res.status(200).json(info)
             }
            })
        }
        }
        else{
            let info={
                task:'tasked',
                result:result[0]
               } 
                res.status(200).json(info)
        }
    })
}
})










    //Release the connection back to the pool
connection.release();
})
module.exports=routes