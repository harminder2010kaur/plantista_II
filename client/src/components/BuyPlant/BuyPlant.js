import React, { Component } from 'react';
import './BuyPlant.scss';
import {Link} from 'react-router-dom';
import axios from 'axios';
import back from '../../assets/images/Icon-back-arrow.svg';
import MoreInfoModel from '../MoreInfoModel/MoreInfoModel';
import serverUrl from '../../serverUrl';

export default class BuyPlant extends Component {
    state = {
        plants: [],        
        plantInfo: [],
        display: false,
        close: false,
        n_id: '',
        p_id: '',
        activeId: '',
        isPosted: false
    }

    componentDidMount(){        
        const { match: { params }} = this.props;           
        const id = params.nid;
        const plant_id = params.pid;
        this.setState({n_id: id, p_id: plant_id});
        this.getPlants(id, plant_id);
    }

    getPlants = (id, plant_id) => {
        axios.get(`${serverUrl}/plants/buy/${id}/plant/${plant_id}`)
             .then(response => {                                               
                 this.setState({plants: response.data})           
             })
             .catch(error => {
                 console.log(error);
             });            
    }

    display = (plant_id) => { 
        axios.get(`${serverUrl}/plants`)
             .then(response => {                         
                this.setState({plantInfo: response.data,
                              display: true, 
                              close: false, 
                              activeId: plant_id});
             })
             .catch(error => {
                 console.log(error);
             });                          
    }

    close = () => {
        this.setState({plantInfo: [],display: false, close: true});
    }


    submit = event => {      
        event.preventDefault();        
        const name = event.target.u_name.value;
        const phone = event.target.u_phone.value;
        const email = event.target.u_email.value;
        const address = event.target.u_address.value;
        const postal = event.target.u_postal.value;
        const price = event.target.price.value;
        const n_id = this.state.n_id;
        const p_id = this.state.p_id;
        
        let postData = 
          {
            user_name: name,
            user_phone: phone,
            user_email: email,
            user_address: address,
            user_postal: postal,
            nid: n_id,
            pid: p_id,
            price: price,
            order_created: 'y',
            order_received: 'n',
            order_completed: 'n'    
          };          
        
          axios.post(`${serverUrl}/plants/user/buy`, postData)
               .then(request => {            
                 this.setState({                                 
                                isPosted: true
                              });                
               })
               .catch(error => {
                 console.log(`There is some Technical glitch. Please refer error: ${error}`);
               });
        this.form.reset();
      }

    render(){        
        let name = this.state.plants.filter(item => item.nursery_name)
                                      .map(itemV => itemV.nursery_name);        
        
        let nurseryName = name.filter(function(item, pos){
            return name.indexOf(item) === pos; 
        });
                         
        return(
            <>                            
                <MoreInfoModel display={this.state.display} moreInfo={this.state.plantInfo} activeId={this.state.activeId} close={this.close}/>    
                <div className="buyMainContainer">  
                    <div className="buyMainContainer__back">
                        <Link to={"/byPlant/"+ this.state.p_id}><img className="buyMainContainer__back--logoImg" src={back} alt="Back" title="Go Back to Nursery Page"/></Link>
                    </div>                  
                    <div className="buyMainContainer__heading">{nurseryName}</div>                    
                        {this.state.plants.map((item,index) =>   
                            <div className="buyMainContainer__section" key={index}>                                                    
                                <div className="buySubContainer">
                                    <div className="buySubContainer__image">
                                        <img src={process.env.PUBLIC_URL + "/images/" +item.image} className="buySubContainer__image--img" alt={item.type}/>
                                    </div>
                                    <div className="buySubContainer__heading">
                                        {item.name} : {item.price}$
                                    </div>
                                    <div className="buySubContainer__button">
                                        <div className="buySubContainer__button--more" onClick={() => {this.display(item.pid)}}>More Info</div>                                        
                                    </div>                                    
                                </div>    
                                
                                <div className="formSection">
                                    <div className="formSection__heading">Shipping Address</div>                                    
                                    <form id="buyPlant" className="formSection__form" ref={form => this.form = form} onSubmit={this.submit} autoComplete="off">                                                                           
                                        <div className="form-components">
                                            <input type="hidden" name="price" id="price" value={item.price}  className="formSection__form--input"/>
                                            <label htmlFor="u_name" className="formSection__form--label">Name</label>    
                                                <input type="text" name="u_name" id="u_name"  className="formSection__form--input" required />
                                            <label htmlFor="u_phone" className="formSection__form--label">Phone</label>    
                                                <input type="text" phone="u_phone" id="u_phone" maxLength="10" className="formSection__form--input" pattern="[0-9]{10}" title="Ten digit mobile number" required />
                                            <label htmlFor="u_email" className="formSection__form--label">Email</label>    
                                                <input type="text" email="u_email" id="u_email"  className="formSection__form--input" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Write correct email format" required />
                                            <label htmlFor="u_address" className="formSection__form--label">Address</label>    
                                                <textarea name="u_address" id="u_address" className="formSection__form--textarea" required></textarea>
                                            <label htmlFor="u_postal" className="formSection__form--label">Postal Code</label>    
                                                <input type="text" phone="u_postal" id="u_postal" maxLength="6" className="formSection__form--input" required />    
                                            <div className="BuyButton">
                                                <button type="submit" className="formSection__form--button"><span>Payment</span></button>                                
                                            </div>    
                                        </div>    
                                    </form> 

                                </div>    
                            </div>    
                        )}
                    
                </div>
            
            </>
        )
    }
}