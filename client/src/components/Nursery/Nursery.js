import React, { Component } from 'react';
import './Nursery.scss';
import axios from 'axios';
import NurseryItem from '../NurseryItem/NurseryItem';
import serverUrl from '../../serverUrl';

export default class Nursery extends Component {
    state = {
        nursery: []
    }

    componentDidMount(){
        this.getNursery();
    }

    getNursery = () => {
        axios.get(`${serverUrl}/plants/nursery`)
             .then(response => {
                 this.setState({nursery: response.data});
             })
             .catch(error => {
                 console.log(error);
             });
    }
    render(){        
        return(
            <>
                <div className="nursery-heading">
                      List of Nurseries                 
                </div>
                <section className="nursery-items">
                    {this.state.nursery.map((item, index) => {
                        const {id,name,street, suiteNum, city, province, postal,phone, email} = item;                        
                        return (
                        <NurseryItem 
                                index={index}
                                key={id}
                                id={id}
                                name={name}
                                street={street}
                                suiteNum={suiteNum}
                                city={city}
                                province={province}
                                postal={postal}
                                phone={phone}
                                email={email}                                
                                >
                        </NurseryItem>)
                    })}
                </section>
            </>
        )
    }
}