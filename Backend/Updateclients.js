const express=require('express')
const routes=express.Router();
const pool=require('./Databaseconfig');

pool.getConnection((error,connection)=>{
if(error) throw error
//excecute querries here

routes.post('/',(req,res)=>{
    const {clientId,Amount,phase,status}=req.body
    {
        //check whether data exists
        let sql="SELECT * FROM tasks_tbl WHERE Client_ID =" + "'" + clientId + "'"
        pool.execute(sql,(error,result)=>{
            if (error){
                console.log(error)
            }
            else{
                if(result[0]===undefined){
                    res.status(200).json({message:'undefined'})
                }
                else{
                    {
                        //update the specific task
                    let sql="UPDATE tasks_tbl " + " " + 
                    "SET paid_Amount = " + "'" + Amount + "'," + "Status = " + "'" + status + "'," + "Phase = " + "'"  + phase + "'" + 
                    "WHERE Client_ID =" + "'" + clientId + "'"
                    pool.execute(sql,(error,result)=>{
                        if(error){
                            console.log(error)
                        }
                        else{
                            res.status(200).json({message:'success'})
                        }
                    }) 
                    }
                }
            }
        })
    }
})
routes.get('/',(req,res)=>{

})







//Release the connection back to the pool
connection.release();
})

module.exports=routes;