import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const AllServices = () => {
    const [massage, setMassage] = useState({});
    const [services, setServices] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const { register, handleSubmit, watch, reset, setError, formState: { errors } } = useForm();
    const onSubmitForm= data=>{

    }

    useEffect(() => {
        async function getServices(data) {
            await axios.get('http://localhost:5000/get-services', data).then(res => {
                setServices(res.data);
            });
        }
        getServices();
    }, [])
    var value = '';
    const handleWantToDelete = (deleteItem) => {
        setSelectedItem(deleteItem);
    }
    const handleDeleteService = (serviceId) => {
        async function deleteService() {
            await axios.delete(`https://assault-rifles-backend-api.herokuapp.com/delete-order/${serviceId}`).then(res => {
                setMassage(res.data);
            });
        }
        deleteService();
    }

    const handleWantToEditService = (editServiceItem) => {
        setSelectedItem(editServiceItem);
    }
    const handleOnChangeStatus = (e) => {
        value = e.target.value;
    }
    const handleStatusChange = (serviceId) => {
        async function updateStatus() {
            await axios.put(`https://assault-rifles-backend-api.herokuapp.com/update-order-status/${serviceId}/${value}`).then(res => {
                setMassage(res.data);
            });
        }
        updateStatus();

    }
    
    return (
        <div>
            {/* status modal */}
            <div className="modal editServiceModal fade " id="editServiceModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog  " role="document">
                    <div className="modal-content bg-color-main">
                        <div className="modal-header bgColorMain">
                            <h5 className="modal-title text-color-second" id="exampleModalLongTitle ">Are You sure Want To change statye!!</h5>
                            <div type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span className="cancel-x" aria-hidden="true">&times;</span>
                            </div>
                        </div>
                        <div className="modal-body bgColorMain">
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
                                        <select id="categoryName" className="form-control"{...register("categoryName", { required: true })}>
                                        <option value={selectedItem.categoryName}>{selectedItem.categoryName}</option>
                                            {/* {category.map(ele => (
                                                <option value={ele.categoryName}>{ele.categoryName}</option>
                                            ))} */}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-6 mx-auto my-3">
                                        <label htmlFor="subCategoryName">Choose a sub category</label>
                                        <select id="subCategoryName" className="form-control"{...register("subCategoryName", { required: true })}>

                                            <option value="as">subcategory</option>

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
                        {selectedItem ?
                            <div className="modal-footer bgColorFourth">
                                <button type="button" className=" main-button" data-dismiss="modal">No</button>
                                <button type="button" className="main-button" data-dismiss="modal" onClick={() => { handleStatusChange(selectedItem._id) }}>Sure</button>
                            </div> : <></>}
                    </div>
                </div>
            </div>
            {/* status modal end */}

            {/* Delete confirmation Modal start */}
            <div className="modal fade " id="deleteModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog  " role="document">
                    <div className="modal-content bg-color-main">
                        <div className="modal-header bgColorMain">
                            <h5 className="modal-title text-color-second" id="exampleModalLongTitle ">Are You sure Want To Delete !!</h5>
                            <div type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span className="cancel-x" aria-hidden="true">&times;</span>
                            </div>
                        </div>
                        <div className="modal-body bgColorMain">
                            <p className="text-white">Name : {selectedItem?.displayName}</p>
                            <p className="text-white">Order On : {selectedItem?.orderOn}</p>
                            <p className="text-white">Email: {selectedItem?.email}</p>
                            <p className="text-color-second">Status : {selectedItem?.status}</p>
                        </div>
                        {selectedItem ?
                            <div className="modal-footer bgColorFourth">
                                <button type="button" className=" main-button" data-dismiss="modal">No</button>
                                <button type="button" className="main-button" data-dismiss="modal" onClick={() => { handleDeleteService(selectedItem._id) }}>Sure</button>
                            </div> : <></>}
                    </div>
                </div>
            </div>
            {/* Delete confirmation Modal end */}

            <Row>
                <Col md={4}>
                    {services.map((service) => (
                        < >

                            <img className="w-100" key={service._id} src={service.image}></img>
                            <h1>{service.serviceName}</h1>
                            <p>{service.serviceDescription}</p>
                            <p>{service.serviceType}</p>
                            <p>{service.cost}</p>
                            <p>{service.categoryName}</p>
                            <p>{service.subCategoryName}</p>
                            <button class="bg-secondary cursorPointer" data-toggle="modal" data-target="#editServiceModal" onClick={() => (handleWantToEditService(service))} >Edit<i className="fas fa-edit text-color-second"></i></button>

                            <button class="bg-secondary cursorPointer" data-toggle="modal" data-target="#deleteModalCenter" onClick={() => (handleWantToDelete(service))}>Delete</button>

                        </>
                    ))}
                </Col>
            </Row>

        </div>
    );
};

export default AllServices;