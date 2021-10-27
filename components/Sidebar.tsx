import React from 'react'
import { FaBars } from 'react-icons/fa'

const Sidebar = () => {
  return (
    <div className="absolute w-full h-screen-responsive">
      <div className="rounded-lg shadow drawer h-screen-responsive">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="flex drawer-content m-8 h-fit-content">
          <label htmlFor="my-drawer" className="btn btn-circle above-canvas">
            <FaBars className="w-5 h-5" />
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay above-canvas"></label>
          <div className="p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
            <ul className="menu p-0">
              <li>
                <a>Menu Item</a>
              </li>
              <li>
                <a>Menu Item</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
