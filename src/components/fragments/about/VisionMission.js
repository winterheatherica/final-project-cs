'use client';

import { useState } from 'react';

export default function VisionMission() {
  const [isVisionVisible, setIsVisionVisible] = useState(true);

  return (
    <section className="bg-[#071135] text-white py-8 px-4">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row">
        <div className="md:w-1/3 flex flex-col items-center md:items-start mb-4 md:mb-0">
          <button
            className={`transition duration-300 ease-in-out w-full px-4 py-2 text-lg rounded-full ${isVisionVisible ? 'bg-white text-[#071135]' : 'bg-[#071135] text-white'}`}
            onClick={() => setIsVisionVisible(true)}
          >
            <b>VISION</b>
          </button>
          <button
            className={`transition duration-300 ease-in-out w-full px-4 py-2 text-lg rounded-full mt-2 ${!isVisionVisible ? 'bg-white text-[#071135]' : 'bg-[#071135] text-white'}`}
            onClick={() => setIsVisionVisible(false)}
          >
            <b>MISSION</b>
          </button>
        </div>

        <div className="md:w-2/3 md:pl-8 text-justify">
          {isVisionVisible ? (
            <p className="text-lg leading-relaxed">
              Menjadi wadah pengembangan minat dan bakat mahasiswa di bidang teknologi yang berfokus pada keamanan jaringan, pengembangan perangkat lunak, dan Internet of Things (IoT) yang menginspirasi inovasi dan menghasilkan pemimpin masa depan dalam dunia teknologi.
            </p>
          ) : (
            <ul className="text-lg list-disc list-inside space-y-2 text-justify">
              <li>Memberikan pemahaman mendalam tentang teknologi dan mendukung perkembangan keahlian mahasiswa.</li>
              <li>Menyediakan platform untuk eksplorasi dan penerapan konsep-konsep teknologi yang relevan.</li>
              <li>Mendorong kolaborasi antara anggota, alumni, dan mitra industri untuk menciptakan solusi yang berdampak.</li>
              <li>Menginspirasi kreativitas, penelitian, dan pengembangan proyek teknologi inovatif.</li>
              <li>Memberikan dukungan dan peluang untuk meraih prestasi tinggi di bidang teknologi.</li>
              <li>Mempromosikan etika dan keamanan dalam penggunaan teknologi untuk kesejahteraan bersama.</li>
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
