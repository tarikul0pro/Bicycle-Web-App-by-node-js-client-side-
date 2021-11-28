
import { useState } from "react";
import {
    Button,
    Container,
    Form,
    FormControl,
    InputGroup,
} from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import useAuth from "../hooks/useAuth.js";

const Register = () => {
    const { error, createUser, getUserPassword, getUserEmail, handleSubmitForm, getUserName } = useAuth();

    const [loginData, setLoginData] = useState({});


    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }


    const handelSubmit = (e) => {
        e.preventDefault()
        createUser(loginData?.email, loginData?.password, loginData?.name)
    }


    return (
        <div>

            <Container className="d-flex align-items-center justify-content-center my-5">

                <form className="border p-5" onSubmit={(e)=>handelSubmit(e)}>
                    <h6>Please !</h6>
                    <hr />
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1" ></InputGroup.Text>
                        <FormControl
                            name="name"
                            onChange={handleOnChange}
                            required placeholder="Enter Your Name"
                            aria-label="Username"
                            aria-describedby="basic-addon1"

                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1" required></InputGroup.Text>
                        <FormControl
                            
                            name="email"
                            onChange={handleOnChange}
                            
                            required type="email"
                            placeholder="Enter Your Email"
                            aria-label="UserEmail"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"></InputGroup.Text>
                        <FormControl
                            
                            
                            name="password"
                            onChange={handleOnChange}
                            
                            required type="password"
                            placeholder="Password"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <div className="text-center">
                        <Button  type="submit" className=" ms-0 btn btn-primary login-btn btn-block w-100" variant="">Register</Button>
                    </div>
                    
                    <div className="text-danger">
                        <p>{error}</p>
                    </div>
                    <p className="mt-2">
                        <NavLink className="text-decoration-none" to="/login">
                            Already have an Account? Please Login!
                        </NavLink>
                    </p>
                </form>
            </Container>

        </div>
    );
};

export default Register;