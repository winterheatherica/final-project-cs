"use client";
import { useState, useEffect } from 'react';
import Navbar from "@/components/fragments/division/division-switch";
import DivisionAbout from "@/components/fragments/division/division-about";
import DivisionFocus from "@/components/fragments/division/division-focus";
import DivisionActivity from "@/components/fragments/division/division-activity";

export default function Division() {
  const [activeDivision, setActiveDivision] = useState('software-development');

  useEffect(() => {
    const savedDivision = localStorage.getItem('activeDivision');
    if (savedDivision) {
      setActiveDivision(savedDivision);
    }
  }, []);

  return (
    <div className="text-black">
      <Navbar setActiveDivision={setActiveDivision} activeDivision={activeDivision} />
      <div className="mt-8">
        <DivisionAbout activeDivision={activeDivision} />
      </div>
      <div className="mt-8">
        <DivisionFocus activeDivision={activeDivision} />
      </div>
      <div className="mt-8">
        <DivisionActivity activeDivision={activeDivision} />
      </div>
    </div>
  );
}