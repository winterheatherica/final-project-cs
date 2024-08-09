// dashboard/page.js

'use client'; // Menandai ini sebagai komponen klien

import RequireAuth from '../../firebase/requireAuth';

const Dashboard = () => {
    return (
        <RequireAuth allowedTypes={['A']}>
        <div className='pt-20'>
            <h1>Dashboard</h1>
            <p>Welcome!</p>
            <ul>
            <li><a href="/dashboard/user" className="text-blue-500 underline">Go to User Dashboard</a></li>
            <li><a href="/dashboard/open-register" className="text-blue-500 underline">Open Registration Dashboard</a></li>
            <li><a href="/dashboard/registration" className="text-blue-500 underline">Registration Dashboard</a></li>
            <li><a href="/dashboard/message" className="text-blue-500 underline">Message Dashboard</a></li>
            <li><a href="/dashboard/activity" className="text-blue-500 underline">Activity Dashboard</a></li>
            <li><a href="/dashboard/event" className="text-blue-500 underline">Event Dashboard</a></li>
            </ul>
        </div>
        </RequireAuth>
    );
};

export default Dashboard;
