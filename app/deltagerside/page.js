"use client"

import DeltagerSide from "@/app/component/DeltagerSide";


export default function Deltager() {
  return (
    <div className="min-h-screen flex">
      <main className="flex-1 flex flex-col pt-4 pb-4 px-4">
        <DeltagerSide /> 
      </main>
    </div>
  );
}