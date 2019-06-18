import React, {Component} from 'react';
import './UserListItem.scss'

class UserListItem extends Component {
    render() {        
        const address = `${this.props.address}, ${this.props.postal}`;
        const created = this.props.order_created;
        const received = this.props.order_received;
        const completed = this.props.order_completed;
        let style = '';
        if(created === 'y' && received === 'n')
        {
            style = "created";
        }
        else if(received === 'y' && completed === 'n')
        {
            style = "received";
        }
        else
        {
            style = "completed";
        }
        return (
            
            <section className="userListItem">                    
                {this.props.index===0 ? <div className="userListItem__labels">
                    <h1 className="userListItem__labels__userList">USER</h1>
                    <h1 className="userListItem__labels__contact">CONTACT INFORMATION</h1>
                    <h1 className="userListItem__labels__info">ORDER FROM</h1>
                    <h1 className="userListItem__labels__price">PRICE</h1>
                    <h1 className="userListItem__labels__status">STATUS</h1>
                </div> : null}
                <div className="userListItem--desk">
                    <div className="userListItem__header--flexRow">
                        <div className="userListItem__header--desk">
                            <h2 className="userListItem__header">{this.props.user_name}</h2>
                            <div className="userListItem__address">{address}</div>
                        </div>
                        <button className="userListItem__button"><div className={style}/></button>
                    </div>
                    <div className="userListItem--tablet">
                        <div>
                            <div className="userListItem__name">{this.props.phone}</div>
                            <div className="userListItem__title">{this.props.email}</div>
                        </div>
                        <div>
                            <div className="userListItem__phone">{this.props.nur_name}</div>
                            <div className="userListItem__email">{this.props.plant_name}</div>
                        </div>
                        <div className="userListItem__categories">
                        <span className="display">Price:</span> {this.props.price}$</div>
                        <button className="userListItem__button2"><div className={style}/></button>
                    </div>
                </div>
            </section>
               
        );
    }
}

export default UserListItem;