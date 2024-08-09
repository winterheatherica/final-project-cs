// src/pages/dashboard/message.js

'use client';

import RequireAuth from '../../../firebase/requireAuth';

const messageDashboard = () => {
  return (
    <RequireAuth allowedTypes={['A']}>
      <div className='pt-20'>
        <h1>Open Message Dashboard</h1>
        <p>Manage message here.</p>
      </div>
    </RequireAuth>
  );
};

export default messageDashboard;
