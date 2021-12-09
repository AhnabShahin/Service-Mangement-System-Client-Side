import React from 'react';
import { useForm } from "react-hook-form";
import { Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import useAuth from '../../../../Hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

const VendorRegistration = () => {
    const { register, handleSubmit, watch, reset, setError, formState: { errors } } = useForm();
    const { joinWithGoogle, setUser, user, signInWithEmailAndPassword, createUserWithEmailAndPassword, auth, updateProfile } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const redirect_URL = location.state?.from || '/'

    const onSubmit = data => {
        data["role"] = "vendor";
        async function postUser(data) {
            await axios.post('http://localhost:5000/add-user', data).then(res => {
                createUserWithEmailAndPassword(auth, data.email, data.password)
                    .then((userCredential) => {
                        const newUser = { email: data.email, displayName: data.displayName, role: data.role }
                        updateProfile(auth.currentUser, {
                            displayName: data.displayName,
                            photoURL: data.photoURL,
                        });
                        setUser(newUser);
                    })
            });
        }
        postUser(data);
        reset();
        navigate('/login');
    }


    return (

            <Container>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row ">
                        <div className="form-group col-md-6 mx-auto my-3">
                            <label htmlFor="displayName">Your Shop Name   {errors.displayName && <span className="text-danger">  This field is required</span>}</label>
                            <input type="displayName" className="form-control" id="displayName" {...register("displayName", { required: true })} placeholder="Enter your shop name.." />
                        </div>
                        <div className="form-group col-md-6 mx-auto my-3">
                            <label htmlFor="email">Your email   {errors.email && <span className="text-danger">  This field is required</span>}</label>
                            <input type="email" className="form-control" id="email" {...register("email", { required: true })} placeholder="Enter your email.." />
                        </div>
                        <div className="form-group col-md-6 mx-auto my-3">
                            <label htmlFor="photoURL">Your Shop logo url   {errors.photoURL && <span className="text-danger">  This field is required</span>}</label>
                            <input type="text" className="form-control" id="photoURL" {...register("photoURL", { required: true })} placeholder="Enter your shop url.." />
                        </div>
                        <div className="form-group col-md-6 mx-auto my-3">
                            <label htmlFor="password">Password {errors.password && <span className="text-danger">  This field is required</span>}</label>
                            <input type="password" className="form-control" id="password" {...register("password", { required: true })} placeholder="Password" />
                        </div>
                        <div className="form-group col-md-6 mx-auto my-3">
                            <label htmlFor="confirmPassword">Confirm Password
                                {errors.confirmPassword && <span className="text-danger">  This field is required</span>}
                                {errors.wrongPassword && <span className="text-danger"> {errors.wrongPassword.message}</span>}
                            </label>
                            <input type="password" className="form-control" id="confirmPassword" {...register("confirmPassword", { required: true })} placeholder="Confirm Password" />
                        </div>
                        <div className="form-group col-md-6 mx-auto my-3">
                            <label htmlFor="phoneNo">Phone No
                                {errors.phoneNo && <span className="text-danger">  This field is required</span>}
                                {errors.phoneNo && <span className="text-danger"> {errors.phoneNo.message}</span>}
                            </label>
                            <input type="number" className="form-control" id="phoneNo" {...register("phoneNo", { required: true })} placeholder="Phone no" />
                        </div>
                        <div className="form-group col-md-6 mx-auto my-3">
                            <label htmlFor="nationalId">Owner National Id
                                {errors.nationalId && <span className="text-danger">  This field is required</span>}
                                {errors.nationalId && <span className="text-danger"> {errors.nationalId.message}</span>}
                            </label>
                            <input type="number" className="form-control" id="nationalId" {...register("nationalId", { required: true })} placeholder="National Id" />
                        </div>
                        <div className="form-group col-md-6 mx-auto my-3">
                            <label htmlFor="dateOfBirth">Date of birth
                                {errors.dateOfBirth && <span className="text-danger">  This field is required</span>}
                                {errors.dateOfBirth && <span className="text-danger"> {errors.dateOfBirth.message}</span>}
                            </label>
                            <input type="date" required className="form-control" id="dateOfBirth" {...register("dateOfBirth", { required: true })} placeholder="Date of birth" />
                        </div>
                        <div className="form-group col-md-6 mx-auto my-3">
                            <label htmlFor="role">Choose a yourr role</label>
                            <select id="role" className="form-control"{...register("role", { required: true, disabled: true })}>
                                <option value="vendor">Vendor</option>
                            </select>
                        </div>

                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="main-button " ><span>Registration</span></button>
                    </div>


                </form>
            </Container>

    );
};

export default VendorRegistration;