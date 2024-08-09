"use client";
import { useEffect, useState } from 'react';

const focusAreas = {
  'software-development': [
    "Pengembangan Perangkat Lunak",
    "Fundamental Pemrograman",
    "Web Development",
    "HTML, CSS, JavaScript, React",
    "Git"
  ],
  'explore': [
    "Pengenalan Internet of Things (IoT).",
    "Praktik Perakitan Perangkat Keras.",
    "Eksperimen IoT",
    "Pengenalan Komponen-Komponen Komputer.",
    "Inovasi dalam Pengembangan Produk Fisik."
  ],
  'cyber-security': [
    "Intro to ethical hacking",
    "Intro to kali Linux",
    "5 steps of hacking",
    "Web exploitation",
    "Intro to CTF"
  ]
};

export default function DivisionFocus({ activeDivision }) {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    setAreas(focusAreas[activeDivision] || []);
  }, [activeDivision]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-8">Focus Area</h2>
      <div className="relative w-full max-w-4xl px-4 md:px-0">
        {/* Desktop View */}
        <div className="hidden md:block">
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-1 bg-black h-full"></div>
          </div>
          <div className="flex flex-col space-y-12">
            {areas.map((item, index) => (
              <div key={index} className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} items-center`}>
                <div className="flex items-center space-x-4 w-full max-w-md">
                  {index % 2 === 0 ? (
                    <>
                      <div className="pr-4 w-full text-center">{item}</div>
                      <div className="h-4 w-4 bg-black rounded-full"></div>
                      <div className="h-1 w-full bg-black"></div>
                    </>
                  ) : (
                    <>
                      <div className="h-1 w-full bg-black"></div>
                      <div className="h-4 w-4 bg-black rounded-full"></div>
                      <div className="pl-4 w-full text-center">{item}</div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Mobile View */}
        <div className="block md:hidden">
          <ul className="list-disc list-inside space-y-4 text-justify text-xs">
            {areas.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}