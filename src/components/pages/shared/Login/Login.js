import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import useAuth from '../../../../Hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";


const Login = () => {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const { joinWithGoogle, setUser, user, signInWithEmailAndPassword, auth,setIsloading } = useAuth();
    const [massage, setMassage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const redirect_URL = location.state?.from || '/admin/dashboard'
    const onSubmit = data => {
        async function postUser(data) {
            await axios.post('http://localhost:5000/customer-login', data).then(res => {
                if (res.data.email) {
                    setUser({
                        "email":res.data.email,
                        "displayName":res.data.displayName
                    })
                    signInWithEmailAndPassword(auth, data.email, data.password)
                    .then((userCredential) => {
                        navigate(redirect_URL);
                    })
                } else {
                    setMassage(res.data)
                }
            })
        }
        postUser(data)
    }
    const loginWithGoogle = () => {
        joinWithGoogle()
            .then((res) => {
                const userData = {
                    photoURL: res.user.photoURL,
                    displayName: res.user.displayName,
                    email: res.user.email,
                    role: "customer"
                }
                async function postCategory(userData) {
                    await axios.post('http://localhost:5000/add-user', userData).then(res => {
                    });
                }
                postCategory(userData);
                navigate(redirect_URL);
            })
    }
    return (
        <>
            <Container>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {massage != '' ? <h1>{massage}</h1> : <></>}
                    <div className="form-row ">
                        <div className="form-group col-md-6 mx-auto my-3">
                            <label htmlFor="email">Your email   {errors.email && <span className="text-danger">  This field is required</span>}</label>
                            <input type="email" className="form-control" id="email" {...register("email", { required: true })} placeholder="Enter your email.." />
                        </div>
                        <div className="form-group col-md-6 mx-auto my-3">
                            <label htmlFor="password">Password {errors.password && <span className="text-danger">  This field is required</span>}</label>
                            <input type="password" className="form-control" id="password" {...register("password", { required: true })} placeholder="password" />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="main-button" ><span>Login</span></button>
                    </div>
                </form>
                <hr className="" />
                <h4 className="text-center">OR</h4>
                <div className="d-flex justify-content-center">
                    <Link to="/customer/registration" type="submit" className="main-button"><span>Registration</span></Link>
                </div>
                <hr className="bgColorThird" />
                <div className="d-flex justify-content-center m-3">
                    <button className="main-button"><span onClick={loginWithGoogle}>Join With Google</span></button>
                </div>
            </Container>
        </>
    );
};

export default Login;