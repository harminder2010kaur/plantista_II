import React, { Component } from 'react';
import './Home.scss';
// import Slideshow from '../Slide/SlideShow';
import { NavLink } from 'react-router-dom';
// import {Animated} from "react-animated-css";

class Home extends Component {
  render(){
  return (
    <div className="homeContainer">      
        {/* <Slideshow />       */}
        <div className="heading">
          <div className="heading__text">        
            <h3>A dwell for Plant lovers</h3>            
          </div>                          
        </div> 
        <div className="heading2">
          <div className="heading2__text">                       
          <h3>
          <span className="slogan">Let’s Go Green!</span><br/>
          
          Plantista is for you if you have always wanted plants but are not sure where to buy and keep them and how to look after them ...
          <br/>  
          Get started <span className="slogan"><NavLink to="/type">here!</NavLink></span>
          </h3>                      
          
                          
          </div>            
        </div>         
    </div>
  );
}
}

export default Home;
