import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const AddService = () => {
    const [subCategories, setSubCategories] = useState([]);
    const [category, setCategory] = useState([]);
    const [massage, setMassage] = useState(null);

    const { register, handleSubmit, watch, reset, setError, formState: { errors } } = useForm();
    useEffect(() => {
        async function getCategory(data) {
            await axios.get('http://localhost:5000/get-categories', data).then(res => {
                setCategory(res.data);
            });
        }
        getCategory();
    }, [])
    const onSubmitForm = data => {
        async function postService(data) {
            await axios.post('http://localhost:5000/save-service', data).then(res => {
                setMassage(res.data);
            });
        }
        postService(data);
        reset()
        console.log(data)
    }

    const handleCategorySelect = (category) => {
        async function getSubCategory(category) {
            await axios.get(`http://localhost:5000/get-subcategories/${category}`,).then(res => {
                if (res.data.subCategoryName) {
                    setSubCategories(res.data.subCategoryName);
                }else{
                    setSubCategories([])
                }
            });
        }
        getSubCategory(category)
    }
    return (
        <div>
            {massage != '' ? <h1>{massage}</h1> : <></>}
            <form onSubmit={handleSubmit(onSubmitForm)}>
                <div className="form-row ">
                    <div className="form-group col-md-6 mx-auto my-3">
                        <label htmlFor="serviceName">Service Name   {errors.serviceName && <span className="text-danger">  This field is required</span>}</label>
                        <input type="text" className="form-control" id="serviceName" {...register("serviceName", { required: true })} placeholder="Enter service name.." />
                    </div>
                    <div className="form-group col-md-6 mx-auto my-3">
                        <label htmlFor="serviceDescription">Service Description   {errors.serviceDescription && <span className="text-danger">  This field is required</span>}</label>
                        <textarea type="text" className="form-control" id="serviceDescription" {...register("serviceDescription", { required: true })} placeholder="Enter service Description.." />
                    </div>
                    <div className="form-group col-md-6 mx-auto my-3">
                        <label htmlFor="serviceType">Choose service type</label>
                        <select id="role" className="form-control"{...register("serviceType", { required: true })}>
                            <option value="paid">Paid</option>
                            <option value="free">free</option>
                        </select>
                    </div>
                    <div className="form-group col-md-6 mx-auto my-3">
                        <label htmlFor="cost">Service cost   {errors.cost && <span className="text-danger">  This field is required</span>}</label>
                        <input type="text" className="form-control" id="cost" {...register("cost", { required: true })} placeholder="Enter service cost.." />
                    </div>
                    <div className="form-group col-md-6 mx-auto my-3">
                        <label htmlFor="categoryName">Choose a category</label>
                        <select id="categoryName" className="form-control"{...register("categoryName", { required: true, onChange: (e) => (handleCategorySelect(e.target.value)) })}>
                        <option value='noCategory'>Select a Category</option>
                            {category.map(ele => (
                                <option value={ele.categoryName}>{ele.categoryName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group col-md-6 mx-auto my-3">
                        <label htmlFor="subCategoryName">Choose a sub category</label>
                        <select id="subCategoryName" className="form-control"{...register("subCategoryName", { required: true })}>
                            {subCategories.length > 0 ?
                                subCategories.map((subCategory) => (<option value={subCategory}>{subCategory}</option>)) :
                                <option value="noSubCategory">No sub category found</option>
                            }
                        </select>
                    </div>
                    <div className="form-group col-md-6 mx-auto my-3">
                        <label htmlFor="image">Choose banner</label>
                        <input type="text" className="form-control" id="image" {...register("image", { required: true })} placeholder="Enter service image.." />
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="main-button " ><span>Registration</span></button>
                </div>
            </form>
        </div>
    );
};

export default AddService;