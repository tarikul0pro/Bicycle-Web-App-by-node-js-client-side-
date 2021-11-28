import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllProducts = () => {

    const [allProducts, setProducts] = useState([])


    useEffect(() => {
        fetch('https://nameless-badlands-61718.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])


    return (
        <div className="container">
            <div className="educations">
                <div className="row">
                    {
                        allProducts.map((bicycle) => (<div className="col-md-4">
                            <div className="cart">
                                <div className="logo-img">
                                    <img className="w-75" src={bicycle.img} alt="" />
                                </div>
                                <p className="name"> Name:{bicycle.name}</p>
                                <p className="name"> price:{bicycle.price}</p>
                                <p className="name"> description:{bicycle.description}</p>


                                <Link to={`/product/${bicycle._id}`}>
                                    <button to="/purchase" className="btn btn-danger d-block mx-auto w-100">purchase now</button></Link>




                            </div>
                        </div>
                        ))
                    }
                </div>
            </div>

        </div>
    );
};

export default AllProducts;