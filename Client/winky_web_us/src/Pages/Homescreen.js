import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './homescreen.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaBars,FaCheck,FaRegCopyright } from "react-icons/fa";
import fibreimg from '../Images/compare-fibre-9HGPvHThNME-unsplash.jpg'

export default function Homescreen() {
const [sidebar,setSidebar]=useState(false)
  return (
    <div className='overall-homescreen-container'>
   <header className='overall-header-section'>
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
   <div className='homescreen-introduction-section'>
     {sidebar && <div className='homescreen-sidebar'>
      <h3 style={{textAlign:'center'}}>Menu</h3>
              <ul className='list-unstyled homescreen-sidebar-links'>
         <li className='fs-5'>Services</li>
         <li className='fs-5'><Link to='/Testimonials'  style={{textDecoration:'none',color:'black'}}>Testimonials</Link></li>
        </ul>
      </div>}
      <img onClick={()=>setSidebar(false)} src={fibreimg} alt='image of a fibre optic'/>

      <div onClick={()=>setSidebar(false)} className='homescreen-opacity-controller'> </div>
      <div className='homescreen-text-on-image '>
    <h4  className='container-fluid'style={{color:'#FA9703'}}>Best platform based solutions.</h4>
    <p className='text-light container-fluid'>Lets take entrepreneurship into the next level.Here we design and build platforms to handle your traffic and transactions  and make it easy to reach your audience.</p>
      </div>
   </div>
   <div onClick={()=>setSidebar(false)} className='how-to-get-things-done-section'>
     <div className='section-head-text'>
        <p className='fs-5 container-fluid' style={{color:'#F9D297'}}>How you get things done</p>
     </div>
     <ul className='list-unstyled steps-to-take container-fluid'>
        <li><span><FaCheck className='fs-2 text-warning'/></span><span className='text-light'>Open an account</span></li>
        <li><span><FaCheck className='fs-2 text-warning'/></span><span className='text-light'>Login into your account</span></li>
        <li><span><FaCheck className='fs-2 text-warning'/></span><span className='text-light'>Provide us with detailed information about your platfom</span></li>
        <li><span><FaCheck className='fs-2 text-warning'/></span><span className='text-light'>Agree on service billings relative to our services plans in the Service page.</span></li>
        <li><span><FaCheck className='fs-2 text-warning'/></span><span className='text-light'>Pay half the price and we get started on design.</span></li>
        <li><span><FaCheck className='fs-2 text-warning'/></span><span className='text-light'>We send you our design in the account dashboard and we let you verify whether we should proceed to the next step.</span></li>
        <li><span><FaCheck className='fs-2 text-warning'/></span><span className='text-light'>Pay the remaining amount and we get started on development .</span></li>
        <li><span><FaCheck className='fs-2 text-warning'/></span><span className='text-light'>We then test it and offer free training.</span></li>
     </ul>
   </div>
   <div onClick={()=>setSidebar(false)} className='who-we-are-section'>
   <div className='section-head-text'>
        <p className='fs-5 container-fluid' style={{color:'#F9D297'}}>Who we are</p>
     </div>
     <p className='text-light container-fluid'>We are a tech company in Kenya constituting of experts from diverse fields in tech and business.We work together as a team combining these skills to build a platform or websites that satisfies and achieves what our clients need.</p>

<p className='text-light container-fluid'>We have a strong believe that by working closely with our clients and involving them in every step  we increase chances of success significantly  and that is why we have integrated a Signup and login functionality  for communication and updates .</p>
   </div>
   <div onClick={()=>setSidebar(false)} className='about-us-section'>
   <div className='section-head-text'>
        <p className='fs-5 container-fluid' style={{color:'#F9D297'}}>About us</p>
     </div>
     <p className='container-fluid text-light'>The name winky_web_us was derived from the English terminologies Winky meaning smiley,Web meaning internet related and us is the me and you.</p>
     <p className='text-light container-fluid'>
     The basic idea is to create and design web related things that maintains a smile on our faces in  such a way that our clients are happy for our services and we are happy that you are happy with our services.
     </p>
   </div>
   <div onClick={()=>setSidebar(false)} className='contact-us-section'>
   <div className='section-head-text'>
        <p className='fs-5 container-fluid' style={{color:'#F9D297'}}>Contact us</p>
     </div>
     <div className='contact-paragraphs' style={{width:'max-content',margin:'auto'}}>
     <p className='text-light '>Call: +254758420860</p>
     <p className='text-light '>Whatsap: +254758420860</p>
     <p className='text-light '>Email:winkywebus@gmail.com</p>
     </div>
   </div>
   <div onClick={()=>setSidebar(false)} className='bg-dark'>
    <p className='text-light' style={{textAlign:'center',fontSize:'10px'}}><FaRegCopyright /> copyright winky_web_us 2024</p>
   </div>
    </div>
  )
}
