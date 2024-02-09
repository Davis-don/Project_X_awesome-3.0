const express=require('express')
const routes=express.Router()
require('dotenv').config()
const jwt=require('jsonwebtoken')
const pool=require('./Databaseconfig');
let information;



pool.getConnection((error,connection)=>{
    if(error) throw error
   
    //execute your querries here
   routes.post('/',(req,res)=>{
    const {userName,password}=req.body;
    console.log(req.body)
    {
        //check whether user is a client and send a response 
        let sql="SELECT * FROM clients_information WHERE (firstName = " + "'" + userName + "' OR lastName =" + "'" + userName + "') AND (password =" + "'" + password + "')";
        pool.execute(sql,(error,result)=>{
            if(error){
                console.log(error)
            }
            else{ 
                if(result[0]!==undefined){
                    let clientid=result[0].Client_ID
                let clientdata=result[0]
                if((result[0].password===password) && (result[0].firstName==userName || result[0].lastName==userName)){
                    {
                        //Findout whether user has a task or not
                        let sql="SELECT * FROM tasks_tbl WHERE Client_ID=" + "'" + clientid + "'";
                        pool.execute(sql,(error,result)=>{
                            if(error){
                                console.log(error)
                            }
                            else{
                                if(result[0]===undefined){
                                    //this is for untasked client
                                    
                                    //clientuntasked
                                    // information= {
                                    //     clientstatus:'untasked',
                                    //     clientdata
                                    // }
                                    {
                                    
                                        //     //get all the data and return it
                                             let sql="SELECT * FROM clients_information WHERE Client_ID = " + "'" + clientid + "'"
                                             pool.execute(sql,(error,result)=>{
                                                 if(error){
                                                     console.log(error)
                                                 }
                                                 else{
                                                    //console.log(result[0])  
                                                       information= {
                                                        clientdata:result[0] 
                                               }
                                                     //console.log(information)
                                                 }
                                             }) 
                                           }



                                   const user={userId:clientdata.Client_ID}
                                   const token=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
                                   const returndata={
                                    clientstatus:'untasked',
                                    token:token
                                }
                                   res.status(200).json(returndata)
                                   
                                }
                                else{
                                //this is for tasked client
                                const workid=result[0].Task_ID;
                                res.status(200).json({message:'client'})
                                console.log('is tasked')

                                 let sql="SELECT * FROM client_display_view WHERE Task_ID =" + "'" + workid + "'" ;
                                 pool.execute(sql,(error,result)=>{
                                    if(error){
                                        console.log(error)
                                    }
                                    else{
                                        const clientdata=result[0]
                                        information= {
                                            clientstatus:'tasked',
                                            clientdata
                                        }
                                    }
                                 })
                                }
                           }
                        })
                    }
                
                }
                else{
                    res.status(400).json({message:'login error'})
                }
            }
            else{
//check whether user is an employee and send a response 
let sql="SELECT * FROM employees_information WHERE Employee_ID =" + "'" + userName +  "'" +" AND password = " + "'" + password + "'"
pool.execute(sql,(error,result)=>{
    if(error){
        console.log(error)
    }
    else{
        if(result[0]===undefined){
   res.status(400).json({message:'login error'})
        }
        else{
            res.status(200).json({message:'ceo login'})
        }
       
    }
})
//console.log('end of code')


            }
              
             }
        })
    }
   })

   const Authenticateuser=(req,res,next)=>{
    const authToken=req.headers['authorization']
    const token=authToken && authToken.split(' ')[1]
    if(token == null) res.sendStatus(400)
    //console.log(authToken)
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          console.error('JWT Verification Error:', err.message);
          // Handle error as needed
        } else {
          // Token is valid, proceed with decoding
          console.log('Decoded JWT:', decoded);
          next();
    }
      });
    
 }
   
routes.get('/',Authenticateuser,(req,res)=>{
       console.log(information)
    //res.status(200).json()
    
})



    //Release the connection back to the pool
    connection.release();

})








module.exports=routes;