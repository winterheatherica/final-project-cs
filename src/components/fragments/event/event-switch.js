"use client";

import { useState } from 'react';
import EventInternal from './event-internal';
import EventExternal from './event-external';

export default function EventSwitch() {
  const [view, setView] = useState('internal');

  return (
    <div className="container mx-auto pt-20 p-4">
      <div className="text-center mb-10 mt-5">
        <span 
          className={`cursor-pointer text-xl ${view === 'internal' ? 'font-bold' : ''}`} 
          onClick={() => setView('internal')}
        >
          Internal
        </span>
        <span className="mx-2 text-2xl">|</span>
        <span 
          className={`cursor-pointer text-xl ${view === 'external' ? 'font-bold' : ''}`} 
          onClick={() => setView('external')}
        >
          External
        </span>
      </div>

      <div>
        {view === 'internal' ? <EventInternal /> : null}
        {view === 'external' ? <EventExternal /> : null}
      </div>
    </div>
  );
}
