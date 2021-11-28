import Button from '@restart/ui/esm/Button';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import "./Headers.css"
const Headers = () => {
    const { user, logOut}=useAuth()
    return (
        <div className="">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Navbar</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                            <Nav.Link as={Link} to="/home">
                              Home
                            </Nav.Link>
                            <Nav.Link as={Link} to="/allproducts">
                               AllProducts 
                            </Nav.Link>
                            
                           
                            
                            {
                                user?.email ?
                                  
                                        
                                    <div className="d-flex">
                                        <Nav.Link as={Link} to="/dashboard">
                                            Dashboard
                                        </Nav.Link>


                                        <Nav.Link onClick={logOut} as={Link}>
                                            LogOut
                                        </Nav.Link>

                                    </div>
                                   
                                
                                :
                                    
                                    
                            <Nav.Link as={Link} to="/login">
                                Login
                            </Nav.Link>
                            }
                        </ul>
                     
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Headers;