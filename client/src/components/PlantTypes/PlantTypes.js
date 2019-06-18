import React, { Component } from 'react';
import './PlantTypes.scss';
import {Link} from 'react-router-dom';
import axios from 'axios';
import serverUrl from '../../serverUrl';

export default class PlantTypes extends Component {
    state = {
        plantTypes: []
    }

    componentDidMount(){
        this.getPlantTypes();
    }

    getPlantTypes = () => {
        axios.get(`${serverUrl}/plants/type`)
             .then(response => {                 
                 this.setState({plantTypes: response.data});
             })
             .catch(error => {
                 console.log(error);
             });
    }
    render(){
        return(
            <>
                
                <div className="typeMainContainer">                  
                    <div className="typeMainContainer__heading">Type of Plants</div>
                    <div className="typeMainContainer__section">
                        {this.state.plantTypes.map((item, index) => (
                            <Link to={'/types/' + item.type} key={index}>
                                <div className="typeSubContainer">
                                    <div className="typeSubContainer__image">
                                        <img src={process.env.PUBLIC_URL + "/images/" +item.image} className="typeSubContainer__image--img" alt={item.type}/>
                                    </div>
                                    <div className="typeSubContainer__heading">
                                        {item.type}
                                    </div>                                    
                                </div>
                            </Link>
                        ))}
                    </div>    
                </div>
            
            </>
        )
    }
}