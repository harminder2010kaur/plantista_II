import React, { Component } from 'react';
import './MoreInfoModel.scss';
import close from '../../assets/images/cross.png';

export default class MoreInfoModel extends Component {
    state = {
        plants: ''
    }


    render(){
        const model_div = this.props.display === true ? "infoModel true" : "infoModel false";     
        const activeId = this.props.activeId;                    
        return(
            <>
            <div className={model_div}>
               <div className="infoModel-content">
                {/* <div className="infoModel-content__close">
                    <img src={close} alt="close" onClick={this.props.close}/>
                </div> */}
                {this.props.moreInfo
                    .filter(infoList => infoList.id === activeId)
                    .map((infoList, index) =>
                    <div key={index}>
                        <div className="infoModel-content__header">
                            <div className="infoModel-content__header--head">
                                {infoList.name}
                            </div>
                            <div className="infoModel-content__header--close">
                                <img src={close} alt="close" onClick={this.props.close}/>
                            </div>    
                        </div>                        
                        <div className="infoModel-content__info">
                            <div className="infoModel-content__info--left">
                                Category : 
                            </div>
                            <div className="infoModel-content__info--right">
                                {infoList.category}    
                            </div>                        
                        </div>
                        <div className="infoModel-content__info">
                            <div className="infoModel-content__info--left">
                                Description : 
                            </div>
                            <div className="infoModel-content__info--right">
                                {infoList.description}    
                            </div>                        
                        </div>
                        <div className="infoModel-content__info">
                            <div className="infoModel-content__info--left">
                                Light Req : 
                            </div>
                            <div className="infoModel-content__info--right">
                                {infoList.light_requirements}    
                            </div>                        
                        </div>
                        <div className="infoModel-content__info">
                            <div className="infoModel-content__info--left">
                                Water Req : 
                            </div>
                            <div className="infoModel-content__info--right">
                                {infoList.water_requirements}    
                            </div>                        
                        </div>
                        <div className="infoModel-content__info">
                            <div className="infoModel-content__info--left">
                                Soil Req : 
                            </div>
                            <div className="infoModel-content__info--right">
                                {infoList.soil_requirements}    
                            </div>                        
                        </div>
                        <div className="infoModel-content__info">
                            <div className="infoModel-content__info--left">
                                Planting Space : 
                            </div>
                            <div className="infoModel-content__info--right">
                                {infoList.planting_Space}    
                            </div>                        
                        </div>
                        <div className="infoModel-content__info">
                            <div className="infoModel-content__info--left">
                                Common Issues : 
                            </div>
                            <div className="infoModel-content__info--right">
                                {infoList.common_issues}    
                            </div>                        
                        </div>                        
                        <div className="infoModel-content__info">
                            <div className="infoModel-content__info--left">
                                Harvesting : 
                            </div>
                            <div className="infoModel-content__info--right">
                                {infoList.harvesting}    
                            </div>                        
                        </div>
                        <div className="infoModel-content__info">
                            <div className="infoModel-content__info--left">
                                Storage Wrap : 
                            </div>
                            <div className="infoModel-content__info--right">
                                {infoList.storage_wrap}    
                            </div>                        
                        </div>
                        <div className="infoModel-content__info">
                            <div className="infoModel-content__info--left">
                                Others : 
                            </div>
                            <div className="infoModel-content__info--right">
                                {infoList.others}    
                            </div>                        
                        </div>
                     </div>   
                )}
                
                </div>    
            </div>
            </>
        )
    }
}