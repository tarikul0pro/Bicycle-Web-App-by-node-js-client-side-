import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import useAuth from '../hooks/useAuth.js';
import { useHistory, useLocation } from 'react-router';
import Button from '@restart/ui/esm/Button';



const Login = () => {
    const { user,
        isLoading,
        authError,
        signInWithGoogle,       
        loginUser
    } = useAuth()
    const [loginData, setLoginData] = useState({})
    console.log(loginData);
    const location = useLocation();
    const history = useHistory();



    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData)
    }

    const handleLoginSubmit = e => {
        e.preventDefault()
        loginUser(loginData.email, loginData.password, location, history
)
        
}   

    const googleSignInHandle = e => {
        signInWithGoogle(location, history);
        e.preventDefault();
    }

    return (

        <Container>
  <Row>
    <Col>
             <div class="col-md-4 offset-md-4">
                    <div class="login-form bg-light mt-4 p-4">
                                <h1 className="text-center">Login</h1>
                                <form onSubmit={handleLoginSubmit}>
                                    <div class="col-12">
                                        <label>your email</label>
                                    <input type="text"
                                        name="email"
                                        onChange={handleOnChange}class="form-control"
                                        
                                        placeholder="email" />
                                    </div>
                                    <div class="col-12">
                                        <label>Password</label>
                                    <input type="password"
                                        name="password"
                                        onChange={handleOnChange}    class="form-control"
                                      placeholder="your password" />
                                    </div><br />
                                <Button type="submit" className=" ms-0 btn btn-primary login-btn btn-block w-100" variant="">Log-In</Button><br />
                                
                                <NavLink className="text-decoration-none text-center" to="/register">
                                    New user please register
                                </NavLink> <br /><br />
                               
                                
                                <button className="bg-warning text-center w-100"  onClick={googleSignInHandle}>Continue with google
                                </button>


                                </form>
                           
                            
                           
                       
                    </div>
                </div>
    </Col>
    
  </Row>
  
  
</Container>
        


        
    );
};

export default Login;