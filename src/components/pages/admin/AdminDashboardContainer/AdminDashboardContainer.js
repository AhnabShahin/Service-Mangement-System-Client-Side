import React from 'react';
import { Col, Row, Container, Nav } from 'react-bootstrap';
import './AdminDashboardContainer.css'

import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { Route, Routes } from 'react-router';
import { useLocation } from 'react-router-dom';

import AdminDashboard from '../AdminDashboard/AdminDashboard';
import Category from '../../shared/Category/Category';
import AllServices from '../AllServices/AllServices';
import AddService from '../../shared/AddService/AddService';
import AdminSideBar from './../AdminSideBar/AdminSideBar';


const AdminDashboardContainer = () => {
    const { pathname } = useLocation();
    console.log(pathname);
    return (
        <div className="AdminDashboardContainer">
            <Container fluid>
                <Row>
                    <Col md={3} >
                        <AdminSideBar></AdminSideBar>
                    </Col>
                    <Col md={9} id="page-content-wrapper">
                        <Routes>
                            <Route path='' element={<AdminDashboard/>} />
                            <Route path='category' element={<Category/>} />
                            <Route path='add-service' element={<AddService/>} />
                            <Route path='all-services' element={<AllServices/>} />
                        </Routes>
                    </Col>
                </Row>
            </Container>

        </div >
    );
};

export default AdminDashboardContainer;