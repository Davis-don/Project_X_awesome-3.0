const express=require('express')
const routes=express.Router();
const jwt=require('jsonwebtoken')
require('dotenv').config();


routes.post('/',(req,res)=>{
const {username}=req.body
const user={
    username:username
}
const tokenAccess=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
res.status(200).json(tokenAccess)
})
const Authenticateuser=(req,res,next)=>{
   const authToken=req.headers['authorization']
   const token=authToken && authToken.split(' ')[1]
   if(token == null) res.sendStatus(400)
   jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(error,user)=>{
if(error){
    console.log(error)
}
else{
   //(user)
    next();
}

})
   
}



routes.get('/Accepted',Authenticateuser,(req,res)=>{
    res.json({message:'good'})

})


module.exports=routes