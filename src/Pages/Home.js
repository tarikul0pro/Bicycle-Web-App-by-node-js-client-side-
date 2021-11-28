import React from 'react';
import { Carousel } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import FeatureProduct from './FeatureProduct.js';
import Service from './Service.js';

const Home = () => {
    return (
        <div className="mt-2">
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://image.freepik.com/free-photo/red-sports-bike_1159-812.jpg?1"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>welcome to bicycle world</h3>
                        <p>We offer high quality bicycle at unbelievable price & creates pleasant buying experience.</p>
                        <NavLink className="w-25 d-block bg-warning mx-auto" to="/allproducts">explore more</NavLink>
                    </Carousel.Caption>
                </Carousel.Item>
                
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://image.freepik.com/free-photo/crop-man-riding-bicycle-sunset_251859-2773.jpg"
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>BEST PLACE FOR bicycle</h3>
                        <p>We offer high quality bicycle at unbelievable price & creates pleasant buying experience..</p>
                        <NavLink className="w-25 d-block bg-warning mx-auto" to="/allproducts">explore more</NavLink>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://image.freepik.com/free-photo/hipster-bicycle-morning-sunrise-by-sea_285396-5393.jpg"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>FIND YOUR DREAM bicycle</h3>
                        <p>We offer high quality bicycle at unbelievable price & creates pleasant buying experience..</p>
                        <NavLink className="w-25 d-block bg-warning mx-auto" to="/allproducts">explore more</NavLink>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>



            <FeatureProduct></FeatureProduct>
            <Service></Service>
        </div>
        
    );
};

export default Home;