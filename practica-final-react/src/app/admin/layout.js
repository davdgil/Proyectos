// components/AdminLayout.js

import React from 'react';
import AdminBar from '../components/Admin/navBar';
import RootLayout from '../layout';

const AdminLayout = ({ children }) => {

    return (
      <div>
            <AdminBar />
            {children}
       </div>
    );
};

export default AdminLayout;
