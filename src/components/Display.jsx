import React from "react";
import EventHandler from "./EventHandler";

export default function Display() {
  // Display main functions
  //
  return (
    <div className="Display">
      <section id="display">
        <div className="shadow-xl base-300 flex flex-col w-full lg:flex-row">
          <EventHandler />
        </div>
      </section>
    </div>
  );
}
