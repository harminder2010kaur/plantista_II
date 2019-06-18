import React, { Component } from 'react';
import './Plants.scss';
import {Link} from 'react-router-dom';
import axios from 'axios';
import MoreInfoModel from '../MoreInfoModel/MoreInfoModel';
import serverUrl from '../../serverUrl';

export default class Plants extends Component {
    state = {
        plants: [],
        display: false,
        close: false,
        activeId: ''
    }

    componentDidMount(){
        this.getPlants();
    }

    getPlants = () => {
        axios.get(`${serverUrl}/plants`)
             .then(response => {                 
                 this.setState({plants: response.data});
             })
             .catch(error => {
                 console.log(error);
             });
    }

    display = (id) => {              
        this.setState({display: true, close: false, activeId: id});
    }

    close = () => {
        this.setState({display: false, close: true});
    }
    render(){
        return(
            <>
                <MoreInfoModel display={this.state.display} moreInfo={this.state.plants} activeId={this.state.activeId} close={this.close}/>
                <div className="mainPlantsContainer">                    
                    <div className="mainPlantsContainer__heading">List of Plants</div>
                    <div className="mainPlantsContainer__section">
                        {this.state.plants.map(item => (
                            
                                <div className="subPlantsContainer" key={item.id}>
                                    <div className="subPlantsContainer__image">
                                        <img src={process.env.PUBLIC_URL + "/images/" +item.image} className="subPlantsContainer__image--img" alt={item.type}/>
                                    </div>
                                    <div className="subPlantsContainer__heading">
                                        {item.name} : {item.type}
                                    </div> 

                                    <div className="subPlantsContainer__button">
                                        <div className="subPlantsContainer__button--more" onClick={() => {this.display(item.id)}}>More Info</div>
                                        <Link to={'/byPlant/' + item.id} key={item.id}><button type="submit" className="subPlantsContainer__button--submit">Buy Now</button></Link>
                                    </div>                                    
                                </div>
                            
                        ))}
                    </div>    
                </div>
            
            </>
        )
    }
}