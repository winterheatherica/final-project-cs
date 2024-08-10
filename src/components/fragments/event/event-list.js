"use client";
import { useEffect, useState } from 'react';
import { fetchPickedEvents, fetchEvents } from '../../../firebase/database'; // Sesuaikan path-nya jika perlu

export default function EventList({ activeEvent }) {
  const [eventList, setEventList] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const getEvents = async (eventType) => {
      try {
        console.log('Active Event Type:', eventType);

        // Fetch picked events
        const pickedEventsData = await fetchPickedEvents();
        console.log('Picked Events Data:', pickedEventsData);

        // Convert picked event IDs from strings to numbers
        const pickedEventIds = Object.values(pickedEventsData).map(event => parseInt(event.event_id, 10));
        console.log('Picked Event IDs:', pickedEventIds);

        // Fetch all events
        const allEventsData = await fetchEvents();
        console.log('All Events Data:', allEventsData);

        // Convert allEventsData to array and ensure correct format
        const eventsArray = Object.values(allEventsData).map(event => ({
          ...event,
          event_id: parseInt(event.event_id, 10), // Ensure event_id is a number
        }));
        console.log('Events Array:', eventsArray);
        
        const eventMap = {
          'internal': 'I',
          'external': 'E',
        };

        const activeEventCode = eventMap[activeEvent];

        // Filter events based on picked IDs and type
        const filteredEvents = eventsArray
          .filter(event => {
            const idMatch = pickedEventIds.includes(event.event_id);
            console.log(`Event ID: ${event.event_id}, Picked IDs: ${pickedEventIds}, ID Match: ${idMatch}`);
            return idMatch;
          })
          .filter(event => {
            const typeMatch = event.type && event.type.toUpperCase() === activeEventCode;
            console.log(`Event Type: ${event.type}, Expected Type: ${activeEventCode}, Type Match: ${typeMatch}`);
            return typeMatch;
          });

        console.log('Filtered Events:', filteredEvents);

        if (filteredEvents.length === 0) {
          console.log('No events found for this type.');
        }

        setEventList(filteredEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Error fetching events: ' + error.message);
      }
    };

    getEvents(activeEvent);
  }, [activeEvent]);

  // Determine the title based on the activeEvent
  const eventTitle = activeEvent === 'internal' ? 'Internal Events' : 'External Events';

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">{eventTitle}</h2>
      {error && <p className="text-red-500">{error}</p>}
      {eventList.length > 0 ? (
        eventList.map((event, index) => (
          <div 
            key={index} 
            className={`flex flex-col md:flex-row items-center mb-4 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
          >
            <div 
              className={`w-full md:w-1/3 h-48 rounded-lg mb-4 md:mb-0 ${index % 2 === 0 ? 'md:mr-2' : 'md:ml-2'}`}
              style={{ 
                backgroundImage: `url(${event.image_url})`, 
                backgroundSize: 'contain', 
                backgroundPosition: 'center', 
                backgroundRepeat: 'no-repeat'
              }}
            ></div>
            <div className="w-full md:w-2/3 flex items-center">
              <div className={`flex-1 ${index % 2 !== 0 ? 'md:ml-4' : ''}`}>
                <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                <p className="text-gray-600">{event.date}</p>
                <p className="text-gray-600">{event.location_name}</p>
                <p className="text-gray-600 text-justify">{event.desc}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No events found for this type.</p>
      )}
    </div>
  );
}
