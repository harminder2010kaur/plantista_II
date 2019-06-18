import React, { Component } from 'react';
import './TypePlants.scss';
import {Link} from 'react-router-dom';
import axios from 'axios';
import back from '../../assets/images/Icon-back-arrow.svg';
import MoreInfoModel from '../MoreInfoModel/MoreInfoModel';
import serverUrl from '../../serverUrl';

export default class TypePlants extends Component {
    state = {
        plants: [],
        type: '',
        display: false,
        close: false,
        activeId: ''
    }

    componentDidMount(){
        const { match: { params }} = this.props;
        const type = params.type;
        this.getPlants(type);
    }

    getPlants = (type) => {
        axios.get(`${serverUrl}/plants/types/${type}`)
             .then(response => {
                 this.setState({plants: response.data, type: type});
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
                <div className="mainPlantContainer"> 
                <div className="mainPlantContainer__back">
                        <Link to="/type"><img className="mainPlantContainer__back--logoImg" src={back} alt="Back" title="Go Back to Nursery Page"/></Link>
                    </div>                   
                    <div className="mainPlantContainer__heading">
                    <div className="mainPlantContainer__heading--left">{this.state.type} Plants</div>                
                        <div className="mainContainer__heading--right">                        
                    </div>                    
                        </div>
                    <div className="mainPlantContainer__section">
                        {this.state.plants.map(item => (                            
                                <div className="subPlantContainer" key={item.id}>
                                    <div className="subPlantContainer__image">
                                        <img src={process.env.PUBLIC_URL + "/images/" +item.image} className="subPlantContainer__image--img" alt={item.type}/>
                                    </div>
                                    <div className="subPlantContainer__heading">
                                        {item.name} : {item.category}
                                    </div>  
                                    <div className="subPlantContainer__button">
                                        <div className="subPlantContainer__button--more" onClick={() => {this.display(item.id)}}>More Info</div>
                                        <Link to={'/byPlant/' + item.id}><button type="submit" className="subPlantContainer__button--submit">Buy Now</button></Link>
                                    </div>                                   
                                </div>                            
                        ))}
                    </div>    
                </div>
            
            </>
        )
    }
}