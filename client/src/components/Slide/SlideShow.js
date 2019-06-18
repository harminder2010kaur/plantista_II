import React, {Component} from 'react';
import './SlideShow.scss';
import makeCarousel from 'react-reveal/makeCarousel';
import Slide from 'react-reveal/Slide';

import plant1 from '../../slide/basil2.jpg';
import slide1 from '../../slide/flower6.jpg';
import slide2 from '../../slide/slide2.jpg';
import slide3 from '../../slide/hanging_basket4.jpg';
import slide4 from '../../slide/slide4.jpg';
import slide5 from '../../slide/plant1a.jpg';
import slide6 from '../../slide/slide6.jpg';
import slide7 from '../../slide/slide7a.jpg';
import slide8 from '../../slide/slide8.jpg';

const CarouselUI = ({ children }) => <div className="containerSlide">{children}</div>;
const Carousel = makeCarousel(CarouselUI);

const slideImages = [
  plant1, slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8
];


class SlideShow extends Component {  
  render(){
  return (
    
      <div className="outer">
        <Carousel defaultWait={2000} forever="true" /*wait for 1000 milliseconds*/ >
            {slideImages.map( (image,index) => (
              <Slide right key={index}>
                <div className="each-slide">
                    <div style={{backgroundImage: `url(${image})`}}>                                      
                    </div>
                </div>
              </Slide>  
            ))}

        </Carousel>
      </div>
    
  );
}
}
export default SlideShow;