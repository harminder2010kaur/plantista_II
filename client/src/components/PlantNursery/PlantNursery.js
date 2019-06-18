import React, { Component } from 'react';
import './PlantNursery.scss';
import PlantNurseryItem from './PlantNurseryItem';
import axios from 'axios';
import back from '../../assets/images/Icon-back-arrow.svg';
import { Link } from 'react-router-dom';
import serverUrl from '../../serverUrl';

export default class PlantNursery extends Component {
    state = {
        nursery: [],
        plant: ''
    }

    componentDidMount(){                
        const { match: { params }} = this.props; 
        const plantId = params.id;                 
        this.getNursery(plantId);
    }


    getNursery = (plantId) => {
        axios.get(`${serverUrl}/plants/byPlant/${plantId}`)
             .then(response => {                 
                 this.setState({nursery: response.data, plant: plantId});
             })
             .catch(error => {
                 console.log(error);
             });            
    }

    render(){

        let name = this.state.nursery.filter(item => item[0])
                                      .map(itemV => itemV[0]);                
        let plantName = name.filter(function(item, pos){
            return name.indexOf(item) === pos; 
          });
        
        return(
            <>                
                <div className="nursery-heading">
                    <div className="nursery-heading__head">  
                        {plantName}                 
                    </div>    
                </div>
                
                <div className="back">
                        <Link to="/plants"><img className="back__logoImg" src={back} alt="Back" title="Go Back to Nursery Page"/></Link>
                </div>
                <section className="nursery-items">
                    {this.state.nursery.map((item, index) => {
                        const {nid,nursery_name, pid} = item;
                        const {street, suiteNum, city, province, postal} = item;
                        const {phone, email, price} = item;
                        return (
                        <PlantNurseryItem 
                                index={index}
                                key={nid}
                                id={nid}
                                name={nursery_name}
                                plant_id={pid}
                                street={street}
                                suiteNum={suiteNum}
                                city={city}
                                province={province}
                                postal={postal}
                                phone={phone}
                                email={email} 
                                price={price}                               
                                >
                        </PlantNurseryItem>)
                    })}
                </section>
            
            </>
        )
    }
}