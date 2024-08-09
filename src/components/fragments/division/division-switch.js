"use client";
import Image from 'next/image';
import { useEffect } from 'react';

// Path gambar logo masing-masing divisi di dalam direktori public
const logos = {
  'software-development': '/soft-dev-logo.png',
  'explore': '/explore-logo.png',
  'cyber-security': '/cyber-sec-logo.png'
};

export default function DivisionSwitch({ setActiveDivision, activeDivision }) {
  useEffect(() => {
    const savedDivision = localStorage.getItem('activeDivision');
    if (savedDivision) {
      setActiveDivision(savedDivision);
    }
  }, [setActiveDivision]);

  const handleDivisionClick = (division) => {
    setActiveDivision(division);
    localStorage.setItem('activeDivision', division);
  };

  return (
    <nav className="bg-[#071135] p-4">
      <div className="container mx-auto flex justify-center items-center gap-4 md:gap-12">
        <button
          className={`text-white flex flex-col items-center ${activeDivision === 'software-development' ? 'font-bold' : ''}`}
          onClick={() => handleDivisionClick('software-development')}
        >
          Software Development
          {activeDivision === 'software-development' && (
            <Image src={logos['software-development']} alt="Software Development Logo" width={70} height={70} />
          )}
        </button>
        <span className="text-white text-4xl">|</span>
        <button
          className={`text-white flex flex-col items-center ${activeDivision === 'explore' ? 'font-bold' : ''}`}
          onClick={() => handleDivisionClick('explore')}
        >
          Explore
          {activeDivision === 'explore' && (
            <Image src={logos['explore']} alt="Explore Logo" width={70} height={70} />
          )}
        </button>
        <span className="text-white text-4xl">|</span>
        <button
          className={`text-white flex flex-col items-center ${activeDivision === 'cyber-security' ? 'font-bold' : ''}`}
          onClick={() => handleDivisionClick('cyber-security')}
        >
          Cyber Security
          {activeDivision === 'cyber-security' && (
            <Image src={logos['cyber-security']} alt="Cyber Security Logo" width={70} height={70} />
          )}
        </button>
      </div>
    </nav>
  );
}