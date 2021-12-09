import React from 'react';
import { FaCalendar } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import {Navigation} from 'react-minimal-side-navigation';

const AdminSideBar = () => {
    const navigate = useNavigate();
    return (
        <Navigation
        // you can use your own router's api to get pathname
        activeItemId=""
        onSelect={({ itemId }) => {
            navigate(itemId)
        }}
        items={[
            {
                title: 'Dashboard',
                itemId: ``,
                // you can use your own custom Icon component as well
                // icon is optional
                elemBefore: () => <FaCalendar />,
            },
            {
                title: 'Category',
                itemId: `category`,
                // you can use your own custom Icon component as well
                // icon is optional
                elemBefore: () => <FaCalendar />,
            },
            {
                title: 'Services',
                itemId: 'all-services',
                elemBefore: () => <FaCalendar />,
                subNav: [
                    {
                        title: 'All Services',
                        itemId: `all-services`,
                        // Requires v1.9.1+ (https://github.com/abhijithvijayan/react-minimal-side-navigation/issues/13)
                        elemBefore: () => <FaCalendar />,
                    },
                    {
                        title: 'Add Service',
                        itemId: 'add-service',
                        elemBefore: () =><FaCalendar />,
                    },
                ],
            },
            {
                title: 'Users',
                itemId: 'all-users',
                elemBefore: () => <FaCalendar />,
                subNav: [
                    {
                        title: 'All Users',
                        itemId: `all-users`,
                        // Requires v1.9.1+ (https://github.com/abhijithvijayan/react-minimal-side-navigation/issues/13)
                        elemBefore: () => <FaCalendar />,
                    },
                    {
                        title: 'Add User',
                        itemId: 'add-user',
                        elemBefore: () =><FaCalendar />,
                    },
                ],
            },
            {
                title: 'Appoinment',
                itemId: 'appoinment',
                elemBefore: () =><FaCalendar />,
            },
            {
                title: 'Campaing',
                itemId: 'campaing',
                elemBefore: () =><FaCalendar />,
            },
            {
                title: 'Blog',
                itemId: 'all-posts',
                elemBefore: () => <FaCalendar />,
                subNav: [
                    {
                        title: 'All Posts',
                        itemId: `all-posts`,
                        // Requires v1.9.1+ (https://github.com/abhijithvijayan/react-minimal-side-navigation/issues/13)
                        elemBefore: () => <FaCalendar />,
                    },
                    {
                        title: 'Add Post',
                        itemId: 'add-post',
                        elemBefore: () =><FaCalendar />,
                    },
                ],
            },
            {
                title: 'Payment',
                itemId: 'payment',
                elemBefore: () =><FaCalendar />,
            },
            {
                title: 'Order History',
                itemId: 'order-history',
                elemBefore: () =><FaCalendar />,
            },
            {
                title: 'Reviews',
                itemId: 'reviews',
                elemBefore: () =><FaCalendar />,
            },
            {
                title: 'Settings',
                itemId: 'settings',
                elemBefore: () =><FaCalendar />,
            },
            
        ]}
    />
    );
};

export default AdminSideBar;