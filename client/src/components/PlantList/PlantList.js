import React, { Component } from 'react';
import './PlantList.scss';
import {Link} from 'react-router-dom';
import axios from 'axios';
import back from '../../assets/images/Icon-back-arrow.svg';
import MoreInfoModel from '../MoreInfoModel/MoreInfoModel';
import serverUrl from '../../serverUrl';

export default class PlantList extends Component {
    state = {
        plants: [],
        plantInfo: [],
        display: false,
        close: false,
        activeId: ''
    }

    componentDidMount(){
        const { match: { params }} = this.props;               
        const id = params.id;
        this.getPlants(id);
    }

    getPlants = (id) => {
        axios.get(`${serverUrl}/plants/byNursery/${id}`)
             .then(response => {                 
                 this.setState({plants: response.data});
             })
             .catch(error => {
                 console.log(error);
             });            
    }

    display = (plant_id) => { 
        this.setState({display: true, close: false, activeId: plant_id});        
    }

    close = () => {
        this.setState({plantInfo: [],display: false, close: true});
    }

    render(){
 
        let name = this.state.plants.filter(item => item[0])
                                      .map(itemV => itemV[0]);        
        
        let nurseryName = name.filter(function(item, pos){
            return name.indexOf(item) === pos; 
          });        
        return(
            <>                            
                <MoreInfoModel display={this.state.display} moreInfo={this.state.plants} activeId={this.state.activeId} close={this.close}/>    
                <div className="mainContainer">  
                    <div className="mainContainer__back">
                        <Link to="/nursery"><img className="mainContainer__back--logoImg" src={back} alt="Back" title="Go Back to Nursery Page"/></Link>
                    </div>                  
                    <div className="mainContainer__heading">List of Plants available in {nurseryName}</div>
                    <div className="mainContainer__section">
                        {this.state.plants.map(item => (                            
                                <div className="subContainer" key={item.pid}>
                                    <div className="subContainer__image">
                                        <img src={process.env.PUBLIC_URL + "/images/" +item.image} className="subContainer__image--img" alt={item.type}/>
                                    </div>
                                    <div className="subContainer__heading">
                                        {item.name} : {item.price}$
                                    </div>
                                    <div className="subContainer__button">
                                        <div className="subContainer__button--more" onClick={() => {this.display(item.pid)}}>More Info</div>
                                        <Link to={'/buy/' + item.nid +'/plant/' + item.pid} key={item.pid}>
                                            <button type="submit" className="subContainer__button--submit">Buy Now</button>
                                        </Link>
                                    </div>                                    
                                </div>                            
                        ))}
                    </div>    
                </div>
            
            </>
        )
    }
}