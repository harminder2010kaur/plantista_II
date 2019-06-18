import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.scss';
import searchIcon from '../../assets/images/search1.png';
import Search from './search';
import axios from 'axios';
import serverUrl from '../../serverUrl';


class NavBar extends Component{

    state = {
        menu_class: '',
        search: [],
        searchBar: false,
        close: false
    }

    componentDidMount(){
        this.getPlants();
    }

    getPlants = () => {
        axios.get(`${serverUrl}/plants/name`)
             .then(response => {

                var mapped = response.data.map(item => (item.name) );
                var newObj = Object.assign(mapped);
                 this.setState({search: newObj});
             })
             .catch(error => {
                 console.log(error);
             });
    }

    search = () => {
        this.setState({searchBar: true, close: false});
    }

    close = (e) => {
        this.setState({close: true,searchBar: false});        
    }
    
    render()    
    {                  
        return(
            <>
                <div className="navBar">
                    <div className="navBar__left">
                        <div className="menuToggle">                            
                            <input type="checkbox" />    
                            <span></span>
                            <span></span>
                            <span></span>    
                            <ul className="menu">
                                <NavLink to="/" className="link"><li>Home</li></NavLink>
                                <NavLink to="/type" className="link"><li>Plants Type</li></NavLink>
                                <NavLink to="/plants" className="link"><li>Plants</li></NavLink>
                                <NavLink to="/nursery" className="link"><li>Nursery</li></NavLink>                                                        
                                <NavLink to="/user/list" className="link"><li>User List</li></NavLink>                                                        
                                <NavLink to="/contactUs" className="link"><li>Contact Us</li></NavLink>                            
                            </ul>                        
                        </div>
                    </div>
            
                    <div className="navBar__logo">PLANTISTA</div>
                    <div className="navBar__right">
                        <img src={searchIcon} onClick={this.search} alt="Search" className="navBar__searchIcon"/>
                    </div>                      
                    <Search display={this.state.searchBar} close={this.close} suggestions={this.state.search}/>                                    
                </div>            
            </>
        )
    }
}

export default NavBar;