import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { json } from 'react-router-dom'

export default function Start() {
    let handlepost=async ()=>{
       try{
   const response=await fetch ('http://localhost:4000/init/server',{
    method:'post',
    headers:{
        'content-type':'application/json'
    },
    body:JSON.stringify()
   })
   if(response){
    const data=await response.json();
    console.log('executed')
   }
   else{
    const errordata=await response.json();
    console.log(errordata)
   }
       } 
      catch(error){
        console.log(error)
      }
       
    }
  return (
    <div>
        <button onClick={handlepost} className='btn btn-success btn-lg'>Start</button>
    </div>
  )
}
