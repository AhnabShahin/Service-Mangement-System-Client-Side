import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import useAuth from './../../../../Hooks/useAuth';

const AddCategory = (props) => {
    const { user } = useAuth();
    const {massage, setMassage} = props;
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        async function postCategory(data) {
            await axios.post('http://localhost:5000/add-category', data).then(res => {
                setMassage(res.data);
            });
        }
        postCategory(data);
        reset();
    };
    
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Wanna add category</h3>
                <div className="form-row ">
                    {massage.flash != '' ? <h1>{massage.flash}</h1> : <></>}
                    <div className="form-group col-md-12 mx-auto my-3">
                        <label htmlFor="categoryName">Category Name   {errors.categoryName && <span className="text-danger">  This field is required</span>}</label>
                        <input type="text" className="form-control" id="categoryName" {...register("categoryName", { required: true })} placeholder="Enter Category Name.." />
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-secondary" ><span>Add new Item</span></button>
                </div>
            </form>
        </>
    );
};

export default AddCategory;