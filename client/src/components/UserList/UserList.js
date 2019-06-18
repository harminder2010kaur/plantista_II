import React, { Component } from 'react';
import './UserList.scss';
import axios from 'axios';
import UserListItem from './UserListItem';
import serverUrl from '../../serverUrl';

export default class PlantName extends Component {
    state = {
        userList: [],        
        count: 0
    }

    componentDidMount()
    {                     
        this.getUserList();
    }

    getUserList = () => {
        axios.get(`${serverUrl}/plants/user/list`)
             .then(response => {                 
                 let count = response.data.length;
                 this.setState({userList: response.data, count: count});
             })
             .catch(error => {
                 console.log(error);
             });
    }
    render(){        
        return (
            <>
                <div className="user-list-heading">
                    Customer List                
                </div>
                
                <div className="user-list-section">
                    <div className="info">
                    <div className="bars">
                        <div className="created"></div>
                            <span className="bars__heading">Order Created</span>                        
                    </div>
                    <div className="bars">
                        <div className="received"></div>
                            <span className="bars__heading">Order Received</span>                        
                    </div>
                    <div className="bars">
                        <div className="completed"></div>
                            <span className="bars__heading">Order Completed</span>                        
                    </div>
                    </div>
                <section className="user-list-items">
                    {this.state.userList.map((item, index) => {                        
                        const {nursery_id, nursery_name, plant_id, name} = item;
                        const {id, user_name, order_created, order_received, order_completed} = item;
                        const {user_phone, user_email, user_address, user_postal, price} = item;                        
                        return (
                        <UserListItem 
                                index={index}
                                key={index}                                
                                nur_id={nursery_id}
                                nur_name={nursery_name}
                                plant_id={plant_id}
                                plant_name={name}
                                user_id={id}
                                user_name={user_name}
                                order_created={order_created}
                                order_received={order_received}
                                order_completed={order_completed}
                                address={user_address}
                                postal={user_postal}
                                phone={user_phone}
                                email={user_email} 
                                price={price}                               
                                >
                        </UserListItem>)
                    })}
                </section>
                </div>
            </>
        )
    }
}