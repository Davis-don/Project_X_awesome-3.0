const express=require('express');
var router=express.Router()
const pool=require('./Databaseconfig')



 pool.getConnection((err, connection) => {
   if (err) throw err;
  
   // Execute queries or perform other operations here
   router.post('/',(req,res)=>{
    const {firstName,lastName,ClientId,workState,comment}=req.body
     {
      //insert data into the table
      let sql="INSERT INTO testimonials_tbl (Client_id,firstName,lastName,work_state,Testimony_message)" + 
      "VALUES(" + "'" + ClientId + "'" + "," + "'" + firstName + "'" + "," + "'" + lastName + "'" + "," + "'" + workState + "'" + "," + "'" + comment + "'" + ")"
      pool.execute(sql,(error,result)=>{
        if(error){
          if(error.code==='ER_DUP_ENTRY'){
            res.status(400).json({message:'data  exists'})
          }
            console.log(error)
        }
        else{
          res.status(200).json({message:'inserted'})
        }
     })
     }
   })
   router.get('/',(req,res)=>{
    {
      //get all testimonial content in table
      let sql="SELECT * FROM testimonials_tbl";
      pool.execute(sql,(error,result)=>{
        if(error){
          console.log(error)
        }
        else{
          res.status(200).json(result)
        }
      })
    }
   })
  
    //Release the connection back to the pool
    connection.release();
  });
  module.exports=router