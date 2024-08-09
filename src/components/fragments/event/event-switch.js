"use client";
import { useEffect } from 'react';

export default function EventSwitch({ setActiveEvent, activeEvent }) {
  useEffect(() => {
    const savedEvent = localStorage.getItem('activeEvent');
    if (savedEvent) {
      setActiveEvent(savedEvent);
    }
  }, [setActiveEvent]);

  const handleEventClick = (event) => {
    setActiveEvent(event);
    localStorage.setItem('activeEvent', event);
  };

  return (
    <nav className="bg-[#071135] p-4">
      <div className="container mx-auto flex justify-center items-center gap-4 md:gap-12">
        <button
          className={`text-white flex flex-col items-center ${activeEvent === 'internal' ? 'font-bold' : ''}`}
          onClick={() => handleEventClick('internal')}
        >
          Internal
        </button>
        <span className="text-white text-4xl">|</span>
        <button
          className={`text-white flex flex-col items-center ${activeEvent === 'external' ? 'font-bold' : ''}`}
          onClick={() => handleEventClick('external')}
        >
          External
        </button>
      </div>
    </nav>
  );
}
