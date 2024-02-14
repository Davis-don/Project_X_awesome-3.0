const express=require('express')
const pool=require('./Databaseconfig')
const routes=express.Router();
const twilio = require('twilio');
pool.getConnection((error,connection)=>{
    if(error) throw error

 //do your executions here
   // Twilio credentials
const accountSid = 'AC1309674dcdb4f7fc91628c1e88b9bb7c';
const authToken = '0fd9cef8b46b3bcd0eb964bbc8e41183';
const twilioPhoneNumber = '+17184739974';

const client = new twilio(accountSid, authToken);
// Endpoint to send an SMS
    routes.post('/',(req,res)=>{
        const {ClientID,namePhoneno,Amount}=req.body
        console.log(req.body)
        to ="+254 758 420860"
       const message='Please confirm the payment of clientID:' + ClientID + ",Namecontact:" + namePhoneno + " " +  "of KES" + Amount
       //const message='heloooooo'
        client.messages
        .create({
          body: message,
          from: twilioPhoneNumber,
          to: `+${to}`, 
        })
        .then((message) => {
            res.status(200).json({message:'received wait'})
          console.log('message sent');
        })
        .catch((error) => {
          res.status(400).json({message:'failed'})
          console.error('not sent');
        });

    })














    //twilio credentials
//     const accountSid = 'AC1309674dcdb4f7fc91628c1e88b9bb7c';
// const authToken = 'd531741efdd49c42471863b64ce7af98';
// const twilioPhoneNumber = '+17184739974';
// const client = new twilio(accountSid, authToken);
// routes.get('/',(req,res)=>{
//     console.log(client)
//     const to='+254 758 420860'
//     const message='heloo wafula'

//     client.messages
//     .create({
//         body:message,
//         from: twilioPhoneNumber,
//         to: `+${to}`
//     })
//     .then((message)=>{
//         console.log('message sent successfully')
//     })
//     .catch(error=>console.log(error))
//      res.end();
// })

   
    // routes.get('/',(req,res)=>{
    //     res.end('payed')
    // })
})

module.exports=routes