// components/AdminLayout.js

import React from 'react';
import RootLayout from '../layout';
import UserBar from '../components/User/navBar';


const UserLayout = ({ children }) => {

    return (
        <div>
           
            <UserBar />
                {children}
           
        </div>
    );
};

export default UserLayout;
