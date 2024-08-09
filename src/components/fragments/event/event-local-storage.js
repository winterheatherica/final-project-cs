"use client";
import { useState, useEffect } from 'react';
import EventSwitch from '@/components/fragments/event/event-switch';
import EventList from "@/components/fragments/event/event-switch";

export default function Event() {
  const [activeEvent, setActiveEvent] = useState('internal');

  useEffect(() => {
    const savedEvent = localStorage.getItem('activeEvent');
    if (savedEvent) {
      setActiveEvent(savedEvent);
    }
  }, []);

  return (
    <div className="text-black">
      <EventSwitch setActiveEvent={setActiveEvent} activeEvent={activeEvent} />
      <div className="mt-8">
        <EventList activeEvent={activeEvent} />
      </div>
    </div>
  );
}