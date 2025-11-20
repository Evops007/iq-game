"use client";

import SpillMesterSide from "../component/SpillMesterSide";

export default async function SpillMester() {

  return (
    <div className="min-h-screen flex">
      <main className="flex-1 flex flex-col pt-4 pb-4 px-4 overflow-hidden">
        <SpillMesterSide /> 
      </main>
      
    </div>
  );
}