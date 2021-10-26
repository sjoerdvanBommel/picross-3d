import React from "react";

const PicrossMenu = () => {
  return <div className="mt-8 ml-8 overflow-hidden self-start above-canvas">
    <div className="inner transition-all duration-500 ease-in-out p-2 bg-black hover:text-white rounded-md w-10 hover:w-48 h-10 hover:h-80 overflow-hidden cursor-auto">
      <i className="fas fa-bars w-14 h-14 text-center text-5xl transform scale-50 -translate-x-1/4 -translate-y-1/4"></i>
      <button className="btn btn-blue" onClick={() => { }}>Export</button>
      <button className="btn btn-blue" onClick={() => { }}>Import</button>
      <button className="btn btn-blue" onClick={() => { }}>Toggle puzzle mode</button>
    </div>
  </div>
}

export default PicrossMenu;