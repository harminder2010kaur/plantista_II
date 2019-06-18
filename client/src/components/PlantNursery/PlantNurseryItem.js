import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './PlantNurseryItem.scss'
import buy_now from '../../assets/images/buy_now.png';

class PlantNurseryItem extends Component {
    render() {        
        const address = `${this.props.street}, ${this.props.city}, ${this.props.province}`
        return (
            <section className="nurseryItem">
                {this.props.index===0 ? <div className="nurseryItem__labels">
                    <h1 className="nurseryItem__labels__nursery">NURSERY</h1>                    
                    <h1 className="nurseryItem__labels__info">CONTACT INFORMATION</h1>   
                    <h1 className="warehouseItem__labels__price">PRICE</h1>                                     
                </div> : null}
                <div className="nurseryItem--desk">
                <div className="nurseryItem__header--flexRow">
                    <div className="nurseryItem__header--desk">
                        <h2 className="nurseryItem__header">{this.props.name}</h2>
                        <div className="nurseryItem__adress">{address}</div>
                    </div>
                    <Link to={'/buy/' + this.props.id +'/plant/' + this.props.plant_id} ><button className="nurseryItem__button"><img src={buy_now} className="nurseryItem__button--image" alt="inventory"/></button></Link>
                </div>
                <div className="nurseryItem--tablet">                    
                    <div>
                        <div className="nurseryItem__phone">{this.props.phone}</div>
                        <div className="nurseryItem__email">{this.props.email}</div>
                        {/* <div className="nurseryItem__price"><span>Price:</span> {this.props.price}$</div> */}
                    </div>   
                    <div className="nurseryItem__price"><span className="display">Price:</span> {this.props.price}$</div>                 
                    <Link to={'/buy/' + this.props.id +'/plant/' + this.props.plant_id} ><button className="nurseryItem__button2"><img src={buy_now} className="nurseryItem__button--image" alt="inventory"/></button></Link>
                </div>
                </div>
            </section>
               
        );
    }
}

export default PlantNurseryItem;