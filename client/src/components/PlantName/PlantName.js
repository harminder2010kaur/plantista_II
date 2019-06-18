import React, { Component } from 'react';
import './PlantName.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MoreInfoModel from '../MoreInfoModel/MoreInfoModel';
import serverUrl from '../../serverUrl';

export default class PlantName extends Component {
    state = {
        plants: [],
        plantsInfo: [],
        type: '',
        count: 0,
        display: false,
        close: false,
        activeId: ''
    }

    componentDidMount()
    {
        const { match: { params }} = this.props;
        const plantName = params.name;                             
        this.getPlants(plantName);
    }

    componentDidUpdate(prevProps, prevState){
        const { match: { params }} = this.props;
        const plantName = params.name;        

        if (prevProps.match.params.name !== plantName)
            {                      
                this.getPlants(plantName);
            }
        
    }

    display = (id) => {                
        axios.get(`${serverUrl}/plants`)
             .then(response => {                                         
                this.setState({plantsInfo: response.data,
                              display: true, 
                              close: false, 
                              activeId: id});
             })
             .catch(error => {
                 console.log(error);
             });    
    }

    close = () => {
        this.setState({display: false, close: true});
    }

    getPlants = (plantName) => {        
        axios.get(`${serverUrl}/plants/name/${plantName}`)
             .then(response => {                 
                 let count = 0;
                 if(response.data)
                 {
                     count = 1;
                 }                                  
                 this.setState({plants: response.data, type: plantName, count: count});
             })
             .catch(error => {
                 console.log(error);
             });
    }
    render(){        
        const {id, image, name, category, type} = this.state.plants;
        return (
            <>
                <MoreInfoModel display={this.state.display} moreInfo={this.state.plantsInfo} activeId={id} close={this.close}/>
                <div className="mainSearchContainer">                    
                    <div className="mainSearchContainer__heading">
                    <div className="mainSearchContainer__heading--left">{this.state.type} Plant</div>                    
                        <div className="mainSearchContainer__heading--right">                        
                    </div>                    
                        </div>
                    <div className="mainSearchContainer__section">
                    {/* {this.state.count === 0 ? <div className="notFound">Information is not available for this plant</div> : ""}             */}
                                <div className="subSearchContainer" key={id}>
                                    <div className="subSearchContainer__image">
                                        <img src={process.env.PUBLIC_URL + "/images/" +image} className="subSearchContainer__image--img" alt={type}/>
                                    </div>
                                    <div className="subSearchContainer__heading">
                                        {name} : {category}
                                    </div>  
                                    <div className="subSearchContainer__button">
                                        <div className="subSearchContainer__button--more" onClick={() => {this.display(id)}}>More Info</div>
                                        <Link to={'/byPlant/' + id} key={id}><button type="submit" className="subPlantsContainer__button--submit">Buy Now</button></Link>
                                    </div>                                  
                                </div>                                                                            
                    </div>    
                </div>
            </>
        )
    }
}