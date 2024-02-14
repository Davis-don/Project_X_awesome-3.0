import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
import Loading from './Loading';
import axios from 'axios';
import { FaBars,FaServicestack } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { TiMessages } from "react-icons/ti";
import { MdOutlineDashboard } from "react-icons/md"
import 'bootstrap/dist/css/bootstrap.min.css'
import './clientdash.css'



export default function Clientdash() {
  const [userCred,setUsercred]=useState({})
  const [token,setToken]=useState(false)
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tokenPassed = queryParams.get('data');
//axios fetch
useEffect(() =>{
  if(tokenPassed===null){
    navigate('/Login')
      }
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/Account/login2',{
        headers: {
                     'Authorization': `Bearer ${tokenPassed}`,
                   },
      });
      // Assuming the API returns an object with user data
      if(response.data.task==='untasked'){
        setTask(false)
        setUsercred(response.data.result);
        setLoading(false)
      }
      else if(response.data.task==='tasked'){
        setTask(true)
        setUsercred(response.data.result);
        setLoading(false)
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  fetchData();
}, []);

    const navigate = useNavigate();
    const [sidebar,setSidebar]=useState(false)
    const [task,setTask]=useState(false)
    const [dash,setDash]=useState(true)
    const [service,setService]=useState(false)
    const [message,setMessage]=useState(false)
    const [loading,setLoading]=useState(true)
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
        let message;
        useEffect(()=>{
            if((userCred.Status==="Pending...") && userCred.paid_Amount<1/2 * userCred.Total_price_Amount ){
                message="Pay atleast KES " + " " + 1/2 * userCred.Total_price_Amount 
            }
        },[])

        function Testify() {
            const [commentinfo,setCommentinfo]=useState({
                firstName:userCred.firstName,
                lastName:userCred.lastName,
                ClientId:userCred.Client_ID,
                workState:'',
                comment:''
            })
            const [success,setSuccess]=useState(false)
            const [fail,setFail]=useState(false)
            const [form,setForm]=useState(true)
            const [duplicate,setDuplicate]=useState(false)
            let updatecomment=(e)=>{
            setCommentinfo({
                ...commentinfo,[e.target.name]:e.target.value
            })
            }
            const Handlecommentpost=async (e)=>{
                e.preventDefault();
                try{
            let response=await fetch('http://localhost:4000/Testimonials',{
                method:'post',
                headers:{
                'content-type':'application/json'
                },
                body:JSON.stringify(commentinfo)
            })
            if(response){
            const data=await response.json();
            if(data.message==='inserted'){
                setSuccess(true)
                setFail(false)
                setForm(false)
                setTimeout(() => {
                    setSuccess(false)
                    setForm(true)
                }, 3000);
            }
            else if(data.message==='data  exists'){
              setSuccess(false)
              setFail(false)
              setForm(false)
              setDuplicate(true)
              setTimeout(() => {
                setDuplicate(false)
                  setForm(true)
              }, 3000);
            }
            else{
                 setSuccess(false)
                 setFail(true)
                 setForm(false)
                 setDuplicate(false)
                setTimeout(() => {
                     setForm(true)
              setFail(false)
                 }, 3000);
            
            }
            }
            }
            catch(error){
                console.log(error)
            }
            }
            function Alertsuccess(){
                return(
              <div className='overall-alert'>
              <div class="alert alert-success alert-dismissible fade show">
                  <strong>Success!</strong>Thankyou for leaving a testimonial.
                </div>
              </div>
                )
              }
              function AlertFail(){
                return(
              <div className='overall-alert'>
              <div class="alert alert-danger alert-dismissible fade show">
                  <strong>Warning!</strong> Something went wrng
                </div>
              </div>
                )
              }
              function AlertDataexist(){
                return(
              <div className='overall-alert'>
              <div class="alert alert-info alert-dismissible fade show">
                  <strong>information!</strong>You can only write one testimonial
                </div>
              </div>
                )
              }
              return (
                <div className='overall-testify-api-container card p-2'>
                    <div className='text-dark'><strong className='text-success'>Note</strong>These details will be visible in the testimonials page</div>
                    {success && <Alertsuccess/>}
                    {fail && <AlertFail/>}
                    {duplicate && <AlertDataexist/>}
                 {form &&  <form onSubmit={Handlecommentpost}>
                    <label className='text-dark' style={{width:'100%'}}>Work description<br/>
                      <input onChange={updatecomment} name='workState' placeholder='eg: frontend engineer at Huawei' className='form-control'/>
                    </label>
                    <label className='text-dark' style={{width:'100%'}}>Say something<br/>
                      <textarea onChange={updatecomment} name='comment' placeholder='comment.....' className='form-control'/>
                    </label>
                    <div style={{width:'max-content',margin:'auto'}}>
                        <button className='btn btn-outline-info'>Submit</button>
                    </div>
                  </form>
                  }
                </div>
              )
            }

            function Paymentitems(){
              const [success,setSuccess]=useState(false);
              const [fail,setFail]=useState(false)
              const [wait,setWait]=useState(false)
              const [pay,setPay]=useState({
                ClientID:userCred.Client_ID,
                namePhoneno:'',
                Amount:''
              })
               
              let updatepay=(e)=>{
                 setPay({
                  ...pay,[e.target.name]:e.target.value
                 })
              }
              let handlepay=async (e)=>{
                e.preventDefault();
                setWait(true)
      
                try{
            const response=await fetch('http://localhost:4000/handle/pay',{
              method:'post',
              headers:{
                'content-type':'application/json'
              },
            body:JSON.stringify(pay)
            })
            if(response){
              setWait(false)
              const data=await response.json();
              if(data.message==='received wait'){
                setSuccess(true)
                setFail(false)
                setTimeout(() => {    
              setSuccess(false)
              setFail(false)
                }, 10000);
              }
              else{
                setSuccess(false)
                setFail(true)
              }
            }
            else{
              setWait(false)
              setSuccess(false)
              setFail(true)
              const errordata=await response.json()
              console.log(errordata)
            }
                }
                catch(error){
                  setSuccess(false)
                  setFail(true)
                  console.log(error)
                }
              }
              function AlertSuccess(){
                return(
              <div className='overall-alert'>
              <div class="alert alert-info alert-dismissible fade show">
                  <strong>Success!</strong>Please login again after 30 minutes.If no changes received,contact us immediately.
                </div>
              </div>
                )
              }
              function AlertWait(){
                return(
              <div className='overall-alert'>
              <div class="alert alert-info alert-dismissible fade show">
                  <strong>Success!</strong>Please wait 
                </div>
              </div>
                )
              }
              function Alertfail(){
                return(
              <div className='overall-alert'>
              <div class="alert alert-danger alert-dismissible fade show">
                  <strong>warning!</strong>Something is not right.Please contact 0758420860
                </div>
              </div>
                )
              }
             
      
              return(
                <div className='overall-payment-item bg-success card m-1 p-1' >
                  {fail && <Alertfail/>}
                  {wait && <AlertWait/>}
                  {success && <AlertSuccess/>}
                  <h4 style={{textAlign:'center'}}>Payment</h4>
                  <h4 style={{textAlign:'center'}}>Till no</h4>
                  <h5 className='text-light' style={{textAlign:'center'}}>39257524</h5>
                  <p className='text-info'>We are sorry that we are using this method to facilitate transactions but we are working on better a better way.</p>
                  <p className='text-light'>Please enter name or contact that reflects on the other end.</p>
                  <form onSubmit={handlepay}>
                  <label className='text-light' style={{width:'100%'}}>name or contact
         <input onChange={updatepay} name='namePhoneno' className='form-control' />
                  </label>
                  <label className='text-light' style={{width:'100%'}}>Amount paid
         <input onChange={updatepay} name='Amount' className='form-control' />
                  </label>
                  <div style={{width:'max-content',margin:'auto'}}>
                    <button type='submit' className='btn btn-outline-primary text-light m-1'>Submit</button>
                  </div>
                  </form>
                </div>
              )
            }


        return(
            <div className='overall-dashlink'>
<h4 className='text-light'>Dashboard</h4>
<div className='dashlink-overall-cards'>
<div className='welcome-dash-text card dash-card'>
    <p className='container-fluid text-light'>
        Welcome back <span className='fs-3' style={{color:'rgb(244, 128, 12)'}}>{userCred.firstName + " " + userCred.lastName}</span>.Thankyou for choosing <span className='text-warning'>Winky_web_us</span>.It is such a privilege to work with you.And please makesure to leave a testimonial as we help each other grow.
    </p>
</div>
{ !task &&
<div className='untasked-task-section-card card dash-card'>
    <p className='text-danger container-fluid'>
You have not registered any task.Please register in the service tab.
    </p>
</div>
    }
{ task &&
<div className='tasked-task-section-card card dash-card'>
<h2 className='text-primary' style={{textAlign:'center'}}>Task Analysis</h2>
<h5 style={{textAlign:'center'}} className='text-light'>Your task status is:<br/> <span className='text-warning'>{userCred.Status}</span></h5>
</div>
    }
    { task && 
<div className='tasked-financial-section-card card dash-card'>
<h2 className='text-info' style={{textAlign:'center'}}>Financial Analysis</h2>
<h5 style={{textAlign:'center'}} className='text-light'>Your balance is:<br/> <sup >KES</sup> <span className='text-warning fs-3'>{userCred.Total_price_Amount - userCred.paid_Amount}</span></h5>
</div>
    }
    {
        task && 
        <div><Testify/></div>
    }
    {
      task && 
      <div><Paymentitems/></div>
    }
</div>
        
            </div>
        )
    }












function  Servicelink(){
    let [success,setSuccess]=useState(false)
    let [exist,setExist]=useState(false)
    let [fail,setFail]=useState(false)
    let [tasking,setTasking]=useState({
      ClientId:userCred.Client_ID,
      ServiceId:'',
      MainGoal:'',
      Description:'',
      status:'pending...',
      phase:'none'
  })
  const updatedata=(e)=>{
      setTasking({
          ...tasking,[e.target.name]:e.target.value
      })
  }
  const handlepost=async (e)=>{
e.preventDefault();
    try{
  const response=await fetch ('http://localhost:4000/task/registration',{
    method:'post',
    headers:{
      'content-type':'application/json'
    },
    body:JSON.stringify(tasking)
  })
  if(response.ok){
    const data=await response.json()
    if(data.message==='Task added'){
      setSuccess(true)
      setExist(false)
      setFail(false)
      setTimeout(() => {
        setSuccess(false)
        navigate('/login')
      }, 3000);
    }
    else if(data.message==='wait'){
      setFail(true)
      setExist(true)
      setSuccess(false)
      setTimeout(() => {
        setFail(false)
        setExist(false)
      }, 2000);
    }
  
  }
  else{
const errordata=await response.json();
console.log(errordata)
setSuccess(false)
setFail(true)
  }
    }
    catch (error){
      setSuccess(false)
setFail(true)
console.log(error)
    }
  }
  function Alertsuccess(){
    return(
  <div className='overall-alert'>
  <div class="alert alert-success alert-dismissible fade show">
      <strong>Success!</strong> Your data has been received successfully
    </div>
  </div>
    )
  }
  function Alertfail(){
    return(
  <div className='overall-alert'>
  <div class="alert alert-danger alert-dismissible fade show">
      <strong>warning!</strong>Something is not right
    </div>
  </div>
    )
  }
  function Alertfail2(){
    return(
  <div className='overall-alert'>
  <div class="alert alert-warning alert-dismissible fade show">
      <strong>warning!</strong>You have an existing active task
    </div>
  </div>
    )
  }

    return(
    <div className='overall-Service-link'>
      <h4 className='text-light'>Services</h4>
      <div className='overall-services-client-cards-holders'>
<div className='register-task-card  task-cards '>

  {/*form here*/}
  {success && <Alertsuccess/>}
  {fail && <Alertfail/>}
  {exist && <Alertfail2/>}
  <form onSubmit={handlepost}>
           <label className='text-light' style={{width:'100%'}}> Select plan<br/>
        <select onClick={updatedata} name='ServiceId' className='form-control'>
            <option></option>
            <option value='1'>1 pager landing page</option>
            <option value='2'>I pager branding</option>
            <option value='3'>Up to 5 pages</option>
            <option value='4'>Up to 10 pages</option>
            <option value='5'>Up to 25 pages</option>
            <option value='6'>Up to 50 pages</option>
            {/* <option value='7'>Other</option> */}
        </select>
           </label>
           <label className='text-light' style={{width:'100%'}}>Main Goal<br/>
          <textarea name='MainGoal' onChange={updatedata} placeholder='main goal' className='form-control'/>
           </label>
           <label className='text-light' style={{width:'100%'}}>Description<br/>
          <textarea name='Description' onChange={updatedata} placeholder='Description' className='form-control'/>
           </label>
           <div style={{width:'max-content',margin:'auto'}}>
            <button className='btn btn-outline-info'>Submit</button>
           </div>
        </form>

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
