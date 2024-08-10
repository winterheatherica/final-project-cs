'use client';

import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { addActivity, fetchActivities, storePickedActivities } from '../../../firebase/database'; // Pastikan path-nya benar
import RequireAuth from '../../../firebase/requireAuth';
import { Select, Option } from "@material-tailwind/react";

const ActivityDashboard = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [division, setDivision] = useState('S');
  const [file, setFile] = useState(null);
  const [activities, setActivities] = useState({});
  const [pickedDivision, setPickedDivision] = useState([]); // Array untuk menyimpan picked activity IDs
  const [error, setError] = useState('');

  // Fetch activities from database on component mount
  useEffect(() => {
    const getActivities = async () => {
      try {
        const activitiesData = await fetchActivities();
        setActivities(activitiesData);
      } catch (err) {
        setError('Error fetching activities: ' + err.message);
      }
    };

    getActivities();
  }, []);

  const handleAddActivity = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const uid = auth.currentUser?.uid;
      if (!uid) {
        throw new Error('User not authenticated');
      }

      await addActivity({
        title,
        desc,
        division,
        uid
      }, file);

      // Clear form and refresh activities list
      setTitle('');
      setDesc('');
      setDivision('S');
      setFile(null);
      
      // Fetch updated activities
      const updatedActivities = await fetchActivities();
      setActivities(updatedActivities);
    } catch (err) {
      setError('Error adding activity: ' + err.message);
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (activityId) => {
    setPickedDivision((prevPicked) => {
      if (prevPicked.includes(activityId)) {
        return prevPicked.filter((id) => id !== activityId);
      } else {
        return [...prevPicked, activityId];
      }
    });
  };

  // Handle saving picked activities
  const handleSavePickedActivities = async () => {
    try {
      console.log('Picked Division:', pickedDivision); // Log pickedDivision to ensure correct data
      await storePickedActivities(pickedDivision);
      alert('Picked activities saved successfully!');
    } catch (error) {
      console.error('Error saving picked activities:', error);
      setError('Error saving picked activities: ' + error.message);
    }
  };

  const handleDivisionChange = (value) => {
    setDivision(value);
  };

  // Render table function
  const renderTable = (divisionActivities, divisionName) => (
    <div className="text-black">
      <h2 className='mt-8 font-medium text-xl'>{divisionName} Division</h2>
      <table className='table-auto w-full mt-4 border-collapse border border-gray-200'>
        <thead>
          <tr className='bg-gray-100'>
            <th className='border border-gray-300 px-4 py-2'>Activity ID</th>
            <th className='border border-gray-300 px-4 py-2'>Title</th>
            <th className='border border-gray-300 px-4 py-2'>Description</th>
            <th className='border border-gray-300 px-4 py-2'>Division</th>
            <th className='border border-gray-300 px-4 py-2'>Created By</th>
            <th className='border border-gray-300 px-4 py-2'>Created At</th>
            <th className='border border-gray-300 px-4 py-2'>Image</th>
            <th className='border border-gray-300 px-4 py-2'>Pick</th>
          </tr>
        </thead>
        <tbody>
          {divisionActivities.map(([activityId, activity]) => (
            <tr key={activityId}>
              <td className='border border-gray-300 px-4 py-2'>{activityId}</td>
              <td className='border border-gray-300 px-4 py-2'>{activity.title}</td>
              <td className='border border-gray-300 px-4 py-2'>{activity.desc}</td>
              <td className='border border-gray-300 px-4 py-2'>
                {activity.division === 'S' ? 'Software Development' :
                activity.division === 'E' ? 'Explore' :
                activity.division === 'C' ? 'Cyber Security' :
                'Unknown Division'}
              </td>
              <td className='border border-gray-300 px-4 py-2'>{activity.created_by}</td>
              <td className='border border-gray-300 px-4 py-2'>{new Date(activity.created_at).toLocaleString()}</td>
              <td className='border border-gray-300 px-4 py-2'>
                {activity.image_url ? <img src={activity.image_url} alt="Activity" className='w-24 h-24 object-cover' /> : 'No image'}
              </td>
              <td className='border border-gray-300 px-4 py-2'>
                <input
                  type="checkbox"
                  checked={pickedDivision.includes(activityId)}
                  onChange={() => handleCheckboxChange(activityId)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <RequireAuth allowedTypes={['A']}>
      <div className='pt-10 pl-72 text-black pr-4'>
        <h1 className="text-center text-3xl font-medium">Activity</h1>
        <form onSubmit={handleAddActivity} className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="outline-none border border-gray-400 px-4 py-1 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label>Description:</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
              className="outline-none border border-gray-400 px-4 py-1 rounded resize-none"
            />
          </div>
          <div className="w-fit">
            <label>Division:</label>
            <Select value={division} onChange={handleDivisionChange} required>
              <Option value="S">Soft-dev</Option>
              <Option value="C">Cyber</Option>
              <Option value="E">Explore</Option>
            </Select>
          </div>
          <div className="flex gap-2 flex-col justify-center w-fit">
            <label className="">Upload Image:</label>
            <input
              type="file"
              accept=".jpg, .png"
              onChange={(e) => setFile(e.target.files[0])}
              className="file:bg-gray-800 file:text-white file:border-none file:rounded file:px-3 file:py-1 shadow border rounded"
            />
          </div>
          <button type="submit" className="border border-gray-800 rounded-md hover:bg-gray-800 hover:text-white text-gray-800 py-2 mt-5">Add Activity</button>
        </form>
        {error && <p>{error}</p>}

        {/* Render three tables for each division */}
        {renderTable(Object.entries(activities).filter(([id, activity]) => activity.division === 'S'), 'Soft-dev')}
        {renderTable(Object.entries(activities).filter(([id, activity]) => activity.division === 'C'), 'Cyber')}
        {renderTable(Object.entries(activities).filter(([id, activity]) => activity.division === 'E'), 'Explore')}

        {/* Save picked activities button */}
        <div className='mt-8'>
          <button onClick={handleSavePickedActivities} className='bg-blue-500 text-white px-4 py-2 rounded'>
            Save Picked Activities
          </button>
        </div>

        {/* Display picked activities */}
        <div className='mt-8'>
          <h3>Picked Activities:</h3>
          <pre>{JSON.stringify(pickedDivision, null, 2)}</pre>
        </div>
      </div>
    </RequireAuth>
  );
};

export default ActivityDashboard;
