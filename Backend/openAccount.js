const express=require('express')
const routes=express.Router()
const pool=require('./Databaseconfig')

pool.getConnection((error,connection)=>{
    if(error) throw error
//write your querries here
routes.post('/',(req,res)=>{
    const{Fname,Lname,contact,email,country,password,confirmPassword,taskRequest,idName}=req.body;
       //Checks if inputed pasword matches and inserts data into the table if a match is found
    if(password===confirmPassword){
     let sql="INSERT INTO clients_information (firstName,lastName,Contact,Email,Country,password)" + 
     "VALUES(" + "'" + Fname + "'" + "," + "'" + Lname + "'" + "," + "'" + contact + "'" + "," + "'" + email + "'" + "," + "'" + country + "'" + "," + "'" + password + "'" + ")";
     pool.execute(sql,(error,connection)=>{
        if(error){
        if(error.errno===1062){
            res.status(401).json({message:'dataExists'})
            
        }
        }
        else{
        res.status(200).json({message:'InsertionSuccess'})
        }
     })
    }
    else{
        res.status(401).json({message:'passwordmatch'})
    }
   
})

routes.get('/',(req,res)=>{
res.end('heloo')
})

    //Release the connection back to the pool
    connection.release();
})

module.exports=routes