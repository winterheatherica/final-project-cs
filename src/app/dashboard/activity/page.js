'use client';

import { useState } from 'react';
import { addActivity } from '../../../firebase/database'; // Pastikan path-nya benar
import { getAuth } from 'firebase/auth';

const ActivityDashboard = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [division, setDivision] = useState('S');
  const [file, setFile] = useState(null); // State untuk file gambar
  const [error, setError] = useState('');

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
      setFile(null); // Clear file input
      // Fetch updated activities
      // Example: setActivities(await fetchActivitiesFromDatabase());
    } catch (err) {
      setError('Error adding activity: ' + err.message);
    }
  };

  return (
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
    </div>
  );
};

export default ActivityDashboard;
