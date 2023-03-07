import React from "react";

function Button(props) {
  return (
    <button
      onClick={props.onClick}
      className="min-w-[30px] aspect-square bg-white/0 hover:bg-white/75 active:bg-white/100 "
    >
      {props.children}
    </button>
  );
}

export default Button;
