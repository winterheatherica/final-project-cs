'use client';

import { useState } from 'react';

export default function VisionMission() {
  const [isVisionVisible, setIsVisionVisible] = useState(true);

  return (
    <section className="bg-[#071135] text-white py-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 ${isVisionVisible ? 'bg-white text-blue-900' : 'bg-[#071135] text-white'} border rounded-l`}
            onClick={() => setIsVisionVisible(true)}
          >
            Vision
          </button>
          <button
            className={`px-4 py-2 ${!isVisionVisible ? 'bg-white text-blue-900' : 'bg-[#071135] text-white'} border rounded-r`}
            onClick={() => setIsVisionVisible(false)}
          >
            Mission
          </button>
        </div>
        {isVisionVisible ? (
          <div>
            <p className=" text-justify text-lg leading-relaxed">
              Menjadi wadah pengembangan minat dan bakat mahasiswa di bidang teknologi yang berfokus pada keamanan jaringan, pengembangan perangkat lunak, dan Internet of Things (IoT) yang menginspirasi inovasi dan menghasilkan pemimpin masa depan dalam dunia teknologi.
            </p>
          </div>
        ) : (
          <div className="text-justify">
            <ul className="list-disc list-inside space-y-2">
              <li>Memberikan pemahaman mendalam tentang teknologi dan mendukung perkembangan keahlian mahasiswa.</li>
              <li>Menyediakan platform untuk eksplorasi dan penerapan konsep-konsep teknologi yang relevan.</li>
              <li>Mendorong kolaborasi antara anggota, alumni, dan mitra industri untuk menciptakan solusi yang berdampak.</li>
              <li>Menginspirasi kreativitas, penelitian, dan pengembangan proyek teknologi inovatif.</li>
              <li>Memberikan dukungan dan peluang untuk meraih prestasi tinggi di bidang teknologi.</li>
              <li>Mempromosikan etika dan keamanan dalam penggunaan teknologi untuk kesejahteraan bersama.</li>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
