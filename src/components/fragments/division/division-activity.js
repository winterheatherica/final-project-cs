"use client";
import { useEffect, useState } from 'react';
import { fetchPickedActivities, fetchActivities } from '../../../firebase/database'; // Sesuaikan path-nya jika perlu

export default function DivisionActivity({ activeDivision }) {
  const [activityList, setActivityList] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const getActivities = async (division) => {
      try {
        // Fetch picked activities
        const pickedActivitiesData = await fetchPickedActivities();
        console.log('Picked Activities Data:', pickedActivitiesData);

        // Convert picked activity IDs from strings to numbers
        const pickedActivityIds = Object.values(pickedActivitiesData).map(activity => parseInt(activity.activity_id, 10));
        console.log('Picked Activity IDs:', pickedActivityIds);

        // Fetch all activities
        const allActivitiesData = await fetchActivities();
        console.log('All Activities Data:', allActivitiesData);

        // Convert allActivitiesData to array and ensure correct format
        const activitiesArray = Object.values(allActivitiesData).map(activity => ({
          ...activity,
          activity_id: parseInt(activity.activity_id, 10), // Ensure activity_id is a number
        }));
        console.log('Activities Array:', activitiesArray);

        // Filter activities based on picked IDs and division
        const divisionMap = {
          'software-development': 'S',
          'cyber-security': 'C',
          'explore': 'E',
        };
        
        const activeDivisionCode = divisionMap[activeDivision];
        console.log('Active Division Code:', activeDivisionCode);
        
        const filteredActivities = activitiesArray
          .filter(activity => {
            const idMatch = pickedActivityIds.includes(activity.activity_id);
            console.log(`Activity ID: ${activity.activity_id}, Picked IDs: ${pickedActivityIds}, Match: ${idMatch}`);
            return idMatch;
          })
          .filter(activity => {
            const divisionMatch = activity.division === activeDivisionCode;
            console.log(`Activity Division: ${activity.division}, Active Division Code: ${activeDivisionCode}, Match: ${divisionMatch}`);
            return divisionMatch;
          });
        
        console.log('Filtered Activities:', filteredActivities);
        
        setActivityList(filteredActivities);
        
        if (filteredActivities.length == 0) {
          console.log('No activities found for this division.');
        }

        setActivityList(filteredActivities);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError('Error fetching activities: ' + error.message);
      }
    };

    getActivities(activeDivision);
  }, [activeDivision]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Activities</h2>
      {error && <p className="text-red-500">{error}</p>}
      {activityList.length > 0 ? (
        activityList.map((activity, index) => (
          <div 
            key={index} 
            className={`flex flex-col md:flex-row items-center mb-4 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
          >
            <div 
              className={`w-full md:w-1/3 h-48 rounded-lg mb-4 md:mb-0 ${index % 2 === 0 ? 'md:mr-2' : 'md:ml-2'}`}
              style={{ 
                backgroundImage: `url(${activity.image_url})`, 
                backgroundSize: 'contain', 
                backgroundPosition: 'center', 
                backgroundRepeat: 'no-repeat'
              }}
            ></div>
            <div className="w-full md:w-2/3 flex items-center">
              <div className={`flex-1 ${index % 2 !== 0 ? 'md:ml-4' : ''}`}>
                <h3 className="text-lg font-bold mb-2">{activity.title}</h3>
                <p className="text-gray-600">{activity.desc}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No activities found for this division.</p>
      )}
    </div>
  );
}
