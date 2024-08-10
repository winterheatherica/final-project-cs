// src/pages/dashboard/event.js

'use client';

import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { addEvent, fetchEvents, storePickedEvents } from '../../../firebase/database'; // Pastikan path-nya benar
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';
import RequireAuth from '../../../firebase/requireAuth';
import { Select, Option } from "@material-tailwind/react";
// import Swal from 'sweetalert2';

// Constants for Google Maps
const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: -6.175387641164253,
  lng: 106.82714939117432
};

const GEOCODING_API_KEY = process.env.NEXT_PUBLIC_GEOCODING_API_KEY;

const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          latlng: `${latitude},${longitude}`,
          key: GEOCODING_API_KEY
        }
      });
  
      if (response.data.status === 'OK') {
        const results = response.data.results;
        if (results.length > 0) {
          return results[0].formatted_address; // Nama lokasi
        } else {
          throw new Error('No results found');
        }
      } else {
        throw new Error('Error with Geocoding API: ' + response.data.status);
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      throw error;
    }
};

const EventDashboard = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [type, setType] = useState('I');
  const [date, setDate] = useState(''); // Tambahkan state untuk tanggal
  const [file, setFile] = useState(null);
  const [events, setEvents] = useState({});
  const [pickedEvents, setPickedEvents] = useState([]); // Array untuk menyimpan picked event IDs
  const [error, setError] = useState('');
  const [latitude, setLatitude] = useState(null); // State untuk latitude
  const [longitude, setLongitude] = useState(null); // State untuk longitude
  const [mapOpen, setMapOpen] = useState(false); // State untuk membuka/menutup map modal
  const [mapPosition, setMapPosition] = useState(center);

  // Fetch events from database on component mount
  useEffect(() => {
    const getEvents = async () => {
      try {
        const eventsData = await fetchEvents();
        setEvents(eventsData);
      } catch (err) {
        setError('Error fetching events: ' + err.message);
      }
    };

    getEvents();
  }, []);

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const uid = auth.currentUser?.uid;
      if (!uid) {
        throw new Error('User not authenticated');
      }
  
      // Ambil nama lokasi
      const locationName = await getAddressFromCoordinates(latitude, longitude);
  
      await addEvent({
        title,
        desc,
        type,
        date,
        latitude,
        longitude,
        locationName,
        uid
      }, file);
  
      // Clear form and refresh events list
      setTitle('');
      setDesc('');
      setType('I');
      setDate('');
      setFile(null);
      setLatitude(null);
      setLongitude(null);
      
      // Fetch updated events
      const updatedEvents = await fetchEvents();
      setEvents(updatedEvents);
    } catch (err) {
      setError('Error adding event: ' + err.message);
    }
  };
  

  // Handle checkbox change
  const handleCheckboxChange = (eventId) => {
    setPickedEvents((prevPicked) => {
      if (prevPicked.includes(eventId)) {
        return prevPicked.filter((id) => id !== eventId);
      } else {
        return [...prevPicked, eventId];
      }
    });
  };

  // Handle saving picked events
  const handleSavePickedEvents = async () => {
    try {
      console.log('Picked Events:', pickedEvents); // Log pickedEvents to ensure correct data
      await storePickedEvents(pickedEvents);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Event has been saved",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error('Error saving picked events:', error);
      Swal.fire({
        icon: "error",
        text: "Something went wrong!",
      });
    }
  };

  // Open/close map modal
  const handleMapOpen = () => {
    setMapOpen(true);
  };

  const handleMapClose = () => {
    setMapOpen(false);
  };

  // Handle map click
  const handleMapClick = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setLatitude(lat);
    setLongitude(lng);
    setMapPosition({ lat, lng });
  
    try {
      const address = await getAddressFromCoordinates(lat, lng);
      alert('Location: ' + address); // Tampilkan nama lokasi
    } catch (error) {
      alert('Error fetching address: ' + error.message);
    }
  
    handleMapClose();
  };
  

  // Render table function
  const renderTable = (typeEvents, typeName) => (
    <div className="text-black">
      <h2 className='mt-8 text-black'>{typeName} Events</h2>
      <table className='table-auto w-full mt-4 border-collapse border border-gray-200 text-black'>
        <thead>
          <tr className='bg-gray-100'>
            <th className='border border-gray-300 px-4 py-2'>Event ID</th>
            <th className='border border-gray-300 px-4 py-2'>Title</th>
            <th className='border border-gray-300 px-4 py-2'>Description</th>
            <th className='border border-gray-300 px-4 py-2'>Date</th>
            <th className='border border-gray-300 px-4 py-2'>Address</th>
            <th className='border border-gray-300 px-4 py-2'>Type</th>
            <th className='border border-gray-300 px-4 py-2'>Created By</th>
            <th className='border border-gray-300 px-4 py-2'>Created At</th>
            <th className='border border-gray-300 px-4 py-2'>Image</th>
            <th className='border border-gray-300 px-4 py-2'>Pick</th>
          </tr>
        </thead>
        <tbody>
          {typeEvents.map(([eventId, event]) => (
            <tr key={eventId}>
              <td className='border border-gray-300 px-4 py-2'>{eventId}</td>
              <td className='border border-gray-300 px-4 py-2'>{event.title}</td>
              <td className='border border-gray-300 px-4 py-2'>{event.desc}</td>
              <td className='border border-gray-300 px-4 py-2'>{new Date(event.date).toLocaleDateString()}</td>
              <td className='border border-gray-300 px-4 py-2'>{event.location_name}</td>
              <td className='border border-gray-300 px-4 py-2'>
                {event.type === 'I' ? 'Internal' :
                event.type === 'E' ? 'External' :
                'Unknown Division'}
              </td>
              <td className='border border-gray-300 px-4 py-2'>{event.created_by}</td>
              <td className='border border-gray-300 px-4 py-2'>{new Date(event.created_at).toLocaleString()}</td>
              <td className='border border-gray-300 px-4 py-2'>
                {event.image_url ? <img src={event.image_url} alt="Event" className='w-24 h-24 object-cover' /> : 'No image'}
              </td>
              <td className='border border-gray-300 px-4 py-2'>
                <input
                  type="checkbox"
                  checked={pickedEvents.includes(eventId)}
                  onChange={() => handleCheckboxChange(eventId)}
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
      <div className='pt-10 text-black pl-72 pr-4'>
        <h1 className="text-center text-3xl font-medium">Event</h1>
        <form onSubmit={handleAddEvent} className="flex flex-col gap-2">
          <div className="flex items-center">
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
          <div className="flex items-center gap-2">
            <label>Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="outline-none border border-gray-400 px-4 py-1 rounded"
            />
          </div>
          <div className="flex items-center gap-2 w-fit">
            <label>Type:</label>
            <Select value={type} onChange={(value) => setType(value)} required>
              <Option value="I">Internal</Option>
              <Option value="E">External</Option>
            </Select>
          </div>
          <div>
            <label>Upload Image:</label>
            <input
              type="file"
              accept=".jpg, .png"
              onChange={(e) => setFile(e.target.files[0])}
              className="file:bg-gray-800 file:text-white file:border-none file:rounded file:px-3 file:py-1 shadow border rounded"
            />
          </div>
          <div>
            <label>Location:</label>
            <input
              type="text"
              value={latitude && longitude ? `${latitude}, ${longitude}` : 'Select location'}
              readOnly
              className="outline-none border border-gray-400 px-4 py-1 rounded"
            />
            <button type="button" onClick={handleMapOpen}>
              Pick Address
            </button>
          </div>
          <button type="submit" className="border border-gray-800 rounded-md hover:bg-gray-800 hover:text-white text-gray-800 py-2 mt-5">Add Event</button>
        </form>
        {error && <p>{error}</p>}

        {/* Render tables for each event type */}
        {renderTable(Object.entries(events).filter(([id, event]) => event.type === 'I'), 'Internal')}
        {renderTable(Object.entries(events).filter(([id, event]) => event.type === 'E'), 'External')}

        {/* Save picked events button */}
        <div className='mt-8'>
          <button onClick={handleSavePickedEvents} className='bg-blue-500 text-white px-4 py-2 rounded'>
            Save Picked Events
          </button>
        </div>

        {/* Display picked events */}
        <div className='mt-8'>
          <h3>Picked Events:</h3>
          <pre>{JSON.stringify(pickedEvents, null, 2)}</pre>
        </div>

        {/* Google Maps Modal */}
        {mapOpen && (
          <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center'>
            <div className='bg-white p-4 rounded shadow-lg w-3/4 h-3/4'>
              <button onClick={handleMapClose} className='absolute top-2 right-2'>Close</button>
              <LoadScript
                googleMapsApiKey="AIzaSyBhp4HjPJPZ2JpYBF3rC0q9_e9zhpiTSTw"
              >
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={mapPosition}
                  zoom={10}
                  onClick={handleMapClick}
                >
                  {latitude && longitude && (
                    <Marker position={{ lat: latitude, lng: longitude }} />
                  )}
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
        )}
      </div>
    </RequireAuth>
  );
};

export default EventDashboard;
