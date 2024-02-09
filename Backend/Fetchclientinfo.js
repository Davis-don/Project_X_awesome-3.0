const express=require('express')
const routes=express.Router();
const pool=require('./Databaseconfig')
pool.getConnection((error,connection)=>{
    if (error) throw error
    //execute querries here

     routes.post('/',(req,res)=>{
        const {clientId}=req.body
       {
        let sql="SELECT * FROM  tasks_tbl WHERE Client_ID =" + "'" + clientId + "'"
        pool.execute(sql,(error,result)=>{
        if(error){
            console.log(error)
        }
        else{
            if(result[0]===undefined){
              res.status(200).json({response:'untasked'}) 
            }
            else{
                
               // console.log(result[0])
        res.status(200).json(result[0])
            }
        }
        })
       }
    

     })





      //Release the connection back to the pool
      connection.release();
})















module.exports=routes