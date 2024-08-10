"use client";
import { useEffect, useState } from 'react';
import { fetchEvents } from '../../../firebase/database'; // Sesuaikan path-nya jika perlu

export default function RecentEvent() {
  const [recentEvents, setRecentEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const getRecentEvents = async () => {
      try {
        // Fetch all events
        const allEventsData = await fetchEvents();
        console.log('All Events Data:', allEventsData);

        // Convert allEventsData to array and ensure correct format
        const eventsArray = Object.values(allEventsData).map(event => ({
          ...event,
          event_id: parseInt(event.event_id, 10), // Ensure event_id is a number
          date: new Date(event.date), // Convert date to Date object
        }));

        // Sort events by date in descending order
        eventsArray.sort((a, b) => b.date - a.date);

        // Get the most recent event (or adjust as needed for multiple events)
        const topRecentEvents = eventsArray.slice(0, 2); // Get top 2 recent events for example

        console.log('Top Recent Events:', topRecentEvents);

        setRecentEvents(topRecentEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Error fetching events: ' + error.message);
      }
    };

    getRecentEvents();
  }, []);

  return (
    <div className="p-4 md:px-32 text-[#071135] h-screen">
      <h1 className="text-3xl font-bold text-center">Recent Events</h1>

      <article className="h-full mt-5 md:mt-12 flex flex-col md:items-center gap-24">
        {error && <p className="text-red-500">{error}</p>}
        {recentEvents.length > 0 ? (
          recentEvents.map((event, index) => (
            <div
              key={event.event_id}
              className={`h-1/3 md:w-full md:flex ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'} items-center justify-evenly`}
            >
              <div>
                <h1 className="font-extrabold text-2xl">{event.title}</h1>
                <p>{new Date(event.date).toLocaleDateString()}</p>
              </div>
              <div
                className="md:w-1/3 bg-[#071135] h-full rounded-md"
                style={{
                  backgroundImage: `url(${event.image_url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No recent events found.</p>
        )}
      </article>
    </div>
  );
}
