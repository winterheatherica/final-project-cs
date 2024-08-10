'use client';

import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { addActivity, fetchActivities, storePickedActivities } from '../../../firebase/database'; // Pastikan path-nya benar
import RequireAuth from '../../../firebase/requireAuth';

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

  // Render table function
  const renderTable = (divisionActivities, divisionName) => (
    <div className="text-black">
      <h2 className='mt-8'>{divisionName} Division</h2>
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

      <div className='pt-32'>
        <form onSubmit={handleAddActivity}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Division:</label>
            <select value={division} onChange={(e) => setDivision(e.target.value)} required>
              <option value="S">Soft-dev</option>
              <option value="C">Cyber</option>
              <option value="E">Explore</option>
            </select>
          </div>
          <div>
            <label>Upload Image:</label>
            <input
              type="file"
              accept=".jpg, .png"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <button type="submit">Add Activity</button>
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
