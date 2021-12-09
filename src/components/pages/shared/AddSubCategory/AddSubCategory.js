import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from "react-hook-form";
import useAuth from './../../../../Hooks/useAuth';

const AddSubCategory = (props) => {
    const {categoryAdded} = props;
    const { user } = useAuth();
    const [massage, setMassage] = useState('');

    const [category, setCategory] = useState([]);
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    
    useEffect(() => {
        async function getCategory(data) {
            await axios.get('http://localhost:5000/get-categories', data).then(res => {
                setCategory(res.data);
            });
        } 
        getCategory();
    }, [categoryAdded])
    const subCategorySubmit = data => {
        async function postSubCategory(updated_category) {
            await axios.post('http://localhost:5000/add-subCategory', updated_category).then(res => {
                setMassage(res.data);
            });
        }
        const newSubCategoryName=data.subCategoryName;
        const result=category.find(ele=>ele.categoryName==data.categoryName)
        if(result.subCategoryName){
            result.subCategoryName.push(newSubCategoryName);
        }else{
            result['subCategoryName']=[newSubCategoryName];
        }
        postSubCategory(result);
        reset();
    };
    return (
        <>
            <form onSubmit={handleSubmit(subCategorySubmit)}>
                {massage != '' ? <h1>{massage}</h1> : <></>}
                <div className="form-row mt-5 ">
                    <div className="form-group col-md-12 mx-auto my-3">
                        <h3>Wanna add sub category</h3>
                        <label htmlFor="categoryName">Choose a category</label>
                        <select id="categoryName" className="form-control"{...register("categoryName", { required: true })}>
                            {category.map(ele => (
                                <option value={ele.categoryName}>{ele.categoryName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group col-md-12 mx-auto my-3">
                        <label htmlFor="subCategoryName">Sub Category Name   {errors.subCategoryName && <span className="text-danger">  This field is required</span>}</label>
                        <input type="text" className="form-control" id="subCategoryName" {...register(`subCategoryName`, { required: true })} placeholder="Enter Sub Category Name.." />
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-secondary" ><span>Add sub category</span></button>
                </div>
            </form>
        </>
    );
};

export default AddSubCategory;