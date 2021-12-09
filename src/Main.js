import React, { useEffect, useState } from 'react';
import Header from './components/pages/shared/Header/Header';
import Home from './components/pages/shared/Home/Home';
import { Routes, Route, Link, } from "react-router-dom";
import useAuth from './Hooks/useAuth';
import { Spinner } from 'react-bootstrap';
import AdminDashboardContainer from './components/pages/admin/AdminDashboardContainer/AdminDashboardContainer';
import AdminRoute from './components/pages/admin/AdminRoute/AdminRoute';
import HideRoute from './components/pages/HideRoute/HideRoute';
import VendorDashboardContainer from './components/pages/vendor/VendorDashboardContainer/VendorDashboardContainer';
import VendorRegistration from './components/pages/vendor/VendorRegistration/VendorRegistration';
import CustomerRegistration from './components/pages/customer/CustomerRegistration/CustomerRegistration';
import VendorRoute from './components/pages/vendor/VendorRoute/VendorRoute';
import Login from './components/pages/shared/Login/Login';

const Main = () => {
    const { user, isloading } = useAuth();
    
    if (isloading) {
        return (
            <div className="d-flex my-5 justify-content-center">
                <Spinner animation="grow" variant="danger" />
            </div>
        );
    };
    

    return (
        <>
            <Header ></Header>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<HideRoute><Login /></HideRoute>} />
                <Route path="/vendor/registration" element={<HideRoute><VendorRegistration/></HideRoute>} />
                <Route path="/customer/registration" element={<HideRoute><CustomerRegistration/></HideRoute>} />
                <Route path="/admin/dashboard/*" element={<AdminRoute><AdminDashboardContainer /></AdminRoute>}/>
                <Route path="/vendor/dashboard/*" element={<VendorRoute><VendorDashboardContainer /></VendorRoute>}/>
            </Routes>
        </>
    );
};

export default Main;