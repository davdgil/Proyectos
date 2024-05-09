// components/AdminLayout.js

import React from 'react';
import RootLayout from '../layout';
import MerchantBar from '../components/Merchant/navBar';

const AdminLayout = ({ children }) => {

    return (
      <div>
          <MerchantBar />
            {children}
       </div>
    );
};

export default AdminLayout;
