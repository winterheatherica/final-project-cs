// dashboard/user.js
'use client';

import RequireAuth from '../../../firebase/requireAuth';
import { useEffect, useState } from 'react';
import { getAllUsers, updateUserType } from '../../../firebase/database';

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [newType, setNewType] = useState('A');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUsers();
        console.log('Fetched users:', allUsers); // Tambahkan ini untuk debug
        setUsers(Object.values(allUsers));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleEditClick = (uid, currentType) => {
    setEditingUserId(uid);
    setNewType(currentType);
  };

  const handleTypeChange = (e) => {
    setNewType(e.target.value);
  };

  const handleSave = async (uid) => {
    try {
      await updateUserType(uid, newType);
      // Update state to reflect changes
      setUsers(users.map(user =>
        user.uid === uid ? { ...user, type: newType } : user
      ));
      setEditingUserId(null); // Exit edit mode
    } catch (error) {
      console.error('Error updating user type:', error);
    }
  };

  const handleCancel = () => {
    setEditingUserId(null); // Exit edit mode
  };

  return (
    <div className="flex">
    
      <RequireAuth allowedTypes={['A']}>
        <div className='pt-20 text-black pl-72 pr-4'>
         <h1 className="text-center text-3xl font-medium">User Dashboard</h1>
          <table className="table-auto w-full mt-8 border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Username</th>
                <th className="border border-gray-300 px-4 py-2">Type</th>
                <th className="border border-gray-300 px-4 py-2">Created At</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{u.uid || 'N/A'}</td>
                  <td className="border border-gray-300 px-4 py-2">{u.email || 'N/A'}</td>
                  <td className="border border-gray-300 px-4 py-2">{u.username || 'N/A'}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {editingUserId === u.uid ? (
                      <div>
                        <label>
                          <input
                            type="radio"
                            name={`type-${u.uid}`}
                            value="A"
                            checked={newType === 'A'}
                            onChange={handleTypeChange}
                          />
                          A
                        </label>
                        <label className="ml-4">
                          <input
                            type="radio"
                            name={`type-${u.uid}`}
                            value="C"
                            checked={newType === 'C'}
                            onChange={handleTypeChange}
                          />
                          C
                        </label>
                      </div>
                    ) : (
                      u.type || 'N/A'
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{u.created_at || 'N/A'}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {editingUserId === u.uid ? (
                      <>
                        <button
                          onClick={() => handleSave(u.uid)}
                          className="bg-blue-500 text-white px-2 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-gray-500 text-white px-2 py-1 rounded ml-2"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEditClick(u.uid, u.type)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </RequireAuth>
    </div>
  );
};

export default UserDashboard;
