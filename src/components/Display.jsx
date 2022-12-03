import React from 'react'
import EventHandler from './EventHandler'

export default function Display() {

  // Display main functions
  return (
    <section id="display">
      <div className="flex flex-col w-full lg:flex-row">
        <EventHandler />
      </div>
    </section>
  )
}
