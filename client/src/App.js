import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './style.scss';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import PlantTypes from '../src/components/PlantTypes/PlantTypes';
import Plants from '../src/components/Plants/Plants';
import Nursery from '../src/components/Nursery/Nursery';
import ContactUs from '../src/components/ContactUs/ContactUs';
// import NurseryPlants from '../src/components/NurseryPlants/NurseryPlants';
import PlantNursery from '../src/components/PlantNursery/PlantNursery';
import TypePlants from '../src/components/TypePlants/TypePlants';
import PlantName from './components/PlantName/PlantName';
import PlantList from './components/PlantList/PlantList';
import BuyPlant from './components/BuyPlant/BuyPlant';
import UserList from './components/UserList/UserList';

class App extends Component {
  render(){
  return (
    <div>
      <BrowserRouter>       
        <NavBar /> 
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/type" component={PlantTypes} />
            <Route exact path="/plants" component={Plants} />
            <Route exact path="/nursery" component={Nursery} />
            <Route exact path="/contactUs" component={ContactUs} />
            <Route exact path="/byNursery/:id" component={PlantList} />
            <Route exact path="/byPlant/:id" component={PlantNursery} />} />
            <Route exact path="/name/:name" component={PlantName} />
            {/* <Route exact path="/byNursery/:id" component={PlantList} /> */}
            <Route exact path="/types/:type" component={TypePlants} />            
            <Route exact path="/buy/:nid/plant/:pid" component={BuyPlant} />
            <Route path="/user/list" component={UserList} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
}

export default App;
