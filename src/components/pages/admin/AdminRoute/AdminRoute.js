import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router';
import useAuth from '../../../../Hooks/useAuth';

const AdminRoute = ({ children }) => {
    const [userRole, setUserRole] = useState(null);
    console.log(userRole)
    const [loading,setLoading ] = useState(true);
    const { user } = useAuth();
    useEffect(()=>{
        async function getUser(email) {
            await axios.post('http://localhost:5000/get-user-role', {"email":email}).then(res => {
                setUserRole(res.data)
            })
        }
        getUser(user.email)
    },[])
 
    if (userRole==null) {
        return (
            <div className="d-flex my-5 justify-content-center">
                <Spinner animation="grow" variant="danger" />
            </div>
        );
    };
    // if(user.email){
    //     return children;
    // }
    if(userRole.role == "admin"){
        return children;
    }else{
        return <Navigate to="/admin/login" />
    }
    //return userRole.role == "admin" ? children : <Navigate to="/login" />
};

export default AdminRoute;