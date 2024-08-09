"use client";
import { useState } from 'react';
import EventSwitch from '@/components/fragments/event/event-switch';
import EventList from '@/components/fragments/event/event-list';

export default function Event() {
  const [activeEvent, setActiveEvent] = useState('Internal');
  return (
    <div className="text-black mt-16">
      <EventSwitch setActiveEvent={setActiveEvent} activeEvent={activeEvent} />
      <div className="mt-8 container mx-auto p-4">
        <EventList activeEvent={activeEvent} />
      </div>
    </div>
  );
}
  