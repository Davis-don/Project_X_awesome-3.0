import React, { useState } from 'react'
import "./Openaccount.css"
import loginbg from '../../../Images/milad-fakurian-JTKKRK05NAM-unsplash.jpg'

import {useNavigate} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
export default function Openaccount() {

  function Alertsuccess(){
    return(
  <div className='overall-alert'>
  <div className="alert alert-success alert-dismissible fade show">
      <strong>Success!</strong> Information received successfully
    </div>
  </div>
    )
  }
  function Alertfailed(){
    return(
  <div className='overall-alert'>
  <div className="alert alert-danger alert-dismissible fade show">
      <strong></strong> Information not received text us to report 
    </div>
  </div>
    )
  }
  function Alertpassworderror(){
    return(
  <div className='overall-alert'>
  <div className="alert alert-danger alert-dismissible fade show">
      <strong></strong> password don't match 
    </div>
  </div>
    )
  }
  function Alertduplicateerror(){
    return(
  <div className='overall-alert'>
  <div className="alert alert-danger alert-dismissible fade show">
      <strong>warning</strong> Record exists 
    </div>
  </div>
    )
  }













  const[view1,setView1]=useState(true)
  const [view2,setView2]=useState(false)
  const [view3,setView3]=useState(false)
  let [success,setSuccess]=useState(false)
   let [form,setForm]=useState(true);
  let[passwordMatch,setPasswordmatch]=useState(false)
  let [duplicate,setDuplicate]=useState(false)
  const navigate=useNavigate();
  const [clientData,setClientData]=useState({
    Fname:'',
    Lname:'',
    contact:'',
    email:'',
    country:'',
    password:'',
    password:'',
    confirmPassword:'',
  });
  let updatedata=(e)=>{
     setClientData({
      ...clientData,[e.target.name]:e.target.value
     })
  }
  const handlepost= async (e)=>{
    e.preventDefault();
    try{
      const response=await fetch("http://localhost:4000/create/new/account",{
       method:'post',
       headers:{
         'content-type':'application/json'
       },
       body:JSON.stringify(clientData)
      })
       
      if(response){
        //console.log(JSON.stringify(userdata))
       const data=await response.json();
       if(data.message==='passwordmatch'){
        e.preventDefault();
        setPasswordmatch(true)
        setSuccess(false);
        setForm(true); 
       }
       else if(data.message==='InsertionSuccess'){
         setSuccess(true)
       setForm(false)
         setTimeout(() => {
       setSuccess(false)
           setForm(true);
           navigate("/login")
         }, 2000);
        setPasswordmatch(false)
        }
        else if(data.message==='dataExists'){
          e.preventDefault();
          setPasswordmatch(false)
          setSuccess(false);
          setForm(false); 
          setDuplicate(true)
          setTimeout(() => {
            setForm(true);
            setDuplicate(false) 
            setView1(true);
        setView2(false)
        setView3(false)
          }, 2000);
          
        }
     }
    
    }
     catch (error) {
        console.log(error)
     }
       
    }

  return (
    <div className='overall-open-account'>
      <img src={loginbg} alt='dark background image'/>
      <div className='overall-form'>
        {passwordMatch && <Alertpassworderror/>}
        {success && <Alertsuccess/>}
        {duplicate && <Alertduplicateerror/>}
     {form && <form onSubmit={handlepost}>{ view1 &&
      <div className='form-view-1'>
     <label className='text-light' style={{width:'100%'}}>First Name<br/>
     <input required name='Fname' onChange={updatedata} className='form-control' placeholder='First Name'/>
     </label>
     <label className='text-light' style={{width:'100%'}}>Last Name<br/>
     <input required name='Lname' onChange={updatedata} className='form-control' placeholder='Last Name'/>
     </label>
     <div className='view-1-btn'>
      <button onClick={()=>{setView1(false);setView2(true)}} type='button' className='btn btn-outline-success'>Next</button>
     </div>
     </div>}
     {view2 && <div className='form-view-2'>
     <label className='text-light' style={{width:'100%'}}>Contact<br/>
     <input required name='contact' onChange={updatedata} className='form-control' placeholder='Contact'/>
     </label>
     <label className='text-light' style={{width:'100%'}}>Email<br/>
     <input required name='email' onChange={updatedata} className='form-control' placeholder='Email'/>
     </label>
     <label className='text-light' style={{width:'100%'}}>Country/city<br/>
     <input required name='country' onChange={updatedata} className='form-control' placeholder='Country'/>
     </label>
     <div className='view-2-btn'>
      <button onClick={()=>{setView2(false);setView3(true)}} type='button' className='btn btn-outline-success'>Next</button>
     </div>
     </div>}
     { view3 && <div className='form-view-3'>
     <label className='text-light' style={{width:'100%'}}>Password<br/>
     <input type='password' required name='password' onChange={updatedata} className='form-control' placeholder='password'/>
     </label>
     <label className='text-light' style={{width:'100%'}}>Repeat password<br/>
     <input type='password' required name='confirmPassword' onChange={updatedata} className='form-control' placeholder='Repeat password'/>
     </label>
     <div className='view-3-btn'>
      <button  type='submit' className='btn btn-outline-success'>Submit</button>
     </div>
     </div>}
     </form>}
     </div>
    </div>
  )
}

