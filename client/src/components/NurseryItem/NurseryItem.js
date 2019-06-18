import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './NurseryItem.scss'
import rightArrow from '../../assets/images/Icon-arrow-right.svg';

class NurseryItem extends Component {
    render() {
        const address = `${this.props.street}, ${this.props.city}, ${this.props.province}`
        return (
            <section className="nurseryItem">
                {this.props.index===0 ? <div className="nurseryItem__labels">
                    <h1 className="nurseryItem__labels__nursery">NURSERY</h1>                    
                    <h1 className="nurseryItem__labels__info">CONTACT INFORMATION</h1>                    
                </div> : null}
                <div className="nurseryItem--desk">
                <div className="nurseryItem__header--flexRow">
                    <div className="nurseryItem__header--desk">
                        <h2 className="nurseryItem__header">{this.props.name}</h2>
                        <div className="nurseryItem__address">{address}</div>
                    </div>
                    <Link to={'/byNursery/' + this.props.id} ><button className="nurseryItem__button"><img src={rightArrow} alt="inventory"/></button></Link>
                </div>
                <div className="nurseryItem--tablet">
                    
                    <div>
                        <div className="nurseryItem__phone">{this.props.phone}</div>
                        <div className="nurseryItem__email">{this.props.email}</div>
                    </div>                    
                    <Link to={'/byNursery/' + this.props.id} ><button className="nurseryItem__button2"><img src={rightArrow} alt="inventory"/></button></Link>
                </div>
                </div>
            </section>
               
        );
    }
}

export default NurseryItem;