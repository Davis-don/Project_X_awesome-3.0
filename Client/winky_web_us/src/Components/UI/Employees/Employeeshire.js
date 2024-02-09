import React, { useState,useEffect } from 'react'
import './Employeeshire.css'
import { useNavigate, } from 'react-router-dom';
import axios from 'axios';

export default function Employeeshire() {

const [user,setUser]=useState({})
const [design,setDesign]=useState(false);
const [development,setDevelopment]=useState(false)
const [marketting,setMarketting]=useState(false)
const [fullstack,setFullstack]=useState(false)
const [fail,setfail]=useState(false)
const [success,setSuccess]=useState(false)
const [form,setForm]=useState(true)
const [employeedetails,setEmployeesdetail]=useState({
    employeeId:'',
    firstName:'',
    lastName:'',
    contact:'',
    email:'',
    Department:'',
    Branch:'',
    role:'',
    salary:'',
    password:'',
    confirmpassword:''
})
let handlepost=(e)=>{
    if(e.target.value==='design'){
   setDesign(true)
   setDevelopment(false)
   setMarketting(false)
   setFullstack(false)
    }
    else if(e.target.value==='development'){
        setDevelopment(true)
        setDesign(false)
        setMarketting(false)
        setFullstack(false)
    }
    else if(e.target.value==="marketting"){
        setDesign(false)
        setDevelopment(false)
        setMarketting(true)
        setFullstack(false)
    }
    else if(e.target.value==='fullstack'){
        setDesign(false)
        setDevelopment(false)
        setMarketting(false)
        setFullstack(true)
    }
    setEmployeesdetail({
        ...employeedetails,[e.target.name]:e.target.value
    })
    console.log(employeedetails)
}
const postdata=async (e)=>{
     e.preventDefault();
try{
const response=await fetch('http://localhost:4000/hire',
{
     method:'post',
     headers:{
          'content-type':'application/json'
     },
     body:JSON.stringify(employeedetails)
}) 
if(response){
     const data=await response.json();
     if(data.message==='record exists'){
          setSuccess(false)
          setfail(true)
          setForm(false)
          setTimeout(() => {
            setForm(true)
            setfail(false)
          }, 2000);
     }
     else if(data.message==='hired successfully'){
   setSuccess(true)
   setfail(false)
   setForm(false)
   setTimeout(() => {
     setForm(true)
     setSuccess(false)
   }, 2000);
     }
    
}
else{
     const errordata=await response.json()
     console.log(errordata)
}
}
catch (error){
console.log(error)
}
}
const navigate=useNavigate()
useEffect(() => {
     const fetchData = async () => {
       try {
         const response = await axios.get('http://localhost:4000/Account/login');
         
         // Assuming the API returns an object with user data
         setUser(response.data);
       } catch (error) {
         console.error('Error fetching data:', error);
       }
     };
   
     fetchData();
   },[]);
  //  if(user===''){
  //   navigate('/login')
  //  }


        

function Alertfail(){
     return(
   <div className='overall-alert'>
   <div class="alert alert-danger alert-dismissible fade show">
       <strong>Warning</strong>Record exists
     </div>
   </div>
     )
   }
   function Alertsuccess(){
     return(
   <div className='overall-alert'>
   <div class="alert alert-success alert-dismissible fade show">
       <strong>Warning</strong>Record added successfully
     </div>
   </div>
     )
   }
  return (
    <div className='overall-employeeshire-ui'>
      {/* {fail && <Alertfail/>}
          {success && <Alertsuccess/>}
       {form && <form onSubmit={(e)=>postdata(e)}>
        <label className='text-light' style={{width:'100%'}}> Employee ID<br/>
   <input onChange={handlepost} name='employeeId' className='form-control' placeholder='employee id'/>
        </label>
        <label className='text-light' style={{width:'100%'}}> First name<br/>
   <input onChange={handlepost} name='firstName' className='form-control' placeholder='first name'/>
        </label>
        <label className='text-light' style={{width:'100%'}}> Last name<br/>
   <input onChange={handlepost} name='lastName' className='form-control' placeholder='last name'/>
        </label>
        <label className='text-light' style={{width:'100%'}}> Contact<br/>
   <input onChange={handlepost} name='contact' className='form-control' placeholder='Contact'/>
        </label>
        <label className='text-light' style={{width:'100%'}}> Email<br/>
   <input onChange={handlepost} name='email' type='email' className='form-control' placeholder='Email'/>
        </label>
        <label className='text-light' style={{width:'100%'}}>Department<br/>
          <select onClick={handlepost} name='Department' className="form-control">
          <option></option>
     <option value='marketting'>Marketting</option>
     <option value='design'>Design</option>
     <option value='development'>Development</option>
     <option value='fullstack'>Fullstack</option>
   </select>
          </label>
          { design &&
          <label className='text-light' style={{width:'100%'}}>Design branches<br/>
          <select onClick={handlepost} name='Branch' className="form-control">
          <option></option>
     <option value='UI/UX'>UI/UX design</option>
     <option value='backendlogical'>Backendlogical</option>
   </select>
          </label>
          }
          {development && 
           <label className='text-light' style={{width:'100%'}}>Development branches<br/>
           <select onClick={handlepost} name='Branch' className="form-control">
           <option></option>
      <option value='frontend'>Frontend</option>
      <option value='Backend'>Backend</option>
    </select>
           </label>
          }
          {marketting && 
          <label className='text-light' style={{width:'100%'}}>Marketting branches<br/>
          <select onClick={handlepost} name='Branch' className="form-control">
          <option></option>
     <option value='marketting'>Marketting</option>
   </select>
          </label>
          }
           {fullstack && 
          <label className='text-light' style={{width:'100%'}}>fullstack branches<br/>
          <select onClick={handlepost} name='Branch' className="form-control">
          <option></option>
     <option value='fullstack'>Fullstack</option>
   </select>
          </label>
          }
           <label className='text-light' style={{width:'100%'}}>Role<br/>
           <select onClick={handlepost} name='role' className="form-control">
           <option></option>
           <option value='CEO'>CEO</option>
      <option value='CTO'>Chief technology officer</option>
      <option value='worker'>Employee</option>
    </select>
           </label>
           <label style={{width:'100%'}}>Salary<br/>
   <input onChange={handlepost} name='salary' className='form-control' placeholder='Salary'/>
        </label>
        <label className='text-light' style={{width:'100%'}}>Password<br/>
   <input onChange={handlepost} name='password' type='password' className='form-control' placeholder='password'/>
        </label>
        <label className='text-light' style={{width:'100%'}}>confirmPassword<br/>
   <input onChange={handlepost} name='confirmpassword' type='password' className='form-control' placeholder='password'/>
        </label>
        <div className='p-1' style={{width:"max-content",margin:'auto'}}>
            <button className='btn btn-outline-primary'>Submit</button>
        </div>
       </form>
} */}
    </div>
  )
}
