const express=require('express');
const routes=express.Router();

const pool=require('./Databaseconfig')
  
  pool.getConnection((err, connection) => {
    if (err) throw err;
   
    // Execute queries or perform other operations here
    routes.post('/',(req,res)=>{
        console.log(req.body)
      const {employeeId,firstName,lastName,contact,email,Department,Branch,role,salary,password,confirmpassword}=req.body
      if(password===confirmpassword){
        {
            //insert into employees table
            let sql="INSERT INTO employees_information (Employee_ID,firstName,lastName,Contact,Email,Department,Branch,Role,Salary,password)" + 
            "VALUES(" + "'" + employeeId + "'" + "," + "'" + firstName + "'" + "," + "'" + lastName + "'" + "," + "'" + contact + "'" + "," + "'"
             + email + "'" + "," + "'" + Department + "'" + "," + "'" + Branch + "'" + "," + "'" + role + "'" + "," + "'" + salary + "'" + "," + 
             "'" + password + "'" + ")" 
             pool.execute(sql,(error,result)=>{
                if(error){
                    if(error.errno===1062){
                        res.status(400).json({message:'record exists'})
                    }
                    else{
                        console.log(error)
                    }
                }
                else{
                  res.status(200).json({message:'hired successfully'})
                    console.log('data put in employees tbl')
                }
             })  
         }
      }
      else{
        console.log('password dont match')
      }
     
    })
   
     //Release the connection back to the pool
     connection.release();
   });


















routes.get('/',(req,res)=>{
    res.end('hire active')
})
module.exports=routes;