import React from "react";

function Spinner() {
  return (
    <div className="w-full h-full bg-slate-300 grid place-items-center">
      <span className="animate-spin w-20 h-20 rounded-full block border-2 border-gray-800 border-r-gray-100"></span>
    </div>
  );
}

export default Spinner;
