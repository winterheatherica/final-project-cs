"use client";
import { useState } from 'react';
import DivisionSwitch from "@/components/fragments/division/division-switch";
import DivisionAbout from "@/components/fragments/division/division-about";
import DivisionFocus from "@/components/fragments/division/division-focus";
import DivisionActivity from "@/components/fragments/division/division-activity";

export default function Division() {
  const [activeDivision, setActiveDivision] = useState('software-development');

  return (
    <div className="text-black mt-16">
      <DivisionSwitch setActiveDivision={setActiveDivision} activeDivision={activeDivision} />
      <div className="mt-8 container mx-auto p-4">
        <DivisionAbout activeDivision={activeDivision} />
      </div>
      <hr className="border-gray-300 my-8" />
      <div className="mt-8 container mx-auto p-4">
        <DivisionFocus activeDivision={activeDivision} />
      </div>
      <hr className="border-gray-300 my-8" />
      <div className="mt-8 container mx-auto p-4">
        <DivisionActivity activeDivision={activeDivision} />
      </div>
    </div>
  );
}