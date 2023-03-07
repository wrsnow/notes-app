import React from "react";

function Input(props) {
  return (
    <div className="my-3 flex flex-col w-auto">
      <label className="my-1" htmlFor={props.id}>
        {props.label}
      </label>
      <input
        className={
          props.className ?? "px-2 py-2 rounded-md bg-white text-black"
        }
        type={props.type}
        placeholder={props.placeholder}
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}

export default Input;
