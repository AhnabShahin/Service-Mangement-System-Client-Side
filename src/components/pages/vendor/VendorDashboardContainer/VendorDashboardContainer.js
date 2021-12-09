import React from 'react';
import './VendorDashboardContainer.css'
import { useLocation } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import { Row, Container,Col } from 'react-bootstrap';

import VendorDashboard from '../VendorDashboard/VendorDashboard';
import AllServices from './../AllServices/AllServices';
import VendorSideBar from './../VendorSideBar/VendorSideBar';
import Category from '../../shared/Category/Category';
import AddService from '../../shared/AddService/AddService';


const VendorDashboardContainer = () => {
    const { pathname } = useLocation();
    console.log(pathname);
    return (
        <div className="AdminDashboardContainer">
            <Container fluid>
                <Row>
                    <Col md={3} >
                        <VendorSideBar></VendorSideBar>
                    </Col>
                    <Col md={9} id="page-content-wrapper">
                        <Routes>
                            <Route path='' element={<VendorDashboard/>} />
                            <Route path='category' element={<Category/>} />
                            <Route path='add-service' element={<AddService/>} />
                            <Route path='all-services' element={<AllServices/>} />
                        </Routes>
                    </Col>
                </Row>
            </Container>

        </div >
    )
};

export default VendorDashboardContainer;