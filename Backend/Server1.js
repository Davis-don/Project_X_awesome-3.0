const express=require('express')
const app =express();
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
const cors = require('cors'); 
app.use(cors());

const Serverinit=require('./Initserver')
app.use('/init/server',Serverinit)
const newaccount=require('./openAccount')
app.use('/create/new/account',newaccount)
const Testimony=require('./Testimonials');
  app.use('/Testimonials',Testimony)
  const task=require('./Taskregistration');
  app.use('/task/registration',task)
  const login=require('./login')
   app.use('/Account/login',login)
   const login2=require('./login2')
   app.use('/Account/login2',login2)
   const payment=require('./Payhandle')
   app.use('/handle/pay',payment)
   const hire=require('./Hire');
   app.use('/hire',hire)
   const getclient=require('./Fetchclientinfo')
   app.use('/get/client/data',getclient)
   const updateclient=require('./Updateclients')
   app.use('/update/client/data',updateclient)
   const Test=require('./Test')
   app.use('/Test',Test)

app.listen(4000,(error)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log('listening on port 4000')
    }
})