import React from 'react';
import useAuth from '../../../../Hooks/useAuth';

const VendorDashboard = () => {
    const {user}=useAuth()
    return (
        <div>
            <h1>Thgis is vendor dashboard</h1>
            <img src={user.photoURL} alt="" srcset="" />
        </div>
    );
};

export default VendorDashboard;