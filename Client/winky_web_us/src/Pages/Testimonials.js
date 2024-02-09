import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Testimonials.css'
import { FaQuoteLeft,FaBars } from "react-icons/fa";
import { Link } from 'react-router-dom'



export default function Testimonials() {
  const[loading,setLoading]=useState(true)
const [testimonials,setTestimonials]=useState({})
//axios fetch
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/Testimonials');
      // Assuming the API returns an object with user data
      setTestimonials(response.data);
      setLoading(false)
      
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  fetchData();
}, []);
const rendercomments=()=>{
  const comments=[];
  for (let i=0;i<testimonials.length;i++){
    comments.push(
      <div className='comment-container card m-2'>
      <FaQuoteLeft className='text-light fs-1' />
      <h6  style={{textAlign:'center',color:'yellow'}}>{testimonials[i].firstName + " " + testimonials[i].lastName}<br/>{testimonials[i].work_state}</h6>
      <p style={{textAlign:'center'}} className='conteiner-fluid text-light'>{testimonials[i].Testimony_message}</p>
      </div>
    )
  }
  return(comments)
}
const [sidebar,setSidebar]=useState(false)


  return (
    <>{ loading ? <Loading/> :
    <div className='overall-testimonials-container'>

<header  className='overall-header-section'>
    <div className='menu-brand-name'>
     <ul className='list-unstyled'>
        <li onClick={()=>setSidebar(false)} className='text-light'>winky_web_us</li>
        <li><FaBars className='fs-2 text-light' onClick={()=>setSidebar(!sidebar)} /></li>
     </ul>
    </div>
    <div onClick={()=>setSidebar(false)} className='login-signup m-4'>
        <p style={{fontSize:'17px'}} className='text-light'><Link  className='text-light' style={{textDecoration:'none'}} to='/Login'>Signup/login</Link></p>
    </div>
   </header>

     <div>
     {sidebar && <div className='homescreen-sidebar'>
      <h3 style={{textAlign:'center'}}>Menu</h3>
              <ul className='list-unstyled homescreen-sidebar-links'>
         <li onClick={()=>setSidebar(false)} className='fs-5'>Services</li>
         <li onClick={()=>setSidebar(false)}  className='fs-5 text-warning testimonial-active{'><Link to='/Testimonials'  style={{textDecoration:'none',color:'black'}}>Testimonials</Link></li>
        </ul>
      </div>}
     </div>








    <h5 style={{textAlign:'center'}} className='text-light'>Community love</h5>
    <p style={{textAlign:'center'}} className='text-light'>See what our clients say about us</p>
    <h4 style={{textAlign:'center'}} className='text-light'>{testimonials.length} Testimonials</h4>
    <div onClick={()=>setSidebar(false)} className='overall-specific-testimomial-container'>
      {
       rendercomments()
      }
    </div>
    </div>
    }
    </>
  )
}
