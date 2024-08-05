"use client";
import { useEffect, useState } from 'react';

const activities = {
  'software-development': [
    { title: "Judul 1", description: "Kegiatan pengembangan perangkat lunak.", image: "/soft-dev-logo.png" },
    { title: "Judul 2", description: "Kegiatan pelatihan pemrograman dasar.", image: "/soft-dev-logo.png" },
    { title: "Judul 3", description: "Workshop pengembangan web.", image: "/soft-dev-logo.png" }
  ],
  'explore': [
    { title: "Judul 1", description: "Workshop eksplorasi AI.", image: "/explore-logo.png" },
    { title: "Judul 2", description: "Seminar teknologi IoT.", image: "/explore-logo.png" },
    { title: "Judul 3", description: "Penelitian tentang teknologi baru.", image: "/explore-logo.png" }
  ],
  'cyber-security': [
    { title: "Judul 1", description: "Pelatihan keamanan jaringan.", image: "/cyber-sec-logo.png" },
    { title: "Judul 2", description: "Workshop penetration testing.", image: "/cyber-sec-logo.png" },
    { title: "Judul 3", description: "Simulasi manajemen risiko.", image: "/cyber-sec-logo.png" }
  ]
};

export default function DivisionActivity({ activeDivision }) {
  const [activityList, setActivityList] = useState([]);

  useEffect(() => {
    setActivityList(activities[activeDivision] || []);
  }, [activeDivision]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Activities</h2>
      {activityList.map((activity, index) => (
        <div 
          key={index} 
          className={`flex flex-col md:flex-row items-center mb-4 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
        >
          <div 
            className={`w-full md:w-1/3 h-48 rounded-lg mb-4 md:mb-0 ${index % 2 === 0 ? 'md:mr-2' : 'md:ml-2'}`}
            style={{ 
              backgroundImage: `url(${activity.image})`, 
              backgroundSize: 'contain', 
              backgroundPosition: 'center', 
              backgroundRepeat: 'no-repeat'
            }}
          ></div>
          <div className="w-full md:w-2/3 flex items-center">
            <div className={`flex-1 ${index % 2 !== 0 ? 'md:ml-4' : ''}`}>
              <h3 className="text-lg font-bold mb-2">{activity.title}</h3>
              <p className="text-gray-600">{activity.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
