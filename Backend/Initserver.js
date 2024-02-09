const express=require("express")
const router=express.Router();
const pool=require('./Databaseconfig');

pool.getConnection((err, connection) => {
    if (err) throw err;
    //execute querries here

    router.post('/',(req,res)=>{
        {
            //create database winky-webbers-db
        let sql="CREATE DATABASE  IF NOT EXISTS Winky_webbers_db";
        pool.execute(sql,(error,result)=>{
            if(error){
                console.log(error)
            }
            else{
                //edit database now
                { //CREATE clients table in Clients_information db
                    let sql="CREATE TABLE IF NOT EXISTS Clients_information(Client_ID INT NOT NULL  AUTO_INCREMENT,firstName VARCHAR(255) NOT NULL,lastName VARCHAR(255) NOT NULL,Contact VARCHAR(255) NOT NULL UNIQUE,"+
                     "Email VARCHAR(255) NOT NULL UNIQUE,Country VARCHAR(255) NOT NULL,password VARCHAR(255) NOT NULL, PRIMARY KEY (Client_ID))";
                     pool.execute(sql,(error,result)=>{
                        if(error){
                            console.log(error)
                        }
                        else{
                            console.log('Clients table created')
                        }
                     })
                 }
                 {
                    //create Service  table
                    //default data
          const servicedata={
            first:{
              servicePlan:"1 pager landing page",
              servicePrice:"5,000"
            },
            second:{
              servicePlan:"I pager branding",
              servicePrice:'15,000'
            },
            third:{
              servicePlan:"Up to 5 pages",
              servicePrice:'25,000'
            },
            fourth:{
              servicePlan:"Up to 10 pages",
              servicePrice:'35,000'
            },
            fifth:{
              servicePlan:"Up to 25 pages",
              servicePrice:'55,000'
            },
            sixth:{
              servicePlan:"Up to 50 pages",
              servicePrice:'85,000'
            }
          }
                    let sql="CREATE TABLE IF NOT EXISTS Service_tbl(Service_ID INT NOT NULL AUTO_INCREMENT,Service_plan VARCHAR(50) NOT NULL," +
                    "Sercice_price INT NOT NULL,PRIMARY KEY (Service_ID))"
                    pool.execute(sql,(error,result)=>{
                        if(error){
                            console.log(error)
                        }
                        else{
                            console.log('Service table created')
                        }
                     })
                 }
                 {
                    //create task table
                    let sql="CREATE TABLE IF NOT EXISTS Tasks_tbl(Task_ID INT NOT NULL AUTO_INCREMENT,Service_ID INT NOT NULL," +
                    "Client_ID INT NOT NULL,Main_goal VARCHAR(255) NOT NULL,Description VARCHAR(255) NOT NULL,Total_price_Amount DECIMAL NOT NULL," + 
                    " paid_Amount DECIMAL DEFAULT 0.00,Status VARCHAR(10) NOT NULL,Phase VARCHAR(10) NOT NULL,PRIMARY KEY (Task_ID))"
                    pool.execute(sql,(error,result)=>{
                        if(error){
                            console.log(error)
                        }
                        else{
                            console.log('Tasks table created')
                        }
                     })
                 }
        
                
            }
            {
                //create Req_view in winky_webbers db
                let sql="CREATE VIEW  client_display_view AS " + 
                "SELECT tasks_tbl.Task_ID,tasks_tbl.Service_ID,tasks_tbl.Client_ID,clients_information.firstName,clients_information.lastName,service_tbl.Service_plan,tasks_tbl.Main_goal,tasks_tbl.Description,tasks_tbl.Total_price_Amount,tasks_tbl.paid_Amount,tasks_tbl.Status,tasks_tbl.Phase,clients_information.password " +
                "FROM tasks_tbl "+
                "INNER JOIN clients_information ON tasks_tbl.Client_id=clients_information.Client_ID "  +
                "INNER JOIN service_tbl ON tasks_tbl.Service_id=service_tbl.Service_ID "
                pool.execute(sql,(error,result)=>{
                    if(error){
                        if(error.errno===1050){
                            console.log('caught you')
                        }
                    }
                        
                    else{
                        console.log('view created')
                    }
                })
             }
             {
                //CREATE TESTIMONIALS TABLE
                let sql="CREATE TABLE IF NOT EXISTS Testimonials_tbl(Client_id INT NOT NULL,firstName VARCHAR(10) NOT NULL,lastName VARCHAR(10) NOT NULL,work_state VARCHAR(255) NOT NULL,Testimony_message VARCHAR(255),PRIMARY KEY (Client_id))"
                pool.execute(sql,(error,result)=>{
                if(error){
                    console.log(error)
                }
                else{
                    console.log('TESTIMONIALS TABLE CREATED')
                }
                })
             }
             { //CREATE Employees table in employees_information 
        
                let sql="CREATE TABLE IF NOT EXISTS Employees_information(Employee_ID INT NOT NULL,firstName VARCHAR(255) NOT NULL,lastName VARCHAR(255) NOT NULL,Contact VARCHAR(255) NOT NULL,"+
                "Email VARCHAR(255) NOT NULL,Department VARCHAR(30) NOT NULL,Branch VARCHAR(30) NOT NULL,Role VARCHAR(255) NOT NULL,Salary VARCHAR(255) NOT NULL,password VARCHAR(255) NOT NULL, PRIMARY KEY (Employee_ID))";
      
      
      
                pool.execute(sql,(error,result)=>{
                   if(error){
                       console.log(error)
                   }
                   else{
                       console.log('Employees table created')
                   }
                })
            }
           });
        
          }
    })

    router.get('/',(req,res)=>{
        res.end('heloooo init')
    })




     //Release the connection back to the pool
     connection.release();
})



module.exports=router;