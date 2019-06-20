import React, { Component } from 'react';
import './ContactUs.scss';
import post from '../../assets/images/post.png';
import phone from '../../assets/images/phone.png';
import email from '../../assets/images/email.png';

export default class ContactUs extends Component{
    render(){
        return(
            <>
            <div className="contactContainer">
                <div className="contactContainer__inside">
                    <div className="contactContainer__inside--heading">Contact Us</div>
                </div>
            
                <div className="container">
                    <div className="container__insideContainer">
                        {/* <div className="container__insideContainer--header">
                            Contact Us
                        </div> */}
                        <div className="container__insideContainer--header">
                            Harminder Kaur
                        </div>
                        <div className="container__insideContainer--address">
                            28 Mount Royal Circle, Brampton, Ontario
                            <img src={post} alt="Post" className="container__insideContainer--image"/>
                        </div>
                        <div className="container__insideContainer--phone">
                            +1 6478351266 <img src={phone} alt="Phone" className="container__insideContainer--image"/>
                        </div>
                        <div className="container__insideContainer--email">
                            harminder2010kaur@gmail.com <img src={email} alt="e-mail" className="container__insideContainer--image"/>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}