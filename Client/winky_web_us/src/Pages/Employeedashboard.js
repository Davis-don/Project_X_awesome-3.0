import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import axios from 'axios';
import { FaBars,FaServicestack } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { TiMessages } from "react-icons/ti";
import { MdOutlineDashboard } from "react-icons/md"
import 'bootstrap/dist/css/bootstrap.min.css'
import './clientdash.css'
import './Employeesdashboard.css'



export default function Employeesdash() {
    const navigate = useNavigate();
    const [sidebar,setSidebar]=useState(false)
    const [task,setTask]=useState(false)
    const [dash,setDash]=useState(true)
    const [service,setService]=useState(false)
    const [message,setMessage]=useState(false)
    const [userCred,setUsercred]=useState({})
    const [loading,setLoading]=useState(false)
    let component;
    if(dash===true){
    component=<Dashlink/>
    }
    else if(service===true){
    component=<Servicelink/>
    }
    else if(message===true){
        component=<Messageslink/>
    }
 
    function Dashlink(){
      
        return(
            <div className='overall-dashlink-employees'>
<h4 className='text-light'>Dashboard</h4>
<div className='dashlink-overall-cards-employees'>
<div className='card dash-card-statistics'>
<div className='card bg-warning'>
  <h5 className='text-light'style={{textAlign:'center'}}>All clients</h5>
  <div className='fs-1' style={{width:'max-content',margin:'auto'}}><p className='text-light'><sup><small>Total</small></sup>200</p></div>
</div>
<div className='card bg-info'>
<h5 className='text-light'style={{textAlign:'center'}}>Tasked & Untasked</h5>
<div className='fs-1' style={{width:'max-content',margin:'auto'}}><p className='text-light'><sup><small>Tasked</small></sup>200</p></div>
<div className='fs-1' style={{width:'max-content',margin:'auto'}}><p className='text-light'><sup><small>Untasked</small></sup>200</p></div>
</div>
<div className='card bg-success'>
<h5 className='text-light'style={{textAlign:'center'}}>Tasking Analysis</h5>
<div className='fs-1' style={{width:'max-content',margin:'auto'}}><p className='text-light'><sup><small>pending</small></sup>200</p></div>
<div className='fs-1' style={{width:'max-content',margin:'auto'}}><p className='text-light'><sup><small>Active</small></sup>200</p></div>
<div className='fs-1' style={{width:'max-content',margin:'auto'}}><p className='text-light'><sup><small>Completed</small></sup>200</p></div>
</div>
</div>
</div>
        
            </div>
        )
    }
function Servicelink(){
  const [tasked,setTasked]=useState(false)
  const [notExist,setNotExist]=useState(false)
  const [success,setSuccess]=useState(false)
  const [loading,Setloading]=useState(true)
  const [clientitems,setClientItems]=useState({
    clientId:'',
    Amount:'',
    phase:'',
    status:''
  })
  const setdata=(e)=>{
    
    setClientItems({
        ...clientitems,[e.target.name]:e.target.value
    })
    console.log(clientitems)
}
const handleUpdate=async (e)=>{
  e.preventDefault();
  try{
  let response=await fetch ('http://localhost:4000/update/client/data',{
    method:'post',
    headers:{
      'content-type':'application/json'
    },
    body:JSON.stringify(clientitems)
  })
  if(response){
    const data=await response.json();
   if(data.message==="undefined"){
    setNotExist(true)
    setSuccess(false)
   }
   else{
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
    }, 2000);
    setNotExist(false)
   }
  }
}
catch (error){
  console.log(error)
}
}


  const [clientDatainfo,setClientdatainfo]=useState({})
   const [clientid,setClientid]=useState({
    clientId:''
   })
   const updatedata=(e)=>{
    
    setClientid({
        ...clientid,[e.target.name]:e.target.value
    })
}
const handleSearch=async (e)=>{
  e.preventDefault();
  try{
  let response=await fetch ('http://localhost:4000/get/client/data',{
    method:'post',
    headers:{
      'content-type':'application/json'
    },
    body:JSON.stringify(clientid)
  })
  if(response){
    const data=await response.json();
    if(data.response==='untasked'){
      setTasked(true)
      Setloading(false)
    }
    else{
      setTasked(false)
      setClientdatainfo(data)
      Setloading(false)
    }
  }
}
catch (error){
  console.log(error)
}
}
   return(
    <div className='overall-Service-link-employees'>
      <h4 className='text-light'>Services</h4>
      <div className='overall-services-employees-cards-holders service-card'>
      <div className='payment-validate service-card-employee card'>
     <p className='text-light container-fluid'>Validate payment</p>
     <form onSubmit={handleUpdate}>
     { notExist && <div className='overall-alert'>
  <div class="alert alert-warning alert-dismissible fade show">
      <strong>Warning</strong> No such Task
    </div>
  </div>
}
{ success && <div className='overall-alert'>
  <div class="alert alert-success alert-dismissible fade show">
      <strong>Success</strong> Task updated
    </div>
  </div>
}
     <label  className='text-light' style={{width:'100%'}}>Enter Client ID<br/>
                      <input onChange={setdata}  name='clientId' placeholder='Client id' className='form-control'/>
                    </label>
                    <label className='text-light' style={{width:'100%'}}>Enter Amount<br/>
                      <input onChange={setdata}  name='Amount' placeholder='Amount' className='form-control'/>
                    </label>
                    <label className='text-light' style={{width:'100%'}}> Select Phase<br/>
        <select onClick={setdata}  name='phase' className='form-control'>
            <option></option>
            <option value='Design'>Design</option>
            <option value='Development'>Development</option>
        </select>
           </label>
           <label className='text-light' style={{width:'100%'}}>Set status<br/>
        <select onClick={setdata}  name='status' className='form-control'>
            <option></option>
            <option value='pending...'>pending</option>
            <option value='Active'>Active</option>
            <option value='Active'>Complete</option>
        </select>
           </label>
                    <div style={{width:'max-content',margin:'auto'}}className='p-1'>
                    <button className='btn btn-outline-warning 'type='submit'>Update</button>
                    </div>
     </form>
  </div>
  <div className='pull-employee-info service-card-employee card'>
  <div>
     { tasked && <div className='overall-alert'>
  <div class="alert alert-warning alert-dismissible fade show">
      <strong>Warning</strong> You do not have any task registered
    </div>
  </div>
}
     </div>
  <form onSubmit={handleSearch}>
     <label className='text-light' style={{width:'100%'}}>Enter Client ID<br/>
                      <input onChange={updatedata}   name='clientId' placeholder='Client id' className='form-control'/>
                    </label>
                    <div style={{width:'max-content',margin:'auto'}}className='p-1'>
                    <button className='btn btn-outline-warning 'type='submit'>Pull</button>
                    </div>
     </form>
     <>
     { loading ? '':<div className='displayed-data bg-success card'>
        <ul className='list-unstyled'>
          <li className='text-light'>Client Id: {clientDatainfo.Client_ID}</li>
          <li className='text-light'>Total Price:{clientDatainfo.Total_price_Amount}</li>
          <li className='text-light'>Paid:{clientDatainfo.paid_Amount}</li>
          <li className='text-light'>Status:{clientDatainfo.Status}</li>
          <li className='text-light'>Phase:{clientDatainfo.Phase}</li>
        </ul>
     </div>
}
</>
  </div>
      </div>
    </div>
    )
  }


    function Messageslink(){
        return(
            <div className='overall-message-link'>
<h1 className='text-light'>Message link</h1>
            </div>
        )
    }
  return (<>
  { loading ? <Loading/> :
    <div className='overall-client-dashboard'>
<header className='overall-header-render'>
<FaBars className='text-light fs-2' onClick={()=>setSidebar(!sidebar)}/>
</header>
<div className='client-dash-sidebar'>
    { sidebar && <div className='actual-client-sidebar'>
        <div onClick={()=>setSidebar(false)}  style={{marginLeft:'250px',width:'max-content'}}>
        <IoMdClose className=' fs-1' style={{color:'rgb(244, 128, 12)'}}/>
        </div>
        
    <ul className='list-unstyled'>
        <li className={dash ? 'clientdash-active' : ''} onClick={()=>{setDash(true);setService(false);setMessage(false);setSidebar(false)}} style={{color:'white'}}><span><MdOutlineDashboard className='text-light fs-1' /></span> Dashboard</li>
        <li className={service ? 'clientdash-active' : ''} onClick={()=>{setDash(false);setService(true);setMessage(false);setSidebar(false)}} style={{color:'white'}}><span><FaServicestack className='text-light fs-1'/></span> Services</li>
        <li className={message ? 'clientdash-active' : ''} onClick={()=>{setDash(false);setService(false);setMessage(true);setSidebar(false)}} style={{color:'white'}}> <span><TiMessages className='text-light fs-1'/></span> Messages</li>
    </ul>
    </div>
    }
</div>
<div className='client-dash-sidebar-large'>
    { <div className='actual-client-sidebar'>
        
    <ul className='list-unstyled'>
        <li className={dash ? 'clientdash-active' : ''} onClick={()=>{setDash(true);setService(false);setMessage(false);setSidebar(false)}} style={{color:'white'}}><span><MdOutlineDashboard className='text-light fs-1' /></span> Dashboard</li>
        <li className={service ? 'clientdash-active' : ''} onClick={()=>{setDash(false);setService(true);setMessage(false);setSidebar(false)}} style={{color:'white'}}><span><FaServicestack className='text-light fs-1'/></span> Services</li>
        <li className={message ? 'clientdash-active' : ''} onClick={()=>{setDash(false);setService(false);setMessage(true);setSidebar(false)}} style={{color:'white'}}> <span><TiMessages className='text-light fs-1'/></span> Messages</li>
    </ul>
    </div>
    }
</div>




<div className='component-rendered-item'>
{component}
</div>
    </div>
    }
    </>
  )
}
