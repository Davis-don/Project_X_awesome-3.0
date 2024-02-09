const express=require('express')
const routes=express.Router();
const pool=require('./Databaseconfig')
pool.getConnection((error,connection)=>{
    if (error) throw error 
    //write your commands here

    routes.post('/',(req,res)=>{
        let {ServiceId,ClientId, MainGoal,Description,status,phase}=req.body;
         ServiceId=parseInt(ServiceId)
         {
             //get service price
             let sql="SELECT Sercice_price FROM service_tbl WHERE Service_ID =" + "'" + ServiceId + "'";
             pool.execute(sql,(error,result)=>{
                  if(error){
                     console.log(err)
                  }
                   else{
                    {
                        let totalPrice=result[0].Sercice_price
                        //check whether we have an existing data of the record
                        let sql="SELECT * FROM tasks_tbl WHERE Client_ID=" + "'" + ClientId + "'";
                        pool.execute(sql,(error,result)=>{
                            if(error){
                                console.log(error)
                            }
                            else{
                                if(result[0]===undefined){
                                    let sql="INSERT INTO tasks_tbl(Service_ID,Client_ID,Main_goal,Description,Total_price_Amount,Status,Phase)" +
                                      "VALUES(" + "'" + ServiceId + "'" + "," + "'" + ClientId + "'" + "," + "'" + MainGoal + "'" + "," + "'" + Description + "'" + "," + "'" + totalPrice  + "'" + ","  + "'" + status + "'" + "," + "'" + phase + "'" + ")"
                                     pool.execute(sql,(error,result)=>{
                                         if (error){
                                              console.log(error)
                                      }
                                          else{
                                             res.status(200).json({message:'Task added'})
                                             
                                          }
                                     })
                                   
                                }
                                else if(result[0].Status==='pending...')
                                {
                                    let sql="DELETE FROM tasks_tbl WHERE Client_ID = " + "'" + ClientId + "'";
                                    pool.execute(sql,(error,result)=>{
                                        if(error){
                                            console.log(error)
                                        }
                                        else{
                                            //insert data
                                            let sql="INSERT INTO tasks_tbl(Service_ID,Client_ID,Main_goal,Description,Total_price_Amount,Status,Phase)" +
                                      "VALUES(" + "'" + ServiceId + "'" + "," + "'" + ClientId + "'" + "," + "'" + MainGoal + "'" + "," + "'" + Description + "'" + "," + "'" + totalPrice  + "'" + ","  + "'" + status + "'" + "," + "'" + phase + "'" + ")"
                                     pool.execute(sql,(error,result)=>{
                                         if (error){
                                              console.log(error)
                                      }
                                          else{
                                             res.status(200).json({message:'Task added'})
                                             
                                          }
                                     })
                                            
                                        }
                                    })
                                }
                                else if(result[0].Status==='Active'){
                                  res.status(200).json({message:"wait"})
                                }
                    //             {
                    //           let sql="INSERT INTO tasks_tbl(Service_ID,Client_ID,Main_goal,Description,Total_price_Amount,Status,Phase)" +
                    //   "VALUES(" + "'" + ServiceId + "'" + "," + "'" + ClientId + "'" + "," + "'" + MainGoal + "'" + "," + "'" + Description + "'" + "," + "'" + totalPrice  + "'" + ","  + "'" + status + "'" + "," + "'" + phase + "'" + ")"
                    //  pool.execute(sql,(error,result)=>{
                    //      if (error){
                    //           console.log(error)
                    //   }
                    //       else{
                    //          res.status(200).json({message:'Task added'})
                             
                    //       }
                    //  })
                    //             }
                            }
                        })
                    }
                   }
                 })
         }
    })

})







module.exports=routes