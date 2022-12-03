import React from 'react'

export default function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
            <a href="https://invalidlenni.netlify.app/" className="btn btn-ghost big-case text-xl">SmashMC Todo</a>
        </div>
        <div className="flex-none gap-2">
            <div className="form-control">
            <input type="text" placeholder="Search" className="input input-bordered" />
            </div>
        </div>
      </div>
  )
}

