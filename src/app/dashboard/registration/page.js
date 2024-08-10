// src/pages/dashboard/Registration.js

'use client';

import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import RequireAuth from '../../../firebase/requireAuth';

const RegistrationDashboard = () => {
  const [registrations, setRegistrations] = useState({});
  const [pickedOpenRegId, setPickedOpenRegId] = useState(null);
  const [filteredRegistrations, setFilteredRegistrations] = useState({});
  const [error, setError] = useState('');
  const [certifUrls, setCertifUrls] = useState({});

  useEffect(() => {
    const getPickedOpenRegId = async () => {
      try {
        const db = getDatabase();
        const pickedDatesRef = ref(db, 'picked_dates/-O3mP9re64TVxQptSGjJ');
        const snapshot = await get(pickedDatesRef);

        if (snapshot.exists()) {
          const pickedData = snapshot.val();
          setPickedOpenRegId(pickedData.open_reg_id);
        } else {
          setPickedOpenRegId(null);
        }
      } catch (err) {
        setError('Error fetching picked dates: ' + err.message);
      }
    };

    const getRegistrations = async () => {
      try {
        const db = getDatabase();
        const registrationsRef = ref(db, 'registrations');
        const snapshot = await get(registrationsRef);

        if (snapshot.exists()) {
          const registrationsData = snapshot.val();
          setRegistrations(registrationsData);

          // Fetch certificate URLs
          const storage = getStorage();
          const urls = {};
          for (const [regId, registration] of Object.entries(registrationsData)) {
            if (registration.certif_loc) {
              const certifRef = storageRef(storage, registration.certif_loc);
              try {
                const url = await getDownloadURL(certifRef);
                urls[regId] = url;
              } catch (err) {
                console.error('Error fetching certificate URL:', err);
              }
            }
          }
          setCertifUrls(urls);
        } else {
          setRegistrations({});
        }
      } catch (err) {
        setError('Error fetching registrations: ' + err.message);
      }
    };

    // Fetch picked open_reg_id and registrations
    getPickedOpenRegId().then(getRegistrations);
  }, []);

  useEffect(() => {
    if (pickedOpenRegId && registrations) {
      const filtered = Object.fromEntries(
        Object.entries(registrations).filter(
          ([, registration]) => registration.open_reg_id === pickedOpenRegId
        )
      );
      setFilteredRegistrations(filtered);
    }
  }, [pickedOpenRegId, registrations]);

  return (
    <RequireAuth allowedTypes={['A']}>
      <div className='pt-20 pl-72 text-black pr-4'>
        <h1>Registration Dashboard</h1>
        <p>Manage Registration here.</p>

        {error && <p className="text-red-500">{error}</p>}

        <table className='table-auto w-full mt-4 border-collapse border border-gray-200'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='border border-gray-300 px-4 py-2'>UID</th>
              <th className='border border-gray-300 px-4 py-2'>Reg ID</th>
              <th className='border border-gray-300 px-4 py-2'>Reason</th>
              <th className='border border-gray-300 px-4 py-2'>Programming Languages</th>
              <th className='border border-gray-300 px-4 py-2'>Open Reg ID</th>
              <th className='border border-gray-300 px-4 py-2'>Certif Location</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(filteredRegistrations).map(([regId, registration]) => (
              <tr key={regId}>
                <td className='border border-gray-300 px-4 py-2'>{registration.uid}</td>
                <td className='border border-gray-300 px-4 py-2'>{regId}</td>
                <td className='border border-gray-300 px-4 py-2'>{registration.reason}</td>
                <td className='border border-gray-300 px-4 py-2'>{registration.programmingLanguages}</td>
                <td className='border border-gray-300 px-4 py-2'>{registration.open_reg_id}</td>
                <td className='border border-gray-300 px-4 py-2'>
                  {certifUrls[regId] ? (
                    <a href={certifUrls[regId]} target="_blank" rel="noopener noreferrer" className='text-blue-500 underline'>
                      View Certificate
                    </a>
                  ) : (
                    'No Certificate'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </RequireAuth>
  );
};

export default RegistrationDashboard;
