// src/pages/dashboard/Registration.js

'use client';

import RequireAuth from '../../../firebase/requireAuth';

const RegistrationDashboard = () => {
  return (
    <RequireAuth allowedTypes={['A']}>
      <div className='pt-20'>
        <h1>Open Registration Dashboard</h1>
        <p>Manage Registration here.</p>
      </div>
    </RequireAuth>
  );
};

export default RegistrationDashboard;
